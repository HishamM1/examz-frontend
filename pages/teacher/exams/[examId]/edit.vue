<template>
    <div class="container mx-auto relative">
        <div class="min-h-[calc(100vh-66px)] md:fixed inline w-[35%]">
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Exam Info</h2>
                    <div>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Exam
                                    Title</label>
                                <input type="text" name="name" id="name" v-model="exam.title"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type exam title">
                            </div>
                            <div class="w-full">
                                <label for="brand"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                                <input type="datetime-local" name="brand" id="brand" v-model="exam.start_time"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Start Time">
                            </div>
                            <div class="w-full">
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                                    Time</label>
                                <input type="datetime-local" name="price" id="price"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="End Time" :min="exam.start_time" v-model="exam.end_time">
                            </div>
                            <div class="sm:col-span-2">
                                <label for="duration"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                                <input type="number" name="duration" id="duration" min="0" v-model="exam.duration"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Duration in minutes">
                            </div>
                            <div>
                                <label for="category"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Visible</label>
                                <select id="category" v-model="exam.visible"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="1" selected>Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div>
                                <label for="category"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Show Reults</label>
                                <select id="category" v-model.number="exam.show_result"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="1" selected>Yes</option>
                                    <option value="0">No</option>
                                </select>
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
                        <Button button-type="primary" class="mt-6 py-3 px-8 text-lg" @click="updateExamInfo">
                            Edit Exam Info
                        </Button>
                    </div>
                </div>
            </section>
        </div>
        <div class="min-h-[calc(100vh-66px)] inline-block absolute right-0 w-full md:w-[55%]">
            <div class="py-8 px-4 mx-auto lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Questions</h2>
                <div>
                    <div class="my-4" v-for="(question, index) in questions" :key="question.id">
                        <div class="flex items-center justify-between">
                            <h3 class="font-semibold">{{ index + 1 }}.</h3>
                            <div class="flex justify-center items-center gap-2">
                                <Button buttonType="primary" @click="showQuestionModal(question)">Edit</Button>
                                <Button @button-click="deleteQuestion(question.id)" buttonType="danger">Delete</Button>
                            </div>
                        </div>
                        <img v-if="question.image" :src="question.image" alt="" class="my-4">
                        <input type="text" class="text-xl font-semibold mb-4 w-full rounded shadow p-[4px]" disabled
                            placeholder="Question text" v-model="question.text" />
                        <textarea v-if="question.type == 'open_ended'" rows="4" v-model="question.answer" disabled
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your answer here..."></textarea>

                        <div v-if="question.type == 'mcq'">
                            <div v-for="option in question.options" :key="option.id">
                                <input type="radio" :name="question.id" :checked="option.is_correct" disabled>
                                <input type="text" class="text-md font-medium ml-2 mb-4 rounded shadow p-[4px]"
                                    placeholder="Option text" v-model="option.text" disabled />
                            </div>
                        </div>
                    </div>
                    <Button @button-click="addQuestionModal = true">Add Question</Button>
                </div>
            </div>
        </div>
    </div>
    <QuestionModal v-if="questionModal" :question="question_modal" @closeModal="closeModal" :exam-id="+examId" />
    <AddQuestionModal v-if="addQuestionModal" @closeModal="closeModal" :exam-id="+examId" />
</template>

<script setup>
import { useToast } from 'tailvue'
definePageMeta({
    middleware: ['auth', 'verified', 'teacher']
})

useHead({
    title: 'Edit Exam'
})

const route = useRoute()

const examId = ref(route.params.examId)

const exam = ref({})

const questions = ref([])

const examCopy = ref({})

const questionModal = ref(false)

const question_modal = ref({})

const addQuestionModal = ref(false)


onBeforeMount(async () => {
    getExamInfo()
    getQuestions()
})

function closeModal(refresh) {
    questionModal.value = false
    addQuestionModal.value = false
    if (refresh) {
        getQuestions()
    }
}

async function getExamInfo() {
    await useApiFetch(`/api/v1/teacher/exams/${examId.value}`).then((res) => {
        exam.value = res
        examCopy.value = JSON.parse(JSON.stringify(res))
    }).catch((e) => console.log(e))
}

async function getQuestions() {
    await useApiFetch(`/api/v1/teacher/exams/${examId.value}/questions`).then((res) => {
        questions.value = res
    }).catch((e) => console.log(e))
}

function showQuestionModal(question) {
    questionModal.value = true
    question_modal.value = question
}

function deleteQuestion(id) {
    questions.value = questions.value.filter(question => question.id != id)
    // reassign ids
    questions.value.forEach((question, index) => {
        question.id = index + 1
    })

    if (confirm('Are you sure you want to delete this question?')) {
        useApiFetch(`/api/v1/teacher/exams/${examId.value}/questions/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            useToast().show({
                message: 'Question deleted successfully',
            })
        }).catch((e) => {
            console.log(e.data)
        })
    }
}

function updateExamInfo() {
    useApiFetch(`/api/v1/teacher/exams/${examId.value}`, {
        method: 'PUT',
        body: {
            title: exam.value.title,
            description: exam.value.description,
            start_time: exam.value.start_time,
            end_time: exam.value.end_time,
            duration: exam.value.duration,
            show_result: exam.value.show_result,
            visible: exam.value.visible,
        }
    }).then((res) => {
        exam.value = res.data
        examCopy.value = res.data
        useToast().show({
            message: res.message,
        })
    }).catch((e) => {
        exam.value = examCopy.value
        console.log(e)
        // reset exam info
    })
}
</script>