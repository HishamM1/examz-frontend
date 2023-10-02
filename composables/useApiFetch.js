export async function useApiFetch( path, options = {}) {
    let headers = {}

    const token = useCookie('XSRF-TOKEN')
    const access_token = useCookie('access_token')

    if(token.value) {
        headers['X-XSRF-TOKEN'] = token.value
    }
    if(access_token.value){
        headers['Authorization'] = `Bearer ${access_token.value}`
    }

    return await $fetch("http://localhost:8000" + path, {
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