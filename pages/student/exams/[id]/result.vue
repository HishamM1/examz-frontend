<template>
    <div class="container mx-auto" v-if="!loading">
        <!-- show student score / total score -->
        <div class="flex justify-between items-center">
            <h1 class="text-4xl font-bold">Questions</h1>
            <p class="text-xl font-semibold">Total Score: {{ student_score }} / {{ total_score }}</p>
        </div>
        <Question v-for="(question, index) in questions" :key="question.id" :question="question" :index="index" />
    </div>

    <div v-else>
        <LoadingState />
    </div>
</template>

<script setup>
const route = useRoute()
const examsId = ref(route.params.id)
const loading = ref(false)
const questions = ref([])
const student_score = ref(0)
const total_score = ref(0)
const user = useAuthStore().user
console.log(user);

onBeforeMount(() => {
    loading.value = true
    useApiFetch(`/api/v1/student/exams/${examsId.value}/students/${user.student_id}`).then((res) => {
        questions.value = res.data
        student_score.value = res.student_score
        total_score.value = res.total_score
    }).catch((e) => {
        if (e.statusCode == 403) {
            navigateTo('/student/exams')
        }
    }).finally(() => {
        loading.value = false
    })
})
</script>
