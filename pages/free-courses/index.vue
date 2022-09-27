<template>
  <div class="lessons mx-auto">
    <div class="lessons__title">Erkin kurslar</div>

    <div class="lessons__list">
      <div
        class="rectangle__card"
        style="height: 167px"
        v-for="(index, item) in lessonsList"
        :key="index"
        @click="goToInside(item)"
      >
        <div class="rectangle__card_info">
          <img :src="item.icon" alt="icon" class="rectangle__card_info_logo" />
          <!-- <img src="@/assets/icons/more_info.svg" alt="icon"> -->
        </div>

        <span class="rectangle__card_title">{{ item.title }}</span>

        <div class="rectangle__card_lesson">
          <div class="rectangle__card_lesson_info">
            <div class="rectangle__card_lesson_text">
              <span>{{ item.course_count }} ta kurs</span>
            </div>
          </div>

          <img src="@/assets/icons/arrow-right.svg" alt="icon" />
        </div>
      </div>

      <div
        class="rectangle__card"
        style="height: 167px"
        :style="lessonsList2.length >= 4 ? 'width: 24%;' : 'width: 32%;'"
        v-for="(index, item) in lessonsList2"
        :key="index"
        @click="goToInside(item)"
      >
        <div class="rectangle__card_info">
          <img
            :src="item.icon"
            :alt="item.title"
            class="rectangle__card_info_logo"
          />
          <!-- <img src="@/assets/icons/more_info.svg" alt="icon"> -->
        </div>

        <span class="rectangle__card_title">{{ item.title }}</span>

        <div class="rectangle__card_lesson">
          <div class="rectangle__card_lesson_info">
            <div class="rectangle__card_lesson_text">
              <span>{{ item.course_count }} ta kurs</span>
            </div>
          </div>

          <img src="@/assets/icons/arrow-right.svg" alt="icon" />
        </div>
      </div>
    </div>

    <div class="lessons__recommended">
      <div class="lessons__navigation">
        <span class="lessons__subtitle">Tavsiya etiladi</span>
        <div>
          <div><img src="@/assets/icons/arrow-right.svg" alt="icon" /></div>
          <div><img src="@/assets/icons/arrow-right.svg" alt="icon" /></div>
        </div>
      </div>

      <div
        class="square__card"
        v-for="(index, item) in lessonsList3"
        :key="index"
        @click="goToInside(item)"
      >
        <img
          class="square__card_image"
          :src="require('@/assets/images/' + item.image)"
          :alt="item.title"
        />

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
              <span>{{ item.details.lessonsAmount }}</span>
            </div>
            <div class="square__card_lesson_text">
              <div>
                <img src="@/assets/icons/clock.svg" alt="icon" />
              </div>
              <span>{{ item.details.totalDuration }}</span>
            </div>
          </div>

          <img src="@/assets/icons/arrow-right.svg" alt="icon" />
        </div>
      </div>
    </div>

    <div class="lessons__recommended">
      <div class="lessons__navigation">
        <span class="lessons__subtitle">Husnixat</span>
        <div>
          <div><img src="@/assets/icons/arrow-right.svg" alt="icon" /></div>
          <div><img src="@/assets/icons/arrow-right.svg" alt="icon" /></div>
        </div>
      </div>

      <div
        class="square__card"
        v-for="(index, item) in lessonsList4"
        :key="index"
        @click="goToInside(item)"
      >
        <img
          class="square__card_image"
          :src="require('@/assets/images/' + item.image)"
          :alt="item.title"
        />

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
              <span>{{ item.details.lessonsAmount }}</span>
            </div>
            <div class="square__card_lesson_text">
              <div>
                <img src="@/assets/icons/clock.svg" alt="icon" />
              </div>
              <span>{{ item.details.totalDuration }}</span>
            </div>
          </div>

          <img src="@/assets/icons/arrow-right.svg" alt="icon" />
        </div>
      </div>
    </div>

    <div class="lessons__recommended">
      <div class="lessons__navigation">
        <span class="lessons__subtitle">Tavsiya etiladi</span>
        <div>
          <div><img src="@/assets/icons/arrow-right.svg" alt="icon" /></div>
          <div><img src="@/assets/icons/arrow-right.svg" alt="icon" /></div>
        </div>
      </div>

      <div
        class="square__card"
        v-for="(index, item) in lessonsList5"
        :key="index"
        @click="goToInside(item)"
      >
        <img
          class="square__card_image"
          :src="require('@/assets/images/' + item.image)"
          :alt="item.title"
        />

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
              <span>{{ item.details.lessonsAmount }}</span>
            </div>
            <div class="square__card_lesson_text">
              <div>
                <img src="@/assets/icons/clock.svg" alt="icon" />
              </div>
              <span>{{ item.details.totalDuration }}</span>
            </div>
          </div>

          <img src="@/assets/icons/arrow-right.svg" alt="icon" />
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
      lessonsList: [],
      lessonsList2: [
        // {
        //   course_count: 1,
        //   icon: null,
        //   id: 6,
        //   title: "Arab tili",
        // },
      ],
      lessonsList3: [
        {
          id: 1,
          image: "free-courses/photo1.png",
          title: "Arab husnixati: Fors-arab kalligrafiyasi kursi",
          price: "420,000 so‘m",
          priceColor: "#00BCD4",
          details: {
            lessonsAmount: "13 ta dars",
            totalDuration: "3soat 20daqiqa",
          },
        },
        {
          id: 2,
          image: "free-courses/photo2.png",
          title: "Yoshi kattalar uchun maxsus tajvid darslari",
          price: "BEPUL",
          priceColor: "#FED14C",
          details: {
            lessonsAmount: "6 ta dars",
            totalDuration: "2soat 50daqiqa",
          },
        },
        {
          id: 3,
          image: "free-courses/photo3.png",
          title: "Xarflarni mahrajidan chiqarish usullarini o‘rganamiz",
          price: "420,000 so‘m",
          priceColor: "#00BCD4",
          details: {
            lessonsAmount: "27 ta dars",
            totalDuration: "12soat 45daqiqa",
          },
        },
      ],
      lessonsList4: [
        {
          id: 1,
          image: "free-courses/photo4.png",
          title: "Boshlang‘ich xusnihat. Harflarni to‘g‘ri yozish",
          price: "50,000 so‘m",
          priceColor: "#00BCD4",
          details: {
            lessonsAmount: "9 ta dars",
            totalDuration: "2soat 5daqiqa",
          },
        },
        {
          id: 2,
          image: "free-courses/photo1.png",
          title: "Arab husnixati: Fors-arab kalligrafiyasi kursi",
          price: "420,000 so‘m",
          priceColor: "#00BCD4",
          details: {
            lessonsAmount: "74 ta dars",
            totalDuration: "9soat 15daqiqa",
          },
        },
        {
          id: 3,
          image: "free-courses/photo5.png",
          title: "Arab kalligrafiyasi. 3 ta real praktika amaliyot mavjud",
          price: "1,500,000 so‘m",
          priceColor: "#00BCD4",
          details: {
            lessonsAmount: "87 ta dars",
            totalDuration: "54soat 30daqiqa",
          },
        },
      ],
      lessonsList5: [
        {
          id: 1,
          image: "free-courses/photo6.png",
          title: "Boshlang‘ich tavjid ilmi. Uyga vazifalar bilan",
          price: "99,000 so‘m",
          priceColor: "#00BCD4",
          details: {
            lessonsAmount: "5 ta dars",
            totalDuration: "1soat 55daqiqa",
          },
        },
        {
          id: 2,
          image: "free-courses/photo7.png",
          title: "Yo‘ldoshbek Ibrohimdan onlayn tartil kursi",
          price: "149,000 so‘m",
          priceColor: "#00BCD4",
          details: {
            lessonsAmount: "13 ta dars",
            totalDuration: "4soat 15daqiqa",
          },
        },
        {
          id: 3,
          image: "free-courses/photo8.png",
          title: "Tajvid darslari Shayx Alijon qori bilan birgalikda",
          price: "BEPUL",
          priceColor: "#FED14C",
          details: {
            lessonsAmount: "59 ta dars",
            totalDuration: "36soat 10daqiqa",
          },
        },
      ],
    };
  },
  computed: {
    ...mapState([
      // 'independent_courses'
    ]),
    independent_courses: {
      get() {
        return this.$store.state.independent_courses;
      },
      set(value) {
        this.$store.commit("SET_INDEPENDENT_COURSES", value);
      },
    },
  },
  methods: {
    ...mapActions(["GET_INDEPENDENT_COURSES_LIST"]),
    goToInside(item) {
      console.log(item);
      this.$router.push({
        name: "free-courses-name",
        params: { name: item.id, title: item.title },
      });
    },
  },
  async created() {
    await this.GET_INDEPENDENT_COURSES_LIST();
    this.lessonsList = this.independent_courses.data.slice(0, 2);
    this.lessonsList2 = this.independent_courses.data.slice(2, this.independent_courses.data.length);
  },
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
</style>
