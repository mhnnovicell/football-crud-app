<template>
  <div
    class="relative flex max-w-xs overflow-x-auto shadow-md sm:rounded-lg"
    v-if="allDrills.length >= 1"
  >
    <table
      class="w-full max-w-xs text-sm text-left text-gray-500 shadow-md dark:text-gray-400"
    >
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
          v-for="drill in allDrills"
          :key="drill.id"
        >
          {{
            drill.id
          }}
          <td class="px-6 py-4 whitespace-nowrap">{{ drill.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ drill.description }}</td>
          <td class="px-6 py-4"></td>
          <td class="px-6 py-4"></td>

          <td class="flex items-center px-6 py-4 space-x-3">
            <a
              @click="openModal"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
            <a
              @click="removeTodo(drill.id)"
              class="font-medium text-red-600 dark:text-red-500 hover:underline"
              >Remove</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <EditItem v-if="showModal"></EditItem>
</template>

<script setup lang="ts">
import { useToDoItemsStore } from '@/stores/todoitems.store';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import EditItem from '@/components/ToDo/EditItem.vue';
import { supabase } from '../../supabase';

const todoStore = useToDoItemsStore();

const allDrills = ref([]);

const drills = async () => {
  const result = await todoStore.getAllDrills();
  allDrills.value = result;
};

onMounted(async () => {
  await drills();
});

onUpdated(async () => {
  await drills();
});

const getDrillsdrills = computed(() => allDrills.value);

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const removeTodo = async (id: number) => {
  return await supabase.from('drills').delete().eq('id', id);
};
</script>
