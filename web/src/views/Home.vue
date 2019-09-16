<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/1.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/2.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/3.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/4.jpg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!--end of swiper-->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <router-link class="py-2" tag="div" to="`/articles/${item._id}`">爆料站</router-link>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <router-link class="py-2" tag="div" to="`/articles/${item._id}`">故事站</router-link>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <router-link class="py-2" tag="div" to="`/articles/${item._id}`">爆料站</router-link>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <router-link class="py-2" tag="div" to="`/articles/${item._id}`">爆料站</router-link>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <router-link class="py-2" tag="div" to="`/articles/${item._id}`">爆料站</router-link>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <router-link class="py-2" tag="div" to="`/articles/${item._id}`">爆料站</router-link>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <router-link class="py-2" tag="div" to="`/articles/${item._id}`">爆料站</router-link>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons   -->
    

    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="Pirate" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 text-center"
          style="width: 20%;" 
          v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        loop: true, 
        autoplay :{
                delay: 3000,//秒
                stopOnLastSlide: false,
                disableOnInteraction: false,//滑动不会失效
              }, 
        autoplayDisableOnInteraction: false
      },
      newsCats: [],
      heroCats: [],
    };
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('news/list');
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created(){
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none; //表示每4的倍数右边不加边框
    }
  }
}
</style>