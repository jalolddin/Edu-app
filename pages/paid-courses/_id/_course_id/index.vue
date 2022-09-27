<template>
  <div class="lessons mx-auto">
    <!-- {{answers}} -->
    <div class="lessons__breadcrumb" style="margin-bottom: 49px">
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
    </div>

    <!-- {{ answers }} -->

    <div class="course">
      <div class="course__info" v-if="testStatus == 0">
        <div class="course__info__video_body">
          <iframe
            :src="
              lesson &&
              lesson.url &&
              lesson.url
                ? lesson.url
                : ''
            "
            frameborder="0"
            allow="autoplay;"
            title="1-dars"
            style="width: 100%; height: 100%"
          ></iframe>
          <div class="overlay"></div>
        </div>

        <div class="course__info_title">
          {{
            lesson.title
              ? lesson.title
              : ""
          }}
        </div>

        <button class="btn" @click="completeVideo()">
          <span>Darslikni ko'rib bo'ldim</span>
        </button>

        <div class="course__info_book">
          <canvas id="pdf-render"></canvas>

          <div>
            <div id="prev-page">
              <img src="@/assets/icons/arrow-right.svg" alt="icon" />
            </div>
            <div id="next-page">
              <img src="@/assets/icons/arrow-right.svg" alt="icon" />
            </div>
          </div>
        </div>
      </div>

      <div class="course__info" v-else-if="testStatus == 1">
        <div class="course__info_test_title">
          Aqoid ilmi fanining 1-bosqich imtihon testi
        </div>
        <div class="course__info_test_subtitle">
          Mavjud urinishlar: {{ lesson.existing_attempts }} ta
        </div>
        <button class="course__info_test_btn" @click="startTest()">
          Testni boshlash
        </button>
      </div>

      <div class="course__info" v-else-if="testStatus == 2">
        <div class="course__info_test_subtitle">15 tadan 3-savol</div>
        <div class="course__info_test_subtitle" v-if="test_information.length != 0">
          Test natijasi: {{(test_information && test_information.is_passed == true) ? 'Muvaffaqiyatli o`tdingiz 🥳🥳🥳' : 'Qayta urinib ko`ring 😔😔😔' }}
        </div>
        <div class="course__info_test_subtitle" v-else>
          Vaqt qoldi: <span id="testCountDown" class="text-info"></span>
        </div>{{test_check}}

        <div class="course__info_test_numbers">
          <div
            class="course__info_test_body"
            v-for="(item1, index1) in test_list.tests"
            :key="index1"
          >
            <div
              class="course__info_test_body_count"
              :class="getTestStatus(index1)"
            >
              {{ index1 + 1 }}
            </div>
            <div
              class="course__info_test_body_count-bottom"
              :class="getTestStatus(index1)"
            ></div>
          </div>
        </div>

        <div class="course__info_test_title">
          {{
            test_list &&
            test_list.tests &&
            test_list.tests[nowAnswering] &&
            test_list.tests[nowAnswering].question
              ? test_list.tests[nowAnswering].question
              : ""
          }}
        </div>
        <div class="course__info_test_subtitle">To‘g‘ri javobni tanlang</div>

        <div class="course__info_test_choose">
          {{this.test_check && this.test_check[nowAnswering] && this.test_check[nowAnswering].is_correct}}
          <div class="course__info_test_choose_body">
            <label class="container">
              <span :class="(this.test_check && this.test_check[nowAnswering]) ? 
              (this.test_check[nowAnswering].correct_answer == 'a') ? 'right_text_answer' : 'wrong_text_answer' : ''">
              {{
                test_list &&
                test_list.tests &&
                test_list.tests[nowAnswering] &&
                test_list.tests[nowAnswering].answer_a
                  ? test_list.tests[nowAnswering].answer_a
                  : ""
              }}</span>
              <input
                type="radio"
                name="radio"
                :checked="
                  answers &&
                  answers[nowAnswering] &&
                  answers[nowAnswering].user_answer &&
                  answers[nowAnswering].user_answer == 'a'
                "
                :disabled="test_check.length != 0"
                @input="answerChoosed('a')"
              />
              <span class="checkmark"></span>

            </label>
          </div>
          <div class="course__info_test_choose_body">
            <label class="container">
              <span  :class="(this.test_check && this.test_check[nowAnswering]) ? 
              (this.test_check[nowAnswering].correct_answer == 'b') ? 'right_text_answer' : 'wrong_text_answer' : ''">{{
                test_list &&
                test_list.tests &&
                test_list.tests[nowAnswering] &&
                test_list.tests[nowAnswering].answer_b
                  ? test_list.tests[nowAnswering].answer_b
                  : ""
              }}</span>
              <input
                type="radio"
                name="radio"
                :checked="
                  answers &&
                  answers[nowAnswering] &&
                  answers[nowAnswering].user_answer &&
                  answers[nowAnswering].user_answer == 'b'
                "
                :disabled="test_check.length != 0"
                @input="answerChoosed('b')"
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="course__info_test_choose_body">
            <label class="container">
              <span :class="(this.test_check && this.test_check[nowAnswering]) ? 
              (this.test_check[nowAnswering].correct_answer == 'c') ? 'right_text_answer' : 'wrong_text_answer' : ''">{{
                test_list &&
                test_list.tests &&
                test_list.tests[nowAnswering] &&
                test_list.tests[nowAnswering].answer_c
                  ? test_list.tests[nowAnswering].answer_c
                  : ""
              }}</span>
              <input
                type="radio"
                name="radio"
                :checked="
                  answers &&
                  answers[nowAnswering] &&
                  answers[nowAnswering].user_answer &&
                  answers[nowAnswering].user_answer == 'c'
                "
                :disabled="test_check.length != 0"
                @input="answerChoosed('c')"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="course__info_test_navigation">
          <div class="course__info_test_back_btn" @click="prevQuestion()">
            <img src="@/assets/icons/arrow-right.svg" alt="icon" />
          </div>
          <button
            class="course__info_test_btn"
            @click="nextQuestion()"
            v-if="nowAnswering != 24"
          >
            Keyingisi
          </button>
          
          <button
            class="course__info_test_btn"
            @click="closeTest()"
            v-if="nowAnswering == 24 && test_check.length == 0"
          >
            Testni yakunlash
          </button>
          <button
            class="course__info_test_btn"
            @click="goToBackToCourse()"
            v-if="nowAnswering == 24 && test_check.length != 0"
          >
            Kursga qaytish
          </button>
        </div>
      </div>

      <div class="course__info" v-else-if="testStatus == 3">
        <div class="course__info_test_title">
          Aqoid ilmi fanining 1-bosqich imtihon testi
        </div>
        <div class="course__info_test_subtitle">
          Mavjud urinishlar: {{ lesson.existing_attempts }} ta
        </div>
        <button class="course__info_test_btn" @click="startTest()">
          Testni boshlash
        </button>
      </div>

      <!-- {{ nowAnswering }} -->

      <div class="course__structure" v-if="testStatus == 0">
        <div class="course__structure_top">
          <span class="course__structure_top_title">Kurs tarkibi</span>
          <span class="course__structure_top_name">{{
            filtered_courses_by_id.course_name
          }}</span>
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

        <div class="line"></div>

        <div
          class="course__structure_list"
          v-for="(item, index) in filtered_courses_by_id.sections"
          :key="index"
        >
          <button class="collapsible">
            <span>{{ item.title }}</span>
            <img
              src="@/assets/icons/arrow-up.svg"
              alt="icon"
              v-if="item.is_show"
            />
            <img
              src="@/assets/icons/lock.svg"
              alt="icon"
              v-if="!item.is_show"
            />
          </button>


          <div class="content without_collapsible" style="padding: 0px" v-if="item.is_show">
            <div
              class="video_block"
              v-for="(item2, index2) in filtered_courses_by_id.sections[index]
                .lessons"
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

                <span>{{ item2.order_number }}. {{ item2.title }}</span>
              </div>
              <img
                src="@/assets/icons/tick.svg"
                alt="icon"
                v-if="item2.is_completed"
              />
            </div>

            <!-- <div class="video_block" v-for="(item2, index2) in videosList" :key="index2" :class="item2.watching === true ? 'activeBlock' : ''" 
                        @click="beforeStartTest(item2)">
                            <div class="video_block_title">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.15 6.17C20.74 5.95 19.88 5.72 18.71 6.54L17.24 7.58C17.13 4.47 15.78 3.25 12.5 3.25H6.5C3.08 3.25 1.75 4.58 1.75 8V16C1.75 18.3 3 20.75 6.5 20.75H12.5C15.78 20.75 17.13 19.53 17.24 16.42L18.71 17.46C19.33 17.9 19.87 18.04 20.3 18.04C20.67 18.04 20.96 17.93 21.15 17.83C21.56 17.62 22.25 17.05 22.25 15.62V8.38C22.25 6.95 21.56 6.38 21.15 6.17ZM11 11.38C9.97 11.38 9.12 10.54 9.12 9.5C9.12 8.46 9.97 7.62 11 7.62C12.03 7.62 12.88 8.46 12.88 9.5C12.88 10.54 12.03 11.38 11 11.38Z" fill="#094062"/>
                                </svg>

                                <span>{{index2 + 1}}. {{item2.title}}</span>
                            </div>
                            <img src="@/assets/icons/tick.svg" alt="icon" v-if="item2.watched">
                        </div> -->
          </div>

          <div class="line"></div>
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
      testStatus: 0,
      lesson_watching: { id: 0 },
      pdfUrl: "",
      courseList: [],
      videosList: [],
      time: 1 * 60, //minutes * 60 seconds,
      nowAnswering: 0,
      answers: [],
    };
  },
  async mounted() {
    if (this.testStatus == 0) {
      // await this.getPDF();
    }

    await this.refresh();
    this.collapsibleFunc();

    if (this.filtered_courses_by_id && this.filtered_courses_by_id.sections 
      && this.filtered_courses_by_id.sections[0] && 
      this.filtered_courses_by_id.sections[0].is_show == false) {

      await this.POST_COMPLETE_LESSON({
        lesson_id: this.filtered_courses_by_id.sections[0].id,
      });
      if(this.filtered_courses_by_id.sections[0].lessons && 
        this.filtered_courses_by_id.sections[0].lessons.length != 0){
        await this.GET_LESSON({ id: this.filtered_courses_by_id.sections[0].lessons[0].id });
      }
      await this.GET_FILTERED_COURSES_BY_ID({
        id: this.$route.params.course_id,
      });

    }

    this.testIntervalId = JSON.parse(sessionStorage.getItem("testTimerID"));
    clearInterval(this.testIntervalId);

    if (sessionStorage.getItem("testStatus")) {
      this.testStatus = JSON.parse(sessionStorage.getItem("testStatus"));
      if(this.testStatus == 1){
        if(this.lesson.is_test == false){
          this.testStatus = 0;
        }
      }else if (this.testStatus == 2) {
        await this.startTest();

        this.time = JSON.parse(sessionStorage.getItem("testTimerTime"));
      }
    }

    this.answers = JSON.parse(sessionStorage.getItem("answers"));
    this.nowAnswering = JSON.parse(sessionStorage.getItem("nowAnswering"));
  },
  computed: {
    ...mapState([
      "filtered_courses_by_id",
      "lesson",
      "test_starting",
      "test_check",
      "test_information",
      "test_list",
    ]),
    testIntervalId: {
      get() {
        return this.$store.state.testIntervalId;
      },
      set(value) {
        this.$store.commit("SET_TEST_INTERVAL", value);
      },
    },
  },
  methods: {
    ...mapActions([
      "GET_FILTERED_COURSES_BY_ID",
      "POST_COMPLETE_LESSON",
      "GET_LESSON",
      "POST_TEST_STARTING",
      "POST_TEST_CHECK",
      "GET_TEST_INFORMATION",
      "GET_PDF_BOOK",
      "GET_TEST_LIST",
    ]),
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
    async watchThisLesson(id) {
      let a = JSON.parse(JSON.stringify(id));

      if (this.lesson_watching != undefined) {
        this.lesson_watching = JSON.parse(JSON.stringify(this.lesson_watching));
        this.lesson_watching.id = a;
      }
      await this.GET_LESSON({ id: a });

      if (this.lesson.is_test == true) {
        this.testStatus = 1;
        await sessionStorage.setItem(
          "testStatus",
          JSON.stringify(this.testStatus)
        );
      }
    },

    async completeVideo() {
      if (this.lesson.is_test == false) {
        await this.POST_COMPLETE_LESSON({ lesson_id: this.lesson.id });
        await this.refresh();
      } else if (this.lesson.is_test == true) {
        this.testStatus = 1;
        await sessionStorage.setItem(
          "testStatus",
          JSON.stringify(this.testStatus)
        );
      }
    },

    async refresh() {
      await this.GET_FILTERED_COURSES_BY_ID({
        id: this.$route.params.course_id,
      });

      if (this.filtered_courses_by_id && this.filtered_courses_by_id.sections) {
        this.filtered_courses_by_id.sections.forEach((elem) => {
          if (elem.lessons.length != 0) {
            this.lesson_watching = elem.lessons.find((elem) => {
              return elem.is_completed == false;
            });
            if (this.lesson_watching === undefined) {
              this.lesson_watching = elem.lessons[elem.lessons.length - 1];
            }
          }
        });
      }

      if (this.lesson_watching && this.lesson_watching.id != 0) {
        this.lesson_watching = Object.freeze(this.lesson_watching);
        await this.GET_LESSON({ id: this.lesson_watching.id });
      }
    },

    getTestStatus(value) {
      if (this.nowAnswering == value) {
        return "now_answering";
      }
  
      if((this.test_check && this.test_check[value] && this.test_check[value].is_correct) ? this.test_check[value].is_correct == true : false){
        return "right_answer";
      } else if((this.test_check && this.test_check[value] && this.test_check[value].is_correct == false) ? this.test_check[value].is_correct == false : false){
        return "wrong_answer";
      }
  

      if (
        (this.answers &&
          this.answers[value] &&
          this.answers[value].user_answer &&
          this.answers[value].user_answer == "a") ||
        (this.answers &&
          this.answers[value] &&
          this.answers[value].user_answer &&
          this.answers[value].user_answer == "b") ||
        (this.answers &&
          this.answers[value] &&
          this.answers[value].user_answer &&
          this.answers[value].user_answer == "c")
      ) {
        return "answered";
      }
    },
    beforeStartTest(item) {
      if (item.test == true) {
        this.testStatus = 1;
      }
    },
    async startTest() {
      // if (this.lesson.existing_attempts == 0) {
      //   this.$toast.success("sdsd");
      // } else {
        let response = await this.POST_TEST_STARTING({
          lesson_id: this.lesson.id,
        });

        if (response.status == 422) {
          this.testStatus = 0;
          await sessionStorage.setItem(
            "testStatus",
            JSON.stringify(this.testStatus)
          );
          this.$router.go();
          // this.$router.push({name: 'paid-courses-id-course_id', params: {id: this.$route.params.id, course_id: this.$route.params.course_id}})
          // this.$toast.error("Tesni tamomlang!");
        } else {
          this.testStatus = 2;
          sessionStorage.setItem("testStatus", JSON.stringify(this.testStatus));

          await this.GET_TEST_LIST({
            test_session_id: this.test_starting.test_session_id,
          });
          this.time = this.test_list.sum_time;

          this.answers = [];
          for (
            let i = 0;
            i <
            (this.test_list && this.test_list.tests
              ? this.test_list.tests.length
              : 0);
            i++
          ) {
            this.answers.push({ test_id: "", user_answer: "" });
          }
          this.countDown();
        }
      // }
    },
    async getPDF() {
      const url =
        "http://api.ittech.uz/storage/lesson_documents/Odob/ODOB%201%20LOTIN/NABAVIY_ODOBLAR_1_UNIT_LOTIN_FULL_BOOK.pdf";

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
      await this.GET_PDF_BOOK(url);
      // pdfjsLib
      // .getDocument(url)
      // .promise.then(pdfDoc_ => {
      //     pdfDoc = pdfDoc_;

      //     document.querySelector('#page-count').textContent = pdfDoc.numPages;

      //     renderPage(pageNum);
      // })
      // .catch(err => {
      //     console.log(err)
      //     // const div = document.createElement('div');
      //     // div.className = 'error';
      //     // div.appendChild(document.createTextNode(err.message));
      //     // document.querySelector('.course').insertBefore(div, canvas);

      //     // document.querySelector('.top-bar').style.display = 'none';
      // });

      // Button Events
      document
        .querySelector("#prev-page")
        .addEventListener("click", showPrevPage);
      document
        .querySelector("#next-page")
        .addEventListener("click", showNextPage);
    },

    countDown() {
      this.testIntervalId = setInterval(this.updateCountdown, 1000); //update every 1 second
    },
    updateCountdown() {
      let minutes = Math.floor(this.time / 60); // rounds a number DOWN to the nearest integer
      let seconds = this.time % 60;

      minutes = minutes == 0 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      const contdownEl = document.getElementById("testCountDown");
      contdownEl.innerHTML = `${minutes}:${seconds}`;

      this.time--;

      sessionStorage.setItem(
        "testTimerID",
        JSON.stringify(this.testIntervalId)
      );
      sessionStorage.setItem("testTimerTime", JSON.stringify(this.time));

      if (this.time == 0) {
        this.sendTimeNotExpired = false;
      }

      if (this.time <= 0) {
        //stop the setInterval when time = 0 for avoid negative time
        clearInterval(this.testIntervalId);
      }
    },
    prevQuestion() {
      if (this.nowAnswering != 0) {
        this.nowAnswering--;
      }
    },
    nextQuestion() {
      if (this.nowAnswering != this.test_list.tests.length - 1) {
        this.nowAnswering++;
        sessionStorage.setItem(
          "nowAnswering",
          JSON.stringify(this.nowAnswering)
        );
      }
    },
    answerChoosed(value) {
      this.answers[this.nowAnswering].user_answer = value;
      this.answers[this.nowAnswering].test_id = this.test_list.tests[this.nowAnswering].id;
      sessionStorage.setItem("answers", JSON.stringify(this.answers));
    },
    async closeTest() {
      let a = this.answers.find((elem) => {
        return elem.user_answer == "" || elem.test_id == "";
      });
      console.log(a);
      if (a == undefined) {
        await this.POST_TEST_CHECK({
          test_session_id: this.test_starting.test_session_id,
          answers: this.answers,
        });


        // this.test_check.forEach((elem, index) => {
        //   this.answers[index].user_answer = elem
        // })

        await this.GET_TEST_INFORMATION({
          test_session_id: this.test_starting.test_session_id,
        });

        // this.testStatus = 3;
        // console.log(this.test_information);
        this.nowAnswering = 0;
        sessionStorage.setItem(
          "nowAnswering",
          JSON.stringify(this.nowAnswering)
        );
      } else {
        this.$toast.error("Tesni tamomlang!");
      }
    },
    goToBackToCourse(){
      this.testStatus = 0;
      sessionStorage.setItem("testStatus", JSON.stringify(this.testStatus));
    }

  },
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
