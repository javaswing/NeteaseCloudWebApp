<template>
  <div class="main">
    <div class="nav"></div>
    <banner/>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Banner from '../components/Banner.vue';

@Component({
  components: { Banner },
})
export default class Home extends Vue {
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/_var.scss";

.nav {
  width: 100%;
  height: 100px;
  color: $white;
  background: $primary;
}
</style>


