import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/blog',
    name: 'Main',
    component: Layout,
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

export default router
