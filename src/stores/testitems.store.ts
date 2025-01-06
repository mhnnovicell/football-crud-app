import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://crud-football.pockethost.io'); // Replace with your PocketBase URL

export const useToDoItemsStore = defineStore({
  id: 'todoitems',
  state: () => ({
    drills: [{ name: '', description: '' }],
    selectedDrillId: 0,
    activeDrills: [{ name: '', description: '', id: 0, isActive: false }],
  }),
  getters: {
    drillsDelete() {
      return this.drills.length <= 0;
    },
  },
  actions: {
        async authenticate(email, password) {
      const authData = await pb.collection('_superusers').authWithPassword(email, password);
      console.log(authData, "authdata")
      this.authToken = authData.token;
      pb.authStore.save(authData.token, authData.user);
    },
    async getAllDrills() {
      const drills = await pb.collection('drills').getFullList({ sort: '-created' });
      this.drills = drills.map((drill) => ({
        id: drill.id,
        name: drill.name,
        description: drill.description,
        isActive: drill.isActive,
      }));
    },
    async addToDo(name, description, isActive) {
      const newDrill = { name, description, isActive };
      const createdDrill = await pb.collection('drills').create(newDrill);
      this.drills.push({
        id: createdDrill.id,
        ...newDrill,
      });
      return createdDrill;
    },
    async deleteDrill(id) {
      await pb.collection('drills').delete(id);
      return this.getAllDrills();
    },
    async editDrill(activeValue, id) {
      const updatedDrill = await pb
        .collection('drills')
        .update(id, { isActive: activeValue });

      return updatedDrill;
    },
    async getAllActiveDrills() {
      const drills = await pb
        .collection('drills')
        .getFullList({
          filter: 'isActive = true',
          requestKey: null
        });

      this.activeDrills = drills.map((drill) => ({
        id: drill.id,
        name: drill.name,
        description: drill.description,
        isActive: drill.isActive,
      }));
    },
    async updateActiveDrillsOrder(id, order) {
      const updatedDrill = await pb.collection('drills').update(id, { order });
      const drills = await pb.collection('drills').getFullList({
        filter: 'isActive = true',
        sort: 'order',
      });

      this.activeDrills = drills.map((drill) => ({
        id: drill.id,
        name: drill.name,
        description: drill.description,
        isActive: drill.isActive,
      }));
      return updatedDrill;
    },
        async getDrillById(id) {
      try {
        const drill = await pb.collection('drills').getOne(id);
        return drill;
      } catch (err) {
        console.error('Error fetching drill:', err);
        throw err;
      }
    },
  },
});
