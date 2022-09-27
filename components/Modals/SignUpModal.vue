<template>
  <div>
    <div class="popup" :class="openSignUpModal == true ? 'active' : ''">
      <div class="popup_title">Platformaga kirish</div>

      <div class="popup_form">
        <label for="" class="form-label">Telefon raqam</label>
        <VuePhoneNumberInput
          v-model="userInfo.phone"
          class="form-control popup_form_tel"
          default-country-code="UZ"
          @update="phoneData = $event"
          :only-countries="['UZ']"
          :translations="{
            countrySelectorLabel: 'Mamlakat kodi',
            countrySelectorError: 'Xatolik',
            phoneNumberLabel: 'Telefon raqami',
            example: 'Misol:',
          }"
        />
      </div>

      <button class="popup_btn" @click="sendSmsFunc()">Davom etish</button>

      <div class="popup_else_line">
        <div class="line"></div>
        <span class="else">YOKI</span>
        <div class="line"></div>
      </div>

      <div class="popup__signup_else">
        <button class="popup__signup_else_btn">
          <img src="@/assets/icons/apple.svg" alt="apple" />
          <span>Apple</span>
        </button>
        <button class="popup__signup_else_btn" @click="signInUsingGoogle()">
          <img src="@/assets/icons/google.svg" alt="google" />
          <span>Google</span>
        </button>
      </div>
    </div>

    <div
      class="popup"
      :class="openVerifyCodeModal == true ? 'active' : ''"
      style="height: 277px"
    >
      <div class="popup_title">Kodni kiriting</div>

      <div class="popup__verify_code_title">
        <span>Tel.raqam: </span>
        <span>{{ phoneData.formatInternational }}</span>
        <img
          src="@/assets/icons/edit-small.svg"
          alt="google"
          @click="editPhone()"
        />
      </div>
      <div class="popup__verify_code">
        <input
          v-model="inputCode.first"
          type="text"
          maxlength="1"
          id="firstCodeVerifyInput"
          class="form-control"
          @keyup="focusOnNextInput(inputCode.first, 'secondCodeVerifyInput')"
        />
        <input
          v-model="inputCode.second"
          type="text"
          maxlength="1"
          id="secondCodeVerifyInput"
          class="form-control"
          @keyup="focusOnNextInput(inputCode.second, 'thirdCodeVerifyInput')"
        />
        <input
          v-model="inputCode.third"
          type="text"
          maxlength="1"
          id="thirdCodeVerifyInput"
          class="form-control"
          @keyup="focusOnNextInput(inputCode.third, 'fourthCodeVerifyInput')"
        />
        <input
          v-model="inputCode.fourth"
          type="text"
          maxlength="1"
          id="fourthCodeVerifyInput"
          class="form-control"
        />
      </div>

      <div class="popup__verify_code_subtitle" v-if="sendTimeNotExpired">
        Kodni <span id="countdown" class="text-info" v-if="time != 0"></span> soniyadan so‘ng
        qayta yuborish mumkin
      </div>

      <div class="popup__verify_code_subtitle" v-if="!sendTimeNotExpired">
        Kod kelmadimi? Unda ushbu kodni
        <span class="text-info cursor-pointer" @click="sendCodeAgain()">qayta yuborish</span>
        tugmasini bosing
      </div>
    </div>

    <div
      class="popup"
      :class="openSignUpDataFill == true ? 'active' : ''"
      style="height: 493px"
    >
      <div class="popup_title">Ma’lumotlarni kiriting</div>

      <div class="popup_form_box">
        <label for="" class="form-label">Ism familiya</label>
        <input type="text" class="form-control" v-model="userData.fullname" />
        <img src="@/assets/icons/user.svg" alt="google" />
      </div>

      <div class="popup_form_box">
        <label for="" class="form-label">Tug‘ilgan sana</label>
        <input type="date" class="form-control" v-model="userData.birthday" />
        <img src="@/assets/icons/calendar.svg" alt="google" />
      </div>

      <div class="popup_form_box">
        <label for="" class="form-label">Jinsingiz</label>
        <div class="form_radio">
          <div class="form_radio_input" @click="chooseGender(true)">
            <input
              type="radio"
              name="gender"
              class="form-control"
              v-model="userData.gender"
              :value="true"
            /><span>Erkak</span>
          </div>
          <div class="form_radio_input" @click="chooseGender(false)">
            <input
              type="radio"
              name="gender"
              class="form-control"
              v-model="userData.gender"
              :value="false"
            /><span>Ayol</span>
          </div>
        </div>
      </div>

      <button class="popup_btn" @click="sendUserData()" style="margin-top: 0px">
        Tasdiqlash
      </button>
    </div>

    <div
      class="overlay"
      @click="closeDialog()"
      :class="
        openSignUpModal || openVerifyCodeModal || openSignUpDataFill
          ? 'active'
          : ''
      "
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
    openSignUpModal: {
      type: [Boolean],
      required: true,
    },
  },
  data() {
    return {
      time: 1 * 60, //minutes * 60 seconds,
      isLogin: false,
      openVerifyCodeModal: false,
      openSignUpDataFill: false,
      userInfo: {
        phone: "",
      },
      phoneData: {},
      userData: { fullname: "", birthday: "", gender: "" },
      inputCode: {
        first: "",
        second: "",
        third: "",
        fourth: "",
      },
      smsCode: "",
      sendTimeNotExpired: true,
    };
  },
  mounted() {},
  watch: {
    inputCode: {
      async handler(newValue) {
        let a = "",
          b = "",
          c = "",
          d = "";
        if (newValue.first != "") {
          a = newValue.first;
        }
        if (newValue.second != "") {
          b = newValue.second;
        }
        if (newValue.third != "") {
          c = newValue.third;
        }
        if (newValue.fourth != "") {
          d = newValue.fourth;
        }
        this.smsCode = await (a + b + c + d);
      },
      deep: true,
    },
    async smsCode(newValue, oldValue) {
      if (newValue.length == 4) {
        await this.checkSmsFunc();
      }
    },
  },
  computed: {
    ...mapState(["user"]),
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
    ...mapActions([
      "POST_SEND_SMS",
      "POST_CHECK_SMS_CODE",
      "POST_AUTH_GET_INFO",
      "POST_SEND_USER_DATA",
    ]),
    chooseGender(value){
      this.userData.gender = value
    },
    closeDialog() {
      this.$parent.openSignUpModal = false;
    },
    async signInUsingGoogle() {
      // const googleUser = await this.$gAuth.signIn();
      // console.log('Google user: ', googleUser)

      // console.log(this.$auth)
      // this.$auth.loginWith("google", { params: { prompt: "select_account" } });
      // console.log(this.$auth)
    },
    async sendSmsFunc() {
      let response = await this.POST_SEND_SMS({
        username: this.phoneData.formattedNumber,
        app_type: "web",
      });
      if(response && response.status == 200){
        this.closeDialog();
        this.openVerifyCodeModal = true;
        this.countDown();
      }else{
        this.$toast.error(response.data.message)
      }
    },
    async checkSmsFunc() {
      console.log("done")
      let checksms_response = await this.POST_CHECK_SMS_CODE({
        username: this.phoneData.formattedNumber,
        code: this.smsCode,
      });
      console.log(checksms_response)
      if(checksms_response && checksms_response.status == 200){
        let response = await this.POST_AUTH_GET_INFO();
        console.log(response)
        if(response && response.status == 200){
          this.openVerifyCodeModal = false;
          clearInterval(this.refreshIntervalId);
          this.inputCode = { first: "", second: "", third: "", fourth: "" };
    
          if (
            response && response.data && response.data.data && 
            response.data.data.fullname == null &&
            response.data.data.birthday == null &&
            response.data.data.gender == null
          ) {
            this.openSignUpDataFill = true;
          } else {
            this.$router.push("/paid-courses");
          }
        }else{
          this.$toast.error(response.data.message)
        }
      }else{
        this.$toast.error(checksms_response.data.message)
      }
    },
    async sendUserData() {
      let response = await this.POST_SEND_USER_DATA(this.userData);
      
      if (response && response.status == 200) {
        this.$router.push("/paid-courses");
        this.openSignUpDataFill = false;
        this.userData = { fullname: "", birthday: "", gender: "" }
      }else if(response && response.status == 422){
        this.$toast.error(response.data.message)
      }

    },

    focusOnNextInput(first, last) {
      if (first.length) {
        document.getElementById(last).focus();
      }
    },
    countDown() {
      this.refreshIntervalId = setInterval(this.updateCountdown, 1000); //update every 1 second
    },
    updateCountdown() {
      let minutes = Math.floor(this.time / 60); // rounds a number DOWN to the nearest integer
      let seconds = this.time % 60;

      minutes = minutes == 0 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      const contdownEl = document.getElementById("countdown");
      contdownEl.innerHTML = `${minutes}:${seconds}`;

      this.time--;

      if (this.time == 0) {
        this.sendTimeNotExpired = false;
      }

      if (this.time <= 0) {
        //stop the setInterval when time = 0 for avoid negative time
        clearInterval(this.refreshIntervalId);
        contdownEl.innerHTML = ``;
      }
    },
    editPhone() {
      clearInterval(this.refreshIntervalId);
      this.$parent.$children[4].time = 1 * 60;
      this.openVerifyCodeModal = false;
      this.$parent.openSignUpModal = true;
    },
    async sendCodeAgain(){
      this.time = 1*60;
      this.sendTimeNotExpired = !this.sendTimeNotExpired
      await this.sendSmsFunc();
    }
  },
};
</script>

<style></style>
