<template>
    <div class="container mx-auto flex justify-center items-center flex-col">
        <div v-if="user.role == 'teacher'" class="rounded-lg p-4 w-full sm:w-3/5 border mb-4">
            <div>
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    announcement</label>
                <textarea id="message" rows="4" v-model="form.text" @click="showButton = true"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."></textarea>
                <input v-if="showButton" type="file" class="my-4" @change="changeFile">
                <img v-if="image" :src="image" class="w-6/12 mb-4" alt="announcement image" />
            </div>
            <Button v-if="showButton" class="!px-10 text-lg" @click="handleAnnounce"
                :disabled="form.text == '' && !file">Announce</Button>
            <div v-if="errors">
                <div class="text-red-500 text-sm font-medium">
                    <ul class="list-disc list-inside">
                        <li v-for="error in errors">{{ error[0] }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <section v-if="announcements.length > 0" v-for="(announcement, index) in announcements" :id="announcement.id"
            class="shadow-md mb-4 w-full sm:w-3/5 bg-white p-3 rounded-[10px]">
            <div class="flex items-center">
                <button class="mr-4">
                    <img :src="user.profile_picture" v-if="user.role == 'teacher'" alt="not found"
                        class="rounded-full ml-1 w-[42px] h-[42px]" />
                    <img :src="announcement.teacher.user.profile_picture" v-else alt="not found"
                        class="rounded-full ml-1 w-[42px] h-[42px]" />
                </button>
                <div class="flex items-center justify-between rounded-full w-full">
                    <div>
                        <div v-if="user.role == 'teacher'" class="font-semibold text-[15px]">{{ user.full_name }}</div>
                        <div v-else class="font-semibold text-[15px]">{{ announcement.teacher.user.full_name }}</div>
                        <div class="flex items-center text-xs text-gray-600">
                            {{ new Date(announcement.created_at).toLocaleString(['en-US'],
                                {
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',

                                })
                            }}
                        </div>
                    </div>
                    <div class="relative" v-if="user.role == 'teacher'">
                        <button class="rounded-full cursor-pointer hover:bg-[#F2F2F2] p-2" type="submit"
                            @click="menu[index] = !menu[index]">
                            <svg fill="currentColor" viewBox="0 0 20 20" width="1em" height="1em">
                                <g fill-rule="evenodd" transform="translate(-446 -350)">
                                    <path
                                        d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0">
                                    </path>
                                </g>
                            </svg>
                        </button>
                        <div class="absolute bg-white shadow-xl top-6 right-0 w-[130px] rounded-lg border"
                            v-if="menu[index]">
                            <div class="w-full mt-2 hover:bg-[#F2F2F2] p-2 cursor-pointer"
                                @click="showAnnouncementModal(announcement)">Edit</div>
                            <div @click="deleteAnnouncement(announcement.id)"
                                class="block hover:bg-[#F2F2F2] p-2 cursor-pointer ">Delete</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-2">{{ announcement.text }}</div>

            <div class="w-full" v-if="announcement.media">
                <img :src="announcement.media" alt="no image"
                    class="block my-4 mx-auto w-full max-w-[500px] object-cover" />
            </div>
            <hr class="my-2">
            <div>
                {{ announcement.likes_count }} likes
                {{ announcement.views_count }} views
            </div>
            <div v-if="user.role == 'student'">
                <hr class="my-2">
                <!-- button to like the post beside the like cound and chart icon beside views count -->
                <button v-if="!user?.likes?.includes(announcement.id)" @click="likeAnnouncement(announcement.id)"
                    class="flex items-center gap-1 justify-center w-full hover:bg-blue-600 rounded-b-lg p-1 transition-all hover:text-white">Like
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66" />
                    </svg>
                </button>
                <button v-else @click="dislikeAnnouncement(announcement.id)"
                    class="flex items-center gap-1 justify-center w-full bg-blue-600 rounded-b-lg p-1 transition-all text-white">Liked
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66" />
                    </svg>
                </button>
            </div>
        </section>
        <div v-else-if="!loading && announcements.length == 0"
            class="container mx-auto flex justify-center items-center h-[calc(100vh-100px)] text-2xl sm:text-4xl md:text-6xl font-bold">
            No Announcements Yet!</div>
        <div v-if="loading" class="container mx-auto flex justify-center items-center h-[calc(100vh-100px)]">
            <LoadingState />
        </div>
    </div>
    <EditAnnouncementModal v-if="announcementModal" :announcement="announcement" @closeModal="closeModal" />
</template>

<script setup>
import { useToast } from 'tailvue'

definePageMeta({
    middleware: ['auth', 'verified'],
})

const user = useAuthStore().user

const showButton = ref(false)

const announcements = ref([])

const loading = ref(true)

const menu = ref([])

const image = ref(false)

const file = ref(false)

const announcementModal = ref(false)

const announcement = ref({})

const next_cursor = ref('')

const form = reactive({
    text: '',
})

const errors = ref({})
const observer = ref(new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && user?.role == 'student' && !user?.views.includes(+entry.target.id)) {
            markAnnouncementAsRead(+entry.target.id)
        }

        if (entry.isIntersecting && entry.target.id == announcements.value[announcements.value.length - 1].id && next_cursor != null) {
            loadMore()
        }
    })
}, {
    threshold: 0.7
}))

