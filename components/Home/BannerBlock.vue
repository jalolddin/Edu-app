<template>
  <div class="bannerBlock">
    <div class="bannerBlock-head">
      <ul>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
      </ul>
      <div class="search">
        <p>abuhanifa.com/kurslar</p>
      </div>
    </div>
    <div class="bannerBlock-content">
      <div class="bannerBlock-content-one">
        <img src="@/assets/images/bannerBlock.jpg" alt="" />
      </div>
      <div class="bannerBlock-content-two">
        <h1>Akademiyada ta’lim olmoqchimisiz?</h1>
        <p>
          Imom Abu Hanifa akademiyasida tahsil olish uchun avval ro‘yxatdan
          o‘ting. Ro‘yxatdan o‘tish uchun telefon raqam kifoya.
        </p>
        <button class="btnBlue" @click="openSignUpModal = !openSignUpModal">
          Ro‘yxatdan o‘tish
        </button>
      </div>
    </div>

    <sign-up-modal :openSignUpModal="openSignUpModal"></sign-up-modal>
  </div>
</template>

<script>
import SignUpModal from "../Modals/SignUpModal.vue";

export default {
  name: "BannerBlock",
  components: {
    SignUpModal,
  },
  data() {
    return {
      openSignUpModal: false,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
