<template>
    <div id="app">

        <router-view />

        <div
                class="banzi"
                v-if="numXx"
        >
            <div class="quxiao"><span @click="quxiao()">×</span></div>
            <div class="boxs">
                <div
                        v-for="(item,index) in huixianList.list"
                        :key="index"
                        v-if="item.type == 0"
                >
                    <span>{{item.content}}</span>
                    <span>{{item.createTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                lits: "11111",
                numXx: false,
                huixianList: []
            };
        },
        methods: {
            toBottom() {
                // this.shifeisuo();
                // clearTimeout(c);
                // var c = setTimeout(() => this.toBottom(), 5000);
            },
            quxiao() {
                // this.numXx = false;
                // let url = "/news/read";
                // this.httpPut(url, { type: "1" }, res => {
                //   if (res.code == 200) {
                //   }
                // });
            },
            shifeisuo() {
                // let self = this;
                // let url = "/news/getRead";
                // this.httpPut(url, { key: "RA" }, res => {
                //   if (res.code == 200) {
                //     if (res.data.type == 0) {
                //       this.numXx = false;
                //     } else if (res.data.type == 1) {
                //       this.numXx = true;
                //       let url = "/news/getList";
                //       self.httpPost(url, { key: "RA" }, res => {
                //         if (res.code == 200) {
                //           self.huixianList = res.data;
                //         }
                //       });
                //     }
                //     // console.log("res.data",res.data.type)
                //   }
                // });
            }
        },
        created() {
            this.toBottom();
        }
    };
</script>

<style>
    #app {
        font-family: "微软雅黑";
        color: #2c3e50;
    }
    body {
        margin: 0;
        padding: 0;
    }
    .el-table .cell,
    .el-table th div,
    .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cell {
        text-align: center !important;
    }

    /* 分页 */
    .paginat {
        padding: 10px;
        float: right;
    }

    .banzi {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 300px;
        height: 200px;
        box-shadow: #2c3e50 0 0 100px 1px;
        background: #fff;
        border-radius: 8px;
        z-index: 999;
    }
    .quxiao {
        display: flex;
        justify-content: flex-end;
        font-size: 20px;
    }
    .quxiao span {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
    }
    .boxs {
        padding: 0 10px;
        overflow-y: scroll;
        height: 180px;
    }
    .boxs div {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dfdfdf;
        line-height: 25px;
        cursor: pointer;
    }
    .boxs div span {
        display: block;
        font-size: 14px;
        overflow: hidden;
    }
</style>
