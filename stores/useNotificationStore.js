import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", () => { 
    const notifications = ref([]);
    const unReadNotifications = computed(() => {
        return notifications.value.filter((notification) => {
            return notification.read_at == null;
        }).length;
    })

    async function fetchNotifications() { 
        await useApiFetch("/api/v1/notifications")
            .then((res) => {
                notifications.value = res
            })
            .catch((e) => console.log(e));
    }

    async function markAsRead(notification) {
        notifications.value = notifications.value.map((item) => {
            if (item.id == notification.id) {
                item.read_at = new Date();
            }
            return item;
        })
        await useApiFetch(`/api/v1/notifications/${notification.id}/mark-as-read`, {
            method: "POST",
        })
    }

    async function markAllAsRead() {
        notifications.value = notifications.value.map((item) => {
            item.read_at = new Date();
            return item;
        })
        await useApiFetch(`/api/v1/notifications/mark-all-as-read`, {
            method: "POST",
        })
    }

    async function clearAllNotifications() {
        notifications.value = [];
        await useApiFetch(`/api/v1/notifications/clear-all`, {
            method: "POST",
        })
    }

    return {
        notifications,
        unReadNotifications,
        markAsRead,
        fetchNotifications,
        markAllAsRead,
        clearAllNotifications
    }
})