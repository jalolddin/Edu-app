<template>
  <div class="lessons mx-auto">
    <div class="lessons__breadcrumb">
      <img src="@/assets/icons/arrow-right.svg" alt="icon" />
      <nuxt-link
        tag="span"
        class="active mr-4px cursor-pointer"
        :to="{ name: 'free-courses' }"
      >
        Erkin kurslar
      </nuxt-link>
      <span class="mr-4px"
        >/
        {{
          filtered_courses &&
          filtered_courses.data &&
          filtered_courses.data[0] &&
          filtered_courses.data[0].category &&
          filtered_courses.data[0].category.name
            ? filtered_courses.data[0].category.name
            : ""
        }}
      </span>
    </div>

    <div class="lessons__recommended" style="margin-bottom: 24px">
      <div class="lessons__navigation">
        <span class="lessons__subtitle">
          {{
            filtered_courses &&
            filtered_courses.data &&
            filtered_courses.data[0] &&
            filtered_courses.data[0].category &&
            filtered_courses.data[0].category.name
              ? filtered_courses.data[0].category.name
              : ""
          }}
        </span>
      </div>
      <div
        class="square__card"
        v-for="(item, index) in filtered_courses.data"
        :key="index"
        @click="goToInside(item.id)"
      >
        <img class="square__card_image" :src="item.caption" :alt="item.title" />

        <span
          class="square__card_price"
          :style="'color: ' + item.priceColor + ';'"
          >{{ item.price }}</span
        >

        <span class="square__card_title">{{ item.title }}</span>

        <div class="square__card_lesson">
          <div class="square__card_lesson_info">
            <div class="square__card_lesson_text">
              <div>
                <img src="@/assets/icons/book.svg" alt="icon" />
              </div>
              <span>{{ item.lesson_count }} ta dars</span>
            </div>
            <div class="square__card_lesson_text">
              <div>
                <img src="@/assets/icons/clock.svg" alt="icon" />
              </div>
              <span>{{ item.time_count }}</span>
            </div>
          </div>

          <img src="@/assets/icons/arrow-right.svg" alt="icon" />
        </div>
      </div>
    </div>

    <button class="lessons__loading_btn" style="margin-bottom: 72px" @click="showNextPage()" v-if="totalPages != currentPage">
      <img src="@/assets/icons/loading.svg" alt="icon" />
      <span>Yana ko‘rsatish</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      lessonsList: [],
      totalPages: 1,
      currentPage: 1
    };
  },
  async mounted() {},
  computed: {
    ...mapState(["filtered_courses"]),
  },
  methods: {
    ...mapActions(["GET_FILTERED_COURSES_LIST", "GET_NEXT_FILTERED_COURSES_LIST"]),
    goToInside(index) {
      this.$router.push({
        name: "free-courses-name-id",
        params: { name: this.$route.params.name, id: index },
      });
    },
    async showNextPage(){
      await this.GET_NEXT_FILTERED_COURSES_LIST({category_id: this.$route.params.name, per_page: 10, page: 2})
    }
  },
  async created() {
    await this.GET_FILTERED_COURSES_LIST({
      category_id: this.$route.params.name,
      per_page: 10,
      page: 1,
    });
    this.currentPage = this.filtered_courses.current_page
    this.totalPages = this.filtered_courses.last_page
  },
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
