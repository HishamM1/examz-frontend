<template>
    <section class="bg-white">
        <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                <img alt="Pattern"
                    src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    class="absolute inset-0 h-full w-full object-cover" />
            </aside>

            <main class="flex items-center justify-center p-4 lg:col-span-7 xl:col-span-6">
                <div class="max-w-xl lg:max-w-3xl">
                    <a class="block text-blue-600 w-80" href="/">
                        <img src="/logo/svg/Black logo - no background.svg" alt="">
                    </a>

                    <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                        Welcome to Examz
                    </h1>

                    <p class="mt-4 leading-relaxed text-gray-500">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
                        dolorum aliquam, quibusdam aperiam voluptatum.
                    </p>

                    <form @submit.prevent="handleRegister" class="mt-8 grid grid-cols-6 gap-6">
                        <div class="col-span-6">
                            <label for="full_name" class="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>

                            <input type="text" id="full_name" name="full_name" v-model="form.full_name"
                                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow p-2" />
                            <h5 class=" text-red-500" v-if="error.full_name">{{ error.full_name[0] }}</h5>

                        </div>

                        <div class="col-span-6">
                            <label for="Email" class="block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input type="email" id="Email" name="email" v-model="form.email"
                                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow p-2" />
                            <h5 class=" text-red-500" v-if="error.email">{{ error.email[0] }}</h5>
                        </div>

                        <div class="col-span-6">
                            <label for="PhoneNumber" class="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>

                            <input type="text" id="PhoneNumber" name="phone_number" v-model="form.phone_number"
                                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow p-2" />
                            <h5 class=" text-red-500" v-if="error.phone_number">{{ error.phone_number[0] }}</h5>

                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="Password" class="block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <input type="password" id="Password" name="password" v-model="form.password"
                                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow p-2" />
                            <h5 class=" text-red-500" v-if="error.password">{{ error.password[0] }}</h5>

                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="PasswordConfirmation" class="block text-sm font-medium text-gray-700">
                                Password Confirmation
                            </label>

                            <input type="password" id="PasswordConfirmation" name="password_confirmation"
                                v-model="form.password_confirmation"
                                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow p-2" />
                            <h5 class=" text-red-500" v-if="error.password_confirmation">{{ error.password_confirmation[0]
                            }}</h5>

                        </div>

                        <div class="col-span-6">
                            <label for="HeadlineAct" class="block text-sm font-medium text-gray-900">
                                You are a:
                            </label>

                            <select name="role" id="HeadlineAct" v-model="form.role"
                                class="mt-1.5 w-full rounded-lg border-gray-300 shadow text-gray-700 sm:text-sm p-2">
                                <option value="">Please select</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>

                            <h5 class=" text-red-500" v-if="error.role">{{ error.role[0] }}</h5>

                        </div>
                        <div class="col-span-6 my-1">
                            <label for="About" class="block text-sm font-medium text-gray-700">
                                About
                            </label>

                            <input type="text" id="About" name="about" v-model="form.about"
                                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow p-2" />
                        </div>
                        <div class="col-span-6 space-y-6">
                            <div class="col-span-6" v-if="form.role == 'teacher'">
                                <label for="Subject" class="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>

                                <input type="text" id="Subject" name="subject" v-model="form.subject"
                                    class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow p-2" />
                                <h5 class=" text-red-500" v-if="error.subject">{{ error.subject[0] }}</h5>

                            </div>

                            <div class="col-span-6" v-if="form.role == 'student'">
                                <label for="School" class="block text-sm font-medium text-gray-700">
                                    School
                                </label>

                                <input type="text" id="School" name="school" v-model="form.school"
                                    class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow p-2" />
                                <h5 class=" text-red-500" v-if="error.school">{{ error.school[0] }}</h5>

                            </div>
                        </div>

                        <div class="col-span-6">
                            <p class="text-sm text-gray-500">
                                By creating an account, you agree to our
                                <a href="#" class="text-gray-700 underline">
                                    terms and conditions
                                </a>
                                and
                                <a href="#" class="text-gray-700 underline">privacy policy</a>.
                            </p>
                        </div>

                        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <Button :disabled="loading" class="!px-12 !py-3">
                                Create an account
                            </Button>

                            <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                                Already have an account?
                                <NuxtLink to="/login" class="cursor-pointer text-gray-700 underline">Login</NuxtLink>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    middleware: ['guest'],
    layout: ''
})

const auth = useAuthStore()

const form = reactive({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
    role: '',
    about: '',
    subject: '',
    school: ''
})
const loading = ref(false)
const error = ref({})

function removeEmpty(obj) {
    return Object.entries(obj).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
}

async function handleRegister() {
    loading.value = true
    await useApiFetch("/api/v1/register", {
        server: false,
        method: "POST",
        body: removeEmpty(form)
    }).then(async (res) => {
        await auth.login({
            email: form.email,
            password: form.password
        }).then((res) => navigateTo('/'))
    }).catch((e) => {
        error.value = e.data.errors  
    }).finally(() => {
        loading.value = false
    })
}

</script>
