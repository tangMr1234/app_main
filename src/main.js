import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from '@/router/index'
import {
  ConfirmPlugin,
  AlertPlugin,
  ToastPlugin,
  TransferDom,
  ViewBox,
  Flexbox,
  FlexboxItem,
  XTextarea,
  Tab,
  TabItem,
  LoadMore,
  Blur,
  FormPreview,
  Box,
  CellFormPreview,
  CellBox,
  XHeader,
  XImg,
  Divider,
  Tabbar,
  TabbarItem,
  Group,
  Cell,
  Panel,
  Badge,
  Marquee,
  MarqueeItem,
  XInput,
  XButton,
  Loading
} from 'vux'
import utils from '@/utils/utils'

require('./assets/icon/iconfont');

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.directive('transfer-dom', TransferDom)
Vue.component('view-box', ViewBox)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('form-preview', FormPreview)
Vue.component('x-header', XHeader)
Vue.component('x-img', XImg)
Vue.component('divider', Divider)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('panel', Panel)
Vue.component('badge', Badge)
Vue.component('marquee', Marquee)
Vue.component('marquee-item', MarqueeItem)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('blur', Blur)
Vue.component('load-more', LoadMore)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('x-textarea', XTextarea)
Vue.component('cell-box', CellBox)
Vue.component('box', Box)
Vue.component('loading', Loading)

// FastClick.attach(document.body)

const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false,
    direction: 'forward',
    isLogin: false
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    },
    //全局设置是否登录的状态
    updateLoginStatus(state, payload) {
      state.isLogin = payload.isLogin
    }
  }
})

Vue.config.productionTip = false

//注册全局方法，用来获取url传递的参数
Vue.prototype.$utils = utils
//关闭loading的全局方法
Vue.prototype.loadingRemove = function () {
  store.commit('updateLoadingStatus', {isLoading: false})
}
//刷新页面的全局方法
Vue.prototype.reload = function () {
  window.location.reload();
}
//注册弹窗的全局方法
Vue.prototype.confirm = function (title, content, buttonText, func) {
  this.$vux.confirm.show({
    title: title,
    content: content,
    confirmText: buttonText,
    onConfirm() {
      if (func && func != "") {
        func();
      }
    }
  })
}
//注册alert的全局方法
Vue.prototype.alert = function (title, content, buttonText, func) {
  this.$vux.alert.show({
    title: title,
    content: content,
    buttonText: buttonText,
    onHide() {
      if (func && func != "") {
        func();
      }
    }
  })
}
//注册toast的全局方法
Vue.prototype.toast = function (title, type, width, func) {
  this.$vux.toast.show({
    text: title,
    type: type,
    width: width,
    onHide() {
      if (func && func != "") {
        func();
      }
    }
  })
}

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true});
  let Menu = localStorage.getItem("MainMenu");
  //判断当前是否登录
  if (!Menu && to.path != '/login') {
    store.commit('updateLoginStatus', {isLogin: false});
    store.commit('updateLoadingStatus', {isLoading: false})
    next({path: '/login'})
  } else {
    store.commit('updateLoginStatus', {isLogin: true});
    next()
  }

  if (to.path == '/login') {
    store.commit('updateLoginStatus', {isLogin: false});
    let users = localStorage.getItem("User");
    localStorage.clear();
    localStorage.setItem('User', users);
    sessionStorage.clear();
  }
})

// const history = window.sessionStorage
// history.clear()
// let historyCount = history.getItem('count') * 1 || 0
// history.setItem('/', 0)
// let isPush = false
// let endTime = Date.now()
// let methods = ['push', 'go', 'replace', 'forward', 'back']
//
// document.addEventListener('touchend', () => {
//   endTime = Date.now()
// })
// methods.forEach(key => {
//   let method = router[key].bind(router)
//   router[key] = function (...args) {
//     isPush = true
//     method.apply(null, args)
//   }
// })
//
// router.beforeEach(function (to, from, next) {
//   store.commit('updateLoadingStatus', {isLoading: true})
//
//   const toIndex = history.getItem(to.path)
//   const fromIndex = history.getItem(from.path)
//
//   if (toIndex) {
//     if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
//       store.commit('updateDirection', {direction: 'forward'})
//     } else {
//       // 判断是否是ios左滑返回
//       if (!isPush && (Date.now() - endTime) < 377) {
//         store.commit('updateDirection', {direction: ''})
//       } else {
//         store.commit('updateDirection', {direction: 'reverse'})
//       }
//     }
//   } else {
//     ++historyCount
//     history.setItem('count', historyCount)
//     to.path !== '/' && history.setItem(to.path, historyCount)
//     store.commit('updateDirection', {direction: 'forward'})
//   }
//
//   if (/\/http/.test(to.path)) {
//     let url = to.path.split('http')[1]
//     window.location.href = `http${url}`
//   } else {
//     next()
//   }
// })

router.afterEach(function (to) {
  // isPush = false;
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
