// const _baseUrl = 'http://192.168.0.73:809/api/music'
const _baseUrl = 'http://vuetest-001-site1.btempurl.com/api/music'
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic'
export default {
  getPlayListByWhere (cat, order, offset, total, limit) {
    return _baseUrl + '/topPlaylist?cat=' + cat + '&order=' + order + '&offset=' + offset + '&total=' + total + '&limit=' + limit
  },
  getLrc (id) {
    return _baseUrl2 + '?type=lyric&id=' + id
  },
  getSong (id) {
    return _baseUrl2 + '?id=' + id
  },
  getPlayListDetail (id) {
    return _baseUrl2 + '?type=playlist&id=' + id
  },
  getMv (id) {
    return _baseUrl2 + '?type=mv&id=' + id
  },
  search (words) {
    return _baseUrl2 + '?type=search&s=' + words
  }
}