onBeforeMount(() => {
    getAnnouncements()
})

onUpdated(() => {
    document.querySelectorAll('section').forEach((section) => {
        observer.value.observe(section)
    })
})


function markAnnouncementAsRead(id) {
    user?.views.push(id)
    useApiFetch(`/api/v1/student/announcements/${id}`, {
        method: 'PUT',
    }).then(() => {
    }).catch((e) => {
        console.log(e.data);
    })
}

function loadMore() {
    if (next_cursor.value) {
        useApiFetch(`/api/v1/teacher/announcements?cursor=${next_cursor.value}`).then((res) => {
            announcements.value = [...announcements.value, ...res.data]
            next_cursor.value = res.next_cursor
        }).catch((e) => {
            console.log(e.data);
        })
    }
}

function getAnnouncements() {
    useApiFetch('/api/v1/teacher/announcements').then((res) => {
        announcements.value = res.data
        next_cursor.value = res.next_cursor
        loading.value = false
    }).catch((e) => {
        console.log(e.data);
    })
}

function showAnnouncementModal(ann) {
    announcementModal.value = true
    announcement.value = ann
    menu.value = Array(announcements.value.length).fill(false)
}

function closeModal(refresh = false) {
    announcementModal.value = false
    if (refresh) {
        getAnnouncements()
    }
}

function changeFile(e) {
    file.value = e.target.files[0];
    image.value = URL.createObjectURL(file.value);
}

const handleAnnounce = () => {
    let formData = new FormData()
    formData.append('text', form.text ?? '')

    if (file.value) {
        formData.append('media', file.value)
    }

    loading.value = true
    useApiFetch('/api/v1/teacher/announcements', {
        method: 'POST',
        body: formData,
    }).then((res) => {
        useToast().show(res.message)
        resetForm()
        getAnnouncements()
        menu.value = Array(announcements.value.length).fill(false)
    }).catch((e) => {
        errors.value = e.data.errors
    }).finally(() => {
        loading.value = false
    })
}

function resetForm() {
    form.text = ''
    image.value = ''
    file.value = ''
    showButton.value = false
}

function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
        useApiFetch(`/api/v1/teacher/announcements/${id}`, {
            method: 'DELETE'
        }).then(() => {
            announcements.value = announcements.value.filter((announcement) => announcement.id != id);
            menu.value = Array(announcements.value.length).fill(false)
            useToast().show({ message: 'Announcement deleted successfully', type: 'success' })
        }).catch((e) => {
            console.log(e.data);
        })
    }
}

function likeAnnouncement(id) {
    user?.likes.push(id)
    announcements.value.find((announcement) => announcement.id == id).likes_count++
    useApiFetch(`/api/v1/student/announcements/${id}/like`, {
        method: 'PUT',
    }).then(() => {

    }).catch((e) => {
        console.log(e.data);
        user?.likes.pop()
        announcements.value.find((announcement) => announcement.id == id).likes_count--
    })
}

function dislikeAnnouncement(id) {
    user.likes = user?.likes.filter((like) => like != id)
    announcements.value.find((announcement) => announcement.id == id).likes_count--

    useApiFetch(`/api/v1/student/announcements/${id}/dislike`, {
        method: 'PUT',
    }).then(() => {

    }).catch((e) => {
        console.log(e.data);
        user?.likes.push(id)
        announcements.value.find((announcement) => announcement.id == id).likes_count++
    })
}
</script>
