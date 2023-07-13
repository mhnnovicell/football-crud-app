import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useStorage } from '@vueuse/core';

export const useToDoItemsStore = defineStore('todoitems', {
  state: () => ({ drillDescription: '', drillName: '' }),
  getters: {},
  actions: {
    setDrillName(drillName: string) {
      console.log(this.drillName, 'this.drillname');
      this.drillName = drillName;
    },
  },
  persist: {
    paths: ['drillDescription', 'drillName'],
    afterRestore: (ctx) => {
      console.log(`just restored '${ctx.store.$id}'`);
    },
    debug: true,
    storage: localStorage,
  },
});

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);
    function increment() {
      count.value++;
    }

    return { count, doubleCount, increment };
  },
  {
    persist: true,
  }
);

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    todos: useStorage('todos', [], localStorage, { mergeDefaults: true }),
  }),
  getters: {
    getAllTodos(testTodos: any) {
      return this.todos;
    },
    todoEmpty(deleteTodo: any) {
      return this.todos.length <= 0;
    },
  },
  actions: {
    addTodo(todo: any) {
      this.todos.push(todo);
    },
    removeTodo(index: any) {
      this.todos.splice(index, 1);
    },
  },
});
