<template>
    <div class="w-full flex flex-col md:flex-row gap-2 justify-around items-center md:items-start min-h-fit my-6">
        <h1 class="text-center text-4xl md:text-6xl font-bold capitalize">{{ title }}</h1>
        <div>
            <span class="flex gap-3 items-center">Duration: <p>{{ duration }} Minutes</p></span>
            <span class="flex gap-3 items-center">Start time: <p>{{ new Date(start_time).toLocaleString(['en-US'],
                {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }) }}</p></span>
            <span v-if="end_time" class="flex gap-3 items-center">End time: <p>{{ new
                Date(end_time).toLocaleString(['en-US'],
                    {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }) }}</p></span>
            <span v-if="timer" class="flex gap-3 items-center">Time Left: <p>{{ timer }}</p></span>

        </div>
        <div>
            <span class="text-lg font-medium">Description: <p class="text-sm max-w-xs font-normal">{{ description
            }}</p></span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    duration: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    timer: {
        type: String,
        required: false
    },
})
</script>