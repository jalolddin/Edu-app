<template>
  <div>
    <div class="buyModal" :class="openBuyCourseModal == true ? 'active' : ''">
      <div class="course__info_details_video_body_watch">
        <iframe
          :src="
            item && item.caption && item.caption.path ? item.caption.path : ''
          "
          frameborder="0"
          allow="autoplay;"
          title="1-dars"
          class="course__info_details_video_body_watch_img"
        ></iframe>
        <!-- <video :src="item.caption.path"  v-if="item && item.caption && item.caption.is_video"></video> -->
      </div>

      <div class="course__info_details_video_body_title">{{ item.price }}</div>
      <div class="course__info_details_video_body_subtitle">
        Kurs {{ item.study_student_count }} marta xarid qilingan
      </div>

      <div style="border-bottom: 2px solid #ebebeb"></div>

      <div class="plastic_card"></div>

      <div class="video__player" v-if="isVideoPopUp">
        <div class="video__player_body">
          <video src="@/assets/videos/video3.mp4" controls></video>
          <img
            src="@/assets/icons/close.svg"
            alt="icon"
            class="close-btn"
            @click="isVideoPopUp = !isVideoPopUp"
          />
        </div>
      </div>

      <!-- <div style="width: 100%; height: 60px;"></div> -->
      
      <!-- <button class="buyModal_btn2">
        <img src="@/assets/icons/add.svg" alt="add" />
        <span>Yangi karta qo‘shish</span>
      </button> -->

      <button class="buyModal_btn" @click="startCourse()">Tasdiqlash</button>
    </div>

    <div
      class="overlay"
      @click="closeDialog()"
      :class="openBuyCourseModal ? 'active' : ''"
    ></div>
  </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

import { mapState, mapActions } from "vuex";

export default {
  components: {
    VuePhoneNumberInput,
  },
  props: {
    item: {
      type: [Object],
      required: true,
    },
    openBuyCourseModal: {
      type: [Boolean],
      required: true,
    },
  },
  data() {
    return {
      isVideoPopUp: false,
    };
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapState([]),
  },
  methods: {
    ...mapActions(["POST_START_COURSE"]),
    closeDialog() {
      this.$parent.openBuyCourseModal = !this.$parent.openBuyCourseModal;
    },

    async startCourse() {
      await this.POST_START_COURSE({ course_id: this.$route.params.id });
      this.$router.push({
        name: "paid-courses-id-course_id",
        params: { id: this.$route.params.id, course_id: this.$route.params.id },
      });
    },
  },
};
</script>

<style></style>
