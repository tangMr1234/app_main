<template>
  <div style="height:100%;">
    <div style="background-color: #f8f8f8;width:100%;" ref="textareaHeight">
      <!-- 输入组 -->
      <group>
        <x-input placeholder="标题"></x-input>
        <x-textarea :max="200" name="description" placeholder="请输入反馈意见，我们会尽快为您处理哦"></x-textarea>
      </group>
      <!-- 提交按钮 -->
      <box gap="20px 10px 10px 10px">
        <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="submit">提交</x-button>
      </box>
      <divider>历史建议（只展示最近10条）</divider>
    </div>
    <!-- 历史建议 -->
    <div :style="'height:'+scrollHeight+'px;overflow: hidden;'">
      <pull-to>
        <group gutter="0">
          <template v-for="(data, index) in proposal">
            <cell
              :title="data.label+index"
              is-link
              :border-intent="false"
              :arrow-direction="data.showContent ? 'up' : 'down'"
              @click.native="show(index)"></cell>
            <p class="slide sub-item" :class="data.showContent?'animate':''">{{data.value}}</p>
          </template>
        </group>
      </pull-to>
    </div>
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
        scrollHeight: 0,
        proposal: [
          {
            label: "建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "无标题",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "建议建议建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          },
          {
            label: "建议",
            value: "啦啦啦，这是一条建议，啦啦啦啦啦啦啦啦啦",
            showContent: false
          }
        ]
      }
    },
    methods: {
      setscrollHeight() {
        var height = document.documentElement.clientHeight;
        var heightCss = this.$refs.textareaHeight.offsetHeight+65;
        this.scrollHeight = height - heightCss;
      },
      show(index) {
        for (var i = 0; i < this.proposal.length; i++) {
          if (this.proposal[index].showContent == false) {
            this.proposal[i].showContent = false;
          }
        }
        this.proposal[index].showContent = !this.proposal[index].showContent;
      },
      submit() {
        alert("提交成功");
      }
    },
    mounted() {
      this.setscrollHeight();
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    },
	activated(){
	  this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
	}
  }
</script>
<style scoped>
  .sub-item {
    color: #888;
  }

  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }

  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
</style>
