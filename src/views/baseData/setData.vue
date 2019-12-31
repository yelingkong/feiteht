<template>
  <div>
    <el-form label-width="200px">
     
      <el-form-item label="仲裁平台币" prop="desc">
        <el-input style="width: 30%" v-model="ServiceData.arbitrate"></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="upData('arbitrate')"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="工作者投标所需平台币" prop="desc">
        <el-input style="width: 30%" v-model="ServiceData.bid"></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="upData('bid')"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label=" 工作者推荐奖励" prop="desc">
        <el-input style="width: 30%" v-model="ServiceData.free"></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="upData('free')"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="大型项目金额" prop="desc">
        <el-input style="width: 30%" v-model="ServiceData.money"></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="upData('money')"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="仲裁大厅封面" prop="desc">
          <el-upload
          
            list-type="picture-card"
            action="http://94.191.86.168/api/files/upload/1"
            :file-list="fileList2"
            :on-success="onSuccess2"
            :on-remove="handleRemove2"
            :limit="1"
          >
            <i  class="el-icon-plus"></i>
          </el-upload>
      </el-form-item>
      <el-form-item label="公告封面" prop="desc">
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
      <el-form-item label="每日免费投标次数" prop="desc">
        <el-input style="width: 30%" v-model="ServiceData.number"></el-input>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="upData('number')"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="仲裁订单用户收益%设置" prop="desc">
        <el-input style="width: 30%" v-model="ServiceData.profit"></el-input>
        <span>%</span>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="upData('profit')"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="平台抽成比例" prop="desc">
        <el-input style="width: 30%" v-model="ServiceData.ratio"></el-input>
        <span>%</span>
        <el-button
          type="primary"
          icon="el-icon-edit"
            @click="upData('ratio')"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="任务大厅封面" prop="desc">
        <el-upload
            list-type="picture-card"
            action="http://94.191.86.168/api/files/upload/1"
            :file-list="fileList1"
            :on-success="onSuccess1"
            :on-remove="handleRemove1"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
      </el-form-item>
  
     
   
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
     ServiceData:{
      task: "",
      arbitration: "",
      ratio: "",
      notice: "",
      bid: "",
      profit: "",
      arbitrate: "",
      number: "",
      free: "",
      money: "",
     },
      fileList: [],
      fileList1: [],
      fileList2: [],
    };
  },
  mounted() {
    this.getService();
  },
  methods: {
    getService(){
      this.axios.post(`/config/getService`,'').then(r=>{
        console.log(r.data.data);
        this.ServiceData = r.data.data;
      })
    },
    upData(type) {
      this.httpPost('/config/putService', this.ServiceData, res => {
        if (res.code == 200) {
           this.$message({
                message: "修改成功",
                type: "success"
              });
          this.getService();
        } 
      });
    },
    //删除
    handleRemove(file, fileList) {
      this.ServiceData.notice = "";
      this.fileList = [];
    },
    handleRemove1(file, fileList) {
      this.ServiceData.notice = "";
      this.fileList1 = [];
    },
    handleRemove2(file, fileList) {
      this.ServiceData.notice = "";
      this.fileList2 = [];
    },
  //图片上传
    onSuccess(Response, file, fileList) {
      this.ServiceData.notice = file.response.data.path;
      this.upData("notice");
    },
    onSuccess1(Response, file, fileList) {
      this.ServiceData.task = file.response.data.path;
      this.upData("task");
    },
    onSuccess2(Response, file, fileList) {
      this.ServiceData.arbitration = file.response.data.path;
      this.upData("arbitration");
    },
   
  },
  watch:{
    "ServiceData.notice"(){
      console.log(111);
      if (this.ServiceData.notice) {
                this.fileList.push({ url: "http://94.191.86.168/file" + this.ServiceData.notice });
          } else {
            this.fileList = [];
          }
    },
    "ServiceData.task"(){
      console.log(111);
      if (this.ServiceData.task) {
                this.fileList1.push({ url: "http://94.191.86.168/file" + this.ServiceData.task });
          } else {
            this.fileList1 = [];
          }
    },
    "ServiceData.arbitration"(){
      console.log(111);
      if (this.ServiceData.arbitration) {
                this.fileList2.push({ url: "http://94.191.86.168/file" + this.ServiceData.arbitration });
          } else {
            this.fileList = [];
          }
    },
  }
};
</script>

<style lang="scss" scoped>
.tab {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  margin-right: 20px;
  // border: 1px solid #dfdfdf;
  border-bottom: none;
  //   box-shadow: #000 2px 0 15px 1px;
  box-shadow: 1px 4px 10px #888;
}
.tab img {
  width: 100%;
  height: 125px;
  display: block;
}
.bjian {
  text-align: center;
  background: #409eff;
  line-height: 30px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.fxiang {
  text-align: center;
  font-weight: 700;
  color: #000;
  font-size: 16px;
  margin: 0;
  line-height: 40px;
}
.minh {
  height: 130px;
  overflow: hidden;
}
.yongjin {
  line-height: 40px;
  font-size: 15px;
}
.bjian {
  text-align: center;
  background: #409eff;
  line-height: 30px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.bili div {
  position: relative;
  font-size: 15px;
}
.bili span {
  position: absolute;
  right: 10px;
  top: 25%;
}
.bili input {
  height: 30px;
  width: 90%;
  margin-bottom: 10px;
}
.yongjin {
  line-height: 40px;
  font-size: 15px;
  padding-left: 15px;
}
.yongssjin {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 100px;
}
.pbqian {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
</style>
