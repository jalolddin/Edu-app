<template>
  <div class="lessons mx-auto">
    <div class="lessons__breadcrumb">
      <img src="@/assets/icons/arrow-right.svg" alt="icon" />
      <nuxt-link
        tag="span"
        class="active mr-4px cursor-pointer"
        :to="{ name: 'paid-courses' }"
      >
        Akademiya darslari
      </nuxt-link>
      <nuxt-link
        tag="span"
        class="mr-4px cursor-pointer"
        :to="{ name: 'paid-courses-id', params: { id: $route.params.id } }"
      >
        /
        {{
          filtered_courses_by_id && filtered_courses_by_id.course_name
            ? filtered_courses_by_id.course_name
            : ""
        }}
      </nuxt-link>
      <!-- <span class="">/ {{filtered_courses_by_id.title}}</span> -->
    </div>

    <div class="course">
      <div class="course__info" v-if="testStatus == 0">
        <div class="course__info_details_title">
          {{
            filtered_courses_by_id.course_name
              ? filtered_courses_by_id.course_name
              : ""
          }}
        </div>

        <div class="course__info_details_description">
          {{
            filtered_courses_by_id.description
              ? filtered_courses_by_id.description
              : ""
          }}
        </div>

        <div class="course__info_details_info">
          <div>
            <div class="circle">
              <img src="@/assets/icons/profile.svg" alt="icon" />
            </div>
            <span>
              {{
                filtered_courses_by_id.teacher_name
                  ? filtered_courses_by_id.teacher_name
                  : ""
              }}
            </span>
          </div>
          <div>
            <div class="circle">
              <img src="@/assets/icons/book.svg" alt="icon" />
            </div>
            <span>
              {{
                filtered_courses_by_id.lesson_count
                  ? filtered_courses_by_id.lesson_count + " ta dars"
                  : "0 ta dars"
              }}
            </span>
          </div>
          <div>
            <div class="circle">
              <img src="@/assets/icons/clock.svg" alt="icon" />
            </div>
            <span>
              {{
                filtered_courses_by_id.lesson_time_count
                  ? filtered_courses_by_id.lesson_time_count
                  : ""
              }}
            </span>
          </div>
          <div>
            <div class="circle">
              <img src="@/assets/icons/teacher.svg" alt="icon" />
            </div>
            <span>
              {{
                filtered_courses_by_id.study_student_count
                  ? filtered_courses_by_id.study_student_count + " talaba"
                  : "0 talaba"
              }}
            </span>
          </div>
        </div>

        <div class="line" style="margin-bottom: 36px"></div>

        <div class="course__structure" style="margin-left: 0px">
          <div class="course__structure_top">
            <span
              class="course__structure_top_title"
              style="margin-bottom: 15px"
              >Kurs tarkibi</span
            >
            <span class="course__structure_top_name"></span>
          </div>

          <div class="line"></div>
          <template v-if="filtered_courses_by_id">
            <div
              class="course__structure_list"
              v-for="(item, index) in filtered_courses_by_id.sections"
              :key="index"
            >
              <button class="collapsible">
                <span>{{ item.title }}</span>
                <img src="@/assets/icons/arrow-up.svg" alt="icon" />
              </button>
              <div class="content without_collapsible" style="padding: 0px">
                <div
                  class="video_block"
                  v-for="(item2, index2) in item.lessons"
                  :key="index2"
                  :class="item2.watching === true ? 'activeBlock' : ''"
                >
                  <div class="video_block_title">
                    <!-- <img src="@/assets/icons/video.svg" alt="icon"> -->
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.15 6.17C20.74 5.95 19.88 5.72 18.71 6.54L17.24 7.58C17.13 4.47 15.78 3.25 12.5 3.25H6.5C3.08 3.25 1.75 4.58 1.75 8V16C1.75 18.3 3 20.75 6.5 20.75H12.5C15.78 20.75 17.13 19.53 17.24 16.42L18.71 17.46C19.33 17.9 19.87 18.04 20.3 18.04C20.67 18.04 20.96 17.93 21.15 17.83C21.56 17.62 22.25 17.05 22.25 15.62V8.38C22.25 6.95 21.56 6.38 21.15 6.17ZM11 11.38C9.97 11.38 9.12 10.54 9.12 9.5C9.12 8.46 9.97 7.62 11 7.62C12.03 7.62 12.88 8.46 12.88 9.5C12.88 10.54 12.03 11.38 11 11.38Z"
                        fill="#094062"
                      />
                    </svg>

                    <span>{{ index2 + 1 }}. {{ item2.title }}</span>
                  </div>
                  <img
                    src="@/assets/icons/tick.svg"
                    alt="icon"
                    v-if="item2.watched"
                  />
                </div>
              </div>

              <div class="line"></div>
            </div>
          </template>
        </div>
      </div>

      <div class="course__info" style="justify-content: center; display: flex">
        <div class="course__info_details_video_body">
          <!-- <img :src="filtered_courses_by_id.caption" class="course__info_details_video_body_watch_img"> -->
          <!-- <img :src="@/" class="course__info_details_video_body_watch_img"> -->
          <iframe
            :src="
              filtered_courses_by_id &&
              filtered_courses_by_id.caption &&
              filtered_courses_by_id.caption.path
                ? filtered_courses_by_id.caption.path
                : ''
            "
            frameborder="0"
            allow="autoplay;"
            title="1-dars"
            style="width: 100%; height: 100%"
          ></iframe>

          <!-- <video :src="filtered_courses_by_id && filtered_courses_by_id.caption && filtered_courses_by_id.caption.path ? filtered_courses_by_id.caption.path : '' " 
                        class="course__info_details_video_body_watch_img"
                        v-if="filtered_courses_by_id && filtered_courses_by_id.caption && filtered_courses_by_id.caption.is_video ? filtered_courses_by_id.caption.is_video : ''"></video> -->

          <!-- <div class="course__info_details_video_btn" @click="isVideoPopUp = !isVideoPopUp">
                            <img src="@/assets/icons/play_button.svg" alt="icon">
                        </div> -->
          <div class="overlay"></div>

          <div class="course__info_details_video_body_title">
            {{ filtered_courses_by_id.price }}
          </div>
          <div class="course__info_details_video_body_subtitle">
            Kurs {{ filtered_courses_by_id.buy_course_count }} marta xarid
            qilingan
          </div>
          <button
            class="course__info_details_video_body_btn"
            @click="buyCourse()"
          >
            Xarid qilish
          </button>
        </div>

        <!-- <div class="video__player" v-if="isVideoPopUp">
                    <div class="video__player_body">dd
                        <iframe :src="filtered_courses_by_id && filtered_courses_by_id.caption && filtered_courses_by_id.caption.path ? filtered_courses_by_id.caption.path : '' " 
                        frameborder="0" allow="autoplay;" 
                        title="1-dars"
                        style="width:100%;height:100%;"
                        ></iframe>
                        <img src="@/assets/icons/close.svg" alt="icon" class="close-btn" @click="isVideoPopUp = !isVideoPopUp">
                    </div>
                </div> -->
      </div>

      <div class="course__info" v-if="testStatus == 1">
        <div class="course__info_test_title">
          Aqoid ilmi fanining 1-bosqich imtihon testi
        </div>
        <div class="course__info_test_subtitle">Mavjud urinishlar: 2 ta</div>
        <button class="course__info_test_btn">Testni boshlash</button>
      </div>

      <div class="course__info" v-else-if="testStatus == 2">
        <div class="course__info_test_subtitle">15 tadan 3-savol</div>

        <div class="course__info_test_numbers">
          <div
            class="course__info_test_body"
            v-for="(item1, index1) in testCounts"
            :key="index1"
          >
            <div
              class="course__info_test_body_count"
              :class="getTestStatus(item1.status)"
            >
              {{ index1 + 1 }}
            </div>
            <div
              class="course__info_test_body_count-bottom"
              :class="getTestStatus(item1.status)"
            ></div>
          </div>
        </div>

        <div class="course__info_test_title">
          Shahodat kalimasining faqatgina birinchi ruknini aytsa ham kishi
          musulmon bo‘la oladimi?
        </div>
        <div class="course__info_test_subtitle">To‘g‘ri javobni tanlang</div>

        <div class="course__info_test_choose">
          <div
            class="course__info_test_choose_body"
            v-for="(item2, index2) in testAnswers"
            :key="index2"
          >
            <label class="container">
              <span>{{ item2.title }}</span>
              <input type="radio" checked="checked" name="radio" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="course__info_test_navigation">
          <div class="course__info_test_back_btn">
            <img src="@/assets/icons/arrow-right.svg" alt="icon" />
          </div>
          <button class="course__info_test_btn">Keyingisi</button>
        </div>
      </div>
    </div>

    <!-- <Modal v-show="showModal" /> -->
    <BuyCourseModal
      :openBuyCourseModal="openBuyCourseModal"
      :item="filtered_courses_by_id"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "@/components/Modal.vue";
