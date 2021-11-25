<template>
  <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Dashboard</h1>
              </div>
              <!-- /.col -->
              <!-- TODO USE THE SAME LIST FOR SIDE BAR -->
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item" v-for="menu in menuList" :key="menu.name">
                 
                     <router-link
                  :to="menu.url"
                  class="nav-link"
                  active-class="active"
                ></router-link>
                    </li>
                  <!-- <li class="breadcrumb-item active">Dashboard v1</li> -->
                </ol>
              </div>
              <!-- /.col -->
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