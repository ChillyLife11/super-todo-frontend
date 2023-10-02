<template>
	<div class="flex text-stone-600">
		<div class="w-80">
			<Sidebar />
		</div>
		<div class="grow p-8 max-h-screen overflow-auto">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Sidebar from '@/components/templates/Sidebar.vue';

export default {
	components: {
		Sidebar
	},
	created() {
		if (localStorage.getItem('refresh_token')) {
			this.$store.commit('user/setLoggedInStatus', true);
		}
	}
};
</script>

<style>
.main {
	height: 100vh;
	display: flex;
	justify-content: center;
}
</style>
