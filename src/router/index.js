import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Layout = () => import('@/components/MainPage.vue');
// const ParentView = () => import('@/components/HelloWorld.vue');

// 权限菜单
// export const permissionRoutes = [{
//   path: '/form',
//   meta: {
//     title: '表单',
//     icon: 'zds-icon-copy-filled'
//   },
//   component: ParentView,
//   redirect: '/form/edit',
// }];

const constantRoutes = [
  {
    path: '/',
    meta: {
      title: '双欣大屏',
    },
    component: Layout,
    redirect: '/index', // 默认需要一个没有权限控制的首页
  }
];

const routes = [...constantRoutes];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
