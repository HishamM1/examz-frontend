<template>
    <div class="container mx-auto">
        <section class="dark:bg-gray-900 ">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-70px)] lg:py-0">
                <div
                    class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <div class="flex justify-between">
                        <h2
                            class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change profile picture
                        </h2>
                        <Button to="/profile/edit" button-type="secondary">
                            Back
                        </Button>
                    </div>
                    <form class="my-6 space-y-4 lg:mt-5 md:space-y-5" @submit.prevent="updatePicture">
                        <input @change="changeFile"
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            type="file">
                        <Button :disabled="loading" type="submit"
                            class="w-full !px-5 !py-3 flex justify-center items-center">Change
                            picture</Button>
                    </form>
                    <img :src="image" alt="" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useToast } from "tailvue"

definePageMeta({
    middleware: ['auth', 'verified']
})
const user = useAuthStore().user

const loading = ref(false)

const image = ref({})

const file = ref({})

let form = new FormData()
function changeFile(e) {
    file.value = e.target.files[0];
    image.value = URL.createObjectURL(file.value);
}

async function updatePicture() {
    const formData = new FormData()
    formData.append('image', file.value)

    loading.value = true
    await useApiFetch(`/api/v1/image/user/${user?.id}`, {
        method: "POST",
        body: formData,
    }).then((res) => {
        user.profile_picture = res.image
        useToast().show({
            message: res.message,
        })
        navigateTo('/profile')
    }).catch((e) => {
        console.log(e.data);
        // error.value = e.data.message
    }).finally(() => {
        loading.value = false
    })

}

</script>
