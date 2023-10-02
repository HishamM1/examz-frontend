import { defineStore } from "pinia";

export const useModalStore = defineStore("Modal", () => {
    const userModal = ref(false);
    const menuModal = ref(false);

    function toggleUserModal() {
        userModal.value = !userModal.value
    }

    function toggleMenuModal() {
        menuModal.value = !menuModal.value
    }

    function closeAll() {
        userModal.value = false;
        menuModal.value = false;
    }

    return {
        userModal,
        menuModal,
        toggleUserModal,
        toggleMenuModal,
        closeAll
    }
})