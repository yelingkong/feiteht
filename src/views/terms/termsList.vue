<template>
  <div class="userContainer">
    <div class="option">
       
      <el-form :inline="true">
        <el-form-item  label="关键字">
          <el-input placeholder="请输入关键字" v-model="key" style="width:180px"></el-input>
        </el-form-item>
         <el-form-item label="状态">
          <el-select v-model="hide" placeholder="状态">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
        </el-form-item>
          <el-button type="success"  @click="addTerms()">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="List" border style="width: 100%">
        <el-table-column prop="" label="序号">
          <template slot-scope="scope">
            {{scope.$index+1 * (10* (pageIndex-1))+1}}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="num" label="数量">
      </el-table-column>
      <el-table-column prop="hide" label="状态">
          <template slot-scope="scope">
                <el-tag type="warning" >{{scope.row.hide |showStatus}}</el-tag>
          </template>
      </el-table-column>
    
      <el-table-column fixed="right" label="操作" width="320">
        <template slot-scope="scope">
          <el-button @click="show(scope.row)" type="primary" size="small">{{scope.row.hide!=1?'展示':'隐藏'}}</el-button>
          <el-button @click="delet(scope.row)" type="primary" size="small">删除</el-button>
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
   <!-- 弹框 -->
    <el-dialog title="提示"    @close="Cancel"  :visible.sync="isShow"   width="30%"  >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >

        <el-form-item
          label="数量"
          prop="num"
        >
          <el-input
            v-model.number="ruleForm.num"
            placeholder="请输入数量"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="文字"
          prop="content"
        >
          <el-input
            v-model.number="ruleForm.content"
            placeholder="请输入文字"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否显示"
          prop="hide"
        >
          <el-radio
            v-model="ruleForm.hide"
            label="1"
          >显示</el-radio>
          <el-radio
            v-model="ruleForm.hide"
            label="0"
          >隐藏</el-radio>
        </el-form-item>

        <div style="text-align:right;">
          <el-button @click="Cancel">取 消</el-button>
          <el-button
            type="primary"
            @click="isOkClick('ruleForm')"
          >确 定</el-button>
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
         rules: {
        num: [{ required: true, type: "number", message: "请输入数字" ,trigger: "blur"}],
        content: [{ required: true, message: "请输入内容" ,trigger: "blur"}],
      },
      code:'',//用户id
      key:"",
      orderNum:"",
      List:[],//表数据
      pageIndex: 1, //当前多少页
      currentPage4: 1,
      total: 0,
      isShow:false,//新增弹框
      hide:"",
    options1:[
      {label:"隐藏",value:0},
        {label:'显示',value:1},
      ],
    ruleForm:{
        num:'',
        content:"",
        hide:''
    },
    flag:1,
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
        // POST /terms/getList
      let url = "/terms/getList";
      let params = {
        hide:this.hide,
        key :this.key,//(string, optional): 昵称 甲乙双方模糊搜索 ,
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
    // 新增
    addTerms(){
        this.isShow = true;
        this.ruleForm.num='';
        this.ruleForm.content='';

    },
       //取消
    Cancel() {
      this.isShow = false;
       this.ruleForm.num='';
        this.ruleForm.content='';
    },
    delet(e){
        console.log(e.id);
            this.$confirm("删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/terms/del";
          let params = {
            ids: e.id,
          };
          this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.isShow = false;
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 展示 / 隐藏
    show(e){
        console.log(e)
              this.$confirm("切换, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(222222)
          let url = "/terms/edit";
           let params = {
            hide: e.hide == 1?0:1,
            id: e.id,
        };
          this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "切换成功"
              });
              this.isShow = false;
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //确定
    isOkClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.flag == 1) {
            let url = "/terms/add";
            let params = {
              hide: this.ruleForm.hide,
              num: this.ruleForm.num,
              content: this.ruleForm.content
            };
            this.httpPost(url, params, res => {
              if (res.code == 200) {
                this.getList();
                this.isShow = false;
              }
            });
          } else {
            let url = "/banner/edit";
            let params = {
              id: this.editId,
              hide: this.ruleForm.hide,
              imgUrl: this.ruleForm.imgUrl,
              title: this.ruleForm.title,
              url: this.ruleForm.url,
              num: this.ruleForm.num
            };
            this.httpPost(url, params, res => {
              if (res.code == 200) {
                this.getList();
                this.isShow = false;
              } 
            });
          }
        } else {
          console.log("校验失败");
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
      str= '隐藏'
        break;
     case 1:
         str=  "展示"
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

