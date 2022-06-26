import axios from "axios";
import { createStore } from "vuex";
import router from "../router";

const apiUrl = "https://track-api.leadhit.io/client/test_auth";
const apiKey = "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      id: localStorage.getItem("leadhit-site-id") || null,
      error: null,
    };
  },
  getters: {
    getId: (state) => state.id,
    getError: (state) => state.error,
  },
  mutations: {
    setId: (state, id) => state.id = id,
    setError: (state, error) => state.error = error,
  },
  actions: {
    async auth({ commit }, data) {
      try {
        const resp = await axios({
          url: apiUrl,
          method: "GET",
          headers: {
            "Api-Key": apiKey,
            "Leadhit-Site-Id": data.id,
          },
        });
        if (resp.data.message === "ok") {
          commit("setError", null);
          commit("setId", data.id);
          localStorage.setItem("leadhit-site-id", data.id);
          router.push("/");
        }
      } catch (e) {
        console.log(e.message);
        commit("setError", "Не верный ID");
      }
    },
  },
});
