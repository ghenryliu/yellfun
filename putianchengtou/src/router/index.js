import Vue from 'vue'
import Router from 'vue-router'




import carNoInput from '../components/carNoInput'
import carManagement from  '../components/carManagement'




import bindPhone from '../components/BindPhone'
import pay from '../components/pay'
import stopCarList from  '../components/stopCarList'
import success from  '../components/success'
import userinfo from '../components/userInfo'




//import Search  from '../components/Search'
import parkingSearch  from '../components/parkingSearch'
import progressbar from '../components/progressbar'
import parkingSelection from '../components/parkingSelection'
import getCar from '../components/getCar'
import order from '../components/order'
import paySuccess from '../components/paySuccess'
import carParkHistory from '../components/carParkHistory'
import carParkDetails from '../components/carParkDetails'

Vue.use(Router)

const base = process.env.NODE_ENV === 'production' ? '/wgzf/' : '/'
export default new Router({
  mode: 'history',
  base,
  routes: [
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: bindPhone
    },
    {
      path:'/',
      name: 'pay',
      component:pay
    },
    {
      path:'/stopCarList',
      name: 'stopCarList',
      component:stopCarList
    },
    {
      path:'/success',
      name: 'success',
      component:success},
    {
      path: '/carNoInput',
      name: 'carNoInput',
      component: carNoInput
    },
    {
      path: '/carManagement',
      name: 'carManagement',
      component: carManagement
    },


    // {
    //   path: '/Search',
    //   name: 'Search',
    //   component: Search
    // },

    {
      path: '/parkingSearch',
      name: 'parkingSearch',
      component: parkingSearch
    },

    {
      path: '/progressbar',
      name: 'progressbar',
      component: progressbar
    },

    {
      path: '/parkingSelection',
      name: 'parkingSelection',
      component: parkingSelection
    },
    {
      path: '/getCar',
      name: 'getCar',
      component: getCar
    },

    {
      path: '/order',
      name: 'order',
      component: order
    },

    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess
    },

    {
      path: '/carParkHistory',
      name: 'carParkHistory',
      component: carParkHistory
    },

    {
      path: '/carParkDetails',
      name: 'carParkDetails',
      component: carParkDetails
    },

  ]
})
