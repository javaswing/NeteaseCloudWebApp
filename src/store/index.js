import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    audio: {
      'id': 0,
      'name': '标题',
      'singer': '演唱者',
      'album_pic': 'static/defaultD.png',
      'lyric': '',
      'location': '',
      'album': ''
    },
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false, // 是否正在加载中
    songList: [],    // 播放列表
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false   // 判断是更改的时间还是播放的时间
  },
  getters: {
  },
  mutations: {
  }
})
export default store
