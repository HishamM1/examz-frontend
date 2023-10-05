<template>
    <div class="container mx-auto" v-if="!loading">
            <!-- show student score / total score -->
            <div class="flex justify-between items-center">
                <h1 class="text-4xl font-bold">Questions</h1>
                <p class="text-xl font-semibold">Total Score: {{ student_score }} / {{ total_score }}</p>
            </div>
            <Question v-for="(question, index) in questions" :key="question.id" :question="question" :index="index" :edit-form="editForm" :student-id="+studentId" :exam-id="+examId" @get-questions="getQuestions"  />
    </div>
    <div v-else>
        <LoadingState />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth', 'verified', 'teacher']
})

useHead({
    title: 'Exam Result'
})

const route = useRoute()

const examId = ref(route.params.examId)
const studentId = ref(route.params.studentId)
const questions = ref([])
const student_score = ref(0)
const total_score = ref(0)
const loading = ref(true)

const editForm = ref([])


function getQuestions() {
    useApiFetch(`/api/v1/teacher/exams/${examId.value}/students/${studentId.value}`).then((res) => {
        questions.value = res.data
        student_score.value = res.student_score
        total_score.value = res.total_score
        editForm.value = Array(questions.value.length).fill(false)
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        loading.value = false
    })
}

onMounted(() => {
    getQuestions()
})
</script>