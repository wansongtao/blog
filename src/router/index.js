import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { title: '首页' }
  },
  {
    path: '/blog',
    name: 'Main',
    component: Layout,
    redirect: '/blog/article',
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/article.vue'),
        meta: { title: '文章' }
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/message.vue'),
        meta: { title: '留言' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about.vue'),
        meta: { title: '关于我' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  document.title = to.meta.title || '欢迎来的万松涛的个人博客'

  return true
})

export default router
