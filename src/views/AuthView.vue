<template>
  <main>
    <section class="container flex flex-col items-center gap-5 p-5">
      <h1 class="text-5xl">LeadHit</h1>
      <FormAuth />
    </section>
  </main>
</template>

<script>
import FormAuth from "@/components/FormAuth.vue";

export default {
  components: { FormAuth },
  mounted() {
    if (localStorage.getItem("leadhit-site-id")) this.$router.push("/");
  },
};
</script>