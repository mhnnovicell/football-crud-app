import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useToDoItemsStore = defineStore({
  id: 'todoitems',
  state: () => ({
    drills: useStorage(
      'drills',
      [{ name: '', description: '' }],
      localStorage,
      {
        mergeDefaults: true,
      }
    ),
  }),
  getters: {
    getAllDrills(testTodos: any) {
      return this.drills;
    },
    drillsDelete(deleteTodo: any) {
      return this.drills.length <= 0;
    },
  },
  actions: {
    addTodo(drillName: string, drillDescription: string) {
      const newDrill = { name: drillName, description: drillDescription };
      this.drills.push(newDrill);
    },
    removeTodo(index: any) {
      this.drills.splice(index, 1);
    },
  },
});
