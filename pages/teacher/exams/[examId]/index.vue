<template>
    <div class="container mx-auto" v-if="!loading">
        <ExamHeader :duration="exam.duration" :title="exam.title" :description="exam.description" :start_time="exam.start_time" />
        <hr class=" h-[2px] w-full bg-black absolute left-0">
        <div class="mt-14">
            <div class="flex justify-between">
                <h1 class="text-4xl font-bold">Questions</h1>
                <Button :to="`/teacher/exams/${examId}/edit`" class="!text-lg !px-16">Edit</Button>
            </div>
            <div v-for="question in questions" :key="question.id" class="border shadow p-4 rounded-lg my-6">
                <img v-if="question.image" :src="question.image" alt="question image" class=" w-1/2 my-4">
                <h2 class="text-xl font-semibold mb-4">{{ question.text }}</h2>
                <div v-if="question.type == 'mcq'" class=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-for="option in question.options" :key="option.id" class="flex justify-start items-center gap-2">
                        <input :id="option.id" type="radio" :name="question.id" :value="option.id"
                            :checked="question.answer == option.id" disabled>
                        <label :for="option.id" class="text-lg">{{ option.text }}</label>
                    </div>
                </div>
                <div v-else>
                    <textarea rows="4" disabled
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your answer here...">{{ question.answer }}</textarea>
                </div>
            </div>
        </div>
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
    title: 'Exam'
})

const route = useRoute();

const examId = ref(route.params.examId);
const loading = ref(true);
const exam = ref(null);
const questions = ref([]);

useApiFetch("/api/v1/teacher/exams/" + examId.value).then((res) => {
    exam.value = res;
}).catch((e) => {
    console.log(e.data);
    showError({ statusCode: e.statusCode, message: e.data.message })
}).finally(() => {
    loading.value = false;
});

useApiFetch("/api/v1/teacher/exams/" + examId.value + "/questions").then((res) => {
    questions.value = res;
}).catch((e) => {
    console.log(e.data);
    showError({ statusCode: e.statusCode, message: e.data.message })
}).finally(() => {
    loading.value = false;
});

</script>