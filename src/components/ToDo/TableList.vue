<template>
  <div
    class="relative flex overflow-x-auto shadow-md sm:rounded-lg"
    v-if="drills.length >= 1"
  >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Øvelse</th>
          <th scope="col" class="px-6 py-3">Beskrivelse</th>
          <th scope="col" class="px-6 py-3">Link</th>
          <th scope="col" class="px-6 py-3">Billede</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(drill, index) in drills"
          :key="index"
        >
          <td class="px-6 py-4">{{ drill.name }}</td>
          <td class="px-6 py-4">{{ drill.description }}</td>
          <td class="px-6 py-4"></td>

          <td class="flex items-center px-6 py-4 space-x-3">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
            <a
              @click="todoStore.removeTodo(index)"
              class="font-medium text-red-600 dark:text-red-500 hover:underline"
              >Remove</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useToDoItemsStore } from '@/stores/todoitems.store';
import { computed } from 'vue';

const todoStore = useToDoItemsStore();

const drills = computed(() => todoStore.getAllDrills);
</script>
