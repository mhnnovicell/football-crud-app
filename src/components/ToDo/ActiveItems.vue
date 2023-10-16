<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full m-4"
    @dragover.prevent
    @dragenter="dragEnter($event)"
    @dragleave="dragLeave($event)"
    @drop="drop($event)"
    @touchmove.prevent
  >
    <h3
      class="mb-4 text-xl font-bold text-gray-900 dark:text-white"
      v-if="todoStore.activeDrills >= 1"
    >
      Aktive øvelser
    </h3>

    <div
      class="w-full p-4 my-4 text-center bg-gray-800 border-gray-700 rounded-lg shadow sm:p-8"
      v-for="drill in todoStore.activeDrills"
      :key="drill.id + drill.name"
      :class="drill.isActive ? 'shadow-md shadow-green-900' : ''"
      :draggable="true"
      @dragstart="startDrag($event, drill)"
      @dragend="endDrag($event, drill)"
      :id="drill.id + drill.name"
    >
      <div class="flex justify-end px-4 pb-4">
        <button
          @click="moveDrillDown(drill)"
          :disabled="isLastItem(drill)"
          class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          v-if="!isLastItem(drill)"
        >
          <span class="sr-only">Move drill down</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        <button
          :disabled="isFirstItem(drill)"
          @click="moveDrillUp(drill)"
          class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          v-if="!isFirstItem(drill)"
        >
          <span class="sr-only">>Move drill up</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
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

const draggedItem = ref(null);

const startDrag = (event: DragEvent, item: any): void => {
  draggedItem.value = item;
  event.dataTransfer.effectAllowed = 'move';
};

const endDrag = (event: DragEvent, item: any): void => {
  draggedItem.value = item;
};

const dragEnter = (event: DragEvent): void => {
  event.target?.classList.add('drag-over');
};

const dragLeave = (event: DragEvent) => {
  event.target?.classList.remove('drag-over');
};

const drop = (event: DragEvent) => {
  event.preventDefault();
  event.target?.classList.remove('drag-over');
  const dropIndex = getDropIndex(event.target as HTMLElement);
  const dragIndex = todoStore.activeDrills.indexOf(draggedItem.value);
  todoStore.activeDrills.splice(dragIndex, 1);
  todoStore.activeDrills.splice(dropIndex, 0, draggedItem.value);
};

const getDropIndex = (dropTarget: HTMLElement): number => {
  const dropId = dropTarget.id;
  const dropItem = todoStore.activeDrills.find(
    (item: any) => item.id === Number(dropId)
  );
  return todoStore.activeDrills.indexOf(dropItem);
};

const moveDrillUp = (drill: any) => {
  const index = todoStore.activeDrills.indexOf(drill);
  todoStore.activeDrills.splice(
    index - 1,
    0,
    todoStore.activeDrills.splice(index, 1)[0]
  );
};

const moveDrillDown = (drill: any) => {
  const index = todoStore.activeDrills.indexOf(drill);
  todoStore.activeDrills.splice(
    index + 1,
    0,
    todoStore.activeDrills.splice(index, 1)[0]
  );
};

const isFirstItem = (drill: any) => {
  return todoStore.activeDrills.indexOf(drill) === 0;
};

const isLastItem = (drill: any) => {
  return (
    todoStore.activeDrills.indexOf(drill) === todoStore.activeDrills.length - 1
  );
};
</script>
