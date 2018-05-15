<template>
  <div style="height:100%;overflow-x: hidden;" v-if="userData">
    <!-- 模糊背景图 -->
    <div v-if="userData.header"
         :style="'background:url('+userData.header.background+');background-size:100% 100%;width:100%;padding: 20px 0;'">
      <p class="center"><img :src="userData.header.avatar"></p>
      <p class="center" v-html="userData.header.title"></p>
    </div>
    <!-- 列表 -->
    <group>
      <cell v-for="(data, index) in userData.info" v-if="userData.info" :key="index" :title="data.label"
            :is-link="data.is_link" @click.native="open(data.url, data.frameurl, data.is_link)" :value="data.value">
        <div :style="'color:'+data.icon_color" slot="icon"><i class="iconfont" :class="data.icon"
                                                              style="display:block;font-size: 26px;margin-right:5px;"></i>
        </div>
      </cell>
    </group>
    <!-- 退出登录按钮 -->
    <group :style="'opacity:'+ is_show">
      <cell title="退出登录" @click.native="logOut">
        <i slot="icon" class="iconfont icon-dengchu"
           style="display:block;font-size: 22px;margin:0 5px 0 3px;color:#409eff;"></i>
      </cell>
    </group>
    <br>
  </div>
</template>

<script type="es6">
  import {Cell, Group} from 'vux'
  import {getUserData} from '@/api/api';

  export default {
    components: {
      Group, Cell
    },
    data() {
      return {
        userData: [],
        is_show: "0",
      }
    },
    methods: {
      //登出
      logOut() {
        this.alert("提示", "退出成功，正在跳转！", "知道了", this.onHide); //使用main中的全局方法调用弹窗
        setTimeout(() => {
          this.$vux.alert.hide();
          window.location.href = "#/login";
        }, 1000);
      },
      //弹出框隐藏事件
      onHide() {
        this.$router.push("/login");
      },
      //  页面跳转
      open(Url, frameUrl, isLink) {
        if (isLink && isLink === true) {
          if (Url && Url != "" && Url != "javascript:;") {
            if (frameUrl && frameUrl != "" && frameUrl != "javascript:;") {
              this.$router.push({path: '/' + Url, query: {name: frameUrl}});
            } else {
              this.$router.push({path: Url});
            }
          } else {
            this.confirm("提示", "好像要去的页面地址丢失了！", "刷新试试", this.reload);
          }
        }
      },
      //获取我的页面数据
      get_UserData() {
        let _this = this;
        getUserData().then((res) => {
          if (res.data) {
            this.userData = res.data;
          } else {
            _this.confirm("提示", "数据加载失败！", "重新登录", _this.location); //使用main中的全局方法调用弹窗
          }
          _this.is_show = "1";
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }).catch(function (error) {
          _this.confirm("提示", error.message, "重新登录", _this.location); //使用main中的全局方法调用弹窗
          _this.is_show = "1";
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        });
      },
    },
    mounted() {
      this.get_UserData();
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    }
  }
</script>

<style scoped>
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
  }

  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>
