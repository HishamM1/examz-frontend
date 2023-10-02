import { access_token } from "../stores/useAuthStore";
export async function useApiFetch( path, options = {}) {
    let headers = {}

    if(access_token.value){
        headers['Authorization'] = `Bearer ${access_token.value}`
    }

    return await $fetch("https://examz.fly.dev" + path, {
        credentials: "include",
        watch: false,
        ...options,
        headers: {
            "Accept": "application/json",
            ...headers,
            ...options?.headers
        }
    })
}