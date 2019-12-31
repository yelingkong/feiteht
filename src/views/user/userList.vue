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
          <el-input placeholder="请输入手机号" v-model="phone" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item  label="状态">
           <el-select v-model="status" placeholder="状态">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </el-form-item>
        <el-form-item>
   <el-date-picker
      v-model="selDate"
      style="width:220px"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions1"
      >
    </el-date-picker>
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
      <el-table-column prop="code" label="ID "></el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="money" label="账户余额">
      </el-table-column>
      <el-table-column prop="free" label="平台币">
      </el-table-column>
    
      <el-table-column fixed="right" label="操作" width="320">
        <template slot-scope="scope">
          <el-button @click="showChangeMember(scope.row)" type="primary" size="small">{{scope.row | showMemberId}}</el-button>
          <!-- 0未删除；1冻结 , -->
          <el-button @click="freeze(scope.row)" type="primary" size="small">{{scope.row.status==1?'解冻':'冻结'}}</el-button>
          <el-button @click="give(scope.row)" type="primary" size="small">赠送平台币</el-button>
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
     <!-- 赠送会员  -->
      <el-dialog title="赠送会员" :visible.sync="showEditLeve" width="50%">
          <el-form label-width="100px">
            <el-form-item>
               <el-select v-model="memberId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
            </el-form-item>
          </el-form>
          <div  style="margin-top: 20px;">
          <el-button @click="showEditLeve = false">取 消</el-button>
          <el-button type="primary" @click="EditLeve">确 定</el-button>
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
      selDate:"",
      startTime:'',//注册时间
      endTime:"",//注册结束时间
      code:'',//用户id
      key:"",//昵称
      phone:"",
      status:"",//0 正常 ,1 冻结
      type:"",// (integer, optional): 0 全部;1:用户;2商户 ,
      verification :"",//(integer, optional): 0:申请验证 1 待验证;2:通过;3不通过
      List:[],//表数据
      pageIndex: 1, //当前多少页
      currentPage4: 1,
      total: 0,
      memberId:'',
      options:[
        {label:'普通',value:1 },
        {label:'vip',value:2  },
        {label:'钻石',value:3 },
      ],
      options1:[
        {label:'全部',value:'' },
        {label:'冻结',value:1 },
        {label:'正常',value:0 },
      ],
      nowTime:0,
      useriId:"",
        showEditLeve:false,
   
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
    //赠送平台币
    give(e) {
      console.log(e.id);
        this.$prompt('请输入平台币赠送数量', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let url = '/user/recharge';
          let params={
            "free": value,
            "userId": e.id
          }
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
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    //冻结
    freeze(row) {
      this.$confirm("是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/user/frozen";
          let params = {
            ids: row.id,
            type: row.status==1?0:1
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
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //获取数据
    getList() {
      let url = "/user/findList";
      let params = {
      code:this.code,//(integer, optional): 用户ID ,
      endTime :this.endTime,//(string, optional): 注册 结束时间 ,
      key:this.key ,//(string, optional): 昵称 ,
      pageNum :this.pageIndex,//(integer, optional): 页数 ,
      pageSize :10,//(integer, optional): 数量 ,
      phone :this.phone,//(string, optional): 手机号 ,
      startTime:this.startTime,// (string, optional): 注册 开始时间 ,
      status:this.status ,//(integer, optional): 0 正常 ,1 冻结 ,
      type:0,// (integer, optional): 0 全部;1:用户;2商户 ,
      // verification :'2',//(integer, optional): 0:申请验证 1 待验证;2:通过;3不通过
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
    
    showChangeMember(e){
      this.useriId = e.id;
      this.showEditLeve = true;
      this.memberId = e.memberId;
    },
    EditLeve(){
      // memberId (integer, optional): 会员类型ID null 就是没有会员/1.普通/2vip/3钻石 ,
      let params = {
        membersId:this.memberId,
        userId:this.useriId
      }
       this.httpPost('/member/recharge', params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
               
              this.showEditLeve = false;
              this.getList();
            }
          });
    }
    
  },
  filters:{
    showMemberId(e){
      let str ='非会员';
    //  return e.memberId
      let flag =  Date.now() < e.memberTime
     switch(e.memberId) {
     case 1:
        // 代码块
      str=  flag?'普通':'非会员'
        break;
     case 2:
         str=  flag?'vip':'非会员'
        break;
     case 3:
         str=  flag?'钻石':'非会员'
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

