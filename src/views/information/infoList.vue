<template>
  <div class="infoList">
    <div class="option">
      <el-button type="success" size="small" @click="addExchange()">新增</el-button>
      <el-button type="primary" size="small" @click="Refresh()">刷新</el-button>
    </div>
    <!-- 公告消息列表 -->
    <el-table :data="List" border style="width: 100%">
      <el-table-column prop="index" label="序号" width="80px"></el-table-column>
      <el-table-column prop="title" label="消息标题" width="120px"></el-table-column>
      <el-table-column prop="hide1" label="是否显示" width="80px"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120px">
        <template slot-scope="scope">
          {{scope.row.createTime |formatDateTime }}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="消息内容" :show-overflow-tooltip="true" width="260px"></el-table-column>
      <el-table-column prop="updateTime" label="更改时间" width="120px">
            <template slot-scope="scope">
          {{scope.row.updateTime |formatDateTime }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button @click="EditClick(scope.row)" type="primary" plain size="small">编辑</el-button>
          <el-button @click="DeleteClick(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginat">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <div class="row">
        <span class="rowTil">消息标题:</span>
        <el-input v-model="title" placeholder="请输入消息标题"></el-input>
      </div>

      <div class="row">
        <span class="rowTil">消息内容:</span>
        <edit style="width:100%;" @childFn="parentFn" :content="content" :isShow='dialogVisible'/>
      </div>

      <div class="row">
        <span class="rowTil">是否显示:</span>
        <el-radio v-model="hide" label="1">显示</el-radio>
        <el-radio v-model="hide" label="0">隐藏</el-radio>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isOkClick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import edit from "./editor"
export default {
  name: "infoList",
   components: {
    edit
  },
  data() {
    return {
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
      editId: 0 //编辑id
    };
  },
  created() {
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
    // 确定
    isOkClick() {
      if (this.flag == 1) {
        this.dialogVisible = false;
        //xinzeng
        let url ="/information/add";
        let params = {
          hide: this.hide,
          title: this.title,
          content: this.content
        };
        this.httpPost(url, params, res => {
          if (res.code == 200) {
            this.dialogVisible = false;
            this.getList();
          }
        });
      } else {
        let url = "/information/edit";
        let params = {
          id: this.editId,
          hide: this.hide,
          title: this.title,
          content: this.content
        };
        this.httpPost(url, params, res => {
          if (res.code == 200) {
            this.dialogVisible = false;
            this.getList();
          }
        });
      }
    },
      parentFn(payload) {
        this.content = payload;
        console.log(payload)
      },
    //编辑
    EditClick(row) {
      console.log(row.hide);
      this.flag = 2;
      this.dialogVisible = true;
      this.editId = row.id;
      this.hide = String(row.hide);
      this.title = row.title;
      this.content = row.content;
    },
    //刷新
    Refresh() {
      this.getList();
    },
    //分页
    handleCurrentChange(val) {
      this.val = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },

    //删除
    DeleteClick(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/information/del";
          let params = {
            ids: row.id,
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
    },
    getList() {
      let url = "/information/findList";
      let params = {
        pageNum: this.val,
        pageSize: 10
      };
      this.httpPost(url, params, res => {
        if (res.code == 200) {
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
    }
  },
};
</script>
<style>
.el-tooltip__popper ,.is-dark{display:none !important;} 
</style>

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
