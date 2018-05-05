<template>
  <div class="login">
    <blur :blur-amount=40 :url="LoginBg" style="height: 100vh;">
      <p class="center" style="margin: 0 20px;">
        <flexbox align="center" style="min-height: 100vh;">
          <flexbox-item>
            <!-- 圆角Logo -->
            <div class="center"><img :src="Logo"></div>
            <br>
            <div>
              <!-- 输入框组 -->
              <group>
                <x-input title="账户:" :placeholder="userNamePlaceholder" novalidate v-model="userNameValue"></x-input>
                <x-input title="密码:" :placeholder="passwordPlaceholder" novalidate v-model="passWordValue"
                         type="password"></x-input>
              </group>
              <br>
              <!-- 登录按钮 -->
              <div style="padding:15px 0;">
                <x-button @click.native="submitValid" type="primary" :show-loading="Loading" :disabled="disabled">登录
                </x-button>
              </div>
              <!-- 分割线 -->
              <divider style="color:#fff;">{{VerinFormation}}</divider>
            </div>
            <br>
          </flexbox-item>
        </flexbox>
      </p>
    </blur>
  </div>
</template>

<script type="es6">
  import {getTabbar} from '@/api/api';

  export default {
    data() {
      return {
        Loading: false,  //按钮部分loading
        disabled: false, //设置按钮不可点击
        userNamePlaceholder: "请输入用户名",
        userNameValue: '', //用户名
        passwordPlaceholder: "请输入密码",
        passWordValue: '', //密码
        Logo: "http://appdev.pujiajia.com/static/mobile/images/app_ico_touch.png",
        LoginBg: "https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg",
        VerinFormation: "冷王智能科技 V1.0.1"
      }
    },
    methods: {
      //提交登录
      submitValid() {
        this.Loading = true;
        this.disabled = true;
        if (this.userNameValue != "" && this.passWordValue != "" && this.userNameValue == "123123" && this.passWordValue == "123456") {
          this.getMenu(this.userNameValue);
        } else {
          this.alert("提示", "请输入正确的用户名和密码！", "知道了", ''); //使用main中的全局方法调用弹窗
          this.Loading = false;
          this.disabled = false;
        }
      },
      //  获取tabbar菜单
      getMenu(user) {
        let _this = this;
        getTabbar().then((res) => {
          if (res.data) {
            localStorage.setItem("User", user); //保存账号并填充到登陆框
            let MainMenu = JSON.stringify(res.data);
            localStorage.setItem("MainMenu", MainMenu);
			this.$router.push('/index');
          } else {
            _this.confirm("提示", "登录失败，请重新登录！", "重新登录", _this.location); //使用main中的全局方法调用弹窗
            _this.Loading = false;
            _this.disabled = false;
          }
        }).catch(function (error) {
          _this.confirm("提示", error.message, "重新登录", _this.location); //使用main中的全局方法调用弹窗
          _this.Loading = false;
          _this.disabled = false;
        });
      },
      //菜单加载失败，回到首页
      location() {
        this.$route.push("/login");
      }
    },
    mounted() {
      //记住登陆账号
      let user = localStorage.getItem("User");
      if (user && user != "" && user != "null" && user != undefined) {
        this.userNameValue = user;
      }
      this.loadingRemove(); // 使用main中的全局方法关闭loading
    }
  }
</script>

<style>
  .login .weui-cells {
    background: transparent !important;
  }

  .login input::-webkit-input-placeholder {
    color: #F8F8FF;
  }

  .login .weui-icon-clear {
    color: #708090;
  }

  .login .weui-cell {
    padding: 0 15px;
  }

  .login .weui-input {
    padding: 10px 0;
  }
</style>

<style scoped>
  .center {
    text-align: center;
    color: #fff;
    font-size: 18px;
    color: #000;
  }

  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>
