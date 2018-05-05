<template>
  <div style="height: 100%;">
    <pull-to :top-load-method="refresh" @infinite-scroll="infinite" @top-state-change="stateChange">
      <!-- 下拉刷新 -->
      <template slot="top-block" slot-scope="props">
        <div class="top-load-wrapper">
          <svg class="icon"
               :class="{
						'icon-arrow': props.state === 'trigger',
						'icon-loading': props.state === 'loading'
					}"
               aria-hidden="true">
            <use :xlink:href="iconLink"></use>
          </svg>
          {{ props.stateText }}
        </div>
      </template>

      <!-- 面板列表 -->
      <panel :list="list" :type="type" @on-img-error="onImgError"></panel>
      <!-- 加载更多 -->
      <load-more :show-loading="infiniteLoading" :tip="infiniteTip"></load-more>

    </pull-to>
  </div>
</template>

<script type="es6">
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      PullTo
    },
    data() {
      return {
        type: '1',
        list: [],
        infiniteLoading: true,
        infiniteTip: "正在加载",
        iconLink: '', //下拉刷新的状态
      }
    },
    mounted() {
      this.ysData();
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    },
    methods: {
      onImgError(item, $event) {
        //console.log(item, $event)
      },
      //上拉操作
      infinite(done) {
        if (this.bottom >= 120) {
          this.infiniteLoading = false;
          this.infiniteTip = "暂无更多";
          return false;
        }
        let start = this.bottom + 1
        for (let i = start; i < start + 10; i++) {
          this.ajaData(i);
        }
        this.bottom = this.bottom + 10;
        setTimeout(() => {
          //this.infiniteLoading = false;
          //this.infiniteTip = "暂无更多";
        }, 600)
      },
      //初始化数据
      ysData() {
        this.list = [];
        for (let i = 1; i <= 10; i++) {
          this.ajaData(i);
        }
        this.bottom = 10
      },
      //上拉加载数据
      ajaData(i) {
        var obj = {
          src: 'https://o5omsejde.qnssl.com/demo/test2.jpg',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题' + i,
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/MessageHome/details?id=' + i
        };
        this.list.push(obj);
      },
      //下拉刷新
      refresh(loaded) {
        setTimeout(() => {
          this.infiniteLoading = true;
          this.infiniteTip = "正在加载";
          this.ysData();
          loaded('done');
        }, 600);
      },
      //下拉时的顶部状态改变
      stateChange(state) {
        if (state === 'pull' || state === 'trigger') {
          this.iconLink = '#icon-arrow-bottom';
        } else if (state === 'loading') {
          this.iconLink = '#icon-loading';
        } else if (state === 'loaded-done') {
          this.iconLink = '#icon-finish';
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .top-load-wrapper {
    line-height: 50px;
    text-align: center;
  }

  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }

  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
