import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { supabase } from '../supabase';

export const useToDoItemsStore = defineStore({
  id: 'todoitems',
  state: () => ({
    drills: [{ drillName: '', drillDescription: '' }],
  }),
  getters: {
    drillsDelete(deleteTodo: any) {
      return this.drills.length <= 0;
    },
  },
  actions: {
    async getAllDrills(testTodos: any) {
      const { data, error } = await supabase.from('drills').select();
      return (this.drills = data);
    },
    async addTodo(drillName: string, drillDescription: string) {
      const newDrill = [{ name: drillName, description: drillDescription }];
      const { data } = await supabase.from('drills').insert(...newDrill);
      return data;
    },
  },
});
