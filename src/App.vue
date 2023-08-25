<template>
	<div class="flex text-stone-600">
		<div class="w-80">
			<Sidebar/>
		</div>
		<div class="grow p-8 max-h-screen overflow-auto">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
	components: {
		Sidebar
	},
};
</script>

<style>
.main {
	height: 100vh;
	display: flex;
	justify-content: center;
}
</style>
