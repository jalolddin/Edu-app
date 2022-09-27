export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (store.getters.hasAccess) {
      next();
    } else {
      if (sessionStorage.getItem("user")) {
        const data = JSON.parse(sessionStorage.getItem("user"));
        store.dispatch("STATE_CHANGED", data);
        next();
      } else {
        next();
      }
    }
  });
};
