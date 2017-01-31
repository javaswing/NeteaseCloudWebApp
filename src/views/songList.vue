<template>
    <div class="wrapper">
    <div class="title">全部歌单 </div>
        <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
          <mu-flexbox-item basis="40%" class="list-item">
            <div class="list-bar">1233万</div>
            <img class="img-response" src="http://p3.music.126.net/xE78afhjgZPKjQ9sLGzYJg==/109951162846275160.jpg">
            <div class="list-name">Skin to sking</div>

          </mu-flexbox-item>
          <mu-flexbox-item basis="40%" class="list-item">
            <img class="img-response"  src="http://p3.music.126.net/xE78afhjgZPKjQ9sLGzYJg==/109951162846275160.jpg">
            <div class="list-name">Skin to sking</div>

          </mu-flexbox-item>
          <mu-flexbox-item basis="40%" class="list-item">
            <div class="list-bar">1233万</div>
            <img class="img-response" src="http://p3.music.126.net/xE78afhjgZPKjQ9sLGzYJg==/109951162846275160.jpg">
            <div class="list-name">Skin to skingSkin to</div>

          </mu-flexbox-item>
          <mu-flexbox-item basis="40%" class="list-item">
            <img class="img-response"  src="http://p3.music.126.net/xE78afhjgZPKjQ9sLGzYJg==/109951162846275160.jpg">
            <div class="list-name">Skin to sking</div>
          </mu-flexbox-item>
          <mu-flexbox-item basis="40%" class="list-item">
            <div class="list-bar">1233万</div>
            <img class="img-response" src="http://p3.music.126.net/xE78afhjgZPKjQ9sLGzYJg==/109951162846275160.jpg">
            <div class="list-name">Skin to skingSkin to</div>

          </mu-flexbox-item>
          <mu-flexbox-item basis="40%" class="list-item">
            <img class="img-response"  src="http://p3.music.126.net/xE78afhjgZPKjQ9sLGzYJg==/109951162846275160.jpg">
            <div class="list-name">Skin to sking</div>
          </mu-flexbox-item>
        </mu-flexbox>
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
</script>
