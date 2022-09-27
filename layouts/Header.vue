<template>
  <div class="header">
    <div class="container mx-auto">
      <div class="header-item">
        <nuxt-link to="/" class="header-logo">
          <img src="@/assets/images/headerLogo.png" alt="" />
          <div>
            <h3>Abu Hanifa</h3>
            <p>Islom akademiyasi</p>
          </div>
        </nuxt-link>
        <div class="header-menu">
          <ul>
            <li :class="checkRouter('index') ? 'header-menu__choosed' : ''">
              <nuxt-link to="/">Biz haqimizda</nuxt-link>
            </li>
            <li
              :class="checkRouter('paid-courses') ? 'header-menu__choosed' : ''"
            >
              <nuxt-link to="/paid-courses">Akademiya darslari</nuxt-link>
            </li>
            <li
              :class="checkRouter('free-courses') ? 'header-menu__choosed' : ''"
            >
              <nuxt-link to="/free-courses">Erkin kurslar</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="header-right">
          <div class="login">
            <div class="login-inside" @click="checkIfSignedIn()">
              <img src="@/assets/icons/login.svg" alt="" />
              <span v-if="!hasAccess">Kirish</span>
              <div v-else class="dropdown" id="profileButton">
                <span>Profil</span>

                <div
                  class="dropdown__content"
                  :style="dropdownShow ? 'display: block;' : ''"
                >
                  <div
                    class="dropdown__content_row"
                    @click="$router.push({ name: 'profile-settings' })"
                  >
                    <div>
                      <img src="@/assets/icons/profile/user.svg" alt="user" />
                      <span>Profil sozlamalari</span>
                    </div>
                    <img
                      src="@/assets/icons/profile/arrow-right.svg"
                      alt="arrow-right"
                    />
                  </div>

                  <!-- <div class="line"></div>

                  <div
                    class="dropdown__content_row"
                    @click="$router.push({ name: 'plastic-cards' })"
                  >
                    <div>
                      <img
                        src="@/assets/icons/profile/plastik_card.svg"
                        alt="plastik_card"
                      />
                      <span>Mening kartalarim</span>
                    </div>
                    <img
                      src="@/assets/icons/profile/arrow-right.svg"
                      alt="arrow-right"
                    />
                  </div> -->

                  <div class="line"></div>

                  <div class="dropdown__content_row">
                    <div>
                      <img src="@/assets/icons/profile/moon.svg" alt="moon" />
                      <span>Tungi rejim</span>
                    </div>
                    <div
                      class="checkbox"
                      @click="darkMode = !darkMode"
                      :style="darkMode ? 'background: #00BCD4;' : ''"
                    >
                      <div v-if="darkMode"></div>
                      <img src="@/assets/icons/profile/btt.png" alt="btt" />
                    </div>
                  </div>

                  <div class="line"></div>

                  <div
                    class="dropdown__content_row"
                    @click="$router.push({ name: 'certificates' })"
                  >
                    <div>
                      <img src="@/assets/icons/profile/notes.svg" alt="user" />
                      <span>Sertifikatlarim</span>
                    </div>
                    <img
                      src="@/assets/icons/profile/arrow-right.svg"
                      alt="arrow-right"
                    />
                  </div>

                  <div class="line"></div>

                  <div
                    class="dropdown__content_row"
                    @click="$router.push({ name: 'news' })"
                  >
                    <div>
                      <img src="@/assets/icons/profile/news.svg" alt="user" />
                      <span>Yangiliklar</span>
                    </div>
                    <img
                      src="@/assets/icons/profile/arrow-right.svg"
                      alt="arrow-right"
                    />
                  </div>

                  <div class="line"></div>

                  <div class="dropdown__content_row" @click="LogOut()">
                    <div>
                      <img src="@/assets/icons/profile/exit.svg" alt="user" />
                      <span>Profildan chiqish</span>
                    </div>
                    <img
                      src="@/assets/icons/profile/arrow-right.svg"
                      alt="arrow-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>

          <div class="lang">
            <img src="@/assets/images/UZ.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <sign-up-modal :openSignUpModal="openSignUpModal"></sign-up-modal>
  </div>
</template>

<script>
import SignUpModal from "@/components/Modals/SignUpModal.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    SignUpModal,
  },
  data() {
    return {
      openSignUpModal: false,
      dropdownShow: false,
      darkMode: false,
    };
  },
  mounted() {},
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["hasAccess"]),
    refreshIntervalId: {
      get() {
        return this.$store.state.refreshIntervalId;
      },
      set(value) {
        this.$store.commit("SET_REFRESH_INTERVAL", value);
      },
    },
  },
  methods: {
    ...mapActions(["POST_LOG_OUT"]),
    checkIfSignedIn() {
      if (this.hasAccess) {
        this.dropdownShow = !this.dropdownShow;
      } else if(!this.hasAccess) {
        this.openSignUpModal = !this.openSignUpModal;
      }
    },
    checkRouter(value) {
      if (value == "index") {
        if (
          this.$route.name == "index" ||
          this.$route.name == "profile-settings" ||
          this.$route.name == "home" ||
          this.$route.name == "news" ||
          this.$route.name == "certificates" ||
          this.$route.name == "plastic-cards"
        ) {
          return true;
        } else {
          return false;
        }
      } else if (value == "paid-courses") {
        if (
          this.$route.name == "paid-courses" ||
          this.$route.name == "paid-courses-id" || 
          this.$route.name == "paid-courses-id-course_id"
        ) {
          return true;
        } else {
          return false;
        }
      } else if (value == "free-courses") {
        if (
          this.$route.name == "free-courses" ||
          this.$route.name == "free-courses-name" ||
          this.$route.name == "free-courses-name-id"
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    async LogOut() {
      await this.POST_LOG_OUT();
      clearInterval(this.refreshIntervalId);
      this.$children[4].time = 1 * 60;
    },
  },
};
</script>

<style></style>
