<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu :index="String(item.menuId)" v-for="(item,ind) in menuList" :key="ind">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.menuName}}</span>
            </template>
            <el-menu-item :index="tag.permission" v-for="(tag,ind) in item.menuList" :key="ind">
              <i class="el-icon-menu"></i>
              <span slot="title">{{tag.menuName}}</span>
            </el-menu-item>
          </el-submenu>

         <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>代理介绍 </span>
            </template>
               <el-menu-item index="agentLeve?leve=1">县</el-menu-item>
            <el-menu-item index="agentLeve?leve=2">省</el-menu-item>
            <el-menu-item index="agentLeve?leve=3">市</el-menu-item>
          </el-submenu> -->
         <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" >用户中心</span>
            </template>
             <el-menu-item index="userList">普通用户</el-menu-item>
               <el-menu-item index="storeList">商家用户</el-menu-item>
           
          </el-submenu >
           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单中心</span>
            </template>
               <el-menu-item index="taskOrder">任务订单</el-menu-item>
               <el-menu-item index="arbitrationOrder">仲裁订单</el-menu-item>
               <el-menu-item index="memberOrder">会员订单</el-menu-item>
               <el-menu-item index="withdrawOrder">提现订单</el-menu-item>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>广告图</span>
            </template>
            <el-menu-item index="bannerList">banner</el-menu-item>
          </el-submenu>
           <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>公告管理</span>
            </template>
               <el-menu-item index="infoList">公告列表</el-menu-item>
          </el-submenu>
           <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>教程管理</span>
            </template>
               <el-menu-item index="courseList">教程管理</el-menu-item>
          </el-submenu>
           <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>行业管理</span>
            </template>
               <el-menu-item index="industryList">行业管理</el-menu-item>
          </el-submenu>
           <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>会员管理</span>
            </template>
               <el-menu-item index="member">会员管理</el-menu-item>
          </el-submenu>
           <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>参数设置</span>
            </template>
               <el-menu-item index="setData">百分比设置</el-menu-item>
          </el-submenu>
           <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>热词管理</span>
            </template>
               <el-menu-item index="termsList">百分比热词管理设置</el-menu-item>
          </el-submenu>
         
        <el-menu-item index="userCount">
            <i class="el-icon-menu"></i>
            <span slot="title" >统计查看</span>
          </el-menu-item>
          <el-submenu index="6-1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
           <el-menu-item index="accountManage">管理员用户列表</el-menu-item>
            <el-menu-item index="RoleList">角色列表</el-menu-item>
          </el-submenu>
          <el-submenu index="9-1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商家审核</span>
            </template>
           <el-menu-item index="storeAudit">商家审核</el-menu-item>
          </el-submenu>
          <el-submenu index="10">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>激活码</span>
            </template>
           <el-menu-item index="activationCode">激活码</el-menu-item>
          </el-submenu> -->
        </el-menu>  
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      account: "",
      password: "",
      menuList: [],
      msg: "Welcome to Your Vue.js App"
    };
  },

  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    this.account = sessionStorage.getItem("account");
    this.password = sessionStorage.getItem("password");
    this.Login();
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      //  this.$router.push(`/${keyPath}`);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 登陆
    Login() {
      let url = "/user/login";
      let params = {
        name: this.account,
        password: this.password
      };
      this.httpPost(url, params, res => {
        if (res.code == 200) {
          //匹配页面
          this.menuList = res.data.menuList;
          // console.log(this.menuList[4]);
          // this.menuList.forEach(element => {
          //   console.log(element);
          // });
          // console.log(this.menuList);
          // console.log(this.menuList.share);
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
