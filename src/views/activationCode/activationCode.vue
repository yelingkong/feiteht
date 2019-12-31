<template>
  <div class="userContainer">
    <div class="option">
      <el-form :inline="true">
        <el-form-item label="会员类型">
          <el-select v-model="membersId" placeholder="类型">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="type" placeholder="类型">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否使用">
          <el-select v-model="verification" placeholder="请选择审核状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
             <el-button type="success"  @click="addExchange()">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
  <el-table :data="List" border style="width: 100%">
        <el-table-column prop="" label="序号">
          <template slot-scope="scope">
            {{scope.$index+1 * (10* (pageIndex-1))+1}}
          </template>
        </el-table-column>
        <el-table-column prop="membersId" label="会员级别">
              <template slot-scope="scope">
                <el-tag type="warning" >{{scope.row.membersId ==1?'初级':scope.row.membersId ==2?"中级":scope.row.membersId ==3?"高级":'无'}}</el-tag>
          </template>
        </el-table-column>
      <el-table-column prop="" label="使用时间">
           <template slot-scope="scope">
             <div v-show="!scope.row.updateTime">
              未使用
             </div>
             <div v-show="scope.row.updateTime">
              {{scope.row.updateTime|formatDateTime}}
             </div>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="激活码">
        <template slot-scope="scope">
          <div   v-clipboard:copy="scope.row.code"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">
          {{scope.row.code}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
           <template slot-scope="scope">
                <el-tag type="warning" >{{scope.row.type ==1?"年":"月"}}</el-tag>
          </template>
      </el-table-column>
     <el-table-column prop="status" label="是否使用">
          <template slot-scope="scope">
                <el-tag type="warning" >{{scope.row.status |showStatus}}</el-tag>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form>
            <el-form-item label="会员类型" label-width="120px">
                <el-select v-model="add.membersId" placeholder="类型">
                    <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型" label-width="120px">
                <el-select v-model="add.type" placeholder="类型">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数量" label-width="120px">
                <el-input v-model="add.sum" placeholder="生成数量"></el-input>
            </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isOkClick()">确 定</el-button>
      </span>
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
      code:'',//用户id
      key:"",//昵称
      phone:"",
      type:'',
      List:[],//表数据
      pageIndex: 1, //当前多少页
      currentPage4: 1,
      total: 0,
      membersId:'',
      verification:"",
      dialogVisible:false,
      options:[
        // 是否使用过 0没用；1使用 
        {label:'全部',value:''},
        {label:'否',value:0},
        {label:'有',value:1}
      ],
      options1:[
        {label:'全部',value:''},
        {label:'月',value:0},
        {label:'年',value:1}
      ],
      options2:[
        {label:'全部',value:''},
        {label:'初级',value:1},
        {label:'中级',value:2},
        {label:'高级',value:3}
      ],
      options3:[
        {label:'月',value:0},
        {label:'年',value:1}
      ],
      options4:[
        {label:'初级',value:1},
        {label:'中级',value:2},
        {label:'高级',value:3}
      ],
      isShow:false,
      item:{},
      reason:'',//理由
        add:{
            type:'',
            membersId:'',
            sum:100
        }
    };
  },
  created() {
    },
  mounted(){
    this.getList();
  },

  methods: {
    //新增
    addExchange() {
      this.flag = 1;
      this.dialogVisible = true;
      this.hide = "";
      this.title = "";
      this.content = "";
    },
    //分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
   
    //获取数据
    getList() {
      let url = "/activationCode/getList";
      let params = {
        type :this.type,//(integer, optional): 类型 0月/1年
        membersId :this.membersId,//(integer, optional): 邀请码 就是展示用的用户ID 甲乙双方模糊搜索 ,
        status :this.verification,// 是否使用过 0没用；1使用 
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
    isOkClick(){
        let url = '/activationCode/add';
        let data = {
            membersId :this.add.membersId,//(integer, optional): 会员ID ,
            sum:this.add.sum,// (integer, optional): 生成数量 ,
            type:this.add.type// (integer, optional): 类型 0月/1年
        };
          console.log(data);
        if(!this.add.membersId){
            this.$message("会员类型不能为空");
            return;
        }
        if(this.add.type === ''){
            this.$message("类型不能为空");
            return;
        }
        if(!this.add.sum){
            this.$message("生成数量不能为空");
            return;
        }
         this.httpPost(url, data, res => {
          if (res.code == 200) {
            this.dialogVisible = false;
            this.add.sum=100;
            this.add.membersId='';
            this.add.type='';
            this.getList();
          }
        });
    },
    // 复制
  onCopy: function (e) {
     this.$message({
                type: "success",
                message: "复制成功"
              });
    },
    onError: function (e) {
     this.$message('复制失败')
    }
  },
  filters:{
    showStatus(e){
      let str ='';
     switch(e) {
     case 0:
        // 代码块
      str= '否'
        break;
     case 1:
         str=  "是"
        break;
        // 默认代码块
} 
    return str;
    }
  },
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

