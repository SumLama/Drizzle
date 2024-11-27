<script setup>
import { resolve } from "pathe"

const toast = useToast()
const title = "User List"
const description = "Allow  to perform CRUD operation"
useSeoMeta({
  title: title,
  ogTitle: title,
  titleTemplate: "%s",
  description: description,
  ogDescription: description,
})

const { data: userData, status, execute } = await useFetch("/api/user")
const confirm = ref(false)
const userToDelete = ref(null)
const isOpen = ref(false)
const edit = ref(false)
const userToEdit = ref(null)
const user = ref({
  firstName: "",
  lastName: "",
  address: "",
})
const handleCreate = async () => {
  const { data } = await useFetch("/api/user/", {
    method: "POST",
    body: {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      address: user.value.address,
    },
  })
  console.log(data.value)

  user.value = {}
  isOpen.value = false
  await execute()
}
const confirmDelete = (id) => {
  userToDelete.value = id
  confirm.value = true
}

const cancelDelete = () => {
  confirm.value = false
  userToDelete.value = null
}

const deleteUser = async () => {
  try {
    await $fetch(`/api/user/${userToDelete.value}`, {
      method: "DELETE",
    })
    toast.add({
      title: "Deleted Successfully",
    })
    cancelDelete()
    await execute()
  } catch (error) {
    toast.add({
      title: "Error",
      description: error,
    })
  }
}
const editUser = (id) => {
  edit.value = true
  if (userData.value) {
    userToEdit.value = userData.value.find((user) => user.id === id)
    if (userToEdit) {
      user.value = { ...userToEdit.value }
    }
  }
}
const saveEdit = async () => {
  const id = userToEdit.value.id
  try {
    await $fetch(`/api/user/${id}`, {
      method: "PATCH",
      body: {
        ...user.value,
      },
    })
    toast.add({
      title: "Saved Successfully",
    })
    edit.value = false
    await execute()
  } catch (error) {
    toast.add({
      title: "Error",
      description: error.data.message,
    })
  }
}
const columns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "address", label: "Address" },
  { key: "action", label: "Action" },
]

const icons = [
  { label: "Edit", icon: "i-heroicons-pencil-square", color: "orange" },
  {
    label: "Delete",
    icon: "material-symbols-light:delete-outline-sharp",
    color: "red",
  },
]
</script>
<template>
  <div class="w-3/5 border-2 my-40 mx-auto">
    <div class="flex w-full mt-6">
      <div class="w-full">
        <h1 class="text-2xl font-bold text-center">User List</h1>
      </div>
      <UButton
        icon="heroicons:plus-16-solid"
        size="sm"
        color="blue"
        variant="solid"
        label="Add New"
        class="text-base rounded mx-4"
        :trailing="false"
        @click="isOpen = true"
      />
    </div>

    <div class="flex justify-center my-10">
      <UTable
        :rows="userData"
        :columns="columns"
        class="w-full mx-4 border-2 shadow-lg"
        :ui="{
          tr: {
            base: '',
            selected: 'bg-gray-400 dark:bg-gray-800',
            expanded: 'bg-gray-400 dark:bg-gray-800/50',
            active: 'hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer',
          },
          th: {
            font: 'font-semibold',
            size: 'text-lg',
          },
          td: {
            color: 'text-black',
            size: 'text-base',
          },
        }"
      >
        <template #action-data="{ row }">
          <UButton
            v-for="icon in icons"
            :key="icon.label"
            :icon="icon.icon"
            :color="icon.color"
            @click="
              icon.label === 'Delete' ? confirmDelete(row.id) : editUser(row.id)
            "
            class="mr-2"
          />
        </template>
      </UTable>
    </div>

    <!-- Create user modal -->

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold">Create User</h3>
            <UButton
              color="gray"
              size="xl"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <form @submit="handleCreate">
          <label class="font-semibold text-lg">First Name *</label>
          <UInput
            v-model="user.firstName"
            class="my-2"
            size="lg"
            placeholder="First Name"
          />
          <label class="font-semibold text-lg">Last Name *</label>
          <UInput
            v-model="user.lastName"
            class="my-2"
            size="lg"
            placeholder="Last Name"
          />
          <label class="font-semibold text-lg">Address *</label>
          <UInput
            v-model="user.address"
            class="my-2"
            size="lg"
            placeholder="Address"
          />
          <div class="my-4">
            <UButton
              label="Create"
              color="blue"
              class="text-base px-5 my-2"
              type="submit"
            />
          </div>
        </form>
      </UCard>
    </UModal>
    <!-- Confirm modal -->
    <div>
      <UModal v-model="confirm">
        <UCard :ui="{ ring: '' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">
                Are you sure want to delete user?
              </h3>

              <UButton
                color="gray"
                size="xl"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="cancelDelete"
              />
            </div>
          </template>

          <UButton
            label="Confirm"
            color="blue"
            @click="deleteUser"
            class="mr-3 text-base px-4"
          />
          <UButton
            label="Cancel"
            color="blue"
            @click="cancelDelete"
            class="text-base px-4"
          />
        </UCard>
      </UModal>
    </div>

    <!-- Edit usermodal -->
    <UModal v-model="edit">
      <UCard :ui="{ ring: '' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold">Edit User</h3>
            <UButton
              color="gray"
              size="xl"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="edit = false"
            />
          </div>
        </template>
        <form @submit.prevent="saveEdit">
          <label class="font-semibold text-lg">First Name *</label>
          <UInput
            v-model="user.firstName"
            class="my-2"
            size="lg"
            placeholder="First Name"
            required=""
          />
          <label class="font-semibold text-lg">Last Name *</label>
          <UInput
            v-model="user.lastName"
            class="my-2"
            size="lg"
            placeholder="Last Name"
            required=""
          />
          <label class="font-semibold text-lg">Address *</label>
          <UInput
            v-model="user.address"
            class="my-2"
            size="lg"
            placeholder="Address"
            required=""
          />
          <div class="my-4">
            <UButton
              label="Save"
              color="blue"
              class="text-base px-5 my-2"
              type="submit"
            />
          </div>
        </form>
      </UCard>
    </UModal>
  </div>
  <UNotifications />
</template>
