<template>
  <div class="banner">
    <div class="container mx-auto">
      <div class="banner-item">
        <div class="banner-text">
          <h1>Imom Abu Hanifa</h1>
          <h3>xalqaro islom akademiyasi</h3>
          <p>
            Akademiyada islomiy bilimlar Imom Abu Hanifa mazhabiga muvofiq,
            moʻtadillik tamoyiliga asosan oʻrgatiladi.
          </p>
          <div class="buttons">
            <nuxt-link to="/paid-courses" class="btnBlue">
              Akademiyada o‘qish
            </nuxt-link>
            <nuxt-link to="/free-courses" class="btnWhite">
              Kurslarni ko‘rish
            </nuxt-link>
          </div>
        </div>
        <BannerBlock />
      </div>
    </div>
  </div>
</template>

<script>
import BannerBlock from "./BannerBlock";
export default {
  name: "Banner",
  components: {
    BannerBlock,
  },
};
</script>

<style></style>
