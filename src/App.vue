<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player v-show="songList.length > 0 && !showDetail"></Player>
  </div>
</template>
<script>
  import Player from './components/playerBar'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        transitionName: 'slide-left',
        toast: false
      }
    },
    components: {
      Player
    },
    computed: {
      ...mapGetters([
        'songList',
        'showDetail'
      ])
    }
  }
</script>
<style lang="less" scoped>
  .slide-left-enter-active,.slide-left-leave-active{
    transition: transform .08s ease-in-out,opacity .1s ease-in;
    backface-visibility: hidden;
  }

  .slide-left-enter, .slide-left-leave-active{
    transform: translate3d(-10%, 0, 0);
    opacity: 0;
  }
</style>
