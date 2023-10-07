<template>
    <div class="fixed top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 bg-black" @click.self="emit('closeModal', false)
        ">
        <div
            class=" p-4 md:p-8 min-h-min w-full md:w-5/6 bg-white rounded-lg shadow-lg right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-screen overflow-y-auto">
            <div>
                <h1 class="text-2xl font-semibold mb-4">Add Question</h1>
                <button class="absolute right-4 top-4 border bg-opacity-50 border-black rounded-full px-2 bg-white cursor-pointer"
                    @click="emit('closeModal', false)">X</button>
            </div>
            <div class="my-4">
                <label for="type">Type</label>
                <select class=" text-sm md:text-base font-medium rounded shadow p-[4px] w-full" v-model="question.type">
                    <option value="open_ended">Open Ended</option>
                    <option value="mcq">Multiple Choice</option>
                </select>
            </div>
            <div v-if='!question.image' class="my-4">
                <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                <input type="file" name="image" id="image" @change="changeFile($event)"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <span class="text-red-500 text-sm my-2"  v-if="errors.image">{{
                    errors.image[0] }}</span>
            </div>
            <div v-else class="my-4 relative">
                <div class="absolute right-4 top-4 border bg-opacity-50 border-black rounded-full px-2 bg-white cursor-pointer"
                    @click="removeImage()">X</div>
                <img :src="question.image" alt="">
            </div>

            <input type="text" class="text-xl font-semibold mb-4 w-full rounded shadow p-[4px]" placeholder="Question text"
                v-model="question.text" />
            <span class="text-red-500 text-sm my-2"  v-if="errors['question.text']">{{
                errors['question.text'][0] }}</span>
            <textarea v-if="question.type == 'open_ended'" rows="4" v-model="question.answer"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your answer here..."></textarea>
            <span class="text-red-500 text-sm my-2"  v-if="errors['question.answer']">{{errors['question.answer'][0] }}</span>
            <div v-if="question.type == 'mcq'">
                <div v-for="(option, index) in question.options" :key="option.id">
                    <input type="radio" name="mcq" :checked="option.is_correct" v-model="option.is_correct"
                        :value="!!option.id" @change="resetCorrectAnswer(option.id)">
                    <input type="text" class=" text-sm md:text-base font-medium ml-2 mb-4 rounded shadow p-[4px]"
                        placeholder="Option text" v-model="option.text" />
                    <!-- X button to remove option -->
                    <button @click="question.options.splice(question.options.indexOf(option), 1)"
                        class="ml-2 text-red-500 hover:text-red-700">X</button>
                        <span class="text-red-500 text-sm my-2  block" v-if="errors[`question.options.${index}.text`]">{{
                        errors[`question.options.${index}.text`][0] }}</span>
                </div>
                <Button @click="addOption()">Add option</Button>
                <span class="text-red-500 text-sm my-2  block" v-if="errors['question.options']"
                    v-for="error in errors['question.options']">{{error }}</span>
            </div>
            <div class="my-4">
                <label for="score">Score</label>
                <input type="number" class=" text-sm md:text-base font-medium rounded shadow p-[4px] w-full" placeholder="Score"
                    min="0" v-model="question.score" />
                <span class="text-red-500 text-sm my-2"  v-if="errors['question.score']">{{
                    errors['question.score'][0] }}</span>
            </div>
            <div>
                <Button button-type="secondary" @click="addQuestion()">Add Question</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'tailvue'

const props = defineProps(['examId']);
const emit = defineEmits(['closeModal'])
const question = reactive({
    score: '',
    type: 'mcq',
    answer: '',
    image: '',
    score: 1,
    options: [{
        id: 1,
        text: '',
        is_correct: 0
    }]
});

const form = ref({})

const image = ref(null);

const errors = ref({})

function changeFile(e) {
    image.value = e.target.files[0];
    question.image = URL.createObjectURL(image.value);
}

function removeImage() {
    image.value = null;
    question.image = '';
}

watch(() => question.type, () => {
    errors.value = {}
})

function addOption() {
    let id = question.options[question.options.length - 1].id + 1;
    question.options.push({
        id: id,
        text: '',
        is_correct: 0
    })
}

function resetCorrectAnswer(id) {
    question.options.forEach(option => {
        if (option.id == id) {
            option.is_correct = 1;
        } else {
            option.is_correct = 0;
        }
    });
}

function addQuestion() {
    form.value = {
        text: question.text,
        type: question.type,
        score: question.score,
        image: null,
    }
    if (question.type == 'mcq') {
        form.value.options = question.options
    } else {
        form.value.answer = question.answer
    }

    let formData = new FormData();

    formData.append('question', JSON.stringify(form.value));
    if (image.value) {
        formData.append('image', image.value);
    }

    useApiFetch(`/api/v1/teacher/exams/${props.examId}/questions`, {
        method: 'POST',
        body: formData
    }).then((res) => {
        emit('closeModal', true)
        useToast().show({
            message: 'Question added successfully',
        })
    }).catch((e) => {
        
        errors.value = e.data.errors
    })
}

</script>