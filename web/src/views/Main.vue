<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/logo.png" height="30">
            <div class="px-2 flex-1">
                <div class="text-white">海贼王</div>
                <div class="text-grey-1 fs-xxs">团队成就更多</div>
            </div>
            <button type="button" class="btn bg-primary" @click="gotolink">立即下载</button>
        </div>
        <div class="bg-primary pt-3 pb-2">
            <div class="nav nav-inverse pb-1 jc-around">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">关于我们</router-link>
                </div>
            </div>
            
        </div>

        <router-view>

        </router-view>
    </div>
</template>

<script>
export default {
    methods:{
        gotolink(){
            this.$router.replace('/admin')
        }
    }
}
</script>

<style lang="scss">

    .topbar {
        position: sticky;
        top: 0;
        z-index: 999;
    }
</style>