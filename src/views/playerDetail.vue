<template>
    <div class="content">
      <div class="player-wrapper">
        <div class="player-inner">
          <mu-appbar>
            <mu-icon-button icon='arrow_back' @click="back"  slot="left"/>
            <div class="play-title">
              <div class="play-name"><span>{{audio.name}}</span></div>
              <div class="play-singer"> {{audio.singer}} </div>
            </div>
            <mu-icon-button icon='share' slot="right"/>
          </mu-appbar>
          <div class="bar-line"></div>
          <mu-flexbox orient="vertical" class="main">
            <mu-flexbox-item order="0">
              <div class="cd-holder" :class="{'cd-play': playing}">
                <div class="stick"></div>
                <div class="cd-wrapper" :class="{'cd-rotate': playing}">
                  <div class="cd-mask">
                  </div>
                  <img class="cd-img" :src="audio.albumPic + '?param=500y500'"/>
                </div>
              </div>
            </mu-flexbox-item>
            <mu-flexbox-item order="2" class="bottom-wrapper">
              <div class="lyric-holder">
                <div class="lrc-inner" style="transition: -webkit-transform 0.3s ease-out; transform-origin: 0px 0px 0px;" :style="{'transform':' translate3d(0px,'+ lrcOffset +'px, 0px)'}">
                  <p v-for="(item, index) in afterLrc" :id="'line-'+index" :key="index">{{item.txt}}</p>
                </div>
              </div>
              <div class="process-bar">
                <div class="pro">
                <div class="pro-wrap">
                  <mu-slider class="song-slider" @change="changeTime" v-model="prCurrentTime"/>
                </div>
                <div class="time">
                  <time id="cur">{{currentTime | time}}</time>
                  <time id="total">{{durationTime | time}}</time>
                </div>
              </div>
              </div>
              <div class="control-bar ">
                <mu-icon-button class="btn d-mode"/>
                <mu-icon-button class="btn d-prev" @click="playPrev"/>
                <mu-icon-button class="btn d-play btn-big" @click="togglePlay" :class="{'d-pause': playing}"/>
                <mu-icon-button class="btn d-next" @click="playNext"/>
                <mu-icon-button class="btn d-list" @click="showList"/>
              </div>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
        </div>
      <div class="mask">
        <div class="album-cover" :style="{'background-image':'url(' + audio.albumPic + '?param=500y500' + ')'}"></div>
        <div class="cover-mask" style="opacity:0.6;"></div>
      </div>
      <BottomSheet ref="bottomSheet"></BottomSheet>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import BottomSheet from '../components/list'
