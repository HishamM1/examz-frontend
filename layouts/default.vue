<template>
  <nav class="dark:bg-gray-900 border-gray-300 border-b-[1px] mb-4">
    <div class="w-full container flex flex-wrap items-center justify-between mx-auto py-4">
      <NuxtLink to="/" class="flex items-center">
        <img :src="'/logo/svg/Black logo - no background.svg'" class="h-8 mr-3" alt="Logo" />
      </NuxtLink>
      <div class="flex items-center md:order-2 relative">
        <!-- Notifications -->
        <NuxtLink to="/notifications"
          class="relative inline-flex items-center mr-4 p-2 cursor-pointer text-sm font-medium text-center text-black border border-black bg-white rounded-lg hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <NotificationSVG/>
          <span class="sr-only">Notifications</span>
          <div v-if="notifications.unReadNotifications > 0"
            class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
          </div>
        </NuxtLink>
        <button type="button"
          class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          @click="modal.toggleUserModal">
          <span class="sr-only">Open user menu</span>
          <img class="w-8 h-8 rounded-full" :src="user.profile_picture" alt="user photo">
        </button>
        <!-- user modal -->
        <div
          class="z-50 absolute right-0 top-8 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          v-if="modal.userModal">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white capitalize">{{ user.full_name }}</span>
            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ user.email }}</span>
          </div>
          <ul class="py-2" @click="modal.userModal = false">
            <li>
              <NuxtLink to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Profile</NuxtLink>
            </li>
            <li>
              <button @click="logout"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</button>
            </li>
          </ul>
        </div>
        <button type="button" @click="modal.toggleMenuModal"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <!-- Main menu modal  -->
        <div
          class="z-50 absolute right-0 top-8 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
          v-if="modal.menuModal">
          <ul class="py-2" @click="modal.menuModal = false">
            <li>
              <NuxtLink to="/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Home</NuxtLink>
            </li>
            <TeacherNav v-if="user.role == 'teacher'" />
            <StudentNav v-else />
          </ul>
        </div>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NuxtLink to="/"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Home</NuxtLink>
          </li>
          <TeacherNav v-if="user.role == 'teacher'" />
          <StudentNav v-else />
        </ul>
      </div>
    </div>
  </nav>

  <div class="fixed top-0 right-0 bottom-0 left-0 z-40 opacity-0" v-if="modal.userModal || modal.menuModal"
    @click.self="modal.closeAll">
  </div>




  <slot />
</template>

<script setup>
const auth = useAuthStore();
const notifications = useNotificationStore()
const modal = useModalStore()

const user = ref({})

async function logout() {
  modal.closeAll()
  await auth.logout()
}
</script>
