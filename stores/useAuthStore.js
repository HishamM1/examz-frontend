import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useNotificationStore } from "./useNotificationStore";
import { useToast } from 'tailvue'
import Pusher from "pusher-js";


export const useAuthStore = defineStore("auth", () => {
    const user = ref(null)
    const isLoggedIn = computed(() => !!user.value)
    const runtimeConfig = useRuntimeConfig()
    const exam_in_progress = ref(null)


    async function fetchUser(redirectTo = "/") {
        await useApiFetch("/api/v1/user")
            .then((res) => {
                user.value = res
                if (user.value.role == "student") {
                    checkInProgressExam()
                }
                navigateTo(redirectTo, { replace: true })
            })
            .catch((e) => logout());

        await useNotificationStore().fetchNotifications();

        connectToPusher(user.value, useCookie("access_token").value)
    }

    async function checkInProgressExam() {
        return await useApiFetch('/api/v1/student/exams/in_progress').then((res) => {
            exam_in_progress.value = res.exam_id
            navigateTo(`/student/exams/${exam_in_progress.value}`, { replace: true })
        }).catch((e) => {
        })
    }

    async function login(form) {
        return await useApiFetch("/api/v1/login", {
            server: false,
            method: "POST",
            body: form,
        }).then((res) => {
            useCookie("access_token").value = res.access_token;
        });
    }

    async function logout() {
        user.value = null;
        useCookie("access_token").value = '';
        navigateTo("/login", { replace: true });

        await useApiFetch("/api/v1/logout", {
            method: "POST",
        }).then(() => {

        }).catch(() => {

        })
    }

    function connectToPusher(user, token) {
        let pusher = new Pusher(runtimeConfig.public.PUSHER_KEY, {
            cluster: "eu",
            authEndpoint: "https://examz.fly.dev/broadcasting/auth",
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });

        let channel = pusher.subscribe(`private-user.${user.id}`);

        channel.bind("Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", function (notification) {
            if(notification.data.link == undefined) {
                useToast().show({
                    type: 'danger',
                    message: notification.data.message,
                    timeout: 6,
                })
            } else {
                useToast().show({
                    type: 'success',
                    message: notification.data.message,
                    timeout: 6,
                    primary: {
                        label: 'View',
                        action: () => navigateTo(notification.data.link)
                    }
                })
            }
            useNotificationStore().notifications.unshift(notification)
        });

    }


    return { user, exam_in_progress, isLoggedIn, login, fetchUser, logout };
});
