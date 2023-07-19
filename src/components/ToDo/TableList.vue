<template>
  <template v-if="todoStore.drills.length >= 1">
    <div class="relative flex m-4 overflow-x-auto shadow-md sm:rounded-lg">
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
            class="bg-gray-800 border-b border-gray-700 hover:bg-gray-600"
            v-for="drill in sortedDrills"
            :key="drill.id"
            :class="
              drill.isActive
                ? 'bg-green-950 text-white border-gray-700 dark:hover:bg-gray-600'
                : ''
            "
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ drill.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ drill.description }}</td>
            <td class="px-6 py-4"></td>
            <td class="px-6 py-4"></td>
            <td class="flex items-center px-6 py-4 space-x-3">
              <a
                @click="toggleModal(drill.id)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Rediger</a
              >
              <a
                @click="todoStore.deleteDrill(drill.id)"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >Fjern</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EditItemModal
      :show="showModal"
      @close="toggleModal"
      v-if="showModal"
    ></EditItemModal>
  </template>
</template>

<script setup lang="ts">
import { useToDoItemsStore } from '@/stores/todoitems.store';
import { computed, ref, watchEffect } from 'vue';
import EditItemModal from '@/components/ToDo/EditItemModal.vue';
import { supabase } from '../../supabase';

const todoStore = useToDoItemsStore();

watchEffect(async () => {
  await todoStore.getAllDrills();
});

const showModal = ref(false);

const emit = defineEmits(['toggleModal']);

const toggleModal = (drillId: number) => {
  emit('toggleModal', showModal.value);
  showModal.value = !showModal.value;
  todoStore.selectedDrillId = drillId;
};

const sortedDrills = computed(() => {
  return todoStore.drills.sort((a, b) => {
    if (a.isActive && !b.isActive) {
      return -1;
    } else if (!a.isActive && b.isActive) {
      return 1;
    } else {
      return 0;
    }
  });
});
</script>
