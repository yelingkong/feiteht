<template>
  <div class="Container">
    <div class="option">
      <el-button
        type="success"
        size="small"
        @click="addCourse()"
      >新增</el-button>
      <el-button
        type="primary"
        size="small"
        @click="Refresh()"
      >刷新</el-button>
    </div>
    <el-table
      :data="List"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="index"
        label="序号"
      ></el-table-column>
      <el-table-column
          prop="title"
          label="名称"
        ></el-table-column>
         <el-table-column label="LOGO">
        <template slot-scope="scope">
          <img
            :src="`http://94.191.86.168/file${scope.row.img}`"
            style="width:80px"
          >
        </template>
      </el-table-column>
       <el-table-column
        prop="num"
        label="顺序"
      ></el-table-column>
      <el-table-column
        prop="hide1"
        label="是否隐藏"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="240"
      >
        <template slot-scope="scope">
          <el-button
            @click="EditClick(scope.row)"
            type="primary"
            plain
            size="small"
          >编辑</el-button>
          <el-button
            @click="DeleteClick(scope.row)"
            type="danger"
            size="small"
          >删除</el-button>
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
    <el-dialog
      title="提示"
      @close="Cancel"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >

        <el-form-item
          label="顺序"
          prop="num"
        >
          <el-input
            v-model.number="ruleForm.num"
            placeholder="请输入顺序"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="提示文字"
          prop="title"
        >
          <el-input
            v-model.number="ruleForm.title"
            placeholder="请输入提示文字"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="图片"
          prop="imgUrl"
        >
          <el-upload
            list-type="picture-card"
            action="http://94.191.86.168/api/files/upload/1"
            :file-list="fileList"
            :on-success="onSuccess"
            :on-remove="handleRemove"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
       
        <el-form-item
          label="内容"
          prop="content"
        >
        <edit style="width:100%;" @childFn="parentFn" :content="ruleForm.content" :isShow='dialogVisible'/>
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
import edit from "./editor"
export default {
  components:{edit},
  data() {
    return {
      flag: 0, //判断是 编辑还是添加的标识
      editId: 0, //编辑id
      dialogVisible: false,
      List: [],
      total: 0,
      val: 1, //当前多少页
      currentPage4: 1,
      fileList: [],

      ruleForm: {
        num: 1,
        title: "",
        url: "",
        hide: "",
        imgUrl: "",
        content:'',
      },
      rules: {
        num: [{ type: "number", message: "请输入数字" ,trigger: "blur"}],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        imgUrl: [
          { required: true, message: "请添加图片", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //确定
    isOkClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.flag == 1) {
            let url = "/course/add";
            let params = {
              content :this.ruleForm.content,//(string, optional): 消息内容 ,
              hide: this.ruleForm.hide,
              img: this.ruleForm.imgUrl,
              title: this.ruleForm.title,
              num: this.ruleForm.num
            };
            this.httpPost(url, params, res => {
              if (res.code == 200) {
                this.getList();
                this.dialogVisible = false;
              }
            });
          } else {
            let url = "/course/edit";
            let params = {
              id:this.editId ,
                content :this.ruleForm.content,//(string, optional): 消息内容 ,
              hide: this.ruleForm.hide,
              img: this.ruleForm.imgUrl,
              title: this.ruleForm.title,
              num: this.ruleForm.num
            };
            this.httpPost(url, params, res => {
              if (res.code == 200) {
                this.getList();
                this.dialogVisible = false;
              } 
            });
          }
        } else {
          console.log("校验失败");
        }
      });
    },
        //取消
    Cancel() {
      this.dialogVisible = false;
      this.fileList = [];
    },
    //分页
    handleCurrentChange(val) {
      this.val = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    //删除
    handleRemove(file, fileList) {
      this.ruleForm.imgUrl = "";
      this.fileList = [];
    },
    //新增
    addCourse() {
      this.flag = 1;
      this.dialogVisible = true;
      this.ruleForm = {};
      this.fileList = [];
    },
    //编辑
    EditClick(row) {
      console.log(row)
      this.flag = 2;
      this.editId = row.id;
      this.dialogVisible = true;
      this.ruleForm.hide = String(row.hide);
      this.ruleForm.imgUrl = row.img;
      this.ruleForm.title = row.title;
      this.ruleForm.content = row.content;
      this.ruleForm.num = row.num;
      if (this.ruleForm.imgUrl) {
            this.fileList.push({ url: "http://94.191.86.168/file" + this.ruleForm.imgUrl });
      } else {
        this.fileList = [];
      }
      this
    },

    //刷新
    Refresh() {
      this.getList();
    },
    //图片上传
    onSuccess(Response, file, fileList) {
      this.ruleForm.imgUrl = file.response.data.path;
    },

    //删除
    DeleteClick(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/course/del";
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
    //获取数据
    getList() {
      let url = "/course/getList";
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
    },
     parentFn(payload) {
        this.ruleForm.content = payload;
        console.log(payload)
      },
  }
};
</script>

<style lang="scss" scoped>
.Container {
  .option {
    padding: 10px;
  }
}
</style>
