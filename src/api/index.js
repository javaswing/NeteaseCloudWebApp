const _baseUrl = 'http://api.javaswing.cn'
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/'
export default {
  /**
   * 获取首页Banner图片数据
   */
  getBannerList () {
    return `${_baseUrl}/banner`
  },
  /**
   * 获取推荐歌单
   */
  getPersonalized () {
    return `${_baseUrl}/personalized`
  },
  /**
   * 获取推荐 mv
   */
  getPersonalizedMV () {
    return `${_baseUrl}/personalized/mv`
  },
  /**
   *
   * @param {*} cat
   * @param {*} order
   * @param {*} offset
   * @param {*} total
   * @param {*} limit
   */
  getPlayListByWhere (offset, limit) {
    return `${_baseUrl}/top/playlist?limit=${limit}&order=all&offset=${offset}`
  },
  /**
   * 获取歌词API
   * @param {Number} id
   */
  getLrc (id) {
    return `${_baseUrl}/lyric?id=${id}`
  },
  /**
   * 获取歌曲 播放URL
   * @param {Number} id
   */
  getSong (id) {
    return `${_baseUrl}/song/url?id=${id}`
  },
  /**
   * 获取歌单详情
   * @param {Number} id
   */
  getPlayListDetail (id) {
    return `${_baseUrl}/playlist/detail?id=${id}`
  },
  getMv (id) {
    return _baseUrl2 + '?type=mv&id=' + id
  },
  search (words) {
    return _baseUrl2 + '?type=search&s=' + words
  }
}
