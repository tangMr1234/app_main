<template>
  <div class="login">
    <!--:style="'height:100vh;background:url('+LoginBg+')'"-->
    <blur :blur-amount=0 :url="LoginBg" style="height: 100vh;">
      <p class="center" style="margin: 0 20px;">
        <flexbox align="center" style="min-height: 100vh;">
          <flexbox-item>
            <!-- 圆角Logo -->
            <div class="center"><img :src="Logo"></div>
            <div>
              <!-- 输入框组 -->
              <group :gutter="50">
                <x-input title="账户:" :placeholder="userNamePlaceholder" novalidate v-model="userNameValue"></x-input>
                <x-input title="密码:" :placeholder="passwordPlaceholder" novalidate v-model="passWordValue"
                         type="password"></x-input>
              </group>
              <!-- 登录按钮 -->
              <box gap="30px 0">
                <x-button @click.native="submitValid" :gradients="['#409eff','#409eff']" :show-loading="Loading"
                          :disabled="disabled">登录平台
                </x-button>
              </box>
              <!-- 分割线 -->
              <divider>{{VerinFormation}}</divider>
            </div>
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
        LoginBg: "http://pic.qiantucdn.com/58pic/28/54/39/76358PIC8iekK33fi2JSF_PIC2018.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x3040a0a0",
        VerinFormation: "冷王智能科技 V3.0.1"
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
  /*.login * {*/
  /*color: #F8F8FF;*/
  /*}*/

  /*.login .weui-cells {*/
  /*background: transparent !important;*/
  /*}*/

  /*.login input::-webkit-input-placeholder {*/
  /*color: #F8F8FF;*/
  /*}*/

  /*.login .weui-icon-clear {*/
  /*color: #708090;*/
  /*}*/

  /*.login .weui-input {*/
  /*padding: 4px 0;*/
  /*}*/
</style>

<style scoped>
  .login .center {
    text-align: center;
    -webkit-box-reflect: below 0 -webkit-linear-gradient(top, rgba(250, 250, 250, 0), rgba(250, 250, 250, .0) 30%, rgba(250, 250, 250, 0.3));
    box-reflect: below 0 -webkit-linear-gradient(top, rgba(250, 250, 250, 0), rgba(250, 250, 250, .0) 30%, rgba(250, 250, 250, 0.3));
  }

  .login .center img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 4px solid #ececec;
  }
</style>
