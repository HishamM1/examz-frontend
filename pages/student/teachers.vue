<template>
    <div class="container mx-auto" v-if="!loading">
        <div v-if="teachers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-6 items-center">
            <UserCard v-for="teacher in teachers" :key="teacher.id" :user="teacher" @delete="deleteTeacher" />
        </div>
        <div v-else class="container mx-auto flex justify-center items-center h-[calc(100vh-100px)] text-2xl sm:text-4xl md:text-6xl font-bold">
            Go to <NuxtLink to="/student/join" class="text-indigo-600 hover:text-indigo-500 underline mx-2">Join Teacher</NuxtLink> to join a teacher!
        </div>

    </div>
    <div class="container mx-auto" v-else>
        <LoadingState />
    </div>
</template>

<script setup>
import { useToast } from 'tailvue'

definePageMeta({
    middleware: ['auth', 'verified', 'student']
})
const loading = ref(true)
const teachers = ref(null)

onBeforeMount(async () => {
    await useApiFetch('/api/v1/student/teachers').then((res) => {
        teachers.value = res
        console.log(res);
    }).catch((e) => {
        console.log(e.data);
        return showError({ statusCode: e.statusCode, message: e.data.message })
    }).finally(() => {
        loading.value = false
    })
})

const deleteTeacher = async (id) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
        await useApiFetch(`/api/v1/student/teachers/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            teachers.value = teachers.value.filter((teacher) => teacher.id !== id)
            useToast().show({ message: res.message })
        }).catch((e) => {
            console.log(e.data);
            return showError({ statusCode: e.statusCode, message: e.data.message })
        })
    }
}

</script>
