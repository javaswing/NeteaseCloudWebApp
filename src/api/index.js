// const _baseUrl = 'http://vuetest-001-site1.btempurl.com/api/music'
const _baseUrl = 'http://192.168.0.73:809/api/music'
export default {
  getPlayListByWhere (cat, order, offset, total, limit) {
    return _baseUrl + '/topPlaylist?cat=' + cat + '&order=' + order + '&offset=' + offset + '&total=' + total + '&limit=' + limit
  },
  getLrc (id) {
    return _baseUrl + '/lyric?id=' + id
  },
  getSong (id) {
    return _baseUrl + '/detail?ids=' + id
  },
  getPlayListDetail (id) {
    return _baseUrl + '/playlist?id=' + id
  },
  getMv (id) {
    return _baseUrl + '/mv?id=' + id
  },
  search (words) {
    return _baseUrl + '/search?s=' + words + '&limit=1'
  }
}
