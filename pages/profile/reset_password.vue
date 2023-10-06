<template>
    <div class="container mx-auto">
        <section class="dark:bg-gray-900 ">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <div class="flex justify-between">
                        <h2
                            class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <Button to="/profile/edit" button-type="secondary">
                            Back
                        </Button>
                    </div>
                    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div>
                            <label for="old_password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                            <input type="password" v-model="form.current_password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="••••••••" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New
                                Password</label>
                            <input type="password" v-model="form.password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <div>
                            <label for="password_confirmation"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                password</label>
                            <input type="password" v-model="form.password_confirmation" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <Button :disabled="loading" @button-click="changePassword" type="submit"
                            class="w-full !px-5 !py-3 flex justify-center items-center">Change
                            passwod</Button>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useToast } from "tailvue";

definePageMeta({
    middleware: ['auth']
})

useHead({
    title: 'Change Password'
})

const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
})
const loading = ref(false);

function changePassword() {
    loading.value = true;
    useApiFetch("/api/v1/change-password", {
        method: 'POST',
        body: form
    }).then((res) => {
        useToast().show({
            title: 'Success',
            message: res.message,
            type: 'success'
        })
        form.current_password = '';
        form.password = '';
        form.password_confirmation = '';
        navigateTo('/profile')
    }).catch((e) => {
        useToast().show({
            title: 'Error',
            message: e.data.message,
            type: 'danger'
        })
    }).finally(() => {
        loading.value = false;
    })
}


</script>
