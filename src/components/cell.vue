<template>
	<div>
		<!-- 列表 -->
		<div v-for="(item, index) in $router.options.routes" :key="index" v-if="!item.hidden">
			<group v-for="(dataTab, index) in item.children" :key="index" v-if="dataTab.NewRouter&&dataTab.NewRouter==loadRoute()&&!dataTab.hidden">
				<cell v-for="(data, index) in dataTab.children" :key="index" v-if="!data.hidden" :title="data.name" :link="data.path" :value="data.meta.value">
					<div :style="'color:'+data.meta.color" slot="icon" ><i class="iconfont" :class="data.meta.icon" style="display:block;font-size: 26px;margin-right:5px;"></i></div>
				</cell>
			</group>
		</div>
	</div>
</template>

<script type="es6">
import { CellFormPreview, Cell, Group } from 'vux'
import { getCellData } from '@/api/api';
export default {
	components: {
		CellFormPreview, Cell, Group
	},
	data () {
		return {

		}
	},
	methods: {
		loadRoute(){
			//加载时页面验证事件
			return this.$route.path.split("/")[1];
		}
	},
	mounted() {
		//初始化请求数据
		let para = this.$route.path;
		getCellData(para).then((res) => {
			console.log(res);
		});
    }
}
</script>

<style>

</style>
