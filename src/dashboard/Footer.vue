<template>
  <footer class="main-footer">
    <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io/">AdminLTE.io</a>.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <span>{{Environment}}</span> - 
      <b>Version</b> 3.1.0
    </div>
  </footer>
</template>

<script>
export default {
  computed:{
    Environment(){
      return process.env.VUE_APP_ENVRIONMENT;
    }
  }
}
</script>

<style>
  
</style>