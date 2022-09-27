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
      <nuxt-link
        tag="span"
        class="active mr-4px cursor-pointer"
        :to="{
          name: 'free-courses-name',
          params: { name: $route.params.name },
        }"
      >
        /
        {{
          filtered_courses_by_id && filtered_courses_by_id.category_name
            ? filtered_courses_by_id.category_name
            : ""
        }}
      </nuxt-link>
      <span class="">/ {{ filtered_courses_by_id.title }}</span>
    </div>

    <div class="course" v-if="!courseBought">
      <div class="course__info" v-if="testStatus == 0">
        <div class="course__info_details_title">
          {{ filtered_courses_by_id.title }}
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
            <span>{{
              filtered_courses_by_id.teacher_name
                ? filtered_courses_by_id.teacher_name
                : ""
            }}</span>
          </div>
          <div>
            <div class="circle">
              <img src="@/assets/icons/book.svg" alt="icon" />
            </div>
            <span>{{
              filtered_courses_by_id.lesson_count
                ? filtered_courses_by_id.lesson_count + " ta dars"
                : "0 ta dars"
            }}</span>
          </div>
          <div>
            <div class="circle">
              <img src="@/assets/icons/clock.svg" alt="icon" />
            </div>
            <span>{{
              filtered_courses_by_id.lesson_time_count
                ? filtered_courses_by_id.lesson_time_count
                : ""
            }}</span>
          </div>
          <div>
            <div class="circle">
              <img src="@/assets/icons/teacher.svg" alt="icon" />
            </div>
            <span>{{
              filtered_courses_by_id.study_student_count
                ? filtered_courses_by_id.study_student_count + " talaba"
                : "0 talaba"
            }}</span>
          </div>
        </div>

        <div class="line" style="margin-bottom: 36px"></div>

        <div class="course__structure" style="margin-left: 0px">
          <div class="course__structure_top" style="margin-bottom: 15px">
            <span
              class="course__structure_top_title"
              v-if="
                filtered_courses_by_id &&
                filtered_courses_by_id.lessons &&
                filtered_courses_by_id.lessons.length != 0
              "
              >Kurs tarkibi</span
            >
            <span class="course__structure_top_name"></span>
          </div>

          <div
            class="course__structure_list"
            style="padding: 5px 0"
            v-if="
              filtered_courses_by_id &&
              filtered_courses_by_id.lessons &&
              filtered_courses_by_id.lessons.length != 0
            "
          >
            <div class="content without_collapsible" style="max-height: 40vh !important;">
              <div
                class="video_block"
                v-for="(item2, index2) in filtered_courses_by_id.lessons"
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

                  <span>{{ item2.order_number }}. {{ item2.lesson_name }}</span>
                </div>
                <img
                  src="@/assets/icons/tick.svg"
                  alt="icon"
                  v-if="item2.is_completed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="course__info" style="justify-content: center; display: flex">
        <div class="course__info_details_video_body">
          <div class="course__info_details_video_body_watch">
            <img
              :src="filtered_courses_by_id.caption.path"
              v-if="
                filtered_courses_by_id &&
                filtered_courses_by_id.caption &&
                filtered_courses_by_id.caption.is_video == false
              "
              class="course__info_details_video_body_watch_img"
            />
            <!-- <div class="course__info_details_video_btn" @click="isVideoPopUp = !isVideoPopUp">
                            <img src="@/assets/icons/play_button.svg" alt="icon">
                        </div> -->

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
              v-if="
                filtered_courses_by_id &&
                filtered_courses_by_id.caption &&
                filtered_courses_by_id.caption.is_video == true
              "
            ></iframe>
          </div>
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
            v-if="filtered_courses_by_id.is_paid"
          >
            Sotib olish
          </button>
          <button
            class="course__info_details_video_body_btn"
            @click="startCourse(filtered_courses_by_id.id)"
            v-if="!filtered_courses_by_id.is_paid"
          >
            Kursni boshlash
          </button>
        </div>

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

    <div class="course" v-if="courseBought">
      <div class="course__info" v-if="testStatus == 0">
        <div class="course__info__video_body">
          <iframe
            :src="lesson.url"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
            title="1-dars"
          ></iframe>
          <!-- <video :src="lesson.url" muted loop></video> -->
          <div class="overlay"></div>
        </div>

        <div class="course__info_title">{{ lesson.title }}</div>
        <div class="course__info_subtitle">
          <div>
            <img src="@/assets/icons/eye.svg" alt="icon" />
          </div>
          <span>{{ lesson.total_seen }} marta ko‘rilgan</span>
        </div>

        <!-- <div class="course__info_book">

                    <canvas id="pdf-render"></canvas>

                    <div>
                        <div id="prev-page"><img src="@/assets/icons/arrow-right.svg" alt="icon"></div>
                        <div id="next-page"><img src="@/assets/icons/arrow-right.svg" alt="icon"></div>
                    </div>
                </div> -->
      </div>

      <div class="course__info" v-else-if="testStatus == 1">
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

      <div class="course__structure">
        <div class="course__structure_top">
          <span
            class="course__structure_top_title"
            v-if="
              filtered_courses_by_id &&
              filtered_courses_by_id.lessons &&
              filtered_courses_by_id.lessons.length != 0
            "
            >Kurs tarkibi</span
          >
          <span class="course__structure_top_name">
            <button class="btn" @click="completeVideo()">
              <span>Darslikni ko'rib bo'ldim</span>
            </button>
          </span>
        </div>
        <div class="course__structure_progress">
          <div>
            <span class="progress_title">Progress</span>
            <span class="progress_amount">
              {{
                filtered_courses_by_id &&
                filtered_courses_by_id.progress_detail &&
                filtered_courses_by_id.progress_detail.current_lesson
                  ? filtered_courses_by_id.progress_detail.current_lesson
                  : "0"
              }}
              /{{
                filtered_courses_by_id &&
                filtered_courses_by_id.progress_detail &&
                filtered_courses_by_id.progress_detail.lesson_count
                  ? filtered_courses_by_id.progress_detail.lesson_count
                  : ""
              }}
              ({{
                filtered_courses_by_id &&
                filtered_courses_by_id.progress_detail &&
                filtered_courses_by_id.progress_detail.percentage
                  ? filtered_courses_by_id.progress_detail.percentage + "%"
                  : "0 %"
              }})
            </span>
          </div>
          <div class="progress_bar">
            <span
              class="progress_bar_amount"
              :style="
                'width: ' +
                (filtered_courses_by_id &&
                filtered_courses_by_id.progress_detail &&
                filtered_courses_by_id.progress_detail.percentage
                  ? filtered_courses_by_id.progress_detail.percentage
                  : 0) +
                '%'
              "
            ></span>
          </div>
        </div>

        <div
          class="course__structure_list"
          v-if="
            filtered_courses_by_id &&
            filtered_courses_by_id.lessons &&
            filtered_courses_by_id.lessons.length != 0
          "
        >
          <div class="content without_collapsible" style="max-height: 40vh !important;">
            <div
              class="video_block"
              v-for="(item2, index2) in filtered_courses_by_id.lessons"
              :key="index2"
              :class="
                lesson_watching &&
                lesson_watching.id &&
                lesson_watching.id == item2.id
                  ? 'activeBlock'
                  : ''
              "
              @click="watchThisLesson(item2.id)"
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

                <span>{{ item2.order_number }}. {{ item2.lesson_name }}</span>
              </div>
              <img
                src="@/assets/icons/tick.svg"
                alt="icon"
                v-if="item2.is_completed"
              />
            </div>
          </div>
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
      isVideoPopUp: false,
      testStatus: 0,
      courseBought: false,
      lesson_watching: { id: 0 },
      courseList: [
        { id: 1, title: "Aqoid ilmi: 1-bosqich", status: true },
        { id: 2, title: "Aqoid ilmi: 2-bosqich", status: false },
        { id: 3, title: "Aqoid ilmi: 3-bosqich", status: false },
        { id: 4, title: "Aqoid ilmi: 4-bosqich", status: false },
      ],
      videosList: [
        // {id: 1, title: 'Aqoid ilmi', watched: true, watching: false },
        // {id: 2, title: 'Shahodat kalimasining...', watched: true, watching: false },
        // {id: 3, title: 'Shahodat kalimasiga taa...', watched: true, watching: false },
        // {id: 4, title: 'Tavhid - yolg‘iz Allohga...', watched: true, watching: false },
        // {id: 5, title: 'Tavhidga chaqirishning...', watched: false, watching: true },
        // {id: 6, title: 'Tavhidning shaxsga ta’siri', watched: false, watching: false },
        // {id: 7, title: 'Tavhidning jamiyatga ta’siri', watched: false, watching: false },
        // {id: 8, title: 'Imtihon testi', watched: false, watching: false },
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
    await this.GET_FILTERED_COURSES_BY_ID({ id: this.$route.params.id });
    this.courseBought = this.filtered_courses_by_id.is_enrolled;

    if (this.courseBought) {
      await this.refresh();
    }

    if (this.testStatus == 0) {
      // await this.getPDF();
    }
  },
  computed: {
    ...mapState(["lesson"]),
    filtered_courses_by_id: {
      get() {
        return this.$store.state.filtered_courses_by_id;
      },
      set(value) {
        this.$store.commit("SET_FILTERED_COURSES_BY_ID", value);
      },
    },
  },
  methods: {
    ...mapActions([
      "GET_FILTERED_COURSES_BY_ID",
      "POST_START_COURSE",
      "GET_LESSON",
      "POST_COMPLETE_LESSON",
    ]),
    async watchThisLesson(id) {
      let a = JSON.parse(JSON.stringify(id));
      this.lesson_watching = JSON.parse(JSON.stringify(this.lesson_watching));
      this.lesson_watching.id = a;

      await this.GET_LESSON({ id: a });
    },

    async completeVideo() {
      await this.POST_COMPLETE_LESSON({ lesson_id: this.lesson.id });

      await this.refresh();
    },

    async refresh() {
      await this.GET_FILTERED_COURSES_BY_ID({ id: this.$route.params.id });

      this.lesson_watching = this.filtered_courses_by_id.lessons.find(
        (elem) => {
          return elem.is_completed == false;
        }
      );
      this.lesson_watching = Object.freeze(this.lesson_watching);
      await this.GET_LESSON({ id: this.lesson_watching.id });
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

    buyCourse() {
      this.courseBought = !this.courseBought;
    },

    async startCourse(id) {
      this.courseBought = !this.courseBought;
      await this.POST_START_COURSE({ course_id: id });
      await this.GET_FILTERED_COURSES_BY_ID({ id: this.$route.params.id });
      await this.GET_LESSON({ id: this.filtered_courses_by_id.lessons[0].id });
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
