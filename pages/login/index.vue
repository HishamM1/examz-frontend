<template>
    <section class="relative flex flex-wrap h-screen lg:items-center bg-gradient-to-b from-white to-blue-700 lg:bg-none">
        <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
            <div class="mx-auto max-w-lg text-center">
                <h1 class="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
                <p class="mt-4 text-sm text-gray-500">
                    Please sign in to your account
                </p>
            </div>

            <form @submit.prevent="handleLogin" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label for="email" class="sr-only">Email</label>

                    <div class="relative">
                        <input type="email" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow"
                            placeholder="Enter email" v-model="form.email" autocomplete="current-password" />

                        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </span>

                        <h2 v-if="errors?.email" class="text-sm text-red-600 mt-1"> {{ errors.email[0] }}</h2>
                    </div>
                </div>

                <div>
                    <label for="password" class="sr-only">Password</label>

                    <div class="relative">
                        <input type="password" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow"
                            placeholder="Enter password" v-model="form.password" autocomplete="current-password" />

                        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </span>
                        <h2 v-if="errors?.password" class="text-sm text-red-600 mt-1"> {{ errors.password[0] }}</h2>

                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">
                        No account?
                        <NuxtLink to="register" class="underline">Sign up</NuxtLink>
                    </p>

                    <Button type="submit" :disabled="loading">
                        Sign in
                    </Button>
                </div>
                <div class="p-4 border border-black rounded-lg">
                    <h3 class="font-bold mb-2">Testing accounts</h3>
                    <div class="flex flex-col">
                        <div class="flex flex-row items-center mb-2">
                            <p class="text-gray-600 mr-2">Email:</p>
                            <p>student@student.com</p>
                        </div>
                        <div class="flex flex-row items-center mb-2">
                            <p class="text-gray-600 mr-2">or</p>
                            <p>teacher@teacher.com</p>
                        </div>
                        <div class="h-[1px] bg-black w-full my-2"></div>
                        <div class="flex flex-row items-center">
                            <p class="text-gray-600 mr-2">password:</p>
                            <p>password</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div class="relative hidden lg:block w-full h-full lg:w-1/2">
            <div class="absolute inset-0 lg:bg-gradient-to-r bg-gradient-to-b from-white to-blue-700"></div>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    middleware: ['guest'],
    layout: ''
})

useHead({
    title: 'Login'
})

const auth = useAuthStore();


const form = reactive({
    email: '',
    password: '',
})

const errors = ref(null)
const loading = ref(false)

async function handleLogin() {
    loading.value = true
    await auth.login(form).then(async (res) => {
        await auth.fetchUser()
    }).catch((e) => {
        errors.value = e.data.errors
    }).finally(() => loading.value = false)
}


</script>
