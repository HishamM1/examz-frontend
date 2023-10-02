<template>
    <component :is="component" @click="$emit('button-click')" :to="to" :disabled="disabled"
        class="inline-flex justify-center items-center px-3 py-2 mb-2 text-sm font-medium text-center  rounded-lg focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed "
        :class="{
            'text-white bg-blue-700 hover:bg-blue-800': buttonType == 'primary',
            'text-blue-700 inline-flex items-center hover:text-white border border-blue-700 hover:bg-blue-700': buttonType == 'secondary',
            'text-red-600 hover:text-white border border-red-600 hover:bg-red-600': buttonType == 'danger',
        }">
        <svg v-if="buttonType == 'danger'" class="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"></path>
        </svg>
        <slot />
    </component>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        default: null
    },
    buttonType: {
        type: String,
        default: 'primary'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const component = computed(() => {
    if (props.to) return resolveComponent('NuxtLink')
    return 'button'
})
</script>
