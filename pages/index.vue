<template>
  <div class="bg-white">
    <Banner />
    <Sertificat />
    <About />
    <Numbers />
    <Instruction />
  </div>
</template>

<script>
import Banner from "@/components/Home/Banner";
import Sertificat from "@/components/Home/Sertificat";
import About from "@/components/Home/About";
import Numbers from "@/components/Home/Numbers";
import Instruction from "@/components/Home/Instruction";
export default {
  name: "IndexPage",
  components: {
    Banner,
    Sertificat,
    About,
    Numbers,
    Instruction,
  },
};
</script>

<style lang="scss" scoped></style>
