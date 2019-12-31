<template>
  <div class="userContainer">
    <div class="option">
      <el-form :inline="true">
        <el-form-item  label="昵称">
          <el-input placeholder="请输入昵称" v-model="nickName" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item  label="ID">
          <el-input placeholder="请输入ID" v-model="code" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item  label="订单号">
          <el-input placeholder="订单号" v-model="orderNum" style="width:180px"></el-input>
        </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="List" border style="width: 100%">
        <el-table-column prop="" label="序号">
          <template slot-scope="scope">
            {{scope.$index+1 * (10* (pageIndex-1))+1}}
          </template>
        </el-table-column>
        <el-table-column prop="userNickName" label="甲方昵称"></el-table-column>
      <el-table-column prop="userCode" label="甲方ID">
      </el-table-column>
      <el-table-column prop="serviceNickName" label="乙方昵称">
      </el-table-column>
      <el-table-column prop="serviceCode" label="乙方ID">
      </el-table-column>
      <el-table-column prop="orderNo" label="订单号">
      </el-table-column>
      <el-table-column prop="createTime" label="订单日期">
         <template slot-scope="scope">
          {{scope.row.createTime |formatDateTime}}
        </template>
      </el-table-column>
      <el-table-column prop="money" label="订单总额">
      </el-table-column>
      <el-table-column prop="payMoney" label="实收款项">
      </el-table-column>
      <el-table-column prop="type" label="订单状态">
          <template slot-scope="scope">
                <el-tag type="warning" >{{scope.row.type |showStatus}}</el-tag>
          </template>
      </el-table-column>
    </el-table>
    <div class="paginat" >
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
 
  </div>
</template>


<script>
import {
  formatDateTime,
} from "../../assets/js/api.js";
export default {
  data() {
    return {
       pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },      
        },
      code:'',//用户id
      nickName:"",//昵称
      orderNum:"",
      List:[],//表数据
      pageIndex: 1, //当前多少页
      currentPage4: 1,
      total: 0,
    options:[
        {label:'全部',value:''},
        {label:'竞标中',value:'0'},
        {label:'平台托管',value:'1'},
        {label:'付首款',value:'2'},
        {label:'进行中',value:'3'},
        {label:'已结束',value:'4'},
        {label:'已取消',value:'5'},
        {label:'仲裁中',value:'6'},
      ]
    };
  },
  created() {
    },
  mounted(){
    this.getList();
  },

  methods: {
    
    //分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
   
    //获取数据
    getList() {
      let url = "/arbitration/getList";
      let params = {
        code :this.code,//(integer, optional): 邀请码 就是展示用的用户ID 甲乙双方模糊搜索 ,
        nickName :this.nickName,//(string, optional): 昵称 甲乙双方模糊搜索 ,
        no:this.orderNum,// (string, optional): 单号 ,
        pageNum :this.pageIndex,//页数 ,
        pageSize :10,//(integer, optional): 数量
      };
      this.httpPost(url, params, res => {
        if (res.code == 200) {
          console.log(res.data);
          this.List = res.data.list;
          this.total = res.data.total;
        } else {
          console.log("查询失败");
        }
      });
    },
    
  },
  filters:{
    showStatus(e){
      let str ='';
     switch(e) {
     case 0:
        // 代码块
      str= '仲裁中'
        break;
     case 1:
         str=  "甲方赢"
        break;
     case 2:
         str=  "乙方赢"
        break;
     default:

        // 默认代码块
} 
    return str;
    }
  },
   watch: {
    "selDate": function () {
      console.log(this.selDate)
      if (this.selDate != null) {
        this.startTime = formatDateTime(this.selDate[0]).split(' ')[0];
        var endTime = formatDateTime(this.selDate[1]);
        this.endTime = endTime.split(' ')[0];//+' 23:59:59';
        console.log(this.startTime);
        console.log(this.endTime);
      } else {
        this.startTime = '';
        this.endTime = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.userContainer {
  .option {
    padding: 10px;
    .search {
      float: right;
      padding: 10px;
    }
  }
  .ratioTil {
    display: block;
    padding: 10px 0;
  }
  .row {
    input {
      width: 90%;
      height: 30px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
}
</style>

<style>
.userContainer .el-button--success {
  margin-left: 0px !important;
}
.userContainer .el-input {
  width: 90%;
}
.userContainer .demo-table-expand .el-form-item{
  width:30%;
}
</style>

