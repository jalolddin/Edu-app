<template>
  <div class="footer">
    <div class="container mx-auto">
      <div class="footer-item">
        <div class="footer-head">
          <h1>Ko‘p beriladidan savollar ?</h1>
          <p>
            Bu yerda Imom Abu Hanifa akademiyasiga ko‘p marta, takroran
            beriladigan savollarga javoblar keltirilgan. Sizning ham biror
            savolingiz bo’lsa akademiya@info.uz pochtasiga yuboring
          </p>
        </div>
        <div class="footer-faq"></div>
        <div class="footer-block">
          <h1>
            Akademiyamizda <strong>200,000+</strong> talabalar ta’lim olishmoqda
          </h1>
          <nuxt-link to="/">Ta’limni boshlash</nuxt-link>
        </div>
        <div class="footer-menu">
          <div>
            <h2>SAHIFALAR</h2>
            <ul>
              <li><nuxt-link to="/">Biz haqimizda</nuxt-link></li>
              <li><nuxt-link to="/">Akademiya darslari</nuxt-link></li>
              <li><nuxt-link to="/">Erkin kurslar</nuxt-link></li>
            </ul>
          </div>
          <div>
            <h2>AKADEMIYA DARSLARI</h2>
            <ul>
              <li><nuxt-link to="/">Aqoid darslari</nuxt-link></li>
              <li><nuxt-link to="/">Odob darslari</nuxt-link></li>
              <li><nuxt-link to="/">Siyrat darslari</nuxt-link></li>
              <li><nuxt-link to="/">Hadis darslari</nuxt-link></li>
              <li><nuxt-link to="/">Tafsir darslari</nuxt-link></li>
              <li><nuxt-link to="/">Fiqh darslari</nuxt-link></li>
            </ul>
          </div>
          <div>
            <h2>ERKIN KURSLAR</h2>
            <ul>
              <li><nuxt-link to="/"> Qiroat </nuxt-link></li>
              <li><nuxt-link to="/"> Tajvid </nuxt-link></li>
              <li><nuxt-link to="/"> Husnixat </nuxt-link></li>
              <li><nuxt-link to="/"> Islom moliyasi </nuxt-link></li>
              <li><nuxt-link to="/"> va boshqalar </nuxt-link></li>
            </ul>
          </div>
          <div>
            <h2>KONTAKTLAR</h2>
            <ul>
              <li><a href="tel:+998 (71) 200-02-02">+998 (71) 200-02-02</a></li>
              <li>
                <nuxt-link to="/contact"
                  >Turkiya, Istanbul, Fethiya 4-uy</nuxt-link
                >
              </li>
              <li><nuxt-link to="/"></nuxt-link></li>
              <li>
                <a href="mailto:akademiya@info.uz" class="footerEmail">
                  akademiya@info.uz
                </a>
              </li>
            </ul>
            <div class="social">
              <ul>
                <li>
                  <a href="#">
                    <img src="@/assets/icons/facebook.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="@/assets/icons/twitter.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="@/assets/icons/instagram.svg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© Abu Hanifa <span>Barcha huquqlar himoyalangan</span></p>
          <p>
            Powered by
            <a href=""> <img src="@/assets/images/powerBy.png" alt="" /> </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
