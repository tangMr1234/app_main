<template>
  <div style="height:100%;" class="warpMain index" v-cloak>
    <!-- banner -->
    <div
      v-if="Index_data.ads&&Index_data.ads.top_slider&&Index_data.ads.top_slider.content&&Index_data.ads.top_slider.content!=''">
      <swiper :options="swiperOptionBanner" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in Index_data.ads.top_slider.content" :key="index"
                      @click.native="onItemClick(item.url, item.frameurl)">
          <img :src="item.img" width="100%" style="display:block;">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 单位名 -->
    <div v-if="Index_data.info&&Index_data.info!=''">
      <group gutter="0">
        <cell>
          <div slot="title">{{Index_data.info.unit_name}}<span
            style="float:right;">{{Index_data.info.user_name}}</span>
          </div>
        </cell>
      </group>
    </div>
    <!-- 广告位1 -->
    <div class="ads" v-if="Index_data.ads&&Index_data.ads.ad1" v-html="Index_data.ads.ad1.content"
         @click="onItemClick(Index_data.ads.ad1.url, Index_data.ads.ad1.frameurl)"></div>
    <!-- 常用APP按钮区域 -->
    <div v-if="Index_data.apps&&Index_data.apps.frequently&&Index_data.apps.frequently.grid!=''">
      <group
        :title="Index_data.apps.frequently.name">
        <swiper :options="swiperOptionButton" ref="mySwiperButton" style="padding-bottom:35px;">
          <!-- slides -->
          <swiper-slide class="black" v-for="(item,index) in Index_data.apps.frequently.grid" :key="index">
            <flexbox :gutter="0" wrap="wrap">
              <flexbox-item :span="1/5" v-for="(obj, index) in item" :key="index"
                            @click.native="onItemClick(obj.url, obj.frameurl)">
                <div class="flex-demo app_badge"><img slot="icon" :src="obj.icon">
                  <div class="flex-demo">{{obj.label}}</div>
                  <div v-if="obj.warning" class="apps_badge">
                    <badge v-if="obj.warning=='dot'" class="dot"></badge>
                    <badge v-else :text="obj.warning" class="number"></badge>
                  </div>
                </div>
              </flexbox-item>
            </flexbox>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </group>
    </div>
    <!-- 上下轮播广告位 快讯 -->
    <div v-if="Index_data.ads&&Index_data.ads.marquee">
      <group gutter="0">
        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="3/10">
            <div class="flex-demo ads" style="height:40px;line-height:40px;"
                 v-html="Index_data.ads.marquee.title"></div>
          </flexbox-item>
          <flexbox-item :span="6/10">
            <marquee :interval=3500>
              <marquee-item v-for="(item,index) in Index_data.ads.marquee.content" :key="index"
                            @click.native="onItemClick(item.url, item.frameurl)" :item-height="40"
                            class="align-middle whiteSpace" v-html="item.content"></marquee-item>
            </marquee>
          </flexbox-item>
          <flexbox-item :span="1/10" style="text-align:center;">
            <i class="iconfont icon-youjiantou" style="color:#999;"></i>
          </flexbox-item>
        </flexbox>
      </group>
    </div>
    <!-- APP按钮区域 -->
    <div v-if="Index_data.apps&&Index_data.apps.grid&&Index_data.grid!=''">
      <group :title="item.name" v-for="(item,index) in Index_data.apps.grid" :key="index">
        <flexbox :gutter="0" wrap="wrap" style="padding:10px 5px;">
          <flexbox-item :span="1/5" v-for="(obj, index) in item.grid" :key="index"
                        @click.native="onItemClick(obj.url, obj.frameurl)">
            <div class="flex-demo app_badge"><img slot="icon" :src="obj.icon">{{obj.label}}
              <div v-if="obj.warning" class="apps_badge">
                <badge v-if="obj.warning=='dot'" class="dot"></badge>
                <badge v-else :text="obj.warning" class="number"></badge>
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </group>
    </div>
    <!-- 广告位2 -->
    <div class="ads" v-if="Index_data.ads&&Index_data.ads.ad2" v-html="Index_data.ads.ad2.content"
         @click="onItemClick(Index_data.ads.ad2.url, Index_data.ads.ad2.frameurl)"></div>
    <!-- 带简介的列表 -->
    <div v-if="Index_data.apps&&Index_data.apps.list&&Index_data.apps.list.grid!=''">
      <group :title="Index_data.apps.list.name">
        <panel gutter="0" :list="Index_data.apps.list.grid" :type="Index_data.apps.list.type"
               @on-click-item="panelLocation"></panel>
      </group>
    </div>
    <!-- 广告3 -->
    <div class="ads" v-if="Index_data.ads&&Index_data.ads.ad3" v-html="Index_data.ads.ad3.content"
         @click="onItemClick(Index_data.ads.ad3.url, Index_data.ads.ad3.frameurl)"></div>
  </div>
