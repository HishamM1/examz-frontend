<template>
    <div class="container mx-auto mt-10">
        <div class="flex flex-col gap-12 w-full justify-center items-center min-h-[calc(100vh-200px)]">
            <div class="flex gap-6">
                <div class="relative w-10 h-10 sm:w-20 sm:h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <img :src="user.profile_picture" alt="avatar" />
                </div>
                <div class="flex flex-col gap-2">
                    <h1 class="font-bold capitalize text-2xl md:text-4xl">{{ user.full_name }}</h1>
                    <p v-if="user.role == 'teacher'" class="flex gap-2 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path
                                d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                        </svg>
                        <span class=" capitalize text-gray-600">{{ user.subject }}</span>
                    </p>
                    <p v-else class="flex gap-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg"
                            height="1em" viewBox="0 0 640 512">
                            <path
                                d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM256 416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H256V416zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z" />
                        </svg><span class=" capitalize text-gray-600">{{ user?.school }}</span></p>
                </div>
            </div>
            <div>
                <div>
                    <h3 class=" text-gray-600 text-lg md:text-2xl">About</h3>
                    <p class="font-semibold -mt-2 text-lg md:text-2xl">{{ user.about }}</p>
                </div>
                <div>
                    <h3 class=" text-gray-600 text-lg md:text-2xl">Email address</h3>
                    <p class="font-semibold -mt-2 text-lg md:text-2xl">{{ user.email }}</p>
                </div>
                <div>
                    <h3 class=" text-gray-600 text-lg md:text-2xl">Phone Number</h3>
                    <p class="font-semibold -mt-2 text-lg md:text-2xl">{{ user.phone_number }}</p>
                </div>
                <div  v-if="user.role == 'teacher'">
                    <h3 class=" text-gray-600 text-lg md:text-2xl">Join Code</h3>
                    <p class="font-semibold -mt-2 text-lg md:text-2xl">{{ user.join_code }}</p>
                </div>
            </div>
            <div>
                <Button to="/profile/edit" class="!px-12 !py-3 cursor-pointer">
                    Edit</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})

const auth = useAuthStore();

const user = ref(auth.user)
</script>
