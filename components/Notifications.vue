<template>
            <div  v-for="notification in notifications" :key="notification">
                <div class="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full"
                    :class="{ 'border-2 border-red-600': !notification.read_at }">
                    <div class=" inline-flex flex-wrap items-center justify-between w-full">
                        <div class="inline-flex justify-between items-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/893/893257.png" alt="Messages Icon"
                                class="w-6 h-6">
                            <h3 class="font-bold text-base text-black">Messages</h3>
                            <button v-if="!notification.read_at" @click="$emit('markAsRead', notification)"
                                class=" text-xs border border-black rounded-lg py-[2px] px-[4px] hover:">Mark as
                                Read</button>
                        </div>
                        <p class="text-xs text-gray-500">
                            {{ new Date(notification.created_at).toLocaleString(['en-US'], {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            }) }}
                        </p>
                    </div>
                    <p class="mt-1 text-sm">
                        {{ notification.data.message }}
                    </p>
                </div>
            </div>
</template>

<script setup>
const props = defineProps({
    notifications: {
        type: Array,
        required: true
    }
})

console.log(props.notifications);

defineEmits(['markAsRead'])
</script>
