<template>
  <div class="lessons mx-auto">
    <div class="lessons__breadcrumb">
      <img src="@/assets/icons/arrow-right.svg" alt="icon" />
      <span class="mr-4px" @click="$router.go(-1)">Ortga qaytish</span>
    </div>

    <!--  ========   News  =======  -->

    <div class="news">
      <span class="news_title">Yangiliklar</span>
      <div class="news__list">
        <!--  ============== News card ================== -->

        <template v-for="item in news_cards">
          <div
            class="news__block"
            v-for="info in item.data"
            @click="goInside(info.title, info)"
            v-bind:key="info.id"
          >
            <img class="news__image" :src="info.caption" alt="ws" />
            <h1 class="news__title" v-html="info.title"></h1>
            <p class="news__description">
              {{ info.description && info.description.split(".")[0] + "." }}
            </p>
            <p class="news__date">{{ info.created_at }}</p>
          </div>
        </template>
      </div>
    </div>

    <!--  ======   Loading Icon  ====== -->

    <button class="lessons__loading_btn" style="margin-bottom: 72px">
      <img src="@/assets/icons/loading.svg" alt="icon" />
      <span>Yana ko‘rsatish</span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      newsList: [],
    };
  },
  computed: {
    ...mapState(["news_cards"]),
  },
  methods: {
    ...mapActions(["GET_NEWS_INFORMATION"]),
    goInside(index, id) {
      this.$router.push({ name: "news-slug", params: { slug: index, id: id } });
    },
  },

  created() {
    this.GET_NEWS_INFORMATION();
  },
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
