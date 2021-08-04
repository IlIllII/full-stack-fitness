<template>
  <div class="main">
    <Navbar />
    <div class="content-wrap">
      <h1>Privacy policy</h1>
      <p>
        It is pretty simple. I store usernames, passwords, and workout logs in a
        database. I only access this information to authenticate users and to
        serve workout data to users so they can track their progress. The data
        is not shared with any third parties or for any reason outside of the
        aims of the app, which is to make strength training easier for novices.
      </p>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Navbar from "./Navbar.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
.content-wrap {
  max-width: 50em;
  margin: auto;
  text-align: left;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 3px auto;
}
</style>