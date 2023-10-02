import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthStore();
    const user = auth.user;
    if(!user?.verified) {
        return navigateTo("/verify", { replace: true });
    }
});

