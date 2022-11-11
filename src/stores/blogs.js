import { defineStore } from "pinia";

export const useBlogStore = defineStore({
  id: "blogs",
  state: () => ({
    blogs: [],
  }),
});
