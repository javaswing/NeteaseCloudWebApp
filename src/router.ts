import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import ('./views/Home.vue'),
    },
    // {
    //   path: '/',
    //   name: 'songList',
    //   component: () => import ('./views/SongList.sx')
    // }
  ],
});
