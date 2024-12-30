<script src="../pages/widgets/data.js"></script>
<script>
/**
 * Auth component
 */
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div>
    <div class="account-pages mt-5 mb-5">
      <div class="container">
        <slot />
      </div>
      <!-- end container -->
    </div>
    <!-- end page -->
    <footer class="footer footer-alt">
      2018 - {{ new Date().getFullYear() }} &copy; powered by
      <a href="">TechnoL0g</a>
    </footer>
  </div>
</template>
