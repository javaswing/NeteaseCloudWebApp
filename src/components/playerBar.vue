<template>
  <div class="foot">
    <div class="player-mini">
      <div class="mini-content">
        <audio id="audioPlay"></audio>
        <div class="cover">
          <img class="xmplogo" src="static/player-bar.png" alt="当我在这里">
        </div>
        <div class="info">
          <div class="name xmpname">歌曲名称</div>
          <div class="artist xmpartist">作者</div>
          <div class="control">
            <mu-icon-button class="mini-btn player-list"/>
            <mu-icon-button class="mini-btn player"/>
            <mu-icon-button class="mini-btn next"/>
          </div>
        </div>
        <div class="pro">
          <div class="pro-load proload" :style="{'-webkit-transform':'translateX(' + loadedTime +'%)' }"></div>
          <div class="pro-play proplay" :style="{'-webkit-transform':'translateX(' + playerTime +'%)' }"></div> </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loadedTime: 29,
        playerTime: 10
      }
    }
  }
</script>
<style lang="less" scopoed>
  @import "../assets/theme.less";
  .foot {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 998;
  }
  .player-mini {
    width: 100%;
    height: 2.3rem;
    position: relative;
    background-color: rgba(255,255,255,.9);
    color: #333333;
  }
  .player-mini .mini-content .cover {
    width: 2rem;
    height: 2rem;
    overflow: hidden;
    float: left;
    padding-left: 0.2rem;
    padding-top: 0.2rem;
  }
  .player-mini .mini-content .cover img {
    width: 100%;
    height: 100%;
  }
  .player-mini .mini-content .info {
    overflow: hidden;    
    position: relative;    
    padding-top: 0.2rem;
    padding-left: .3rem;
  }
  .player-mini .mini-content .info .name {
    font-size: .7rem;
    line-height: 1rem;
  }
  .player-mini .mini-content .info .name, .player-mini .mini-content .info .artist {
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;   
  }
  .player-mini .mini-content .info .artist {
    color: #8a8a8a;
    font-size: .6rem;
  }
  .player-mini .mini-content .info .name, .player-mini .mini-content .info .artist {
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    
  }
  .player-mini .mini-content .info .xmpartist {
    
  }
  /*按钮*/
  .control .mini-btn {
    width: 2rem;
    height: 2rem;
  }
  .player-mini .mini-content .info .control {
    position: absolute;
    height: 100%;
    top: 50%;
    margin-top: -1rem;
    right: 0;
  }

  /*列表按钮*/ 
  .player-list {
    background: url("../../static/playbar_btn_playlist.png") no-repeat!important;
    background-size: cover!important;
  }
  .player {
    background: url("../../static/playbar_btn_play.png") no-repeat!important;
    background-size: cover!important;
  }
  .next {
    background: url("../../static/playbar_btn_next.png") no-repeat!important;
    background-size: cover!important;
  }


  /*进度条*/
  .player-mini .mini-content .pro {
    width: 100%;
    height: .1rem;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.5);
  }
  .player-mini .mini-content .pro-load, .player-mini .mini-content .pro-play {
    width: 100%;
    height: .1rem;
    position: absolute;
    left: -100%;
  }
  .player-mini .mini-content .pro-load {
    background-color: rgba(220, 217, 217, 0.4);
  }
  .player-mini .mini-content .pro-play {
    background-color:  @primaryColor;
  }
  .songlist {
    height: 260px;
    overflow: auto;
  }
  .songlist-title {
    position: fixed;
    background: #fff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(0,0,0,.12);
    text-align: center;
  }
</style>
