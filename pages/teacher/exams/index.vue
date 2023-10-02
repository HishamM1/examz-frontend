<template>
    <main class="container mx-auto px-2">
        <div class="flex items-center flex-col gap-4 sm:flex-row sm:gap-0 justify-between my-6 dark:bg-gray-800">
            <div>
                <select v-model="filters.active" @change="filters.page = 1"
                    class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>

                    <option value="" selected>All</option>
                    <option value="active">Active</option>
                    <option value="ended">Ended</option>
                </select>
            </div>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" v-model="filters.search" v-on:input="filters.search = $event.target.value"
                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for exams" @input="filters.page = 1" />
            </div>
        </div>

        <!-- Exam Cards -->
        <div v-if="!loading">
            <div v-if="exams" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <ExamCard v-for="exam in exams" :exam="exam" :key="exam.id" role="teacher" @deleteExam="handleDelete" />
            </div>
            <div v-else>no exams</div>
        </div>
        <div class="container mx-auto" v-else>
            <LoadingState />
        </div>
        <Pagination :links="links" @page-change="handlePageChange" />
    </main>
</template>
<script setup>
import { useToast } from 'tailvue'
definePageMeta({
    middleware: ['auth', 'verified', 'teacher']
});
const loading = ref(true);
const exams = ref({});
const links = ref({});
const debounceTimeout = ref(null);

const filters = reactive({
    search: '',
    active: "",
    page: 1,
})

const router = useRouter();
const route = useRoute();

onMounted(() => {
    getExams();
})


const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this exam?')) {
        useApiFetch(`/api/v1/teacher/exams/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            exams.value = exams.value.filter((exam) => exam.id != id);
            useToast().show({ message: 'Exam deleted successfully', type: 'success' })
        }).catch((e) => {
            console.log(e.data);
            showError({ statusCode: e.statusCode, message: e.data.message })
        })
    }
}

watch(filters, async () => {
    router.push({ path: route.path, query: { ...filters } })

    if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
    debounceTimeout.value = setTimeout(() => {
        getExams();
    }, 500);
})

const getExams = async () => {
    await useApiFetch(`/api/v1/teacher/exams`, {
        params: {
            page: filters.page,
            active: filters.active,
            search: filters.search,
        }
    })
        .then((res) => {
            exams.value = res.data;
            links.value = res.meta.links;
        })
        .catch((e) => {
            console.log(e)
            showError({ statusCode: e.statusCode, message: e.data.message })
        }
        )
        .finally(() => (loading.value = false));
}

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

</script>
