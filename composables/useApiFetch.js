export async function useApiFetch( path, options = {}) {
    let headers = {}

    const access_token = useCookie('access_token')

    if(access_token.value){
        headers['Authorization'] = `Bearer ${access_token.value}`
    }

    // return await $fetch("https://examz.fly.dev" + path, {
    //     credentials: "include",
    //     watch: false,
    //     ...options,
    //     headers: {
    //         "Accept": "application/json",
    //         ...headers,
    //         ...options?.headers
    //     }
    // })

    
    return await $fetch("http://127.0.0.1:8000" + path, {
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