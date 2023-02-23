import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/pages/HomePage.vue')
  },
  {
    path: '/running',
    component: () => import('src/pages/RunningPage.vue')
  },
  {
    path: '/programming',
    component: () => import('src/pages/ProgrammingPage.vue')
  },
  {
    path: '/personal',
    component: () => import('src/pages/PersonalPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
