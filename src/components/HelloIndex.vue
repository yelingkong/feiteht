<template>
    <div class="hello">
        <img src="../assets/icon_logo.png" alt="">
        <h1>欢迎来到Freeter后台</h1>
    </div>
</template>


<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    h1 {
        text-align: center;
        padding-top: 30px;
    }

    .hello {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: column;
        margin-top: 100px;

        img {
            height: 80px;
            margin-top: 30px;
        }
    }
</style>
