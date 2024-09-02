export const useTestStore = defineStore('use-test-store', {
  state: () => ({
    counter: 0,
  }),

  actions: {
    increment() {
      this.counter += 1
    }
  },
});
