import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useNotificationStore } from "./useNotificationStore";
import { useToast } from 'tailvue'
import Pusher from "pusher-js";


export const useAuthStore = defineStore("auth", () => {
    const user = ref(null)
    const isLoggedIn = computed(() => !!user.value)
    const access_token = useCookie("access_token")
    const xsrf_token = useCookie("XSRF-TOKEN")
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

        connectToPusher(user.value, useCookie("access_token").value, useCookie("XSRF-TOKEN").value)
    }

    async function checkInProgressExam() {
        return await useApiFetch('/api/v1/student/exams/in_progress').then((res) => {
            exam_in_progress.value = res.exam_id
            navigateTo(`/student/exams/${exam_in_progress.value}`, { replace: true })
        }).catch((e) => {
        })
    }

    async function login(form) {
        // await useApiFetch("/sanctum/csrf-cookie");

        return await useApiFetch("/api/v1/login", {
            server: false,
            method: "POST",
            body: form,
        }).then((res) => {
            access_token.value = res.access_token;
        });
    }

    async function logout() {

        await useApiFetch("/api/v1/logout", {
            method: "POST",
        }).then(() => {

        }).catch(() => {

        }).finally(() => {
            user.value = null;
            access_token.value = null;
            xsrf_token.value = null;
            navigateTo("/login", { replace: true });
        });

    }

    function connectToPusher(user, token, xsrf) {
        let pusher = new Pusher(runtimeConfig.public.PUSHER_KEY, {
            cluster: "eu",
            authEndpoint: "http://localhost:8000/broadcasting/auth",
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-XSRF-TOKEN": xsrf,
                },
            },
        });

        let channel = pusher.subscribe(`private-user.${user.id}`);

        channel.bind("Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", function (notification) {
            useToast().show({
                type: 'danger',
                message: notification.data.message,
                timeout: 6,
            })
            console.log(notification);
            useNotificationStore().notifications.unshift(notification)
        });

    }


    return { user, exam_in_progress, isLoggedIn, login, fetchUser, logout };
});
