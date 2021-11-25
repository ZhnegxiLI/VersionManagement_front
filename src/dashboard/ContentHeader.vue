<template>
  <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0"><slot></slot></h1>
              </div>
      
            </div>
            <!-- /.row -->
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->
</template>

<script>

import { menuList } from "../Utils/Constants.js";
export default {
  data(){
    return  {
      menuList
    }
  }
}
</script>

<style>

</style>