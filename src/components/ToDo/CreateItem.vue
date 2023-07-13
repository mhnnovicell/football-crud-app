<template>
  <!-- SE DENNE ARTIKEL https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a -->
  <div
    class="w-full p-6 m-4 bg-opacity-50 rounded shadow Pastel bg-gradient-to-tr from-violet-500 to-orange-300 backdrop-blur-xl drop-shadow-lg lg:w-3/4 lg:max-w-lg"
  >
    <!-- <div class="mb-4">
      <h1 class="text-grey-darkest">Todo List </h1>
      <div class="flex mt-4">
        <input
          class="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
          placeholder="Add Todo"
        />
        <button
          class="p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal"
        >
          Add
        </button>
      </div>
    </div>
    <div>
      <div class="flex items-center mb-4">
        <p class="w-full text-grey-darkest">
          Add another component to Tailwind Components
        </p>
        <button
          class="p-2 ml-4 mr-2 border-2 rounded flex-no-shrink hover:text-white text-green border-green hover:bg-green"
        >
          Done
        </button>
        <button
          class="p-2 ml-2 border-2 rounded flex-no-shrink text-red border-red hover:text-white hover:bg-red"
        >
          Remove
        </button>
      </div>
      <div class="flex items-center mb-4">
        <p class="w-full line-through text-green">
          Submit Todo App Component to Tailwind Components
        </p>
        <button
          class="p-2 ml-4 mr-2 border-2 rounded flex-no-shrink hover:text-white text-grey border-grey hover:bg-grey"
        >
          Not Done
        </button>
        <button
          class="p-2 ml-2 border-2 rounded flex-no-shrink text-red border-red hover:text-white hover:bg-red"
        >
          Remove
        </button>
      </div>
    </div> -->

    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product {{ drillName }}
        </h2>
        <form>
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Product Name</label
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
            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Brand</label
              >
              <input
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product brand"
              />
            </div>
            <div class="w-full">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Price</label
              >
              <input
                type="number"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
              />
            </div>
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Category</label
              >
              <select
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>Select category</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div>
            <div>
              <label
                for="item-weight"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Item Weight (kg)</label
              >
              <input
                type="number"
                name="item-weight"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="12"
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
          @click="AddTodo"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          test
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useToDoItemsStore } from '@/stores/todoitems.store';
import { computed, ref } from 'vue';

const todoStore = useToDoItemsStore();

const drillName = ref('');
const drillDescription = ref('');

const drills = computed(() => todoStore.getAllDrills);

const AddTodo = () => {
  if (drillName.value != '') {
    todoStore.addTodo(drillName.value, drillDescription.value);
    drillName.value = '';
    drillDescription.value = '';
  }
};
</script>
