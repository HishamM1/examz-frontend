<template>
    <div>

    </div>
</template>

<script setup>
import { useToast } from "tailvue"

const auth = useAuthStore()
definePageMeta({
    middleware: 'auth',
    layout: ''
})

const route = useRoute()
const url = route.query.url.slice(21)

onMounted(async () => {
    
    useApiFetch(url).then(async (res) => {
        useToast().show({
            title: 'Success',
            message: res.message,
            type: 'success',
            timeout: 6,
        })

        auth.fetchUser()
        navigateTo('/')
    }).catch((e) => {
        useToast().show({
            title: 'Error',
            message: e.data.message,
            type: 'danger',
            timeout: 6,
        })

        navigateTo('/')
    })
})


</script>
