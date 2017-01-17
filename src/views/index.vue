<template>
    <div>
      <mu-appbar>
        <div class="logo" slot="left"></div>
        <mu-icon-button icon='search'  slot="right"/>
      </mu-appbar>
      <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
        <mu-tab value="rage" title="时下流行"/>
        <mu-tab value="songList" title="歌单"/>
        <mu-tab value="leaderBoard" title="排行榜"/>
        <mu-tab value="hotSinger" title="热门歌手"/>
      </mu-tabs>
      <router-view></router-view>
    </div>
</template>
<style lang="less" scoped>
  .logo {
    width: 150px;
    height: 48px;
    background: url("../../static/logo.png") no-repeat left center;
    background-size: cover;
  }
  .view-tabs {
    background-color: transparent;
    color: rgba(0,0,0,.87);
    .mu-tab-link {
      color: rgba(102,102,102,1);
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        activeTab: 'rage'
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
        this.$router.push({ path: '/index/' + val })
      }
    }
  }
</script>
