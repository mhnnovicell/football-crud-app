<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full m-4"
    @drop="onDrop($event, 1)"
    @dragenter.prevent
    @dragover.prevent
  >
    <h3
      class="mb-4 text-xl font-bold text-gray-900 dark:text-white"
      v-if="todoStore.activeDrills >= 1"
    >
      Aktive øvelser
    </h3>

    <div
      class="w-full p-4 my-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      v-for="drill in todoStore.activeDrills"
      :key="drill.id + drill.name"
      :class="drill.isActive ? 'shadow-md shadow-green-900' : ''"
      draggable="true"
      @dragstart="startDrag($event, drill)"
    >
      <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {{ drill.name }}
      </h5>
      <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        {{ drill.description }}
      </p>
      <div
        class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
      >
        <a
          @click="toggleActiveStatus(false, drill.id)"
          class="inline-flex items-center justify-center w-2/3 p-2 text-white rounded-lg shadow-sm cursor-pointer sm:w-auto shadow-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-3 text-white w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              class="text-red-500"
            />
          </svg>

          <div class="text-left">
            <div class="-mt-1 font-sans text-sm font-semibold">
              Fjern aktiv øvelse
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToDoItemsStore } from '@/stores/todoitems.store';
import { ref, watchEffect } from 'vue';

const todoStore = useToDoItemsStore();

watchEffect(async () => {
  todoStore.getAllActiveDrills();
});

const toggleActiveStatus = (activeBool: boolean, id: number) => {
  todoStore.editDrill(activeBool, id);
};

const startDrag = (event: DragEvent, item) => {
  console.log(event, item, 'console log');
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemID', item.id))
  }
};

const onDrop = (event, list) => {
const itemID = event.dataTransfer.getData('itemID')
};
</script>
