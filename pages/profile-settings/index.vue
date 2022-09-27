<template>
  <div class="lessons mx-auto">
   
    <div class="lessons__breadcrumb">
      <img src="@/assets/icons/arrow-right.svg" alt="icon" />
      <span class="mr-4px" @click="$router.go(-1)">Ortga qaytish</span>
    </div>

    <div class="profile__settings">
       <h1>{{user_info}}</h1>
      <span class="profile__settings_title">Profil sozlamalari</span>

      <div class="profile__settings_photo">
        <img src="@/assets/icons/camera.svg" alt="icon" />
      </div>

      <div class="profile__settings_form">
        <label for="" class="form-label">Ism va familiya</label>
        <input type="text" class="form-control" />

        <label for="" class="form-label">Tug‘ilgan sana</label>
        <input type="text" class="form-control" />

        <label for="" class="form-label">Jinsi</label>
        <input type="text" class="form-control" />

        <label for="" class="form-label">Telefon raqam</label>
        <input type="text" class="form-control" />
      </div>

      <button class="profile__settings_btn">
        <span>Saqlash</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  computed:{
    ...mapState(["user_info"])
  },
  async mounted() {

  },
  methods: {
...mapActions(["POST_USER_INFO"])
  },
  created(){
    this.POST_USER_INFO();
  }
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
