<template>
    <div class="LoginContainer">
        <img src="../assets/item4.png" class="bg">
        <div class="cont">

            <h2>freeter 客服系统</h2>
            <div class="formContent">
                <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="70px"
                        class="demo-ruleForm"
                >
                    <el-form-item label="账 号" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码" prop="password">
                        <el-input v-model="ruleForm.password" type="password"></el-input>
                    </el-form-item>

                    <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {usergenSig} from "../api/api/reg";

    export default {
        data() {
            return {
                menuList: [], //匹配时间
                ruleForm: {
                    userName: "",
                    password: ""
                },
                rules: {
                    userName: [{required: true, message: "请输入账号", trigger: "blur"}],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {
                            min: 0,
                            max: 18,
                            message: "长度在  6 到 18 个字符",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            getuer() {
                var data2 = 'user34';
                usergenSig({userId: data2}).then(res => {
                    if (res.code == 200) {
                        this.login(data2, res.data.userSig)
                    }
                });
            },
            login(userId, userSig) {
                this.loading = true
                this.tim
                    .login({
                        userID: userId,
                        userSig: userSig
                    })
                    .then(() => {
                        this.loading = false
                        this.$store.commit('toggleIsLogin', true)
                        this.$store.commit('startComputeCurrent')
                    })
                    .catch(error => {
                        this.loading = false
                        this.$store.commit('showMessage', {
                            message: '登录失败：' + error.message,
                            type: 'error'
                        })
                    })
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let url = "/user/login";
                        let params =
                            {
                                name: this.ruleForm.userName,
                                password: this.ruleForm.password
                            };
                        this.httpPost(url, params, res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: "登录成功",
                                    type: "success"
                                });
                                this.$router.push("/message");
                                sessionStorage.setItem("account", this.ruleForm.userName);
                                sessionStorage.setItem("password", this.ruleForm.password);
                                sessionStorage.setItem("userinfo", JSON.stringify(res.data));
                                // this.getuer();
                            } else if (res.code == 602) {
                                // this.$router.push("/login");
                                this.$message(res.message);
                            } else {
                                this.$message(res.message);
                            }
                        });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>


<style lang="scss">
    .LoginContainer {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        .bg {
            width: 100%;
            height: 100%;
        }

        .cont {

            position: relative;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(-50%, -50%);

            h2 {
                color: #fff;
                // position: absolute;
                text-align: center;
                font-family: "PingFang SC";
                // top: -50px;
                // left: 0;
                // right: 0;
                // margin: 0 auto;
                // position: absolute;
                // top: 15%;
                // right:  0;
                // transform: translateX(-50%);
            }
        }

        .formContent {
            width: 320px;
            height: 210px;

            // border: 1px solid #f00;
            // transform: translate(-50%, -50%);
            padding: 40px 25px 0px 25px;
            border-radius: 5px;
            text-align: center;
            background-color: #fff;
        }
    }

    .el-form-item__label {
        text-align: left !important;
    }
</style>