import api from '../api'
export default {
  data () {
    return {
      lyric: '',
      afterLrc: [],
      lrcIndex: 0
    }
  },
  components: {
    BottomSheet
  },
  beforeRouteEnter: (to, from, next) => {
    // 这里判断是否重复打开的同一个歌曲页面
    next(vm => {
      if (parseInt(to.params.id) !== parseInt(vm.audio.id)) {
        console.log('vm：id' + vm.audio.id)
        vm.loadLrc(vm.audio.id)
      }
    })
  },
  watch: {
    audio (val) {
      this.loadLrc(val.id)
    }
  },
  methods: {
    togglePlay () {
      if (this.playing) {
        this.$store.commit('pause')
        document.getElementById('audioPlay').pause()
      } else {
        this.$store.commit('play')
        document.getElementById('audioPlay').play()
      }
    },
    back () {
      this.$router.go(-1)
      this.$store.commit('toggleDetail')
    },
    changeTime (value) { // 改变播放时间事件
      var time = (value * this.durationTime) / 100
      this.$store.commit('changeTime', time)
      this.$store.commit('setChange', true)
    },
    loadLrc (id) {
      var self = this
      this.afterLrc = [{'txt': '正在加载中...'}]
      if (!id) {
        this.afterLrc = [{'txt': '这里显示歌词哦！'}]
        return
      }
      this.$http.get(api.getLrc(id)).then((res) => {
        // 1、先判断是否有歌词
        if (res.data.nolyric) {
          this.afterLrc = [{'txt': '(⊙０⊙) 暂无歌词'}]
        } else {
          this.lyric = res.data.lrc.lyric
          this.getLrc()
        }
      }, (res) => {
        console.log('lrc fail')
        this.afterLrc = [{'txt': '加载歌词失败'}]
      })
      .catch(function (error) {
        console.log(error)
        self.afterLrc = [{'txt': '(⊙０⊙) 暂无歌词'}]
      })
    },
    getLrc () {
      if (this.lyric) {
        var lyrics = this.lyric.split('\n')
        var lrcObj = []
        /*eslint-disable */
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        /*eslint-enable */
        // 思路：1、把歌词进行处理以时间和歌词组成一个对象，放入afterLrc数组中
        // 2、在computed方法中根据当前的时间进行匹配歌词，然后查找在数据中的位置计算offset值
        for (var i = 0; i < lyrics.length; i++) {
          var timeRegExpArr = lyrics[i].match(timeReg)
          if (!timeRegExpArr) continue
          var txt = lyrics[i].replace(timeReg, '')
          // 处理时间
          for (var k = 0; k < timeRegExpArr.length; k++) {
            var array = {}
            var t = timeRegExpArr[k]
            /*eslint-disable */
            var min = Number(String(t.match(/\[\d*/i)).slice(1))
            var sec = Number(String(t.match(/\:\d*/i)).slice(1))
            /*eslint-enable */
            var time = min * 60 + sec
            array.time = time
            array.txt = txt
            lrcObj.push(array)
          }
        }
        this.afterLrc = lrcObj
      }
    },
    showList () {
      this.$refs.bottomSheet.show()
    },
    ...mapMutations([
      'playNext',
      'playPrev'
    ])
  },
  computed: {
    ...mapGetters([
      'currentTime',
      'bufferedTime',
      'durationTime',
      'prCurrentTime',
      'audio',
      'playing'
    ]),
    lrcOffset () {
      if (this.afterLrc) {
        // 1、根据时间获得歌词
        var current = Math.round(this.currentTime)
        // 2、根据时间得到歌词
        for (var i = 0; i < this.afterLrc.length; i++) {
          if (this.afterLrc[i].time === current) this.lrcIndex = i
        }
        return -(this.lrcIndex) * 58
      }
    }
  },
  filters: {
    // 时间字符格式化
    time (value) {
      var length = Math.floor(parseInt(value))
      var minute = Math.floor(value / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      var second = length % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
  }
}
</script>
<style lang="less" scoped>
  .content {
    overflow: hidden;
    min-height: 25rem;
    height: 100%;
  }
  .main {
    height: 100%;
  }
  .player .song-tit .name {
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .player-wrapper {
    .player-inner {
      position: relative;
      z-index: 2;
      box-sizing: border-box;
    }
    .play-title {
      height: 56px;
      font-size: 16px;
      color: #fff;
      .play-name {
        padding-top: 0.4rem;
        line-height: 1.8;
      }
      .play-singer {
        font-size: 14px;
        color: #a8a7a7;
        text-align: left;
        line-height: 1;
      }
    }

    // cd部分样式
    .cd-holder {
      position: relative;
      overflow: hidden;
      .stick {
        position: absolute;
        width: 4rem;
        height: 6rem;
        right: 30%;
        background: url("../../static/stick_bg.png") no-repeat left -.4rem;
        background-size: cover;
        z-index: 8;
        -webkit-transition: all 300ms ease-in;
        transition: all 300ms ease-in;
        -webkit-transform-origin: left top;
        transform-origin: left top;
        -webkit-transform: rotate(-20deg);
        transform: rotate(-20deg);
      }
      .cd-wrapper {
        position: relative;
        max-width: 65%;
        min-height: 80px;
        padding: .8rem .9rem;
        border-radius: 50%;
        background: rgba(107, 107, 107, 0.3);
        margin: 3rem auto 0;
        .cd-mask {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url('../../static/cd_wrapper.png') no-repeat center center;
          background-size: contain;
        }
        img {
          width: 100%;
          height: 100%;
          min-height: 80px;
          border-radius: 50%;
        }
      }
    }

    // cd播放状态样式
    .cd-play {
      .stick {
        background-position-y: -.7rem;
       -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
      }
    }
    .cd-rotate {
      -webkit-animation: rotating 10s  linear .3s infinite;
      animation: rotating 10s linear .3s infinite;
    }

    .cd-img {
      border-radius: 50%;
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
  }

.bottom-wrapper {
  padding: 0 1rem 0;
  color: #fff;
  align-items: flex-end;
}

  // 歌词
  .lyric-holder {
    margin-top: .6rem;
    position: relative;
    overflow: hidden;
    height: 3rem;
    .lrc-inner {
      position: absolute;
      left: 10px;
      right: 10px;
      overflow: hidden;
      p {
        overflow: hidden;
        height: 42px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: #fff;
        text-align: center;
      }
      .on {
        color: #fff;
        font-size: 16px;
      }
    }
  }
  // 进度条
  .pro {
      position: relative;
    }
    .pro-wrap {
      margin: 0 2rem;
      padding: 1rem 0 0;
      position: relative;
    }
    .time {
      color: #fff;
      font-size: 12px;
      time {
        position: absolute;
        top: 54%;
        opacity: .5;
      }
      #cur {
        left: 0;
      }
      #total {
        right: 0;
      }
    }
    .song-slider {
      margin-bottom:0;
    }

  // 控制按钮
  .control-bar {
    .btn {
      width: 2.6rem;
      height: 2.6rem;
    }
    .d-mode {
      background: url("../../static/seq.png") no-repeat;
      background-size: cover;
    }
    .d-prev {
      background: url("../../static/prev.png") no-repeat;
      background-size: cover;
    }
    .d-play {
      background: url("../../static/play.png") no-repeat;
      background-size: cover;
    }
    .d-pause {
      background: url("../../static/pause.png") no-repeat;
      background-size: cover;
    }
    .d-next {
      background: url("../../static/next.png") no-repeat;
      background-size: cover;
    }
    .d-list {
      background: url("../../static/list.png") no-repeat;
      background-size: cover;
    }
  }

  // 背景遮罩
  .mask {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .album-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(1.2rem);
    -webkit-filter: blur(1.2rem);
    -webkit-transform: scale(1.05);
  }
  .cover-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
  }


  /*跑马灯样式*/
  .marquee {
    position: relative;
    overflow: hidden;
    height: 30px;
  }
  .marquee > span {
    display: block;
    position: absolute;
    overflow: hidden;
    width: 200%;
    height: 30px;
    -webkit-animation: marquee 10s linear infinite;
    animation: marquee 10s linear infinite;
  }

  /* 定义一个走马灯动画 */
  @-webkit-keyframes marquee {
    0% { left: 0; }
    100% { left: -100%; }
  }
  @keyframes marquee {
    0% { left:0; }
    100% { left: -100%; }
  }

  /*cd 旋转动画*/

  @-webkit-keyframes rotating{
    0% { -webkit-transform:rotate(0deg); }
    100% { -webkit-transform:rotate(360deg); }
  }
  @keyframes rotating {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
  }

   .fade-enter-active {
      transition: all .4s;
    }
    .fade-enter {
      transform: translate(100%, 0);
    }
</style>
