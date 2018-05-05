<template>
  <div style="height: 100%;">
    <pull-to>
      <group>
        <cell v-for="(data, index) in moreData.info" v-if="moreData.info" :key="index" :title="data.label"
              :is-link="data.is_link" @click.native="open(data.url, data.frameurl, data.is_link)" :value="data.value">
          <div :style="'color:'+data.icon_color" slot="icon"><i class="iconfont" :class="data.icon"
                                                                style="display:block;font-size: 26px;margin-right:5px;"></i>
          </div>
        </cell>
      </group>
    </pull-to>
  </div>
</template>

<script type="es6">
  import PullTo from 'vue-pull-to'
  import {getMoreData} from '@/api/api';

  export default {
    components: {
      PullTo
    },
    data() {
      return {
        moreData: []
      }
    },
    methods: {
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
      //获取更多页面数据
      get_MoreData() {
        let _this = this;
        getMoreData().then((res) => {
          if (res.data) {
            this.moreData = res.data;
          } else {
            _this.confirm("提示", "登陆失败，请重新登陆！", "刷新试试", _this.location); //使用main中的全局方法调用弹窗
          }
          _this.loadingRemove(); //  使用main中的全局方法关闭loading
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.location); //使用main中的全局方法调用弹窗
		  _this.loadingRemove(); //  使用main中的全局方法关闭loading
        });
      }
    },
    mounted() {
	  this.get_MoreData();
    },
	activated(){
	  this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
	}
  }
</script>

<style>
  .vux-header-back {
    color: #fff !important;
  }

  .vux-header .vux-header-left .left-arrow:before {
    border-color: #fff !important;
  }
</style>
