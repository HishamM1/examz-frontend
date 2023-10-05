<template>
    <div class="container mx-auto">
        <section class="bg-white dark:bg-gray-900">
            <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <div class="flex justify-between">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update your profile</h2>
                    <Button to="/profile" button-type="secondary">
                        Back
                    </Button>
                </div>
                <form @submit.prevent="handleUpdate()">
                    <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div class="sm:col-span-2">
                            <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                Name</label>
                            <input type="text" full_name="full_name" id="full_name" v-model="form.full_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your full name">
                            <h2 v-if="errors?.full_name" class="text-sm text-red-600 mt-1"> {{ errors.full_name[0] }}</h2>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" full_name="email" id="email" v-model="form.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="email@example.com">
                            <h2 v-if="errors?.email" class="text-sm text-red-600 mt-1"> {{ errors.email[0] }}</h2>
                        </div>
                        <div class="w-full" v-if="form.role == 'student'">
                            <label for="school"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School</label>
                            <input type="text" full_name="school" id="school" v-model="form.school"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your school">
                            <h2 v-if="errors?.school" class="text-sm text-red-600 mt-1"> {{ errors.school[0] }}</h2>
                        </div>
                        <div class="w-full" v-else>
                            <label for="subject"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                            <input type="text" full_name="subject" id="subject" v-model="form.subject"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your subject">
                            <h2 v-if="errors?.subject" class="text-sm text-red-600 mt-1"> {{ errors.subject[0] }}</h2>
                        </div>
                        <div class="w-full">
                            <label for="phone_number"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input type="text" full_name="phone_number" id="phone_number" v-model="form.phone_number"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your phone number">
                            <h2 v-if="errors?.phone_number" class="text-sm text-red-600 mt-1"> {{ errors.phone_number[0] }}
                            </h2>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="about"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
                            <textarea id="about" rows="8" v-model="form.about"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write anything about you here..."></textarea>
                            <h2 v-if="errors?.about" class="text-sm text-red-600 mt-1"> {{ errors.about[0] }}</h2>
                        </div>

                    </div>
                    <div class=" flex flex-col sm:flex-row items-center space-x-4">
                        <Button type="submit" :disabled="loading" class="!px-5 !py-2.5">
                            Update profile
                        </Button>
                        <Button to="/profile/reset_password" class="!px-5 !py-2.5">
                            Change Password
                        </Button>
                        <Button to="/profile/profile_picture" class="!px-5 !py-2.5">
                            Change Profile Picture
                        </Button>
                        <Button type="button" button-type="danger" class="!px-5 !py-2.5" :disabled="loading">
                            Delete
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useToast } from 'tailvue'
definePageMeta({
    middleware: ['auth', 'verified']
})

useHead({
    title: 'Edit Profile'
})

const auth = useAuthStore()
const form = reactive(JSON.parse(JSON.stringify(auth.user)));
const errors = ref({})
const loading = ref(false)
function handleUpdate() {
    loading.value = true
    useApiFetch("/api/v1/user", {
        method: "PUT",
        body: form
    }).then((res) => {
        auth.fetchUser('/profile')
        useToast().show(res.message)
    }).catch((e) => errors.value = e.data.errors).finally(() => loading.value = false)
}
</script>
