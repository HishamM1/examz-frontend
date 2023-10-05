<template>
    <div class="container mx-auto relative">
        <div class="md:fixed inline w-[35%]">
            <section class="bg-white">
                <div class="px-4 mx-auto">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new exam</h2>
                    <form @submit.prevent="createExam" novalidate>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Exam
                                    Title</label>
                                <input type="text" name="name" id="name" v-model="exam.title"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type exam title">
                                <span class="text-red-500 text-sm" v-if="errors['exam.title']">{{ errors['exam.title'][0]
                                }}</span>
                            </div>
                            <div class="w-full">
                                <label for="brand"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                                <input type="datetime-local" name="brand" id="brand" :min="now" v-model="exam.start_time"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Start Time">
                                <span class="text-red-500 text-sm" v-if="errors['exam.start_time']">{{
                                    errors['exam.start_time'][0] }}</span>
                            </div>
                            <div class="w-full">
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                                    Time</label>
                                <input type="datetime-local" name="price" id="price"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="End Time" :min="exam.start_time" v-model="exam.end_time">
                                <span class="text-red-500 text-sm" v-if="errors['exam.end_time']">{{
                                    errors['exam.end_time'][0] }}</span>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="duration"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                                <input type="number" name="duration" id="duration" min="0" v-model="exam.duration"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Duration in minutes">
                                <span class="text-red-500 text-sm" v-if="errors['exam.duration']">{{
                                    errors['exam.duration'][0] }}</span>
                            </div>
                            <div>
                                <label for="category"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Visible</label>
                                <select id="category" v-model.number="exam.visible"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="1" selected>Yes</option>
                                    <option value="0">No</option>
                                </select>
                                <span class="text-red-500 text-sm" v-if="errors['exam.visible']">{{
                                    errors['exam.visible'][0] }}</span>
                            </div>
                            <div>
                                <label for="category"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Show Reults</label>
                                <select id="category" v-model.number="exam.show_result"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="1" selected>Yes</option>
                                    <option value="0">No</option>
                                </select>
                                <span class="text-red-500 text-sm" v-if="errors['exam.show_result']">{{
                                    errors['exam.show_result'][0] }}</span>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="description"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Exam
                                    Description</label>
                                <textarea id="description" rows="5" v-model="exam.description"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"></textarea>
                            </div>
                        </div>
                        <button type="submit"
                            class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Create Exam
                        </button>
                    </form>
                </div>
            </section>
        </div>
        <div class=" inline-block absolute right-0 w-full md:w-[55%] mt-6 md:mt-0">
            <div class="px-4 mx-auto pb-4">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Questions</h2>
                <div>
                    <div class="my-4" v-for="(question, index) in questions" :key="question.id">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold">{{ index + 1 }}.</h3>
                            <Button @button-click="deleteQuestion(question.id)" buttonType="danger">Delete Question</Button>
                        </div>
                        <div v-if='!question.image' class="my-4">
                            <label for="image"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                            <input type="file" name="image" id="image" @change="changeFile($event, question.id)"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <span class="text-red-500 text-sm" v-if="errors[`questions.${index + 1}.image`]">{{
                                errors[`questions.${index + 1}.image`][0] }}</span>
                        </div>
                        <div v-else class="my-4 relative">
                            <div class="absolute right-4 top-4 border bg-opacity-50 border-black rounded-full px-2 bg-white cursor-pointer"
                                @click="removeImage(question.id)">X</div>
                            <img :src="question.image_path" alt="">
                        </div>
                        <input type="text" class="text-xl font-semibold mb-4 w-full rounded shadow p-[4px]"
                            placeholder="Question text" v-model="question.text" />
                        <span class="text-red-500 text-sm" v-if="errors[`questions.${index + 1}.text`]">{{
                            errors[`questions.${index + 1}.text`][0] }}</span>
                        <textarea v-if="question.type == 'open_ended'" rows="4" v-model="question.answer"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your answer here..."></textarea>
                        <span class="text-red-500 text-sm" v-if="errors[`questions.${index + 1}.answer`]">{{
                            errors[`questions.${index + 1}.answer`][0] }}</span>

                        <div v-if="question.type == 'mcq'">
                            <div v-for="option in question.options" :key="option.id">
                                <input type="radio" :name="question.id" :id="option.id" :value="!!option.id"
                                    v-model="option.is_correct">
                                <input type="text" class="text-md font-medium ml-2 mb-4 rounded shadow p-[4px]"
                                    placeholder="Option text" v-model="option.text" />
                                <button @click="question.options.splice(question.options.indexOf(option), 1)"
                                    class="ml-2 text-red-500 hover:text-red-700">X</button>

                                <span class="text-red-500 text-sm"
                                    v-if="errors[`questions.${index + 1}.options.${option.id - 1}.text`]">{{
                                        errors[`questions.${index + 1}.options.${option.id - 1}.text`][0] }}</span>
                            </div>
                            <Button @button-click="addOption(question)">Add option</Button>
                        </div>
                        <span class="text-red-500 text-sm block" v-if="errors[`questions.${index + 1}.options`]"
                            v-for="error in errors[`questions.${index + 1}.options`]">{{ error }}</span>
                        <div class="flex space-x-3 mt-4">
                            <h3>Score: </h3>
                            <input type="number" v-model="question.score" min="1"
                                class="border border-black rounded-lg w-12 shadow text-center">
                            <span class="text-red-500 text-sm" v-if="errors[`questions.${index + 1}.score`]">{{
                                errors[`questions.${index + 1}.score`][0] }}</span>
                        </div>
                    </div>
                </div>
                <Button @button-click="addMcq" class="mr-4">Add MCQ question</Button>
                <Button @button-click="addOpenEnded">Add Open ended question</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'tailvue'

