<template>
    <transition name="toast-fade">
        <div class="toast-wrap" v-show="showing">{{text}}</div>
    </transition>
</template>

<script>
const DEFAULT_DURATION = 2000
export default {
  name: 'toast',
  data () {
    return {
      text: '',
      showing: false,
      timer: null
    }
  },
  methods: {
    show (text, duration) {
      this.text = text
      this.showing = true
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setTimeout(() => {
        this.showing = false
      }, duration || DEFAULT_DURATION)
    }
  }
}
</script>

<style scoped>
  .toast-wrap {
      position: fixed;
      bottom: 80px;
      left: 0;
      right: 0;
      width: 50%;
      margin-left: auto;
      margin-right: auto;
      background-color: rgba(0, 0, 0, 0.7);
      color: #ffffff;
      text-align: center;
      padding: 5px;
      font-size: 12px;
      border-radius: 5px;
  }
  .toast-fade-enter-active, .toast-fade-leave-active {
      transition: opacity .5s;
  }
  .toast-fade-enter, .toast-fade-leave-active {
      opacity: 0
  }
</style>
