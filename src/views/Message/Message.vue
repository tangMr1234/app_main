<template>
  <div style="height: 100%;">
    <tab>
      <tab-item v-for="(data, index) in tab" :key="index" :selected="data.id==1">{{data.label}}</tab-item>
    </tab>
    <div style="height:calc(100% - 50px);overflow:hidden;">
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
        <panel :list="list.data" :type="list.type"></panel>
        <!-- 加载更多 -->
        <load-more :show-loading="infiniteLoading" :tip="infiniteTip"></load-more>
      </pull-to>
    </div>
  </div>
</template>

<script type="es6">
  import PullTo from 'vue-pull-to'
  import {getMessage} from '@/api/api';

  export default {
    components: {PullTo},
    data() {
      return {
        tab: [{id: "1", label: '未处理报警'}, {id: "2", label: '已处理报警'}, {id: "3", label: '未读消息'}, {id: "4", label: '已读消息'}],
        list: [],
        infiniteLoading: true,
        infiniteTip: "正在加载",
        iconLink: '', //下拉刷新的状态
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      //数据加载
      loadData() {
        let _this = this;
        getMessage("").then((res) => {
          _this.list = res.data;
          if (_this.list.data.length < 10) {
            _this.loadNoData_State();
          }
        }).catch(function (error) {
          _this.confirm("提示", "数据加载出错，请尝试刷新或者联系管理员！", "刷新试试");
        });
        this.loadingRemove(); //  使用main中的全局方法关闭loading
      },
      //加载后无数据状态
      loadNoData_State() {
        this.infiniteLoading = false;
        this.infiniteTip = "暂无更多";
      },
      //加载后有数据状态
      loadData_State() {
        this.infiniteLoading = true;
        this.infiniteTip = "正在加载";
      },
      //上拉操作
      infinite(loaded) {
        if (this.bottom >= 30) {
          this.loadNoData_State();
          return false;
        }
        let start = this.bottom + 1
        for (let i = start; i < start + 10; i++) {
          this.ajaData(i);
        }
        this.bottom = this.bottom + 10;
        setTimeout(() => {
          //this.loadNoData_State();
        }, 600)
      },
      //下拉刷新
      refresh(loaded) {
        setTimeout(() => {
          this.loadData_State();
          this.loadData();
          loaded('done');
        }, 300);
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

  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
