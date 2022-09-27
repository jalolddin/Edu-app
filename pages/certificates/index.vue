<template>
  <div class="lessons mx-auto">
    <div class="lessons__breadcrumb">
      <img src="@/assets/icons/arrow-right.svg" alt="icon" />
      <span class="mr-4px" @click="$router.go(-1)">Ortga qaytish</span>
    </div>

    <div class="certificates">
      <span class="certificates_title">Sertifikatlarim</span>

      <div class="certificates_block"></div>

      <button class="certificates_btn">
        <img src="@/assets/icons/download.svg" alt="icon" />
        <span>Yuklab olish</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async mounted() {},
  methods: {},
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
