import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useToDoItemsStore = defineStore(
  'todoitems',
  () => {
    const someState = ref('hello pinia');
    return { someState };
  },
  {
    persist: { storage: localStorage, paths: ['someState'] },
  }
);
