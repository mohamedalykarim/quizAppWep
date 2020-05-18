import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login/Login'
import ConstructorMain from '@/components/Constructor/ConstructorMain'
import StudentMain from '@/components/student/StudentMain'
import Quiz from '@/components/Quiz/Quiz'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path : "/Login",
      name : "Login",
      component: Login
    },

    {
      path : "/Constructor",
      name : "Constructor",
      component: ConstructorMain
    },

    {
      path : "/Student",
      name : "Student",
      component: StudentMain
    }


  ]
})
