export default function (context, inject) {
  // // Create a custom axios instance
  // const api = $axios.create({
  //     headers: {
  //       common: {
  //         'Accept': 'application/json, text/plain, */*'
  //       }
  //     }
  // })

  // // Set baseURL to something different
  // // api.setBaseURL('http://abuhanifa.loc/api/v1/')
  // api.setBaseURL('http://api.ittech.uz/api/v1/')

  // // // Inject to context as $api
  // inject('api', api)

  // // $axios.onRequest(config => {
  // //   console.log('Making request to ' + config.url)
  // // })

  // // $axios.onError(error => {
  // //   const code = parseInt(error.response && error.response.status)
  // //   if (code === 400) {
  // //     redirect('/400')
  // //   }
  // // })

  context.$axios.onError((error) => {
    if (error.response.status === 401) {
      context.redirect("/");
      // context.$toast.success('Hey')
    }
    if (error.response.status === 500) {
      console.log(error.response);
    }
  });
}
