<template>
  <div style="height:100%;">
    <pull-to>
      <div style="padding: 66px 0;">
        <flexbox orient="vertical" v-if="$route.meta.type==='code'">
          <flexbox-item>
            <div class="flex-demo"><img src="@/assets/coldchain56.png" width="200"></div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">智慧冷链</div>
          </flexbox-item>
        </flexbox>
        <flexbox orient="vertical" v-else>
          <flexbox-item>
            <div class="flex-demo"><img src="@/assets/bq-logo.png" width="200"></div>
          </flexbox-item>
          <flexbox-item v-for="(data, index) in list" :key="index">
            <div class="flex-demo">{{data.label}}：{{data.value}}</div>
          </flexbox-item>
        </flexbox>
      </div>
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
        list: [
          {
            label: '冷王智能科技有限公司',
            value: '版权所有'
          }, {
            label: '当前版本',
            value: '1.0.0'
          }, {
            label: '发布时间',
            value: '2018-03-06'
          }
        ]
      }
    },
    methods: {},
    mounted() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    },
	activated(){
	  this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
	}
  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';

  .flex-demo {
    text-align: center;
  }
</style>
