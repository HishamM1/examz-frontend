<template>
    <div class="container mx-auto" v-if="!loading">
        <ExamHeader :duration="exam.duration" :title="exam.title" :description="exam.description" :start_time="exam.start_time" :timer="timer" />

        <hr class=" h-[2px] w-full bg-black absolute left-0">
        <div class="py-6">
            <h1 class="text-4xl font-bold">Questions</h1>
            <div v-for="(question, index) in exam.questions" :key="question.id" class="border shadow p-4 rounded-lg my-6">
                <h2 class="text-xl font-semibold mb-4">{{ question.text }}</h2>
                <img v-if="question.image" :src="question.image" class="my-4 w-1/2" alt="question image">
                <div v-if="question.type == 'mcq'" class=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-for="option in question.options" :key="option.id" class="flex justify-start items-center gap-2">
                        <input :id="option.id" type="radio" :name="question.id" :value="option.id"
                            v-model="answers[index].answer">
                        <label :for="option.id" class="text-lg">{{ option.text }}</label>
                    </div>
                </div>
                <div v-else>
                    <textarea rows="4" v-model="answers[index].answer"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your answer here..."></textarea>
                </div>
            </div>
            <Button @button-click="submitAnswers" class="!px-10 sm:!px-20 !py-3 sm:!text-lg">Submit</Button>
        </div>
    </div>
    <div v-else>
        <LoadingState />
    </div>
</template>

<script setup>
import { useToast } from "tailvue"
definePageMeta({
    middleware: ['auth', 'student']
})

useHead({
    title: 'Exam'
})

const auth = useAuthStore()
const route = useRoute()
const exam = ref({});
const timer = ref('00:00:00')
const loading = ref(false);

const answers = computed(() => {
    return exam.value.questions.map((question) => {
        return {
            question_id: question.id,
            answer: "",
        }
    })
})



onMounted(async () => {
    loading.value = true;
    await useApiFetch("/api/v1/student/exams/" + route.params.id, {
        method: 'PUT',
    }).then((res) => {
        exam.value = res.data
        auth.exam_in_progress = route.params.id;
        setDuration(res.time_left)
    }).catch((e) => {
        if (e.data.status == "answered") {
            auth.exam_in_progress = false;
        }

        useToast().show({
            title: 'Error',
            message: e.data.message,
            type: 'danger',
            timeout: 6,
        })
        navigateTo('/student/exams')
        ;

    }).finally(() => loading.value = false);
})

function setDuration(duration) {
    let timerInterval = setInterval(() => {
        duration--;
        timer.value = new Date(duration * 1000).toISOString().slice(11, 19)
        if (duration <= 0) {
            clearInterval(timerInterval)
            auth.exam_in_progress = false;
            useToast().show({
                title: 'Time Up',
                message: 'Your time is up, your answers will be submitted automatically',
                type: 'danger',
                timeout: 6,
            })
            navigateTo('/student/exams')
            submit()
        }
    }, 1000)
}

function submitAnswers() {
    if (answers.value.some((answer) => answer.answer == "")) {
        confirm("You have not answered all the questions, do you want to submit anyway?") ? submit() : null;
    } else {
        submit()
    }
}

async function submit() {
    loading.value = true;
    await useApiFetch(`/api/v1/student/exams/${exam.value.id}`, {
        method: 'POST',
        body: {
            answers: JSON.stringify(answers.value)
        }
    }).then((res) => {
        useToast().show({
            title: 'Success',
            message: res.message,
            type: 'success',
            timeout: 6,
        })

        auth.exam_in_progress = false;
        navigateTo('/student/exams')
    }).catch((e) => {
        useToast().show({
            title: 'Error',
            message: e.data.message,
            type: 'danger',
            timeout: 6,
        })
    }).finally(() => {
        loading.value = false;
    })
}




</script>
