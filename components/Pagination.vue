<template>
    <nav class=" my-10 flex justify-center items-center">
        <ul class="inline-flex -space-x-px text-sm">
            <li v-for="(link, index) in links">
                <button v-html="link.label" @click="$emit('page-change', index, link)"
                    :class="{ '!bg-blue-500 text-white': link.active, 'text-gray-500': !link.active, 'rounded-l-lg': index == 0, 'rounded-r-lg': index == links.length - 1 }"
                    :disabled="link.url == null"
                    class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"></button>
            </li>
        </ul>
    </nav>
</template>
<script setup>
const props = defineProps({
    links: {
        type: Object,
        required: true
    }
})
defineEmits(['page-change'])
</script>
