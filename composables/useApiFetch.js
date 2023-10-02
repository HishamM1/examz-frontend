import {useAuthStore} from "../stores/useAuthStore";
import {ref} from "vue";
export async function useApiFetch( path, options = {}) {
    let headers = {}

    let access_token = ref(useAuthStore().access_token)

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