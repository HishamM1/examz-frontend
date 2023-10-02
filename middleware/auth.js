import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthStore();
    if (!auth.isLoggedIn) {
        return navigateTo("/login", { replace: true });
    }

    if (auth.exam_in_progress && to.path != `/student/exams/${auth.exam_in_progress}`) {
        return navigateTo(`/student/exams/${auth.exam_in_progress}`, { replace: true })
    }
});
