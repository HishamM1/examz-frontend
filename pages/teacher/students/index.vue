<template>
    <div class="sm:rounded-lg container mx-auto my-6" v-if="!loading">
        <div class="pb-4 bg-white dark:bg-gray-900">
            <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="table-search" v-model="filters.search"
                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for students" @input="filters.page = 1">
            </div>
            <div class=" mt-4">
                Students can join you using this code: <span class="font-semibold">{{ join_code }}</span>
            </div>
        </div>
        <div class="overflow-auto">
            <table class="w-full text-xs lg:text-base text-left text-gray-500 dark:text-gray-400">
                <thead class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            student name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            phone number
                        </th>
                        <th scope="col" class="px-6 py-3">
                            email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            school
                        </th>
                        <th scope="col" class="px-6 py-3">
                            about
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="student in students">
                        <td class=" text-gray-900 whitespace-nowrap px-6 py-2 space-x-2">
                            <img class="w-8 h-8 rounded-full inline-block" :src="student.image" alt="student profile">
                            <span class="capitalize font-medium inline-block">{{ student.name }}</span>
                        </td>
                        <td class="px-6 py-2">
                            {{ student.phone }}
                        </td>
                        <td class="px-6 py-2">
                            {{ student.email }}
                        </td>
                        <td class="px-6 py-2">
                            {{ student.school }}
                        </td>
                        <td class="px-6 py-2">
                            {{ student.about }}
                        </td>
                        <td class="px-6 py-2">
                            <NuxtLink :to="`/teacher/students/${student.id}/results`"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Results
                            </NuxtLink>
                            <button @click="deleteStudent(student.id)"
                                class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="container mx-auto" v-else>
        <LoadingState />
    </div>
    <Pagination :links="links" @page-change="handlePageChange" />
</template>

<script setup>
import { useToast } from 'tailvue'

definePageMeta({
    middleware: ['auth', 'teacher']
})

useHead({
    title: 'Students'
})

const loading = ref(true)
const students = ref(null)
const links = ref({});
const debounceTimeout = ref(null);
const join_code = useAuthStore().user.join_code

const router = useRouter()
const route = useRoute()

const filters = reactive({
    search: '',
    page: 1,
})


watch(filters, async () => {
    router.push({ path: route.path, query: { ...filters } })

    if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
    debounceTimeout.value = setTimeout(() => {
        getStudents();
    }, 500);
})


onBeforeMount(() => {
    getStudents()
})

function handlePageChange(index, link) {
    if (index == 0) {
        filters.page -= 1;
    }
    else if (index == links.value.length - 1) {
        filters.page += 1;
    } else {
        filters.page = +link.label
    }
}

async function getStudents() {
    await useApiFetch('/api/v1/teacher/students', {
        params: {
            search: filters.search,
            page: filters.page
        }
    }).then((res) => {
        students.value = res.data
        links.value = res.meta.links;
    }).catch((e) => {
        ;
        return showError({ statusCode: e.statusCode, message: e.data.message })
    }).finally(() => {
        loading.value = false
    })
}

const deleteStudent = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
        await useApiFetch(`/api/v1/teacher/students/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            students.value = students.value.filter((student) => student.id !== id)
            useToast().show({ message: res.message })
        }).catch((e) => {
            ;
            return showError({ statusCode: e.statusCode, message: e.data.message })
        })
    }
}
</script>