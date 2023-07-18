<template>
  <!-- Main modal -->
  <div class="fixed inset-0 z-40 bg-black opacity-75"></div>
  <div
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="closeModalWithoutValue"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Sæt øvelse som aktiv
          </h3>
          <form class="space-y-6" action="#">
            <div
              class="flex flex-col w-full"
              v-for="drill in drillData"
              :key="drill.id"
            >
              <div class="w-full">
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
                  v-model="drill.name"
                ></textarea>

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
                  v-model="drill.description"
                ></textarea>
              </div>
              <div class="flex justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                      v-model="isActive"
                    />
                  </div>
                  <label
                    for="remember"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Aktiv</label
                  >
                </div>
              </div>
              <button
                @click.prevent="closeModal(drill.id)"
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Gem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToDoItemsStore } from '@/stores/todoitems.store';
import { ref, watch, computed } from 'vue';
import { supabase } from '../../supabase';

const todoStore = useToDoItemsStore();

const isActive = ref(false);

const drillData = ref(null);

await supabase
  .from('drills')
  .select()
  .eq('id', todoStore.selectedDrillId)
  .then((result) => {
    drillData.value = result.data;
  })
  .catch((err) => {
    alert(err);
  });

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const localShow = ref(false);

// Watch for changes in the prop 'show' and update the local value accordingly
watch(
  () => props.show,
  (newVal) => {
    localShow.value = newVal;
  }
);

const emit = defineEmits(['close']);

const closeModal = (id: number) => {
  todoStore.editDrill(isActive.value, id);
  localShow.value = false;
  emit('close');
};

const closeModalWithoutValue = () => {
  localShow.value = false;
  emit('close');
};
</script>
