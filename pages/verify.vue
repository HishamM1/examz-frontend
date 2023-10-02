<template>
    <div class="grid h-screen px-4 bg-white place-content-center">
        <div class="text-center">
            <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                You have to verify your email first!
            </p>

            <!-- Resend email -->
            <p class="mt-4 text-gray-500">Didn't receive an email? <button @click="resendEmail"
                    class="text-indigo-600 hover:text-indigo-500">Resend</button></p>

            <button @click="navigateTo('/')"
                class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring">
                Go Back Home
            </button>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'tailvue'

definePageMeta({
    layout: '',
    middleware: ['auth']
})

async function resendEmail() {
    await useApiFetch('/api/v1/email/verification-notification', {
        method: 'POST'
    }).then(() => {
        navigateTo('/')
        useToast().show({
            title: 'Email sent!',
            description: 'We have sent you an email. Please check your inbox.',
            type: 'success'
        })
    }).catch((e)=> {
        console.log(e.data);
    })
}

</script>
