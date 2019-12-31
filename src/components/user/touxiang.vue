<template>
    <div>
        <img v-if="pic" class="toux" :src="pic|filtersImg" alt="">
        <img v-else class="toux" src="../../assets/icon_touxiang.png" alt="">
    </div>
</template>

<script>
    import {Form, FormItem, Select, Option} from 'element-ui'
    import {basefile} from "../../config/env";

    export default {
        name: 'rz',
        data() {
            return {}
        },
        props: {
            pic: {
                type: String,
                default: ''
            },
        },
        mounted() {

        },
        methods: {},
        filters: {
            filtersImg: function (img) {
                return basefile + img
            },
        },
    }
</script>

<style lang="stylus" scoped>
    .toux {
        width: 30px;
        height: 30px;
        margin-top: 10px;
        margin-bottom: 7px;
        border-radius: 50%;
    }


</style>
