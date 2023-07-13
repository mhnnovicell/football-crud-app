import { defineStore } from 'pinia';

export const useToDoItemsStore = defineStore('todoitems', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
  persist: {
    paths: ['count', 'name'],
    afterRestore: (ctx) => {
      console.log(`just restored '${ctx.store.$id}'`);
    },
    debug: true,
    storage: localStorage,
  },
});
