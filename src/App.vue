<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <Preloader></Preloader>
      <Navbar></Navbar>
      <Sidebar></Sidebar>

      <div class="content-wrapper">
        <!-- <ContentHeader></ContentHeader>

        <section class="content">
        
        </section> -->
        <div class="container-fluid">
          <router-view />
        </div>
      </div>

      <Footer></Footer>
      <ControlSidebar></ControlSidebar>
    </div>
  </body>
</template>

<script>

import Preloader from "./dashboard/Preloader.vue";
//import ContentHeader from "./dashboard/ContentHeader.vue"
//import ExampleForm from "./components/ExampleForm.vue"
import Navbar from "./dashboard/Navbar.vue";
import Sidebar from "./dashboard/Sidebar.vue";
import Footer from "./dashboard/Footer.vue";
import ControlSidebar from "./dashboard/ControlSidebar.vue";

export default {
  name: "App",
  components: {
    Preloader,
    // ExampleForm,
    Navbar,
    Sidebar,
    Footer,
    ControlSidebar,
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
