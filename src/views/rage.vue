<template>
    <div>
      <div class="loading" v-if="isloading" >

      </div>
      <div class="container" v-show="!isloading">
      <div id="slider">
        <swiper :options="swiperOption">
          <swiper-slide><img src="static/banner1.jpg" width="100%" alt=""></swiper-slide>
          <swiper-slide><img src="static/banner2.jpg" width="100%" alt=""></swiper-slide>
          <swiper-slide><img src="static/banner3.jpg" width="100%" alt=""></swiper-slide>
          <swiper-slide><img src="static/banner4.jpg" width="100%" alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="wrapper">
      <div class="g-title song-list">推荐歌单 <router-link :to="{path: '/index/songList'}">更多></router-link></div>
      <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
        <mu-flexbox-item basis="28%" class="item" v-for="item in playList">
          <div class="bar">{{item.playCount}}万</div>
          <img class="img-response" src="../../static/default_cover.png" :src="item.coverImgUrl">
          <div class="item-name">{{item.name}}</div>
        </mu-flexbox-item>
      </mu-flexbox>
        <div class="g-title mv">推荐MV <router-link :to="{}">更多></router-link></div>
        <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
          <mu-flexbox-item basis="40%" class="mv-item">
            <img class="img-response" src="http://p4.music.126.net/0r0H97s-bM0lZzs6x0Ibeg==/18685100604133296.jpg?param=300y170">
            <div class="mv-name">Skin to sking</div>
            <div class="mv-author">鹿晗</div>
          </mu-flexbox-item>
          <mu-flexbox-item basis="40%" class="mv-item">
            <img class="img-response"  src="http://p4.music.126.net/0r0H97s-bM0lZzs6x0Ibeg==/18685100604133296.jpg?param=300y170">
            <div class="mv-name">Skin to sking</div>
            <div class="mv-author">鹿晗</div>
          </mu-flexbox-item>
          <mu-flexbox-item basis="40%" class="mv-item">
            <img class="img-response" src="http://p3.music.126.net/DNlE0AUQdXci4XaQaxsHPQ==/18643319162278619.jpg?param=300y170">
            <div class="mv-name">Skin to skingSkin to</div>
            <div class="mv-author">鹿晗</div>
          </mu-flexbox-item>
          <mu-flexbox-item basis="40%" class="mv-item">
            <img class="img-response"  src="http://p3.music.126.net/DNlE0AUQdXci4XaQaxsHPQ==/18643319162278619.jpg?param=300y170">
            <div class="mv-name">Skin to sking</div>
            <div class="mv-author">鹿晗</div>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .img-response {
    max-width: 100%;
    height: auto;
  }
  .wrapper {
    padding: 0 5px;
  }
  // 通用的标题样式
  .g-title {
    padding-left: 25px;
    color: #333;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    a {
      float: right;
      font-size: 12px;
      color: #666;
    }
  }
  // 推荐歌单
  .song-list {
    background: url("../../static/aei.png") no-repeat left center;
    background-size: 20px 20px;
  }
  .item {
    position: relative;
    margin: 0 5px 5px 10px;
    height: 100%;
    .bar {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2);
    }

    &-name {
      overflow : hidden;
      font-size: 12px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .mv {
    background: url("../../static/aee.png") no-repeat left center;
    background-size: 20px 20px;
    &-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    &-item {
      position: relative;
      margin: 0 5px 5px 10px;
    }
    &-author {
      font-size: 12px;
      color: #666;
    }
  }
  .loading {
    position: absolute;
    top: 0;
    left: 50%;
    background: #fff;
    width: 3rem;
    height: 3rem;
    margin-top: 70%;
    margin-left: -1.5rem;
    background: url('../../static/rage_loading.png') no-repeat;
    background-size: cover;
    -webkit-animation: rotating 5s  linear infinite;
    animation: rotating 5s linear infinite;
  }

  @keyframes rotating {
      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }
  }
</style>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '../api'
export default {
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true
      },
      isloading: true,
      playList: [],
      mvList: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get(api.getPlayListByWhere('全部', 'hot', 0, true, 6)).then((res) => {
        this.isloading = false
        this.playList = res.data.playlists
      })
    }
  }
}
</script>
