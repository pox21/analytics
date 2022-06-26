<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      id: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["auth"]),
    onSubmit() {
      if (!this.id || this.id.length !== 24) {
        this.error = "id сайта должен содержать 24 символа";
        return;
      }
      this.auth({ id: this.id });
    },
  },
  computed: {
    ...mapGetters(["getError"]),
  },
  watch: {
    id() {
      this.error = "";
    },
    getError() {
      this.error = this.getError;
    }
  },
};
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col items-center gap-5 border border-gray-400 rounded-md p-16 bg-slate-700"
  >
    <h2 class="text-2xl">Введите ID</h2>
    <span v-if="error" class="text-red-600 text-sm">{{ error }}</span>
    <input
      class="px-4 py-2 bg-slate-900 rounded-lg"
      type="text"
      placeholder="ID"
      v-model="id"
    />
    <button
      class="border border-gray-400 rounded-lg px-4 py-2 hover:bg-slate-600 transition-colors"
    >
      Войти
    </button>
  </form>
</template>