definePageMeta({
    middleware: ['auth', 'verified', 'teacher']
})

useHead({
    title: 'Create Exam'
})

const now = new Date().toISOString().slice(0, 19)

const exam = ref({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    duration: '',
    visible: 1,
    show_result: 1,
})

const questions = ref([
    {
        id: 1,
        type: 'open_ended',
        text: '',
        answer: '',
        score: 1,
        image: '',
        image_path: null
    }
])

const errors = ref({})

function changeFile(e, id) {
    questions.value.forEach(question => {
        if (question.id == id) {
            question.image = e.target.files[0];
            question.image_path = URL.createObjectURL(question.image);
        }
    })
}

function removeImage(id) {
    questions.value.forEach(question => {
        if (question.id == id) {
            question.image_file = null;
            question.image = '';
        }
    })
}

function addMcq() {
    questions.value.push({
        id: questions.value.length + 1,
        type: 'mcq',
        text: '',
        options: [
            {
                id: 1,
                text: '',
                is_correct: false
            },
        ],
        score: 1
    })
}

function addOpenEnded() {
    questions.value.push({
        id: questions.value.length + 1,
        type: 'open_ended',
        text: '',
        answer: '',
        score: 1
    })
}

function addOption(question) {
    if(question.options.length == 0) {
        question.options.push({
            id: 1,
            text: '',
            is_correct: false
        })
    } else {
        question.options.push({
        id: question.options[question.options.length - 1].id + 1,
        text: '',
        is_correct: false
    })
    }
}

function formateDate() {
    exam.value.start_time = exam.value.start_time.replace('T', ' ')
    exam.value.end_time = exam.value.end_time.replace('T', ' ')
}


function deleteQuestion(id) {
    questions.value = questions.value.filter(question => question.id != id)
    // reassign ids
    questions.value.forEach((question, index) => {
        question.id = index + 1
    })
}


function createExam() {
    formateDate()


    let formData = new FormData()

    questions.value.forEach(question => {
        if (question.image) {
            formData.append(`images[${question.id}]`, question.image)
        }
        formData.append(`questions[${question.id}]`, JSON.stringify(question))
    })

    formData.append('exam', JSON.stringify(exam.value))

    useApiFetch("/api/v1/teacher/exams", {
        method: "POST",
        body: formData
    }).then(res => {
        useToast().show({
            message: res.message
        })
        navigateTo(`/teacher/exams`)
    }).catch((e) => {
        console.log(e);
        console.log(e.data);
        errors.value = e.data.errors
    })
}


</script>