<template>
  <div class="mainFrameParent">
    <iframe :src="frameUrl" frameborder="0" marginheight="0" marginwidth="0" height="100%" scrolling="no"
            class="mainFrame" @load="load_Frame" :style="'visibility:'+ is_show"></iframe>
    <div @click="$router.push('/')" class="backIndex"><i class="iconfont icon-shouye" style="font-size:24px;"></i>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        frameUrl: '', //frame的url
        is_show: "hidden", //元素占位显隐
      }
    },
    methods: {
      //返回首页的方法
      goBack() {
        this.$nextTick(function () {
          this.$router.push("/index");
        })
      },
      //判断iframe是否加载完成，并决定是否去除遮罩
      load_Frame() {
        if (this.frameUrl != "" && this.frameUrl != undefined && this.frameUrl != null) {
          this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
          this.is_show = "visible";
        }
      }
    },
    mounted() {
      //监听postMessage变化来调用方法
      let _that = this;
      window.addEventListener('message', function (e) {
        if (e.data === "closeLwFrame") {
          _that.goBack();
        }
      });
    },
    activated() {
      //获取iframe加载页面的url
      this.frameUrl = this.$route.query.name;
    },
    //当前页面被销毁时删除session，让试用的APP能重新提醒
    beforeDestroy() {
      sessionStorage.removeItem('warn');
    }
  }
</script>

<style scoped>
  .mainFrameParent {
    height: 100%;
    overflow: hidden;
  }

  .mainFrame {
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    min-width: 100%;
    *width: 100%;
    width: 1px;
  }

  .backIndex {
    position: fixed;
    bottom: 20%;
    opacity: 0.8;
    display: block;
    height: 32px;
    line-height: 32px;
    width: 35px;
    text-align: center;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: #0096e4;
    color: #fff;
    padding-right: 3px;
    z-index: 999;
  }
</style>
