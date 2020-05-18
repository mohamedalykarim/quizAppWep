// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import store from "./components/store/store"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin);



Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  data:{
  },
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    firebase.initializeApp({
        apiKey: "AIzaSyAU-e5R_CQyagAU6AEf8qSDMQB5-Smr3n4",
        authDomain: "quiz-app-18826.firebaseapp.com",
        databaseURL: "https://quiz-app-18826.firebaseio.com",
        projectId: "quiz-app-18826",
        storageBucket: "quiz-app-18826.appspot.com",
        messagingSenderId: "908669566328",
        appId: "1:908669566328:web:ceab317fbb1eeb66621c8d",
        measurementId: "G-Q2HTSSF40Z"
    });


    firebase.auth().onAuthStateChanged(function(user){
      if(user !== null){

        store.dispatch("setUserLogged", user);
        store.dispatch("getUserData", user.uid);
        if(router.currentRoute.name !== "Home"){
          router.push('/');
        }
        

      }else{
        store.dispatch("setUserNotLogged");
        router.push('/Login');
      }

    })




  }

})
