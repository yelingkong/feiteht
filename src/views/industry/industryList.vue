<template>
  <div class="infoList">
    <div class="option">
      <!-- addExchange -->
      <el-button type="success" size="small" @click="showDialog">新增一级类目</el-button>
    </div>
    <el-tree
      :data="data4"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
    <!-- 弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
      <el-form-item
          label="权重"
          prop="num"
        >
          <el-input
            v-model.number="ruleForm.num"
            placeholder="请输入顺序"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="中文名称"
          prop="content"
        >

          <el-input
            v-model.number="ruleForm.content"
            placeholder="请输入中文名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="英文名称"
          prop="remark"
        >

          <el-input
            v-model.number="ruleForm.remark"
            placeholder="请输入英文名称"
          ></el-input>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addExchange()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "infoList",
  data() {
    return {
       rules: {
        num: [{ type: "number", message: "请输入数字" ,trigger: "blur"}],
      },
      textarea: "",
      hide: 0,
      title: "",
      content: "",
      dialogVisible: false,
      List: [],
      val: 1, //当前多少页
      currentPage4: 1,
      total: 0,
      flag: 0, //判断是 编辑还是添加的标识
      editId: 0, //编辑id


       data4: [],
        ruleForm:{
          num:'',
          content:"",
          remark:"",
        },
        parentId:"",
        defaultProps: {
          children: 'children',
          label: 'label'
        },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    showDialog(){
      this.dialogVisible=true;
    },
    //新增
    addExchange() {
          let url = '/industry/add';
          let params={
            icon: "string",
            name: this.ruleForm.content,
            remark: this.ruleForm.remark,
            parentId: this.parentId?this.parentId:0,
            weight:this.ruleForm.num,

          }
           this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
             this.ruleForm.content='',
            this.parentId='';
            this.ruleForm.num='';
              this.dialogVisible = false;
              this.ruleForm.remark='';
              this.getList();
            }
          });
          
    },

    getList() {
      let url = "/industry/getList";
      let params = {
        //     "hide": "",
        // pageNum: this.val,
        // pageSize: 10
          "name": "",
          "pageNum": 0,
          "pageSize": 0,
          "parentId": '',
          "remark": "",
          // type:1,
      };
      this.httpPost(url, params, res => {
        if (res.code == 200) {
          const {list} = res.data;
          let arr = [];
          list.map((i ,index)=>{
            arr.push(
              { 
                id: i.id, 
                label: `中文名称:${i.name},    英文名称:${i.remark}`,
                parentId:i.parentId,
                children:[],
              }
            )
            i.list.map(j=>{
              arr[index].children.push({
                id: j.id, 
                 parentId:j.parentId,
                label: `中文名称:${j.name},英文名称:${j.remark}`
              })
            })
            
          })
          this.data4 = arr;
       
          console.log(list);
          this.List = res.data.list;
          this.total = res.data.total;
          this.List.forEach((element, i) => {
            this.List[i].index = (this.val - 1) * 10 + i + 1;
            this.List[i].hide1 = this.List[i].hide == 0 ? "隐藏" : "显示";
          });
        } else {
          console.log("查询失败");
        }
      });
    },
    append(data) {
      console.log(data);
      this.parentId = data.id;
      this.dialogVisible = true;
      },
      remove(node, data) {
        console.log(data);
        const parent = node.parent;
        let ids = [];
        if(data.parentId == 0){
          ids.push(data.id);
          data.children.map(i=>{
            ids.push(i.id)
          })

        }else{
          ids.push(data.id);
        }
        console.log(node);
        console.log(ids);
          this.$confirm("删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/industry/del";
          let params = {
            ids: ids.join(','),
          };
          this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.dialogVisible = false;
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
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
      },
     renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style={data.parentId!=0?"display: none;font-size: 12px;":'font-size: 12px;'} type="text" on-click={ () => this.append(data) }>添加</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      }
  }
};
</script>

<style lang="scss" scoped>
.option {
  padding: 10px;
}
//分页
.paginat {
  padding: 10px;
  float: right;
}

.row {
  padding: 10px;
  .rowTil {
    display: block;
    padding: 10px 0;
  }
}
</style>
