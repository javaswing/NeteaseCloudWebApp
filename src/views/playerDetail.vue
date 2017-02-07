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
                  <img class="cd-img" :src="audio.albumPic"/>
                </div>
              </div>
            </mu-flexbox-item>
            <mu-flexbox-item order="2" class="bottom-wrapper">
              <div class="lyric-holder">
                <div class="lrc-inner">
                  <p>歌词歌词歌词歌词歌词歌词歌词歌词歌词歌词</p>
                  <p class="on">歌词歌词歌词歌词歌词歌词</p>
                </div>
              </div>
              <div class="process-bar">
                <div class="pro">
                <div class="pro-wrap">
                  <mu-slider class="song-slider" v-model="prCurrentTime"/>
                </div>
                <div class="time">
                  <time id="cur">{{currentTime | time}}</time>
                  <time id="total">{{durationTime | time}}</time>
                </div>
              </div>
              </div>
              <div class="control-bar ">
                <mu-icon-button class="btn d-mode"/>
                <mu-icon-button class="btn d-prev"/>
                <mu-icon-button class="btn d-play btn-big" @click="togglePlay" :class="{'d-pause': playing}"/>
                <mu-icon-button class="btn d-next"/>
                <mu-icon-button class="btn d-list"/>
              </div>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
        </div>
      <div class="mask">
        <div class="album-cover" :style="{'background-image':'url(' + audio.albumPic + ')'}"></div>
        <div class="cover-mask" style="opacity:0.6;"></div>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
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
    }
  },
  computed: {
    ...mapGetters([
      'audio',
      'playing',
      'prCurrentTime',
      'currentTime',
      'bufferedTime',
      'durationTime'
    ])
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
  padding: 1rem 1rem 0;
  color: #fff;
  align-items: flex-end;
}

  // 歌词
  .lyric-holder {
    position: relative;
    overflow: hidden;
    height: 3.4rem;
    .lrc-inner {
      position: absolute;
      left: 10px;
      right: 10px;
      overflow: hidden;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        color: #a3a3a2;
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
</style>
