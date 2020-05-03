import Vue from 'vue'
import Router from 'vue-router'
import TaskList from '@/components/TaskList'
import TaskEdit from '@/components/TaskEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/task/:id',
      name: 'TaskEdit',
      component: TaskEdit,
      props: true
    }
  ]
})
