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
        <el-form-item>
          <el-select v-model="cashStatus" placeholder="请选择审核状态">
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
      <el-table-column prop="code" label="ID">
      </el-table-column>
      <el-table-column prop="tradeNo" label="订单号">
      </el-table-column>
      <el-table-column prop="money" label="提现金额(元)">
      </el-table-column>
      <el-table-column prop="" label="收款方式">
        <template slot-scope="scope">
          <el-button type="warning" @click="check(scope.row)" >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="auditTime" label="审核时间">
            <template slot-scope="scope">
          {{scope.row.auditTime |formatDateTime}}
        </template>
      </el-table-column>
      <el-table-column prop="auditName" label="审批人">
      </el-table-column>
       <el-table-column prop="cashStatus" label="审批状态">
          <template slot-scope="scope">
                <el-tag type="warning" >{{scope.row.cashStatus |showStatus}}</el-tag>
          </template>
      </el-table-column>
    
      <el-table-column fixed="right" label="操作" width="320">
        <template slot-scope="scope">
          <el-button @click="showVerify(scope.row)" type="primary" size="small" v-show="scope.row.cashStatus==2">查看原因</el-button>
          <el-button @click="verify(scope.row,1)" type="primary" size="small"  v-show="scope.row.cashStatus==0" >审核通过</el-button>
          <el-button @click="verify(scope.row,2)" type="primary" size="small" v-show="scope.row.cashStatus==0">审核不通过</el-button>
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
    
    var checkRatio = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("输入值不能为空"));
      }
      setTimeout(() => {
        if (value < 0 || value > 100) {
          callback(new Error("输入值必须在0-100之间"));
        } else {
          callback();
        }
      }, 1000);
    };
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
      cashStatus:"",
      options:[
        // 审核状态：0、代审核，1、审核成功，2、审核失败 ,
        {label:'全部',value:''},
        {label:'待审核',value:0},
        {label:'审核成功',value:1},
        {label:'审核失败',value:2},
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
      let url = "/cash/findList";
      let params = {
        cashStatus: this.cashStatus,
        code :this.code,//(integer, optional): 邀请码 就是展示用的用户ID 甲乙双方模糊搜索 ,
        nickName :this.nickName,//(string, optional): 昵称 甲乙双方模糊搜索 ,
        tradeNo:this.orderNum,// (string, optional): 单号 ,
        ordersStatus :0,//(integer, optional): 订单状态(0:竞标中/1:平台托管/2:付首款/3:进行中/4已结束/5已取消/6仲裁中) ,
        pageNum :this.pageIndex,//页数 ,
        pageSize :10,//(integer, optional): 数量
      };
      this.httpPost(url, params, res => {
        if (res.code == 200) {
          console.log(res.data);
          this.List = res.data.list;
          this.total = res.data.total;
          // this.List.forEach((element, i) => {
          //   this.List[i].index = (this.val - 1) * 10 + i + 1;
          //   this.List[i].createtype =
          //     this.List[i].createtype === 1 ? "用户注册" : "代理创建";
          // });
        } else {
          console.log("查询失败");
        }
      });
    },
    // 查看
    check(e){
      console.log(e)
      this.isShow = true;
      this.item = e;
    },
    //showVerify
    showVerify(e){
      this.isShowVerify= true;
      this.reason=e.reason;
    },
    // 审核
    // POST /cash/verify
    verify(e,type){
      console.log(type);
      if(type == 1){
        this.$confirm('审核通过?','提示',{
           type: "warning"
      })
        .then(() => {
          let url = "/cash/verify";
          let params = {
            id: e.id,
            cashStatus:"1",
            remark: "通过"
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
           let url = "/cash/verify";
          let params = {
            id: e.id,
            cashStatus:2,
            remark: value
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
    //    审核状态：0、代审核，1、审核成功，2、审核失败 ,
    //  return e.memberId
     switch(e) {
     case 0:
        // 代码块
      str= '代审核'
        break;
     case 1:
         str=  "审核成功"
        break;
     case 2:
         str=  "审核失败"
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

