<template>
  <div class="userContainer">
    <el-table :data="List" border style="width: 100%">
        <el-table-column prop="" label="序号">
          <template slot-scope="scope">
            {{scope.$index+1 * (10* (pageIndex-1))+1}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="会员名称"></el-table-column>
      <el-table-column prop="monthlyFee" label="月费(元)"></el-table-column>
      <el-table-column prop="annualFee" label="年费(元)">
      </el-table-column>
      <el-table-column prop="fee" label="赠送平台币"> </el-table-column>
      <el-table-column prop="freeAdmission" label="免费投标次数"> </el-table-column>
      <el-table-column prop="large" label="是否拥有大额项目竞标"> 
          <template slot-scope="scope">
            {{scope.row.large==1?'是':'否'}}
          </template>
      </el-table-column>
      <el-table-column prop="proportion" label="佣金抽成比例 ">
         <template slot-scope="scope">
            {{scope.row.proportion+'%'}}
          </template>
      </el-table-column>
    
    
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="showEdit(scope.row)" type="primary" size="small">编辑</el-button>
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
     <!-- 会员修改 -->
     <el-dialog
      title="提示"
      @close="Cancel"
      :visible.sync="isShowEdit"
      width="50%" >
      <el-form
      ref="ruleForm"
        :model="ruleForm"
          :rules="rules"
        class="demo-ruleForm"
         label-width="120px"
      >

        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="年 费"
          prop="annualFee"
          :rules="[{ required: true, message: '请输入年费' }]"
        >
          <el-input v-model="ruleForm.annualFee"></el-input>
        </el-form-item>
        <el-form-item
          label="月 费"
          prop="monthlyFee"
          :rules="[{ required: true, message: '请输入月 费' }]"
        >
          <el-input v-model="ruleForm.monthlyFee"></el-input>
        </el-form-item>
        <el-form-item
          label="赠送平台币"
          prop="fee"
          :rules="[{ required: true, message: '请输入赠送平台币' }]"
        >
          <el-input v-model="ruleForm.fee"></el-input>
        </el-form-item>
        <el-form-item
          label="佣金抽成比例"
          prop="proportion"
          label-width="120px"
          :rules="[{ required: true, message: '请输入佣金抽成比例' }]"
        >
          <el-input v-model="ruleForm.proportion"></el-input>
        </el-form-item>
        <el-form-item
          label="免费投标次数"
          prop="freeAdmission"
          :rules="[{ required: true, message: '请输入免费投标次数' }]"
        >
          <el-input v-model="ruleForm.freeAdmission"></el-input>
        </el-form-item>
        <el-form-item
          label="是否优选"
          prop="good"
            :rules="[{ required: true, message: '请选择' }]"
        >
          <el-select v-model="ruleForm.good">
            <el-option  v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否拥有大额项目竞标"
          prop="large"
            :rules="[{ required: true, message: '请选择' }]"
        >
          <el-select v-model="ruleForm.large">
            <el-option  v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
            
          </el-select>
        </el-form-item>
        <div style="text-align:right;">
          <el-button @click="Cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
        </div>
      </el-form>
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
        ruleForm:{large:'1'},
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
        {label:'是',value:1 },
        {label:'否',value:0  },
      ],
      nowTime:0,
      useriId:"",
      isShowEdit:false,
      item:{},
       rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
        annualFee: [
          { required: true, message: "请输入年费", trigger: "blur" },
        ],
        monthlyFee: [
          { required: true, message: "请输入月费", trigger: "blur" },
        ],
        }
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
    submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
              let url = '/member/edit';
              let params = this.ruleForm;
           this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.isShowEdit = false;
              this.getList();
            }
          });

          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
    //获取数据
    getList() {
      let url = "/member/getList";
      let params = {
      pageNum :this.pageIndex,//(integer, optional): 页数 ,
      pageSize :10,//(integer, optional): 数量 ,
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
    showEdit(e){
      this.isShowEdit = true;
      this.ruleForm={...e};

    },
    Cancel(){
      this.isShowEdit =false;
    },
  },
  filters:{
    showMemberId(e){
      let str ='非会员';
    //  return e.memberId
      let flag =  Date.now() < e.memberTime
     switch(e.memberId) {
     case 1:
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

