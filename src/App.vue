<template>
  <div>
    <router-view></router-view>
    <Player></Player>
  </div>
</template>
<script>
  import Player from './components/playerBar'
  export default {
    data () {
      return {
      }
    },
    components: {
      Player
    }
  }
</script>
