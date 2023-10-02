<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto my-6" v-if="!loading">
        <div class="pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="table-search"
                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for students">
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        profile
                    </th>
                    <th scope="col" class="px-6 py-3">
                        id
                    </th>
                    <th scope="col" class="px-6 py-3">
                        name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        phone number
                    </th>
                    <th scope="col" class="px-6 py-3">
                        school
                    </th>
                    <th scope="col" class="px-6 py-3">
                        total score
                    </th>
                    <th scope="col" class="px-6 py-3">
                        status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    v-for="student in students">
                    <td class="px-6 py-4">
                        <img class="w-8 h-8 rounded-full" :src="student.profile_picture" alt="">
                    </td>
                    <td class="px-6 py-4">
                        {{ student.id }}
                    </td>
                    <td class="px-6 py-4 capitalize">
                        {{ student.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ student.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ student.phone_number ?? 'N/A' }}
                    </td>
                    <td class="px-6 py-4 capitalize">
                        {{ student.school ?? 'N/A' }}
                    </td>
                    <td class="px-6 py-4">
                        {{ student.total_score ?? 0 }}
                    </td>
                    <td class="px-6 py-4 capitalize">
                        {{ student.status }}
                    </td>
                    <td  v-if="student.status == 'finished'">
                        <NuxtLink :to="`/teacher/exams/${examId}/students/${student.id}`"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Result
                        </NuxtLink>
                        <button @click="deleteStudent(student.id)"
                            class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="container mx-auto" v-else>
        <LoadingState />
    </div>
</template>

<script setup>
const route = useRoute()
const students = ref({});
const examId = ref(route.params.examId);
const loading = ref(true);


useApiFetch(`/api/v1/teacher/exams/${examId.value}/students`).then((res) => {
    students.value = res;
    loading.value = false;
}).catch((e) => {
    console.log(e.data);
})

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        useApiFetch(`/api/v1/teacher/exams/${examId.value}/students/${studentId}`, {
            method: 'DELETE'
        }).then((res) => {
            students.value = students.value.filter((student) => student.id != studentId);
        }).catch((e) => {
            console.log(e.data);
        })
    }
}
</script>