<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const CreateItem = defineAsyncComponent(
  () => import('./components/ToDo/CreateItem.vue')
);

const TableList = defineAsyncComponent(
  () => import('./components/ToDo/TableList.vue')
);
</script>

<template>
  <Suspense>
    <!-- component with nested async dependencies -->
    <div
      class="flex flex-wrap items-center justify-center w-full h-screen font-sans bg-gradient-to-t from-gray-700 via-gray-900 to-black"
    >
      <CreateItem />
      <TableList />
    </div>
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <div
        class="items-center justify-center w-full h-screen text-center bg-gradient-to-t from-gray-700 via-gray-900 to-black align-center"
      >
        <div class="flex items-center justify-center w-full h-screen">
          <div
            class="animate-spin flex items-center justify-center w-6 h-6 border-[3px] border-current border-t-transparent text-purple-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </template>
  </Suspense>
</template>
