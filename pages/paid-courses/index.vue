<template>
  <div class="lessons mx-auto">
    <div class="lessons__title">Akademiya darslari</div>

    <div class="lessons__list">
      <div
        class="rectangle__card"
        v-for="(item, index) in academy_courses"
        :key="index"
        @click="goToInside(item.id)"
      >
        <div class="rectangle__card_info">
          <img :src="item.icon" :alt="item.title" />
        </div>

        <span class="rectangle__card_title">{{ item.title }}</span>

        <div class="rectangle__card_stage">
          <span class="rectangle__card_stage_info"></span>
          <div class="rectangle__card_stage_progress"></div>
        </div>

        <div class="rectangle__card_lesson">
          <div class="rectangle__card_lesson_info">
            <div class="rectangle__card_lesson_text">
              <div>
                <img src="@/assets/icons/book.svg" alt="icon" />
              </div>
              <span>{{ item.all_lesson_counts }}</span>
            </div>
            <div class="rectangle__card_lesson_text">
              <div>
                <img src="@/assets/icons/clock.svg" alt="icon" />
              </div>
              <span>{{ item.all_lesson_times }}</span>
            </div>
            <div class="rectangle__card_lesson_text">
              <div>
                <img src="@/assets/icons/teacher.svg" alt="icon" />
              </div>
              <span>{{ item.all_study_students }}</span>
            </div>
          </div>

          <img src="@/assets/icons/arrow-right.svg" alt="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      lessonsList: [],
    };
  },
  computed: {
    ...mapState(["academy_courses"]),
    // independent_courses: {
    // 	get () {
    // 		return this.$store.state.independent_courses
    // 	},
    // 	set (value) {
    // 		this.$store.commit('SET_INDEPENDENT_COURSES', value)
    // 	}
    // }
  },
  methods: {
    ...mapActions(["GET_ACADEMY_COURSES_LIST"]),
    goToInside(index) {
      this.$router.push({ name: "paid-courses-id", params: { id: index } });
    },
  },
  async created() {
    await this.GET_ACADEMY_COURSES_LIST();
  },
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
