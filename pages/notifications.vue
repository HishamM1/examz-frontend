<template>
    <div class="min-h-[calc(100vh-70px)] grid place-items-center">
        <div v-if="notifications.length > 0" class="w-full sm:w-11/12 lg:w-3/5 dark:bg-gray-800 rounded-xl mx-auto  p-10">
            <div class="inline-flex flex-col sm:flex-row items-center justify-between w-full">
                <h3 class="font-bold text-xl sm:text-2xl text-black dark:text-white">Notifications</h3>
                <button
                    class="py-[2px] px-[6px] font-semibold rounded-lg shadow hover:shadow-md transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:border-0 disabled:shadow-none "
                    :disabled="user_notifications.unReadNotifications == 0" @click="markAllAsRead">Mark all as read</button>
            </div>
            <Notifications :notifications="notifications" @markAsRead="markAsRead" />
            <button @click="clearAllNotifications" class="inline-flex text-sm bg-white justify-center px-4 py-2 mt-12 w-full text-red-500 items-center rounded font-medium
                        shadow border focus:outline-none hover:bg-red-500 transition
                        hover:text-white dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 sm:mr-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Clear all notifications
            </button>
        </div>
        <div v-else class=" text-2xl sm:text-4xl md:text-6xl font-bold">No Notifications Yet!</div>

    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

useHead({
    title: 'Notifications'
})

const user_notifications = useNotificationStore()

const notifications = computed(() => user_notifications.notifications)

async function markAsRead(notification) {
    await user_notifications.markAsRead(notification)
}

async function markAllAsRead() {
    await user_notifications.markAllAsRead()
}

async function clearAllNotifications() {
    await user_notifications.clearAllNotifications()
}

</script>
