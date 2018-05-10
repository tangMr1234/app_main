import Vue from 'vue'
import Router from 'vue-router'

// 登录
const Login = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Layout/Login'))
  })
}
// 主页面框架
const Home = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Home'))
  })
}
// 有header页面框架
const HHome = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/HHome'))
  })
}
// Frame框架
const MainFrame = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/MainFrame'))
  })
}
// 首页
const Index = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Layout/Index'))
  })
}
// 消息
const Message = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Message/Message'))
  })
}
// 消息详情
const Details = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Details/Details'))
  })
}
// 我的
const User = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/User/User'))
  })
}
// 地图
const Map = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Map/Map'))
  })
}
// 关于我们
const AboutUs = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/More/AboutUs'))
  })
}
// 错误404
const NotFound = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Layout/404'))
  })
}
// 更多
const More = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/More/More'))
  })
}
// 更多里的公用页面
const MorePublic = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/More/MorePublic'))
  })
}
// 更多里的帮助页面
const Help = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/More/Help'))
  })
}
// 更多里的意见反馈
const FeedBack = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/More/FeedBack'))
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '错误界面',
      hidden: true
    },
    {
      path: '*',
      name: '404',
      hidden: true,// 隐藏，在菜单中不显示
      redirect: {path: '/404'}
    },
    {
      path: '/',
      name: '主页面',
      component: Home,
      redirect: {path: '/index'},
      children: [
        //Frame框架页
        {path: '/mainframe', component: MainFrame, name: 'Frame框架页', hidden: true, meta: {tabbar: false, keepAlive: true}},
        {path: '/index', component: Index, NewRouter: 'index', name: '首页', icon: 'icon-shouye', meta: {tabbar: true, keepAlive: true}},
        // NewRouter: value 表示是tab页面的路由,vlaue对应redirect path的第一个/后面的值
        {
          path: '/userHome',
          component: User,
          name: '我的',
		  meta: {name: "我的", tabbar: true, keepAlive: true}
        },
        {
          path: '/moreHome',
          redirect: {path: '/moreHome/more'},
          component: HHome,
          name: '有header的页面',
          children: [
		    {path: '/messageHome', component: Message, name: '消息', meta: {name: '消息', headBack: false, tabbar: true, keepAlive: false}},
            {path: '/moreHome/more', component: More, name: '更多', meta: {name: '更多', headBack: false, keepAlive: true}, hidden: true},
            {
              path: '/moreHome/qrcode',
              component: MorePublic,
              name: "二维码",
              meta: {name: "二维码", type: 'code', tabbar: false, keepAlive: true},
              hidden: true
            },
            {path: '/moreHome/help', component: Help, name: "使用帮助", meta: {name: '使用帮助', tabbar: false, keepAlive: true}, hidden: true},
            {
              path: '/moreHome/aboutus',
              component: AboutUs,
              name: "关于我们",
              meta: {name: '关于我们', tabbar: false, keepAlive: true},
              hidden: true
            },
            {
              path: '/moreHome/service_detail',
              component: MorePublic,
              name: "关于软件",
              meta: {name: '关于软件', tabbar: false, keepAlive: true},
              hidden: true
            },
            {
              path: '/moreHome/feedback',
              component: FeedBack,
              name: "意见反馈",
              meta: {name: '意见反馈', tabbar: false, keepAlive: true},
              hidden: true
            }
          ]
        },
		{
		  path: '/userHome/5', redirect: {path: '/userHome/address'}, component: HHome, hidden: true,
		  children: [
			// 我的-信息
			{path: '/userHome/address', component: Map, hidden: true, meta: {name: "地图", tabbar: false, keepAlive: true}},
			//详情页面
			{
			  path: '/messageHome/details',
			  component: Details,
			  hidden: true,
			  meta: {name: "详情", tabbar: false, keepAlive: true}
			}
		  ]
		}
      ]
    }
  ]
})
