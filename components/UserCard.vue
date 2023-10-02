<template>
    <div class="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4 ">
            <button @click="$emit('delete', user.id)"
                class="inline-block px-4 py-2 text-sm text-red-600 border-red-600 border rounded-md hover:bg-red-600 hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</button>
        </div>
        <div class="flex flex-col items-center pb-6">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="user.image" alt="image" />
            <h5 class="mb-1 text-xl font-semibold text-gray-900 dark:text-white capitalize">{{ user.name }}</h5>
            <div v-if="user.subject" class="flex flex-col items-center">
                <span>Subject:</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.subject }}</span>
            </div>
            <div v-if="user.school" class="flex flex-col items-center">
                <span>School:</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.school }}</span>
            </div>
            <div class="flex flex-col items-center">
                <span>Email:</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</span>
            </div>
            <div class="flex flex-col items-center">
                <span>Phone Number:</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.phone }}</span>
            </div>
            <div class="flex flex-col items-center">
                <span>About:</span>
                <span class="text-sm text-gray-500 dark:text-gray-400 w-10/12 text-center">{{ user.about }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})
</script>
