export const state = () => ({
  user: [],
  refreshIntervalId: null,
  testIntervalId: null,

  // ========== ERKIN_KURSLAR START ==========
  independent_courses: [],
  filtered_courses: [],
  filtered_courses_by_id: [],
  lesson: [],
  // ========== ERKIN_KURSLAR END ==========

  // ========== AKADEMIYA_DARSLARI START ==========
  academy_courses: [],
  test_starting: [],
  test_check: [],
  test_information: [],
  test_list: [],
  // ========== AKADEMIYA_DARSLARI END ==========

  // ========== NEWS START =========
  
  news_cards: [],

  
  // =========== USER INFO =======
  user_info: {
    name: '',
    birth: '',
    gender: '',
    tel_number: ''
  }
});

export const getters = {
  hasAccess(state) {
    return state.user && state.user.access_token ? true : false;
  },
};

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_STATE_CHANGED(state, payload) {
    state.user = payload;
  },
  SET_REFRESH_INTERVAL(state, payload) {
    state.refreshIntervalId = payload;
  },
  SET_TEST_INTERVAL(state, payload) {
    state.testIntervalId = payload;
  },

  // =============== ERKIN_KURSLAR START ===============
  SET_INDEPENDENT_COURSES(state, payload) {
    state.independent_courses = payload;
  },
  SET_FILTERED_COURSES_LIST(state, payload) {
    state.filtered_courses = payload;
  },
  SET_NEXT_FILTERED_COURSES_LIST(state, payload) {
    payload.data.forEach((elem) => {
      state.filtered_courses.push(elem)
    })
  },
  SET_FILTERED_COURSES_BY_ID(state, payload) {
    state.filtered_courses_by_id = payload;
  },
  SET_LESSON(state, payload) {
    state.lesson = payload;
  },
  // =============== ERKIN_KURSLAR END ===============

  // =============== AKADEMIYA_DARSLARI START ===============
  SET_ACADEMY_COURSES(state, payload) {
    state.academy_courses = payload;
  },
  SET_TEST_STARTING(state, payload) {
    state.test_starting = payload;
  },
  SET_TEST_CHECK(state, payload) {
    state.test_check = payload;
  },
  SET_TEST_INFORMATION(state, payload) {
    state.test_information = payload;
  },
  SET_TEST_LIST(state, payload) {
    state.test_list = payload;
  },
  // =============== AKADEMIYA_DARSLARI END ===============

  // =============== News START ==================
  SET_NEWS_INFORMATION(state, payload) {
    state.news_cards = payload;
  },

  //  ==========     USER INFO ===============
  SET_USER_INFO(state, payload) {
    state.user_info = payload;
  }
};

