<template>

  <!-- ==================   Detailed News Content   ==================-->  
  
  <div class="content_news">
  <!-- ===============  Take back button  ========== -->
    <div class="lessons__breadcrumb">
      <img src="@/assets/icons/arrow-right.svg" alt="icon" />
      <span class="mr-4px" @click="$router.go(-1)">Ortga qaytish</span>
    </div>
    
    <div class="content_news__date">
      <div>
        <img src="@/assets/icons/calendar.svg" alt="calendar" />
        <p>{{ news.created_at }}</p>
      </div>
      <div>
        <img src="@/assets/icons/eye.svg" alt="seen" />
        <p>{{ news.views_count }}</p>
      </div>
    </div>
    <h1 class="content_news__title">{{ news.title }}</h1>
    <img class="content_news__image" :src="news.caption" alt="" />
    <p class="content_news__description">{{ news.description }}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      news: this.$route.params.id,
    };
 },
//  methods: {
//   createdDate(){
//     const changed_item = JSON.stringify(this.news);
//     const response = changed_item.replaceAll(this.changed_item.created_at, 'crated_date');
//     return JSON.parse(response)
//   }
//  }
};
</script>

<style></style>
