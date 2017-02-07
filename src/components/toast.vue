<template>
  <mu-toast v-if="toast" :message="msg" @close="hideToast"/>
</template>
<script>
  export default {
    name:'alert',
    props: {
      msg: {
        type: String
      },
      position: {
        default: 'center',
        type: String
      }
    },
    data () {
      return {
        toast: false
      }
    },
    methods: {
      showToast () {
        this.toast = true
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
      },
      hideToast () {
        this.toast = false
        if (this.toastTimer) clearTimeout(this.toastTimer)
      }
    }
  }
</script>
