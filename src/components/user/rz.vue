<template>
    <div>
        <div v-if="type==0" class="rz">{{$t('hall.yrz')}}</div>
        <div v-else class="rz2">{{$t('hall.wrz')}}</div>
    </div>
</template>

<script>
    import {Form, FormItem, Select, Option} from 'element-ui'
    import logo from '../../assets/image/logo.png'

    export default {
        name: 'rz',
        data() {
            return {}
        },
        props: {
            type: {
                type: Number,
                default: 1
            },
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="stylus" scoped>
    .rz {
        font-size: 12px;
        font-family: PingFang;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        width: 45px;
        height: 18px;
        background: rgba(229, 162, 3, 1);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        margin-top: 5px;
    }
    .rz2 {
      font-size: 12px;
      font-family: PingFang;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 45px;
      height: 18px;
      background: #d1d1d1;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;
      margin-top: 5px;
    }

</style>
