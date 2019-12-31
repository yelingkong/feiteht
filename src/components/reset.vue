<template>
    <div class="chongzhi">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px"
                 class="Engineeringinformation pl-3">
            <el-row :gutter="20">
                <el-form-item label="手机号：" prop="phone">
                    <el-input type="text" class="w-85" v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="验证码" class="code ml0">
                    <div class="chongzhipass">
                        <el-input class=" mr10" v-model="ruleForm.valiCode"
                                  placeholder="请输入验证码"></el-input>
                        <el-button class="w50" type="button" @click="sendcode" :disabled="disabled"
                                   v-if="disabled==false">发送验证码
                        </el-button>
                        <el-button class="w50" type="button" @click="sendcode" :disabled="disabled"
                                   v-if="disabled==true">{{btntxt}}
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassword">
                    <el-input type="password" class="w-85" v-model="ruleForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：">
                    <el-input type="password" class="w-85" v-model="password"></el-input>
                </el-form-item>
                <div class="chongzhibut">
                    <el-button size="small" class="w100" @click="next" type="primary">确认</el-button>
                </div>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import {usersendSmS, userpassword} from "../api/api/web.js"

    export default {
        data() {
            return {
                ruleForm: {
                    "newPassword": "",
                    "phone": "",
                    "valiCode": ""
                },
                disabled: false,
                time: 0,
                btntxt: "重新发送",
                show: true,
                count: '',
                timer: null,
                Company: '',
                isLogin: '',
                avatar: '',
                mobile2: '',
                nickname: '',
                password: '',
                rules: {
                    phone: [
                        {required: true, message: '请输入手机', trigger: 'blur'},
                    ],
                    newPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    captcha: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                    ],

                },
            }
        },
        methods: {
            qure() {
                this.$emit('qure', true);
            },
            getMath(phone) {
                var start = Math.random().toString(36).substr(-10)
                var sjc = Date.parse(new Date());
                return start + phone + sjc
            },
            Forget() {
                var that = this;
                userpassword(this.ruleForm).then(res => {
                    const {code} = res;
                    if (code === 200) {
                        that.qure()
                        this.$message({
                            message: '重置成功',
                            type: 'success'
                        });
                        that.ruleForm = {
                            "newPassword": "",
                            "phone": "",
                            "valiCode": ""
                        }
                        that.password = ''

                    }
                })
            },
            sendcode() {
                var that = this;
                const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (that.ruleForm.phone == '') {
                    this.$message({
                        message: '手机号不能为空',
                        type: 'warning'
                    });
                    return
                }
                if (!reg.test(that.ruleForm.phone)) {
                    this.$message({
                        message: '请输入正确的手机号',
                        type: 'warning'
                    });
                    return
                } else {
                    usersendSmS({phone: this.getMath(this.ruleForm.phone)}).then(res => {
                        const {code} = res;
                        if (code === 200) {
                            this.$message({
                                message: '发送成功',
                                type: 'success'
                            });
                            that.time = 60;
                            that.disabled = true;
                            that.timers();
                        }
                    })
                }
            },
            //60S倒计时
            timers() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt = this.time + "s后重新获取";
                    setTimeout(this.timer, 1000);
                } else {
                    this.time = 0;
                    this.btntxt = "获取验证码";
                    this.disabled = false;
                }
            },
            next() {
                var that = this;
                if (that.ruleForm.phone == '') {
                    this.$message({
                        message: '手机号不能为空',
                        type: 'warning'
                    });
                    return
                }
                if (that.ruleForm.newPassword == '') {
                    this.$message({
                        message: '请输入密码',
                        type: 'warning'
                    });
                    return
                }
                if (that.ruleForm.newPassword != that.password) {
                    this.$message({
                        message: '两次输入的密码不同',
                        type: 'warning'
                    });
                    return
                }
                if (that.ruleForm.valiCode == '') {
                    this.$message({
                        message: '请输入验证码',
                        type: 'warning'
                    });
                    return
                }
                that.Forget()
            },
        }
    };
</script>
<style>
    .chongzhipass {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chongzhi {
        width: 400px;
        margin: auto;
    }

    .chongzhibut {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
