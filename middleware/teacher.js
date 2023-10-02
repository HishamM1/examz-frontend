import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthStore();
    const user = auth.user;
    if (user?.role != "teacher"){
        return showError({ statusCode: 403, message: "Forbidden" })
    }
});
