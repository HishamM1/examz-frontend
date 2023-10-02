<template>
  <main class="container mx-auto"  v-if="exams.length > 0">
    <div class="flex items-center flex-col gap-4 sm:flex-row sm:gap-0 justify-between my-6 dark:bg-gray-800">
      <div class="flex flex-col gap-2 sm:flex-row">
        <select v-model="filters.active" @change="filters.page = 1"
          class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 4 4 4-4" />
          </svg>
          <option value="" selected>All</option>
          <option value="active" >Active</option>
          <option value="ended">Ended</option>
        </select>

        <select v-model="filters.sortBy" @change="filters.page = 1"
        class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 4 4 4-4" />
          </svg>

          <option value="" selected>Sort by</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="shortest">Shortest</option>
          <option value="longest">Longest</option>
        </select>

        <select v-model="filters.status" @change="filters.page = 1"
        class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 4 4 4-4" />
          </svg>

          <option value="" selected>Status</option>
          <option value="taken">Taken</option>
          <option value="not_taken">Not Taken</option>
          <option value="in_progress">In Progress</option>
        </select>
      </div>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="text" v-model="filters.search" v-on:input="filters.search = $event.target.value"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for exams" @input="filters.page = 1"/>
      </div>
    </div>

    <!-- Exam Cards -->
    <div v-if="!loading">
      <div v-if="exams" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <ExamCard v-for="exam in exams" :exam="exam" :key="exam.id" :role="'student'" />
      </div>
      <div v-else>no exams</div>
    </div>
    <div class="container mx-auto" v-else>
      <LoadingState />
    </div>
    <Pagination :links="links" @page-change="handlePageChange" />
  </main>
  <div class="container mx-auto" v-else-if="loading">
    <LoadingState />
  </div>
  <div v-else-if="!loading && exams.length == 0"
            class="container mx-auto flex justify-center items-center h-[calc(100vh-100px)] text-2xl sm:text-4xl md:text-6xl font-bold">
            No Exams Yet, Try Joining a Teacher!</div>

</template>
<script setup>
definePageMeta({
  middleware: ['auth', 'verified', 'student']
});
const loading = ref(true);
const exams = ref({});
const links = ref({});
const debounceTimeout = ref(null);

const filters = reactive({
  search: '',
  active: 'active',
  page: 1,
  sortBy: 'newest',
  status: '',
})

const router = useRouter();
const route = useRoute();


onMounted(() => {
  getExams();
})


watch(filters, async () => {
  const used_filters = Object.fromEntries(Object.entries(filters).filter(([key, value]) => value != ''))
  router.push({ path: route.path, query: { ...used_filters } })

  if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => {
    getExams();
  }, 500);
})

const getExams = async () => {
  await useApiFetch(`/api/v1/student/exams`, {
    params: {
      page: filters.page,
      active: filters.active,
      search: filters.search,
      sortBy: filters.sortBy,
      status: filters.status
    }
  })
    .then((res) => {
      exams.value = res.data;
      links.value = res.meta.links;
    })
    .catch((e) =>
      showError({ statusCode: e.statusCode, message: e.data.message })
    )
    .finally(() => (loading.value = false));
}

function handlePageChange(index, link) {
    if(index == 0){
      filters.page -= 1;
    }
    else if(index == links.value.length - 1){
      filters.page += 1;
    } else {
      filters.page = +link.label
    }
}

</script>
