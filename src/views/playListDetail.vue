<template>
    <div class="playList" :class="{view: songList.length > 0}">
        <div class="fixed-title" :style="{'background': 'rgba(206, 61, 62, '+ opacity +')'}" style="transition: opacity .1s;">
            <mu-appbar>
            <mu-icon-button icon='arrow_back' @click="back" slot="left"/>
            <div class="play-title">
              <div class="play-name"><span>{{fname}}</span></div>
            </div>
          </mu-appbar>
        </div>
        <div class="playlist-info">
            <div class="info-wrapper">
                <div class="info-gallery">
                    <span>{{playCount | formatCount}}</span>
                    <img :src="coverImgUrl + '?param=300y300'" alt="">
                </div>
                <div class="info-title">
                    <p class="titile">{{name}}</p>
                    <p class="author">
                        <mu-avatar slot="left"  :src="creator.avatarUrl + '?param=50y50'" :size="30" :iconSize="20"/>
                        <span>{{creator.nickname}}</span>
                    </p>
                </div>
            </div>
            <div class="bg-mask"></div>
            <div class="bg-player" id="backImg" :style="{'background-image':'url(' + coverImgUrl + '?param=300y300)'}" ></div>
        </div>
        <div class="playlist-holder">
            <div class="add-all">
                <mu-flat-button label="播放全部" class="demo-flat-button" icon="add_circle_outline" @click="playAll"/>
                <mu-divider/>
            </div>
            <div>
              <mu-circular-progress :size="40" class="center" v-if="isloading"/>
                <mu-list :value="value" v-show="!isloading" @change="change">
                <div v-for="(item, index) in list" @click="playAudio(item)">
                    <mu-list-item  :disableRipple="true" :title="item.name" :value="item.id" :describeText="item.ar[0].name">
                        <span slot="left" class="indexStyle">{{index + 1}}</span>
                    </mu-list-item>
                    <mu-divider inset/>
                </div>
                </mu-list>
            </div>
            </mu-list>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../api'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      coverImgUrl: '../../static/default_cover.png',
      name: '歌单标题',
      id: 0,
      fname: '歌单',
      playCount: 0,
      description: '描述描述',
      creator: {
        'avatarUrl': '../../static/user-default.png',
        'nickname': '昵称'
      },
      list: [],
      opacity: 0,
      value: 0,
      isloading: false
    }
  },
  // 解除keep-alive的缓存
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 根据传过来的ID是否一样，判断加载
      if (parseInt(to.params.id) !== parseInt(vm.id)) {
        vm.get()
      }
      // 判断过来的路由是否带有对应的参数信息
      if (to.params.coverImg) {
         // 获取songList传入的数据
        vm.coverImgUrl = vm.$route.params.coverImg
        vm.name = vm.$route.params.name
        vm.description = vm.$route.params.desc
        vm.playCount = vm.$route.params.count
        vm.creator = vm.$route.params.creator
        vm.id = vm.$route.params.id
      }
      window.onscroll = () => {
        var opa = window.pageYOffset / 150
        if (opa > 0.5) {
          vm.fname = vm.name
        } else {
          vm.fname = '歌单'
        }
        vm.opacity = window.pageYOffset / 150
      }
    })
  },
  // 路由离开时清除onscroll事件
  beforeRouteLeave: (to, from, next) => {
    window.onscroll = null
    next()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    get () {
      this.isloading = true
      this.$http.get(api.getPlayListDetail(this.$route.params.id)).then((res) => {
        this.list = res.data.playlist.tracks
        this.isloading = false
      }).catch((error) => {
        console.log('加载歌单信息出错:' + error)
      })
    },
    change (val) {
      this.value = val
    },
    playAudio (song) {
      document.getElementById('audioPlay').pause()
      this.$store.commit('pause')
      var audio = {}
      audio.id = song.id  // id
      audio.singer = song.ar[0].name // 演唱者
      audio.albumPic = song.al.picUrl
      audio.name = song.name
      // 通过Vuex改变状态
      this.$store.commit('addToList', audio)
      this.$store.dispatch('getSong', audio.id)
    },
    // 播放全部
    playAll () {
      // 添加专辑内所有歌曲到一个新数组
      let items = []
      this.list.forEach((item) => {
        items.push({
          albumPic: item.al.picUrl,
          id: item.id,
          name: item.al.name,
          singer: item.ar[0].name
        })
      })
      this.$store.commit('addToList', items)
    }
  },
  computed: {
    ...mapGetters([
      'songList'
    ])
  },
  filters: {
    formatCount (v) {
      if (v < 9999) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .fixed-title {
        position: fixed;
        top: 0;
        width: 100%;
        height: 56px;
        left: 0;
        z-index: 15;
    }

     // 修改默认的bar样式
    .mu-appbar {
      background-color: transparent;
    }
    .bar-line {
      display: block;
      bottom: 0 ;
      left: 0;
      display: block;
      width: 100%;
      height: 0.05rem;
      background: radial-gradient(#d3d3d3 -90%, transparent 100%);
    }
    .mu-paper-1 {
      box-shadow: none;
      > .mu-appbar-title {
        text-align: center;
        font-size: 14px;
      }
    }
    // 歌单信息
    .playlist-info {
        position: relative;
        padding: 60px .5rem 0 ;
        height: 10rem;
    }

    .info-wrapper {
        position: relative;
        z-index: 10;
        color: #fff;
        .info-gallery {
            position: relative;
            float: left;
            width: 6rem;
            overflow: hidden;
            span {
                position: absolute;
                display: block;
                padding-right: 5px;
                width: 100%;
                left: 0;
                top: 0;
                font-size: 12px;
                text-align: right;
                background: rgba(0,0,0,.35);
                z-index: 11;
            }
            img {
                max-width: 100%;
                height: auto;
            }
        }

        .info-title {
            float: left;
            width: 7.5rem;
            margin-left: 1rem;
            .title {
                font-size: 16px;
                word-wrap: wrapper;
            }
            .author {
                span {
                    overflow: hidden;
                    display: inline-block;
                    height: 30px;
                    text-overflow: ellipsis;
                    width: 5.4rem;
                    white-space: nowrap;
                    font-size: 14px;
                    vertical-align: top;
                    line-height: 30px;
                }
            }
        }
    }

    .playlist-holder {
        position: relative;
        background: #fff;
        z-index: 3;

        .add-all {
            padding-left: .4rem;
        }
    }

    // 列表样式
    .indexStyle {
    padding-left: 10px;
    font-size: 18px;
    font-weight: bolder;
    }
    .mu-item-title {
        white-space:nowrap;
        height: 1.7rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .bg-player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom right;
        filter: blur(40px);
        -webkit-filter: blur(40px);
        z-index: 1;
    }
    .bg-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #292a2b;
        background-color: rgba(0,0,0,.35);
        z-index: 2;
    }
    .center {
      display: block!important;
      margin: 10% auto 0;
    }
    .view {
      width:100%;
      margin-bottom:2.3rem;
    }
    .mu-item-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.5;
    }
</style>
