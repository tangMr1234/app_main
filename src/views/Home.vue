<template>
  <div style="height:100%;" v-cloak>
    <view-box ref="viewBox" :body-padding-bottom="($route.meta.tabbar===false)?'0':''">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- 底栏菜单 -->
      <tabbar slot="bottom" v-if="MainMenu&&MainMenu!=''&&$route.meta.tabbar!=false">
        <tabbar-item v-for="(item,index) in MainMenu"
                     :key="index"
                     :link="item.link"
                     :badge="(item.badge&&item.badge!='')?badge:''"
                     :show-dot="item.showDot"
                     :selected="active() === item.link">
          <i class="iconfont" :class="item.icon" slot="icon"></i>
          <span slot="label">{{item.name}}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script type="es6">
  import {getMessageCount} from '@/api/api';
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        badge: "",
        MainMenu: []
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.vux.isLogin
      })
    },
    methods: {
      //设置底栏高亮项
      active() {
        return '/' + this.$route.path.split("/")[1];
      },
      //  获取消息数量
      getMessageCounts(num) {
        getMessageCount().then((res) => {
          if (res.data) {
            let old_count = localStorage.getItem("OldMessageCounts");
            let badges = res.data.message_count;
            if (badges > 0 && this.$route.path != "login") {
              //首次加载时弹窗
              if (!sessionStorage.getItem("first") || sessionStorage.getItem("first") == "") {
                this.toast("您有" + parseInt(badges) + "条新的消息，请及时查看！", "text", "20em");
                sessionStorage.setItem("first", "1");
              }
              //判断获取新消息条数
              this.badge = badges;
              if (old_count && old_count != "" && badges > old_count) {
                this.toast("您有" + (parseInt(badges) - parseInt(old_count)) + "条新的消息，请及时查看！", "text", "20em");
              }
            } else {
              this.badge = "";
            }
            //将获取到的消息存入localStorage
            localStorage.setItem("OldMessageCounts", res.data.message_count);
          }
        });
      }
    },
    mounted() {
      let _this = this;
      //加载消息数量
      _this.getMessageCounts();
      //使用定时器加载消息数量
      window.timer = setInterval(function () {
        _this.getMessageCounts();
      }, 60000);
      //从localStorage中获取菜单
      this.MainMenu = JSON.parse(localStorage.getItem("MainMenu"));
    },
    destroyed() {
      //判断当前不是登录状态时清除定时器
      if (this.isLogin === false) {
        window.clearInterval(window.timer);
      }
    }
  }
</script>
