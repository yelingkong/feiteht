<template>
  <div>
      <div class="option">
      <el-button type="success" size="small" @click="addPerson()"
        >新增人员</el-button
      >
      <el-button type="primary" size="small" @click="Refresh()">刷新</el-button>
    </div>
    <el-table :data="List" border style="width: 100%">
     <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column  prop="nickName"  label="用户名"  ></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button   type="primary" plain size="small"  @click="cliskShowAdminRole(scope.row)"  >更改角色</el-button  >
          <el-button @click="deleteUser(scope.row)" type="primary" size="small">删除</el-button>
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
      :visible.sync="showaddPerson"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="账 号"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>

        <el-form-item
          label="密 码"
          :rules="[{ required: true, message: '请输入密码' }]"
          v-show="flag == 1"
        >
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="重置密码" prop="email" v-show="flag == 2">
          <el-input
            v-model="newPass"
            placeholder="请填写需要重置的密码"
          ></el-input>
        </el-form-item>
        <div style="text-align:right;">
          <el-button @click="Cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      title="更改角色名"
      @close="Cancel"
      :visible.sync="showAdminRole"
      width="30%"
    >
      <el-form ref="form" label-width="80px" size="mini">
        <el-form-item label="角色名">
          <el-select v-model="AdminRoleId" placeholder="请选择角色">
            <el-option
              v-for="item in sysRoleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:right;margin-right: 7%;">
          <el-button @click="showAdminRole = false">取 消</el-button>
          <el-button type="primary" @click="editAdminRole">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 弹框 -->
    <el-dialog title="权限管理" :visible.sync="dialogVisible" width="20%">
      <div>
        <el-tree
          :data="RoleList"
          show-checkbox
          ref="tree"
          node-key="menuId"
          :default-checked-keys="defaultList"
          :props="defaultProps"
         default-expand-all
        ></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGrant">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      val: 1, //当前多少页
      total: 0,
      currentPage4: 1,
      aid: 0, //管理员id
      List: [],
      dialogVisible: false,
        flag: 0, //判断是 编辑还是添加的标识
         fileList: [],
          newPass: "", //重置的密码
      avatar: "", //头像
      email: "", //电子邮件
      name: "", //名字
      phone: "", //电话
