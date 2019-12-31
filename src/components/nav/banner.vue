<template>
    <div>
        <div class="banner">
            <transition
                    name="fadeInDown"
                    enter-active-class="animated fadeInDown"
                    leave-active-class="animated bounceOutRight"
            >
                <h2 v-show="show" v-t="'banner.title1'">{{$t('banner.title1')}}</h2>
            </transition>
            <transition
                    name="fadeInDown"
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated bounceOutRight"
            >
                <h4 v-show="show" v-t="'banner.title2'">{{$t('banner.title2')}}</h4>
            </transition>
            <transition
                    v-if="!homeLogin"
                    name="fadeInDown"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated bounceOutRight"
            >
            <span @click="showlogin" v-show="show" v-t="'banner.start'" class="start"
                  data-anijs="if: mouseover, do: pulse animated">
                {{$t('banner.start')}}
            </span>
            </transition>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                show: false,
            };
        },
        computed: {
            ...mapGetters([ 'homeLogin']),
        },
        methods: {
            showlogin() {
                this.$store.commit('toggleisShowLogin', true)
            },
        },
        filters: {
            filtersImg: function (img) {
                return basefile + img
            },
        },
        mounted() {
            AniJS.run();
            this.show = true;
        },
    };
</script>

<style lang="less" scoped>

    .banner {
        width: 100%;
        height: 429px;
        background: url("../../assets/banner.jpg") center center no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: column;

        h2 {
            font-size: 54px;
            font-family: PingFang;
            font-weight: 800;
            color: rgba(255, 255, 255, 1);
            text-shadow: 0px 2px 30px rgba(171, 171, 171, 0.2);
        }

        h4 {
            font-size: 37px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-shadow: 0px 2px 30px rgba(171, 171, 171, 0.2);
            margin-bottom: 74px;
            margin-top: 50px;
            opacity: 0.9;
        }

        .start {
            /*width: 160px;*/
            /*height: 60px;*/
            background: rgba(242, 202, 30, 1);
            border-radius: 6px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(29, 26, 113, 1);
            padding: 15px 30px;
            cursor: pointer;
        }
    }
</style>
