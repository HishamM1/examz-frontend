<template>
    <div class="fixed top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 bg-black" @click.self="$emit('closeModal')">
        <div
            class=" p-4 md:p-8 min-h-min w-full md:w-5/6 bg-white rounded-lg shadow-lg right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div>
                <h1 class="text-xl md:text-2xl font-semibold mb-4">Edit Announcement</h1>
                <button class="absolute right-4 top-4 border bg-opacity-50 border-black rounded-full px-2 bg-white cursor-pointer"
                    @click="$emit('closeModal')">X</button>
            </div>

            <div class="my-4">
                <div class="rounded-lg p-4 w-full border mb-4">
                    <div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            announcement</label>
                        <textarea id="message" rows="4" v-model="announcementCopy.text"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."></textarea>
                        <input type="file" class="my-4" @change="changeFile">
                        <img v-if="announcementCopy.media" :src="announcementCopy.media" class="w-6/12 mb-4" alt="announcement image" />
                    </div>
                </div>

            </div>
            <div>
                <Button button-type="secondary" @click="editAnnouncement">Edit</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from 'tailvue'
const props = defineProps({
    announcement: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['closeModal'])

const announcementCopy = ref(JSON.parse(JSON.stringify(props.announcement)));

let form = new FormData();
form.append('id', announcementCopy.value.id);
form.append('text', announcementCopy.value.text);

function changeFile(e) {
    form.append('media', e.target.files[0]);
    announcementCopy.value.media = URL.createObjectURL(e.target.files[0]);
}

watch(announcementCopy.value, () => {
    form.set('text', announcementCopy.value.text);
});

function editAnnouncement() {
    useApiFetch(`/api/v1/teacher/announcements/${form.get('id')}`, {
        method: 'POST',
        body: form
    }).then((res) => {
        useToast().show(res.message)
        emit('closeModal', true)
    }).catch((e) => {
    })
}

</script>