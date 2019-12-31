<template>
  <div class="accountContainer">
    <div class="option">
      <el-button type="success" size="small" @click="showAdmin = true"
        >新增角色</el-button
      >
      <el-button type="primary" size="small" @click="Refresh()">刷新</el-button>
    </div>
    <el-table :data="List" border style="width: 100%">
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button @click="EditClick(scope.row)" type="primary" size="small">更改权限</el-button>
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
    <!-- 弹框 -->
    <el-dialog title="新增角色" :visible.sync="showAdmin">
        <el-form  label-width="120px">
            <el-form-item label="角色名" prop='desc'>
                <el-input v-model="name" ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAdmin = false">取 消</el-button>
          <el-button type="primary" @click="addAdmin">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      currentPage4: 4,
      List: [],
      total: 0,
      dialogVisible: false,
      showAdminRole:false,
      fileList: [],
      flag: 0, //判断是 编辑还是添加的标识
      editId: 0, //编辑id
      val: 1,

      newPass: "", //重置的密码
      avatar: "", //头像
      email: "", //电子邮件
      phone: "", //电话
roleName:'',//角色名称
      ruleForm: {
        name: "", //账号
        password: "" ,//密码
      },
        sysRoleList:[{roleId:''}],
          RoleListData: '', //角色列表
      RoleList: [], //角色列表
       defaultProps: {
        children: "children",
        label: "menuName"
      },
      defaultList: [], //默认选择
       params: [] ,//提交参数
        AdminRoleId:'',
        userId:'',
         showAdmin: false,
      name: "",
    };
  },
  created() {
    this.getList();
      this.getRole();
  },
  methods: {
    Cancel() {
      this.dialogVisible = false;
      this.fileList = [];
    },
    EditClick(row) {

      this.dialogVisible = true;
      this.aid = row.roleId;
      console.log(row)
      this.getfindAdmin(row.roleId);
    },
     //通过id查询角色权限
    getfindAdmin(aid) {
      // POST /sysRole/findRoleIdMenu
      let url = "/sysRole/findRoleIdMenu";
      let data = {
        id:aid,
      };
      this.httpPost(url, data,res => {
        if (res.code == 200) {
         let defaultList = [];
          // res.data.forEach((element, index) => {
          //   this.$set(this.defaultList, index, element.menuId);
          // });
          res.data.map(i=>{
            // defaultList.push(i.menuId);
            i.menuList.map(j=>{
              j.show==1?defaultList.push(j.menuId):'';
            })
          })
          console.log(defaultList)
          this.defaultList = defaultList;
          this.$refs.tree.setCheckedKeys(this.defaultList);
        } else {
          console.log("查询失败");
        }
      });
    },
    getRole() {
      let url = "/sysRole/findMenuList";
      this.httpGet(url, res => {
        if (res.code == 200) {
          let menu = [];
          let data = res.data;
          this.RoleListData = res.data;
          // this.RoleList = res.data;
          console.log(res.data);
          data.map((r,index)=>{
            console.log(r);
              r.children=[];
              menu.push(r);
            r.menuList.map(j=>{
              menu[index].children.push(j)
            })
          })
              this.RoleList   =menu;
                   console.log(menu)

        } else {
          console.log("查询失败");
        }
      });
    },
 //树确定
    submitGrant() {
      let ridList = this.$refs.tree.getCheckedKeys();
      console.log(ridList);
      console.log(this.RoleListData)
      this.RoleListData.map((r,index)=>{
        ridList.map(i=>{
          r.menuList.map(j=>{
            if(i == j.menuId){
              console.log(j)
            console.log(j.parentId)
            // j.parentId ==0?'':
            ridList.push(j.parentId);
          }
          })
        })
      });
      console.log(ridList)
      // return;
        let newArr = [ ...new Set( ridList ) ].sort();
        console.log( newArr );
      let data = {
            menuList:newArr,
            roleId: this.aid,
            }
              console.log(data)
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
    //查数据
    getList() {
      let url = "/sysRole/getRoleList";
      let params = {
        key: "",
        pageNum: this.val,
        pageSize: 10
      };
      this.httpPost(url, params, res => {
        if (res.code == 200) {
          this.total = res.data.total;
          this.List = res.data.list;
          this.List.forEach((element, i) => {
            this.List[i].index = (this.val - 1) * 10 + i + 1;
          });
        } 
        else if (res.code == 602) {
              this.$router.push("/login")}
              else {
          console.log("查询失败");
        }
      });
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
   deleteUser(row){
      console.log(row);
      let id = row.roleId;
        this.$confirm(" 是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/sysRole/edit";
          let params = {
            roleId: id,
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
     addAdmin() {
      if (!this.name) {
        this.$message(`名字不能为空`);
        return;
      }
      this.axios.get(`/sysRole/add/${this.name}`, '').then(r=>{
          console.log(r)
          if(r.code != 200 ){
               this.$message({
                type: "success",
                message: "操作成功"
              });
              this.name='',
              this.showAdmin = false;
          }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
//  账号管理
.accountContainer {
  // position: relative;
  .option {
    padding: 10px;
  }
  //弹框
  .row {
    padding: 10px;
    .rowTil {
      display: block;
      padding: 10px 0;
    }
  }
}
</style>