import BuyCourseModal from "@/components/Modals/BuyCourseModal.vue";

export default {
  components: { BuyCourseModal },
  data() {
    return {
      showModal: false,
      openBuyCourseModal: false,
      isVideoPopUp: false,
      testStatus: 0,
      courseList: [
        // {id: 1, title: 'Aqoid ilmi: 1-bosqich', status: true},
        // {id: 2, title: 'Aqoid ilmi: 2-bosqich', status: false},
        // {id: 3, title: 'Aqoid ilmi: 3-bosqich', status: false},
        // {id: 4, title: 'Aqoid ilmi: 4-bosqich', status: false},
      ],
      videosList: [
        { id: 1, title: "Aqoid ilmi", watched: true, watching: false },
        {
          id: 2,
          title: "Shahodat kalimasining...",
          watched: true,
          watching: false,
        },
        {
          id: 3,
          title: "Shahodat kalimasiga taa...",
          watched: true,
          watching: false,
        },
        {
          id: 4,
          title: "Tavhid - yolg‘iz Allohga...",
          watched: true,
          watching: false,
        },
        {
          id: 5,
          title: "Tavhidga chaqirishning...",
          watched: false,
          watching: true,
        },
        {
          id: 6,
          title: "Tavhidning shaxsga ta’siri",
          watched: false,
          watching: false,
        },
        {
          id: 7,
          title: "Tavhidning jamiyatga ta’siri",
          watched: false,
          watching: false,
        },
        { id: 8, title: "Imtihon testi", watched: false, watching: false },
      ],
      testCounts: [
        { id: 1, status: "wrong" },
        { id: 2, status: "right" },
        { id: 3, status: "answering" },
        { id: 4, status: "none" },
        { id: 5, status: "none" },
        { id: 6, status: "none" },
        { id: 7, status: "none" },
        { id: 8, status: "none" },
        { id: 9, status: "none" },
        { id: 10, status: "none" },
        { id: 11, status: "none" },
        { id: 12, status: "none" },
        { id: 13, status: "none" },
        { id: 14, status: "none" },
        { id: 15, status: "none" },
      ],
      testAnswers: [
        { id: 1, title: "Ha. Albatta, musulmon bo‘ladi" },
        { id: 2, title: "Yo‘q. Musulmon bo‘la olmaydi" },
        { id: 3, title: "Kishining qalbiga qaraladi" },
        {
          id: 4,
          title:
            "Ixtilofli masala. Ba’zi ulamolar ha deydi, ba’zilari esa yo‘q",
        },
      ],
    };
  },
  async created() {
    let response = await this.GET_FILTERED_COURSES_BY_ID({
      id: this.$route.params.id,
    });
    if (response && response.is_enrolled == true) {
      this.$router.push({
        name: "paid-courses-id-course_id",
        params: { id: this.$route.params.id, course_id: this.$route.params.id },
      });
    }

    if (this.testStatus == 0) {
      // await this.getPDF();
    }

    this.collapsibleFunc();

    this.courseList = this.filtered_courses_by_id.sections;
  },
  computed: {
    ...mapState(["filtered_courses_by_id"]),
  },
  methods: {
    ...mapActions(["GET_FILTERED_COURSES_BY_ID", "POST_START_COURSE"]),
    collapsibleFunc() {
      var coll = document.getElementsByClassName("collapsible");
      var i;

      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.padding = 0 + "px";
          } else {
            content.style.maxHeight = 400 + "px";
            content.style.padding = null;
          }
        });
      }
    },
    getTestStatus(value) {
      if (value == "wrong") {
        return "wrong_answer";
      } else if (value == "right") {
        return "right_answer";
      } else if (value == "answering") {
        return "now_answering";
      } else {
        return "";
      }
    },
    async buyCourse() {
      // await this.POST_START_COURSE({course_id: this.filtered_courses_by_id.id})
      // this.$router.push({name: 'paid-courses-id-course_id', params: {course_id: this.filtered_courses_by_id.id}})
      this.openBuyCourseModal = !this.openBuyCourseModal;
    },
    async getPDF() {
      const url = "http://www.pdf995.com/samples/pdf.pdf";

      let pdfDoc = null,
        pageNum = 1,
        pageIsRendering = false,
        pageNumIsPending = null;

      const scale = 1.5,
        canvas = document.querySelector("#pdf-render"),
        ctx = canvas.getContext("2d");

      // Render the page
      const renderPage = (num) => {
        pageIsRendering = true;

        // Get page
        pdfDoc.getPage(num).then((page) => {
          // Set scale
          const viewport = page.getViewport({ scale });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderCtx = {
            canvasContext: ctx,
            viewport,
          };

          page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;

            if (pageNumIsPending !== null) {
              renderPage(pageNumIsPending);
              pageNumIsPending = null;
            }
          });

          // Output current page
          document.querySelector("#page-num").textContent = num;
        });
      };

      // Check for pages rendering
      const queueRenderPage = (num) => {
        if (pageIsRendering) {
          pageNumIsPending = num;
        } else {
          renderPage(num);
        }
      };

      // Show Prev Page
      const showPrevPage = () => {
        if (pageNum <= 1) {
          return;
        }
        pageNum--;
        queueRenderPage(pageNum);
      };

      // Show Next Page
      const showNextPage = () => {
        if (pageNum >= pdfDoc.numPages) {
          return;
        }
        pageNum++;
        queueRenderPage(pageNum);
      };

      // Get Document
      pdfjsLib
        .getDocument(url)
        .promise.then((pdfDoc_) => {
          pdfDoc = pdfDoc_;

          document.querySelector("#page-count").textContent = pdfDoc.numPages;

          renderPage(pageNum);
        })
        .catch((err) => {
          console.log(err);
          // const div = document.createElement('div');
          // div.className = 'error';
          // div.appendChild(document.createTextNode(err.message));
          // document.querySelector('.course').insertBefore(div, canvas);

          // document.querySelector('.top-bar').style.display = 'none';
        });

      // Button Events
      document
        .querySelector("#prev-page")
        .addEventListener("click", showPrevPage);
      document
        .querySelector("#next-page")
        .addEventListener("click", showNextPage);
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
