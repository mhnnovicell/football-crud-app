<template>
  <div
    class="w-full p-6 m-4 bg-opacity-50 rounded shadow Pastel bg-gradient-to-tr from-violet-500 to-orange-300 backdrop-blur-xl drop-shadow-lg lg:w-3/4 lg:max-w-lg"
  >
    <div class="mb-4">
      <h1 class="text-grey-darkest">
        Todo List {{ todoitemsStore.someState }}
      </h1>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToDoItemsStore } from '@/stores/todoitems.store';

const todoitemsStore = useToDoItemsStore();
</script>
