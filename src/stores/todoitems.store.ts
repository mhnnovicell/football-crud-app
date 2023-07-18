import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useToDoItemsStore = defineStore({
  id: 'todoitems',
  state: () => ({
    drills: [{ name: '', description: '' }],
    selectedDrillId: 0,
    activeDrills: [{ name: '', description: '', isActive: false }],
  }),
  getters: {
    drillsDelete(drill: any) {
      return this.drills.length <= 0;
    },
  },
  actions: {
    async getAllDrills() {
      const { data } = await supabase.from('drills').select();
      this.drills = data;
    },
    async addToDo(name: string, description: string, isActive: boolean) {
      const newDrill = { name, description, isActive };
      const { data } = await supabase.from('drills').insert(newDrill);
      this.drills.push(newDrill);
      return data;
    },
    async deleteDrill(id: number) {
      await supabase.from('drills').delete().eq('id', id);
      return this.getAllDrills();
    },
    async editDrill(activeValue: boolean, id: number) {
      await supabase
        .from('drills')
        .update({ isActive: activeValue })
        .eq('id', id)
        .select();
      return this.getAllDrills();
    },

    async getAllActiveDrills() {
      const { data } = await supabase
        .from('drills')
        .select('*')
        .filter('isActive', 'eq', true);

      console.log(data, 'datafromallactivedrills');
      this.activeDrills = data;
    },
  },
});
