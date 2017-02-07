<template>
    <div class="wrapper">
    <div class="title">全部歌单 </div>
        <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
          <mu-flexbox-item basis="40%" class="list-item" :key="item.id" v-for="item in playList">
            <router-link :to="{name: 'playListDetail',params: { id: item.id }}">
            <div class="list-bar">{{item.playCount | formatCount}}</div>
            <img class="list-img img-response" v-lazy="item.coverImgUrl" lazy="loading">
            <div class="list-name">{{item.name}}</div>
            </router-link>
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="get"/>
        </div>
</template>
<style lang="less" scoped>
@import "../assets/theme.less";
.img-response {
    max-width: 100%;
    height: auto;
}
.wrapper {
    padding: 0 5px;
}
.title {
    margin: .2rem 0 .3rem 0;
    padding-left: .2rem;
    border-left: .15rem solid @primaryColor;
}
.list {
    &-bar {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2);
    }
    &-item {
        position: relative;
        margin: 0 5px 5px 10px;
        a {
          color:rgba(0,0,0,.87);
        }
    }
    &-img {
      width: 8rem;
      height: 8rem;
    }
     &-img[lazy=loading] {
      background: url('../../static/default_cover.png') no-repeat;
      background-size: cover;
    }

        &-name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
}
</style>
<script>
import api from '../api'
export default {
  data () {
    return {
      scroller: null,
      playList: [],
      offset: 0,
      loading: false
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    get () {
      this.$http.get(api.getPlayListByWhere('全部', 'hot', this.offset, true, 18)).then((res) => {
        this.playList = res.data.playlists
        this.offset++
      })
    }
  },
  filters: {
    formatCount (v) {
      if (v < 100000) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