</template>

<script type="es6">
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getIndexData} from '@/api/api';

  export default {
    components: {
      swiper, swiperSlide
    },
    data() {
      return {
        //初始化首页数据
        Index_data: {},
        //banner轮播初始化,使用swiper4插件,具体Api可查看手册
        swiperOptionBanner: {
          watchOverflow: true,//因为仅有1个slide，swiper无效
          preloadImages: false,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false //手动滑动或其他操作后轮播能继续运行
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        //常用APP滑动初始化
        swiperOptionButton: {
          watchOverflow: true,//因为仅有1个slide，swiper无效
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
          resistanceRatio: 0 //禁止左右回弹的效果
        }
      }
    },
    methods: {
      //pannel列表部分跳转
      panelLocation(item) {
        this.onItemClick(item.link, item.frameurl);
      },
      //点击事件，使用vue query传递页面参数
      onItemClick(Url, frameUrl) {
        if (Url && Url != "" && Url != "javascript:;") {
          if (frameUrl && frameUrl != "" && frameUrl != "javascript:;") {
            this.$router.push({path: '/' + Url, query: {name: frameUrl}});
          } else {
            this.$router.push({path: '/' + Url});
          }
        } else {
          // this.confirm("提示", "好像要去的页面地址丢失了！", "刷新试试", this.reload);
          this.confirm("提示", "功能暂未开放！", "确定", this.reload);
        }
      },
      //远程加载首页数据
      getIndexData() {
        //使用api中的getIndexData获取首页数据
        let _this = this;
        getIndexData().then((res) => {
          if (res.data) {
            _this.Index_data = res.data;
          } else {
            _this.confirm("提示", "数据加载出错，请尝试刷新或者联系管理员！", "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          }
          _this.loadingRemove(); //  使用main中的全局方法关闭loading
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          _this.loadingRemove(); //  使用main中的全局方法关闭loading
        });
      },
    },
    // 页面渲染后执行的钩子
    mounted() {
      this.getIndexData();
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    },
    //  销毁组件
    beforeDestroy() {
      // this.$refs.mySwiper.$destroy(false);
      // this.$refs.mySwiperButton.$destroy(false);
    }
  }
</script>
<style>
  .index .flex-demo img {
    width: 100%;
  }

  .ads img {
    display: block;
  }

  /* APP部分小红点位置 */
  .app_badge {
    position: relative;
  }

  .apps_badge .dot, .apps_badge .number {
    position: absolute;
  }

  .apps_badge .dot {
    top: 12%;
    left: 68%;
  }

  .apps_badge .number {
    top: 10%;
    left: 60%;
  }
</style>
<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';

  [v-cloak] {
    display: none;
  }

  .flex-demo {
    text-align: center;
    background-clip: padding-box;
    color: #686868;
    font-size: .75rem;
    font-weight: 500;
  }

  .whiteSpace {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #444;
  }
</style>
