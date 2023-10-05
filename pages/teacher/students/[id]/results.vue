<template>
    <div class="w-full" v-if="!loading">
        <div class="my-8 px-10 flex flex-col sm:flex-row gap-20 justify-center items-center">
            <img :src="student.image" class="rounded-full w-52 h-52" alt="">
            <div class="flex flex-col gap-5 justify-center">
                <div class="text-5xl font-bold capitalize">{{ student.name }}</div>
                <div class="text-2xl">Email: <span class="font-medium">{{ student.email }}</span> </div>
                <div class="text-2xl">Number: <span class="font-medium">{{ '+' + student.phone_number }}</span> </div>
                <div class="text-2xl capitalize">School: <span class=" font-medium">{{ student.school }}</span></div>
                <Button @click="getReport" :disabled="button_loading || student.exams.length == 0">Create Report</Button>
                <a href="" id="download_pdf"></a>
            </div>
        </div>
        <hr class="my-4">
        <div class="container mx-auto min-w-[320px] md:w-full overflow-auto ">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-4 py-2">
                            title
                        </th>
                        <th scope="col" class="px-4 py-2">
                            subject
                        </th>
                        <th scope="col" class="px-4 py-2">
                            duration
                        </th>
                        <th scope="col" class="px-4 py-2">
                            taken at
                        </th>
                        <th scope="col" class="py-2">
                            # of questions (mcq) <br> (open ended)
                        </th>
                        <th scope="col" class="px-4 py-2">
                            # of answered questions
                        </th>
                        <th scope="col" class="px-4 py-2">
                            # of wrong mcq answers
                        </th>
                        <th scope="col" class="px-4 py-2">
                            # of wrong written answers
                        </th>
                        <th scope="col" class="px-4 py-2">
                            score
                        </th>
                        <th scope="col" class="px-4 py-2">
                            score percentage
                        </th>
                        <th scope="col" class="px-4 py-2">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="exam in student.exams">
                        <th scope="row" class="px-4 py-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <NuxtLink :to="`/teacher/exams/${exam.id}`">
                                {{ exam.title }}
                            </NuxtLink>
                        </th>
                        <td class="px-4 py-2">
                            {{ exam.subject }}
                        </td>
                        <td class="px-4 py-2">
                            {{ exam.duration + "m" }}
                        </td>
                        <td class="px-4 py-2">
                            {{ new Date(exam.taken_at).toLocaleString(['en-UK'],
                                {
                                    month: 'numeric',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                }) }}
                        </td>
                        <td class="py-2">
                            {{ exam.questions_count + ' - ' + `(${exam.mcq_questions_count})` +
                                `(${exam.open_ended_questions_count})` }}
                        </td>
                        <td class="px-4 py-2">
                            {{ exam.answered_questions_count }}
                        </td>
                        <td class="px-4 py-2">
                            {{ exam.wrong_mcq_count }}
                        </td>
                        <td class="px-4 py-2">
                            {{ exam.wrong_open_ended_count }}
                        </td>
                        <td class="px-4 py-2">
                            {{ exam.student_score + " / " + exam.total_score }}
                        </td>
                        <td class="px-4 py-2">
                            {{ exam.score_percentage + "%" }}
                        </td>
                        <td class="flex items-center px-4 py-2 space-x-3">
                            <NuxtLink :to="`/teacher/exams/${exam.id}/students/${student.id}`"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-if="loading">
        <LoadingState />
    </div>
</template>

<script setup>
import { useToast } from 'tailvue'
definePageMeta({
    middleware: ['auth', 'verified', 'teacher']
})

useHead({
    title: 'Student Results'
})

const loading = ref(true)
const button_loading = ref(false)
const student = ref({})
const route = useRoute()

const id = route.params.id

onBeforeMount(() => {
    loading.value = true
    useApiFetch(`/api/v1/teacher/students/${id}/results`).then((res) => {
        student.value = res
    }).catch((e) => console.log(e.data)).finally(() => loading.value = false)
})

async function getReport() {
    button_loading.value = true
    useApiFetch(`/api/v1/teacher/students/${id}/report`).then((res) => {
        console.log(res)
        downloadFile(res, `${id}_report`)

        useToast().show({
            title: 'Success',
            message: 'Report created successfully',
            type: 'success'
        })
    }).catch((e) => {
        useToast().show({
            title: 'Error',
            message: e.data.message,
            type: 'error'
        })
    }).finally(() => button_loading.value = false)
}

function downloadFile(data, filename = 'report') {
    const blob = new Blob([data], { type: 'application/pdf' })
    const link = document.getElementById('download_pdf')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${filename}.pdf`
    link.click()
    setTimeout(() => {
        window.URL.revokeObjectURL(link.href)
    }, 1000)
}

</script>