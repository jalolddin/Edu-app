<template>
  <div>
    <Header />

    <Nuxt />

    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      title: "",
    };
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