roleName:'',//角色名称
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" }
      ],

      defaultProps: {
        children: "children",
        label: "menuName"
      },

      RoleListData: '', //角色列表
      RoleList: [], //角色列表
      defaultList: [], //默认选择
      params: [] ,//提交参数
       ruleForm: {
        phone: "", //账号
        password: "" ,//密码
      },
        showaddPerson:false,
         showAdminRole:false,
           sysRoleList:[{roleId:''}],
            AdminRoleId:'',
    };
  },
  created() {
    this.getRole();
    this.getList();
     this.getsysRoleList();
  },

  methods: {
     //获取角色数据
    getsysRoleList() {
      let url = "/sysRole/getRoleList";
      let params = {
        pageNum: 0,
        pageSize: 0
      };
      this.httpPost(url, params, res => {
        if (res.code == 200) {
          this.sysRoleList = res.data.list;
        } else {
          console.log("查询失败");
        }
      });
    },
           //取消
    Cancel() {
      this.dialogVisible = false;
      this.showaddPerson=false;
      this.fileList = [];
    },
     //新增
    addPerson() {
      this.showaddPerson = true;
      this.flag = 1;
      this.ruleForm.account = "";
      this.ruleForm.password = "";
      this.avatar = "";
      this.fileList = [];
      this.email = "";
      this.name = "";
      this.phone = "";
    },
    //分页
    handleCurrentChange(val) {
      this.val = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
 //图片上传
    onSuccess(Response, file, fileList) {
      this.avatar = file.response.data.path;
    },
      handleRemove(file, fileList) {
      this.avatar = "";
      // this.fileList[0] = {};
    },
    //树确定
    submitGrant() {
      let ridList = this.$refs.tree.getCheckedKeys();
      console.log(ridList);
      this.RoleListData.map(r=>{
        ridList.map(i=>{
          if(i == r.menuId){
            ridList.push(r.parentId);
          }
        })
      })
        let newArr = [ ...new Set( ridList ) ].sort();
        console.log( newArr );
      let data = {
            menuList:newArr,
            roleId: this.aid,
            }
              console.log(data)
      console.log(JSON.stringify(this.params) );
      let url = "/sysRole/editRoleMenuList";
      console.log(data)
      this.httpPost(url, data, res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "更改成功"
          });
          //清空树
          this.$refs.tree.setCheckedKeys(this.defaultList);
          this.dialogVisible = false;
          //清空params
          this.params.length = 0;
        } else {
          this.$message({
            type: "danger",
            message: "更改失败"
          });
        }
      });
    },

    //通过id查询角色权限
    getfindAdmin(aid) {
      let url = "/sysRole/findRoleIdMenu/" + aid;
      this.httpGet(url, res => {
        if (res.code == 200) {
          this.defaultList = [];
          res.data.forEach((element, index) => {
            this.$set(this.defaultList, index, element.menuId);
          });
          console.log(this.defaultList)
          this.$refs.tree.setCheckedKeys(this.defaultList);
        } else {
          console.log("查询失败");
        }
      });
    },
    //管理员列表
    getList() {
      let url = "/user/findAdminList";
      let params = {
        pageNum: this.val,
        pageSize: 10,
        status:'0'
      };
      this.httpPost(url, params, res => {
        if (res.code == 200) {
          this.List = res.data.list;
          this.total = res.data.total;
          this.List.forEach((element, i) => {
            this.List[i].index = (this.val - 1) * 10 + i + 1;
          });
        } else {
          console.log("查询失败");
        }
      });
    },
    //获取角色
    getRole() {
      let url = "/sysMenu/getList";
      this.httpGet(url, res => {
        if (res.code == 200) {
          let menu = [];
          let data = res.data;
          this.RoleListData = res.data;
          // this.RoleList = res.data;
          console.log(res.data);
          data.map(r=>{
            console.log(r)
            if(r.menuType == 1){
              r.children=[];
              menu.push(r)
            }
          })
          menu.map(r=>{
            data.map(i=>{
              if(r.menuId == i.parentId){
                r.children.push(i);
              }
            })
          })
              this.RoleList   =menu;
                   console.log(menu)

        } else {
          console.log("查询失败");
        }
      });
    },
      //确定
    submitForm(formName) {
      if (this.flag == 1) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let url = "/user/addAdmin";
            let params = {
              password: this.ruleForm.password,
              phone: this.ruleForm.phone,
            };
            console.log(params);
            this.httpPost(url, params, res => {
              if (res.code == 200) {
                 this.$message({
            type: "success",
            message: "添加成功"
          });
                this.showaddPerson = false;
                this.getList();
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        let url = "/admin/edit";
        let params = {
          id: this.editId,
          account: this.ruleForm.account,
          password: this.newPass,
          avatar: this.avatar,
          email: this.email,
          name: this.name,
          phone: this.phone
        };
        console.log(params);
        this.httpPut(url, params, res => {
          if (res.code == 200) {
             this.$message({
            type: "success",
            message: "添加成功"
          });
            this.showaddPerson = false;
            this.getList();    
          }
        });
      }
    },
    upPwd(row){
      let id = row.id;
       this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType:"password",
          inputPattern: /^[A-Za-z0-9\u4e00-\u9fa5-\~\!\@\#\$\%\^\&\*\(\)\+\-\=\{\}\[\]\|\<\>\?._,]{6,20}$/,
          inputErrorMessage: '密码格式不正确'
        }).then(({ value }) => {
          let url = '/user/pwd';
              let params ={
            newPassword:value,
            userId:id
          }
          this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.dialogVisible = false;
              this.getList();
            }
          });
        })
      
    },
    deleteUser(row){
      console.log(row.id);
      let id = row.id;
        this.$confirm(" 是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/user/edit";
          let params = {
            id: id,
            status:'1'
          };
          this.httpPost(url, params, res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.dialogVisible = false;
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        })
      
    },
     // 显示更改角色弹框
    cliskShowAdminRole(row){
      this.showAdminRole = true;
      this.userId =row.id;
    },
     editAdminRole(){
    console.log(this.AdminRoleId);
    console.log(this.userId);
    let data = {
      roleId: this.AdminRoleId,
      userId: this.userId
    }
    if(!this.AdminRoleId){
       this.$message({
        type: "info",
        message: "请选择角色"
      });
      return;
    };
    this.httpPost("/sysRole/editAdminRole", data, res => {
        if (res.code == 200) {
           this.showAdminRole = false;
         this.$message({
        type: "success",
        message: "操作成功"
      });
      this.getList();
        }
      });


  },
  }
};
</script>

<style lang="scss" scoped>
</style>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

