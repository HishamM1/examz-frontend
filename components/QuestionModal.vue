<template>
    <div class="fixed top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 bg-black" @click.self="$emit('closeModal', false)">
        <div
            class="p-4 md:p-8 w-full md:w-5/6 max-h-screen overflow-auto bg-white rounded-lg shadow-lg right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div>
                <h1 class="text-2xl font-semibold mb-4">Edit Question</h1>
                <button class="absolute right-4 top-4 border bg-opacity-50 border-black rounded-full px-2 bg-white cursor-pointer"
                    @click="emit('closeModal', false)">X</button>
            </div>
            <div v-if="questionCopy.image" class=" w-1/2 my-4 relative">
                <img  :src="questionCopy.image" alt="question image">
                <div class="absolute right-4 top-4 border bg-opacity-50 border-black rounded-full px-2 bg-white cursor-pointer" @click="removeImage">X</div>

            </div>
            <input type="file" name="image" id="image" @change="changeFile($event)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg my-4 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <input type="text" class="text-xl font-semibold mb-4 w-full rounded shadow p-[4px]" placeholder="Question text"
                v-model="questionCopy.text" />
            <textarea v-if="questionCopy.type == 'open_ended'" rows="4" v-model="questionCopy.answer"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your answer here..."></textarea>

            <div v-if="questionCopy.type == 'mcq'">
                <div v-for="option in questionCopy.options" :key="option.id">
                    <input type="radio" name="mcq" :checked="option.is_correct" v-model="option.is_correct"
                        :value="!!option.id" @change="resetCorrectAnswer(option.id)">
                    <input type="text" class="text-sm md:text-base font-medium ml-2 mb-4 rounded shadow p-[4px]"
                        placeholder="Option text" v-model="option.text" />
                    <!-- X button to remove option -->
                    <button @click="questionCopy.options.splice(questionCopy.options.indexOf(option), 1)"
                        class="ml-2 text-red-500 hover:text-red-700">X</button>
                </div>
                <Button @click="addOption(questionCopy)">Add option</Button>
            </div>
            <div class="my-4">
                <label for="score">Score</label>
                <input type="number" class="text-sm md:text-base font-medium ml-2 rounded shadow p-[4px]" placeholder="Score" min="0"
                    v-model="questionCopy.score" />
            </div>
            <div v-if="errors" class="my-4">
                <div v-for="(error, key) in errors" :key="key" class="text-red-500 text-sm">{{ error[0] }}</div>
            </div>
            <div>
                <Button button-type="secondary" @click="updateQuestion">Update Question</Button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useToast } from 'tailvue'

const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    examId: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['closeModal'])
const file = ref(null);
const form = ref(null);
const formData = new FormData()
const errors = ref(null);


const questionCopy = ref(JSON.parse(JSON.stringify(props.question)));

function resetCorrectAnswer(id) {
    questionCopy.value.options.forEach(option => {
        if (option.id == id) {
            option.is_correct = 1;
        } else {
            option.is_correct = 0;
        }
    });
}

function addOption(question) {
    let id = question.options[question.options.length - 1].id + 1;
    question.options.push({
        id: id,
        text: '',
        is_correct: 0
    })
}

function removeImage() {
    questionCopy.value.image = null;
    file.value = null;
}

function changeFile(e) {
    file.value = e.target.files[0];
    questionCopy.value.image = URL.createObjectURL(file.value);
}


function updateQuestion() {

    if (questionCopy.value.type == 'mcq') {
        form.value = {
            image: questionCopy.value.image,
            text: questionCopy.value.text,
            type: questionCopy.value.type,
            options: questionCopy.value.options,
            score: questionCopy.value.score,
        }

    } else {
        form.value = {
            image: questionCopy.value.image,
            text: questionCopy.value.text,
            type: questionCopy.value.type,
            answer: questionCopy.value.answer,
            score: questionCopy.value.score,
        }
    }

    formData.append('question', JSON.stringify(form.value))

    if (file.value) {
        formData.append('image', file.value)
    }

    useApiFetch(`/api/v1/teacher/exams/${props.examId}/questions/${questionCopy.value.id}`, {
        method: 'POST',
        body: formData,
    }).then((res) => {
        emit('closeModal', true)
        useToast().show({
            message: 'Question updated successfully',
        })
    }).catch((e) => {        
        errors.value = e?.data?.errors;
        questionCopy.value = JSON.parse(JSON.stringify(props.question));
    })
}

</script>