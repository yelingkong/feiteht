<template>
  <div class="userContainer">
    <div class="option">
      <el-form :inline="true">
        <el-form-item  label="昵称">
          <el-input placeholder="请输入昵称" v-model="key" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item  label="ID">
          <el-input placeholder="请输入ID" v-model="code" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item  label="手机号">
          <el-input placeholder="手机号" v-model="phone" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="verification" placeholder="请选择审核状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="cardNo" label="身份证号">
      </el-table-column>
      <el-table-column prop="id" label="ID "></el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="money" label="账户余额">
      </el-table-column>
      <el-table-column prop="free" label="平台币">
      </el-table-column>
     <el-table-column prop="cashStatus" label="审批状态">
          <template slot-scope="scope">
                <el-tag type="warning" >{{scope.row.verification |showStatus}}</el-tag>
          </template>
      </el-table-column>
        <el-table-column fixed="right" label="操作" width="320">
        <template slot-scope="scope">
          <el-button @click="showVerify(scope.row)" type="primary" size="small" v-show="scope.row.verification==3">查看原因</el-button>
          <el-button @click="verify(scope.row,1)" type="primary" size="small"  v-show="scope.row.verification==1" >审核通过</el-button>
          <el-button @click="verify(scope.row,2)" type="primary" size="small" v-show="scope.row.verification==1">审核不通过</el-button>
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
    <!-- 查看找回 -->
   <el-dialog title="收款人账户信息" :visible.sync="isShow" width="50%">
        <p>收款人:{{item.name }}</p>
        <p>收款人帐号:{{item.account}}</p>
        <p>收款人开户行:{{item.openingBank}}</p>
        
        <div  style="margin-top: 20px;">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看不通过理由 -->
   <el-dialog title="不通过理由" :visible.sync="isShowVerify" width="50%">
        <p>{{reason}}</p>
        <div  style="margin-top: 20px;">
        <el-button @click="isShowVerify = false">取 消</el-button>
        <el-button type="primary" @click="isShowVerify = false">确 定</el-button>
      </div>
    </el-dialog>
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
      key:"",//昵称
      phone:"",
      List:[],//表数据
      pageIndex: 1, //当前多少页
      currentPage4: 1,
      total: 0,
      verification:"",
      options:[
        // 1 待验证;2:通过;3不通过
        {label:'全部',value:''},
        {label:'待验证',value:1},
        {label:'通过',value:2},
        {label:'不通过',value:3},
      ],
      isShow:false,
      isShowVerify:false,
      item:{},
      reason:'',//理由
   
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
      let url = "/user/findVList";
      let params = {
        code :this.code,//(integer, optional): 邀请码 就是展示用的用户ID 甲乙双方模糊搜索 ,
        key :this.key,//(string, optional): 昵称 甲乙双方模糊搜索 ,
        phone:this.phone,// (string, optional): 单号 ,
        verification :this.verification,// 1 待验证;2:通过;3不通过
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
    
    showVerify(e){
      this.isShowVerify= true;
      this.reason=e.region;
    },
    verify(e,type){
      console.log(type);
      if(type == 1){
        this.$confirm('审核通过?','提示',{
           type: "warning"
      })
        .then(() => {
          let url = "/user/examine";
          let params = {
            id: e.id,
            type:"1",
            reason: "通过"
          };
          this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              // this.dialogVisible = false;
              this.getList();
            }
          });
        })
        
      }else {
        this.$prompt('审核不通过', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\u4e00-\u9fa5]/,///[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: "请输入中文理由",
        }).then(({ value }) => {
           let url = "/user/examine";
          let params = {
            id: e.id,
            type:2,
            reason: value
          };
          this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.getList();
            }
          });

        }).catch(() => {
        });
      }
    }
  },
  filters:{
    showStatus(e){
      let str ='';
     switch(e) {
     case 0:
      str= '未申请'
        break;
     case 1:
         str=  "待验证"
        break;
     case 2:
         str=  "通过"
        break;
     case 3:
         str=  "不通过"
        break;
     default:

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

