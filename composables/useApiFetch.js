export async function useApiFetch( path, options = {}) {
    let headers = {}

    const token = useCookie('XSRF-TOKEN')
    console.log(token.value);
    const access_token = useCookie('access_token')
    console.log(access_token.value);


    if(token.value) {
        headers['X-XSRF-TOKEN'] = token.value
    }
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