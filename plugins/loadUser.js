import { useAuthStore } from "../stores/useAuthStore.js";

export default defineNuxtPlugin(async (nuxtApp) => {
    const auth = useAuthStore();
    const token = useCookie("access_token");

    if (!auth.isLoggedIn && token.value) {
        await auth.fetchUser()
    }
});
