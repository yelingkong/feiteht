<template>
    <div class="platformcrumb">
        <div class="platformcrumb2">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            back: String
        },
        methods: {
            goBack() {
                if (this.$route.query.goindex === 'true') {
                    this.$router.push('/')
                } else {
                    this.$router.back(-1)
                }
            },
        },
    };
</script>

<style scoped lang="less">
    .platformcrumb {
        width: 100%;
        height: 60px;
        background: rgba(247, 247, 255, 1);

    }

    .platformcrumb2 {
        width: 1100px;
        height: 60px;
        margin: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;

        a {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }

        i {
            margin-left: 10px;
            margin-right: 10px;
        }

        span {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
        }
    }
</style>
