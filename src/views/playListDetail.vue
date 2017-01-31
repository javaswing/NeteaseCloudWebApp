<template>
    <div>
        <div class="fixed-title">
            <mu-appbar>
            <mu-icon-button icon='arrow_back'  slot="left"/>
            <div class="play-title">
              <div class="play-name"><span>歌单</span></div>
              <div class="play-singer"> 演唱者 </div>
            </div>            
          </mu-appbar>
        </div> 
        <div class="playlist-info">
            <div class="info-wrapper">
                <div class="info-gallery">
                    <span>67万</span>
                    <img src="http://p3.music.126.net/GMYVxUcu5hFNt2A_sDTdEw==/18632324046027839.jpg?param=500y500" alt="">
                </div>
                <div class="info-title">
                    <p class="titile">往后的时光都是崭新的丶谁也不许回头看</p>
                    <p class="author">
                        <mu-avatar slot="left" icon="folder" color="orange200" backgroundColor="pink400" :size="30" :iconSize="20"/>
                        <span>作者</span>                    
                    </p>
                </div>
            </div>
            <div class="bg-mask"></div>
            <div class="bg-player" id="backImg" style="background-image: url('http://p3.music.126.net/GMYVxUcu5hFNt2A_sDTdEw==/18632324046027839.jpg');"></div>
        </div>
        <div class="playlist-holder">
            <div class="add-all">
                <mu-flat-button label="播放全部" class="demo-flat-button" icon="add_circle_outline"/>
                <mu-divider/>
            </div>
            <div>           
                <mu-list >
                <div>
                    <mu-list-item  :disableRipple="true" title="歌曲名称" describeText="这里是描述">
                        <span slot="left" class="indexStyle">1</span>
                    </mu-list-item>
                    <mu-divider inset/>
                </div>
                <div>
                    <mu-list-item  :disableRipple="true" title="歌曲名称" describeText="这里是描述">
                        <span slot="left" class="indexStyle">2</span>
                    </mu-list-item>
                    <mu-divider inset/>
                </div>
                <div>
                    <mu-list-item  :disableRipple="true" title="歌曲名称" describeText="这里是描述">
                        <span slot="left" class="indexStyle">3</span>
                    </mu-list-item>
                    <mu-divider inset/>
                </div>
                <div>
                    <mu-list-item  :disableRipple="true" title="歌曲名称" describeText="这里是描述">
                        <span slot="left" class="indexStyle">4</span>
                    </mu-list-item>
                    <mu-divider inset/>
                </div>
                <div>
                    <mu-list-item  :disableRipple="true" title="歌曲名称" describeText="这里是描述">
                        <span slot="left" class="indexStyle">5</span>
                    </mu-list-item>
                    <mu-divider inset/>
                </div>
                <div>
                    <mu-list-item  :disableRipple="true" title="歌曲名称" describeText="这里是描述">
                        <span slot="left" class="indexStyle">6</span>
                    </mu-list-item>
                    <mu-divider inset/>
                </div>
                <div>
                    <mu-list-item  :disableRipple="true" title="歌曲名称" describeText="这里是描述">
                        <span slot="left" class="indexStyle">7</span>
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
     .play-title {
      height: 56px;
      font-size: 18px;
      color: #fff;
      .play-name {
        padding-top: 0.4rem;
        line-height: 1.5;
      }
      .play-singer {
        font-size: 12px;
        color: #a8a7a7;
        text-align: left;                
        line-height: 1;
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
                    display: inline-block;
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
</style>
<script>
</script>