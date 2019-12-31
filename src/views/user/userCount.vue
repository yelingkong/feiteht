<template>
  <div class="userContainer">
     <div class="option">
      <el-form :inline="true">
        <el-date-picker
            v-model="selDate"
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

      <div class="panel">
        <ul>
            <li class="bg1">
                <div>
                    <p class="item_title">
                        <span>今日新增用户</span>
                    </p>
                    <p>
                        {{List.newly}}
                    </p>
                </div>
            </li>
            <li class="bg2">
                <div>
                    <p class="item_title">
                        <span>总用户数</span>
                    </p>
                    <p>
                         {{List.sum}}
                    </p>
                </div>
            </li>
            <li class="bg3">
                <div>
                    <p class="item_title">
                        <span>普通用户</span>
                    </p>
                    <p>
                          {{List.userCount}}
                    </p>
                </div>
            </li>
            <li class="bg4">
                <div>
                    <p class="item_title">
                        <span>平台提现</span>
                    </p>
                    <p>
                       {{List.cash}}
                    </p>
                </div>
            </li>
            <li class="bg3">
                <div>
                    <p class="item_title">
                        <span>自由工作者</span>
                    </p>
                    <p>
                        {{List.coCount}} 
                    </p>
                </div>
            </li>
            <li class="bg4">
                <div>
                    <p class="item_title">
                        <span>平台毛收入</span>
                    </p>
                    <p>
                        {{List.money}} 
                    </p>
                </div>
            </li>
            <li class="bg1">
                <div>
                    <p class="item_title">
                        <span>平台净收入</span>
                    </p>
                    <p>
                        {{List.profit}} 
                    </p>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>


<script>
import { formatDateTime} from "../../assets/js/api.js";
export default {
  data() {
    var checkRatio = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("输入值不能为空"));
      }
      setTimeout(() => {
        if (value < 0 || value > 100) {
          callback(new Error("输入值必须在0-100之间"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },      
        },
      selDate:"",
      startTime:'',//注册时间
      endTime:'',//注册结束时间
      val: 1, //当前多少页
      currentPage4: 1,
      total: 0,
      List: [],
      dialogVisible: false,
      useriId: 0,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "未认证"
        },
        {
          value: 1,
          label: "已认证"
        }
      ],
      cerStatus: "", //认证状态
      // 表单校验
      ruleForm: {
        oneLevelRatio: "",
        twoLevelRatio: "",
        threeLevelRatio: ""
      },
      rules: {
        oneLevelRatio: [
          { required: true, validator: checkRatio, trigger: "blur" }
        ],
        twoLevelRatio: [
          { required: true, validator: checkRatio, trigger: "blur" }
        ],
        threeLevelRatio: [
          { required: true, validator: checkRatio, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取数据
    getList() {
      let url = "/moneyLog/analysis";
      let params = {
        startTime:this.startTime,//注册时间
        endTime:this.endTime,//注册结束时间
      };
      this.httpPost(url, params, res => {
        this.List = res.data;
      });
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
  .panel {

            ul {
                display: flex;
                width: 100%;
                flex-wrap: wrap;

                li {
                    margin: 0.5%;
                    border-radius: 10px;
                    width: 24%;
                    height: 110px;
                    display: flex;
                    align-items: center;
                    padding: 20px 30px;

                    .item_title {
                        span {
                            color: #fff;

                            &::before {
                                background-color: rgba(255, 255, 255, .5);
                            }
                        }
                    }

                    p:nth-of-type(2) {
                        font-family: DIN;
                        font-size: 40px;
                        color: #fff;
                        margin-top: 20px;
                    }
                }

                li.bg1 {
                    background-image: linear-gradient(90deg, #39c1dd 0%, #6fd0e0 100%),
                        linear-gradient(#ffffff, #ffffff);
                }

                li.bg2 {
                    background-image: linear-gradient(90deg, #f75a8e 0%, #f99e9b 100%),
                        linear-gradient(#ffffff, #ffffff)
                }

                li.bg3 {
                    background-image: linear-gradient(90deg, #3466fe 0%, #728afe 100%),
                        linear-gradient(#ffffff, #ffffff);
                }

                li.bg4 {
                    background-image: linear-gradient(90deg, #f0ac22 0%, #f8cc72 100%),
                        linear-gradient(#ffffff, #ffffff);
                }
            }
        }
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

