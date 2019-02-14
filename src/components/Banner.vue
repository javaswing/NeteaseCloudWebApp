<template>
  <div class="main">
    <div class="main__bg"></div>
    <div class="box">
      <img src="http://p1.music.126.net/4e1C1XMb4peZg7aP1pQ88Q==/109951163831078534.jpg" alt="">
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/_var.scss";
.main {
  position: relative;
  overflow: hidden;
  padding: 10px;
}
.main__bg {
  position: absolute;
  top:0;
  right: 0;
  width: 100%;
  height: 195px;
  background: $primary;
}
.box {
  position: relative;
  z-index: 2;
  img {
    border-radius: 15px;
    width: 100%; 
    height: auto;
    box-shadow: 0 1px 0 rgba(0, 0, 0, .25)
  }
}
</style>

