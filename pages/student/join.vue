<template>
    <div class="container mx-auto">
        <div class="w-full flex justify-center items-center flex-col pt-12 gap-2">
            <h1 class=" text-3xl sm:text-5xl md:text-6xl font-semibold  tracking-tighter">Join Your Teacher Here!</h1>
            <p class=" text-sm md:text-md">-You must have your teacher join code-</p>
        </div>
        <form @submit.prevent="handleJoin" class="mt-20 flex justify-center items-center gap-4 w-full flex-col sm:flex-row">
            <label for="code"
                class=" md:w-6/12 p-2 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input type="text" id="code"
                    class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    placeholder="Teacher's code" v-model="code" />
                <span
                    class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Teacher's code
                </span>
            </label>
            <Button :disabled="loading" type="submit" class="!px-5 !py-2.5 mt-2">Join</Button>
        </form>
        <div v-if="error" class="flex items-center justify-center mt-5 text-red-500">
            {{ error }}
        </div>
    </div>
</template>

<script setup>
import { useToast } from "tailvue"

definePageMeta({
    middleware: ['auth', 'verified', 'student']
})

useHead({
    title: 'Join Teacher'
})

const code = ref("")
const error = ref("")
const loading = ref(false)
async function handleJoin() {
    loading.value = true
    await useApiFetch("/api/v1/student/teachers",{
        method: "POST",
        body: {
            code: code.value
        }
    }).then((res)=>{
        useToast().show(res.message)
        navigateTo('/student/teachers')
    }).catch((e)=>{
        error.value = e.data.message
    }).finally(()=>{
        loading.value = false
    })
    
}
</script>
