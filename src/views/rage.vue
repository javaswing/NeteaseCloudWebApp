<template>
    <div>
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
      <div class="g-title song-list">推荐歌单 <router-link :to="{}">更多&gt;</router-link></div>
      <mu-grid-list :cols="3">
        <mu-grid-tile titlePosition="top" titleBarClass="title-bar" >
          <img class="img-response" src="http://p3.music.126.net/FonulsAx2n7yxr4wuyp9kw==/18774161045780116.jpg?param=200y200">
          <span slot="title">12</span>
          <mu-icon-button icon="star_border" slot="action"/>
        </mu-grid-tile>
        <mu-grid-tile titlePosition="top" titleBarClass="title-bar">
          <img class="img-response" src="http://p3.music.126.net/FonulsAx2n7yxr4wuyp9kw==/18774161045780116.jpg?param=200y200">
          <span slot="title">12</span>
          <mu-icon-button icon="star_border" slot="action"/>
        </mu-grid-tile>
        <mu-grid-tile titlePosition="top" titleBarClass="title-bar">
          <img class="img-response" src="http://p3.music.126.net/FonulsAx2n7yxr4wuyp9kw==/18774161045780116.jpg?param=200y200">
          <span slot="title">12万</span>
          <mu-icon-button icon="star_border" slot="action"/>
        </mu-grid-tile>
      </mu-grid-list>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .img-response {
    max-width: 100%;
    height: auto;
  }
 .title-bar {
    height: 32px;
    font-size: 12px;
  }
  .wrapper {
    padding: 0 5px;
  }
  .song-list {
    padding-left: 30px;
    margin-bottom: 5px;
    font-size: 18px;
    background: url("../../static/aei.png") no-repeat left center;
    background-size: contain;
    a {
      margin-top: 3px;
      float: right;
      color: #9b9390;
      font-size: 14px;
    }
  }
</style>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
