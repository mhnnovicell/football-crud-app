<template>
  <!-- SE DENNE ARTIKEL https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a -->
  <div
    class="flex w-full p-6 m-4 bg-opacity-50 rounded shadow Pastel bg-gradient-to-tr from-violet-500 to-orange-300 backdrop-blur-xl drop-shadow-lg lg:w-3/4 lg:max-w-lg"
  >
    <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Tilføj en ny øvelse
      </h2>
      <form>
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Øvelse</label
            >
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
              v-model="drillName"
            />
          </div>

          <div class="sm:col-span-2">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Description</label
            >
            <textarea
              id="description"
              rows="8"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Your description here"
              v-model="drillDescription"
            ></textarea>
          </div>
        </div>
      </form>
      <a
        @click="addToDo"
        class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Tilføj øvelse
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToDoItemsStore } from '@/stores/todoitems.store';
import { ref } from 'vue';

const todoStore = useToDoItemsStore();

const drillName = ref('');
const drillDescription = ref('');

const addToDo = async () => {
  if (drillName.value != '') {
    await todoStore.addToDo(drillName.value, drillDescription.value);
    drillName.value = '';
    drillDescription.value = '';
  }
};
</script>
