<template>
  <div id="app">
    
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name:"app",
 
  data(){
    return {
      
    }
  },
  methods:{
    
  }
}
</script>

<style>
  
  .el-menu .is-opened{
    background-color: #2C3B41 !important;
  }
  .el-menu--inline .el-menu-item{
    background-color: #2C3B41 !important;
  }
  .el-menu-item.is-active {
   background-color: rgb(20, 20, 20) !important;
  }
  
  .el-menu{
    border:none !important;
  }

  .content-box {
    position: absolute;
    left: 200px;
    right: 0;
    top: 52px;
    bottom: 0;
    overflow-y: auto;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }
.iconfont {
  margin-right: 5px;
  font-weight: normal;
  vertical-align: middle;
}
.tableItemBox .selectItem .el-checkbox__label{
  display: none
}
</style>