export const actions = {
  STATE_CHANGED({}, payload) {
    this.commit("SET_STATE_CHANGED", payload);
  },
  // $api
  async POST_LOG_OUT({ state, commit }) {
    sessionStorage.setItem("user", JSON.stringify([]));

    await this.$axios({
      method: "POST",
      url: "/api/logout ",
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
    });

    this.commit("SET_STATE_CHANGED", []);
  },
  async POST_SEND_SMS({ state, commit }, payload) {
    return await this.$axios({
      method: "POST",
      url: "/api/verification/send-sms",
      data: payload,
    }).then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      });
  },
  async POST_CHECK_SMS_CODE({ state, commit }, payload) {
    return await this.$axios({
      method: "POST",
      url: "/api/verification/check-sms-code",
      data: payload,
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_USER", response.data.data);
          sessionStorage.setItem("user", JSON.stringify(response.data.data));
        }
        return response
      })
      .catch((error) => {
        return error.response
      });
  },
  async POST_AUTH_GET_INFO({ state, commit }, payload) {
    console.log(state);
    return await this.$axios({
      method: "POST",
      url: "/api/auth/get-info",
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response
      });
  },
  async POST_SEND_USER_DATA({ state, commit }, payload) {
    return await this.$axios({
      method: "POST",
      url: "/api/users",
      data: payload,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response
      });
  },

  // ============================== ERKIN_KURSLAR START ==============================
  async GET_INDEPENDENT_COURSES_LIST({ state, commit }) {
    return await this.$axios({
      method: "GET",
      url: "/api/list/independent-courses",
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_INDEPENDENT_COURSES", response.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async GET_FILTERED_COURSES_LIST({ state, commit }, payload) {
    return await this.$axios({
      method: "GET",
      url: `/api/filtered-courses?category_id=${payload.category_id}&per_page=${payload.per_page}&page=${payload.page}`,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        commit("SET_FILTERED_COURSES_LIST", response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async GET_NEXT_FILTERED_COURSES_LIST({ state, commit }, payload) {
    return await this.$axios({
      method: "GET",
      url: `/api/filtered-courses?category_id=${payload.category_id}&per_page=${payload.per_page}&page=${payload.page}`,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        commit("SET_NEXT_FILTERED_COURSES_LIST", response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async GET_FILTERED_COURSES_BY_ID({ state, commit }, payload) {
    return await this.$axios({
      method: "GET",
      url: `/api/filtered-courses/${payload.id}`,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        commit("SET_FILTERED_COURSES_BY_ID", response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async POST_START_COURSE({ state, commit }, payload) {
    return await this.$axios({
      method: "POST",
      url: `/api/start-course`,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
      data: {
        course_id: payload.course_id,
      },
    })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async GET_LESSON({ state, commit }, payload) {
    return await this.$axios({
      method: "GET",
      url: `/api/lesson/${payload.id}`,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        commit("SET_LESSON", response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async POST_COMPLETE_LESSON({ state, commit }, payload) {
    return await this.$axios({
      method: "POST",
      url: `/api/completed-lesson`,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
      data: {
        lesson_id: payload.lesson_id,
      },
    })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // ============================== ERKIN_KURSLAR END ==============================

  // ============================== AKADEMIYA_DARSLARI START ==============================
  async GET_ACADEMY_COURSES_LIST({ state, commit }) {
    return await this.$axios({
      method: "GET",
      url: "/api/list/academy-courses",
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_ACADEMY_COURSES", response.data.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async POST_TEST_STARTING({ state, commit }, payload) {
    return await this.$axios({
      method: "POST",
      url: "/api/test/starting",
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
      data: {
        lesson_id: payload.lesson_id,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_TEST_STARTING", response.data.data);
        }
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  },
  async POST_TEST_CHECK({ state, commit }, payload) {
    return await this.$axios({
      method: "POST",
      url: "/api/test/check",
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
      data: payload,
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_TEST_CHECK", response.data.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async GET_TEST_INFORMATION({ state, commit }, payload) {
    return await this.$axios({
      method: "GET",
      url: `/api/test/information?test_session_id=${payload.test_session_id}`,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_TEST_INFORMATION", response.data.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async GET_TEST_LIST({ state, commit }, payload) {
    return await this.$axios({
      method: "GET",
      url: `/api/test/list?test_session_id=${payload.test_session_id}`,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_TEST_LIST", response.data.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async GET_PDF_BOOK({ state, commit }, payload) {
    return await this.$axios({
      method: "GET",
      url: payload,
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // ============================== AKADEMIYA_DARSLARI END ==============================

  // ============================== NEWS START ===================================
  async GET_NEWS_INFORMATION({ state, commit }) {
    return await this.$axios({
      method: "GET",
      url: "/api/list/news",
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_NEWS_INFORMATION", response.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  //   =====================   NEWS WITH SLUG ==============

  async GET_NEWS_SLUG({ state, commit }) {
    return await this.$axios({
      method: "GET",
      url: "/api/list/news",
      headers: {
        Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          commit("SET_NEWS_INFORMATION", response.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },


  //  ========================      GET USER INFO  =====================

  async POST_USER_INFO({state, commit}, payload) {
    return await this.$axios({
      method: "POST",
        url: "/api/auth/get-info",
      data: payload,
      headers: {
Authorization: state.user.token_type + " " + state.user.access_token,
      },
    })
    .then((response) => {
      if(response.status == 200) {
        commit("SET_USER_INFO", response.data);
      }
      return response.data
    })
    .catch((error) => {
      console.log(error)
    });
  }
};
