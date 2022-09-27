import Vue from "vue";
import GAuth from "vue-google-oauth2";


export default ({ app, store }) => {
const gauthOption = {
  clientId:
    "925671647243-8mpe56so3b3iou81vetlcuai4cpg5nkf.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "consent",
  fetch_basic_profile: true,
};
Vue.use(GAuth, gauthOption);
}