<template>
	<aside class="flex flex-col bg-white shadow-lg h-screen">
		<div class="flex p-8 items-center border-b-2 mb-4">
			{{ data.name }}
		</div>
		<nav>
			<ul>
				<li v-for="(route, i) in routes" :key="i">
					<router-link
						:to="{ name: route.name }"
						class="flex items-center py-3 px-10 border-l-4 hover:bg-blue-50 hover:border-blue-50"
						:class="{ 'border-blue-600 bg-blue-50 hover:border-blue-600': $route.name === route.name }"
					>
						<img :src="route.icon" alt="" class="mr-2"/>

						{{ route.text }}
					</router-link>
				</li>
				<li v-if='isLoggedIn'>
					<button
						type='button'
						class='flex items-center py-3 px-10 border-l-4 text-red-500'
						@click='logout'
					>
						Logout
					</button>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import HomeIcon from '@/assets/home.svg';
import DoneIcon from '@/assets/done.svg';
import LoginIcon from '@/assets/user.svg';
import avatarImg from '@/assets/avatar.png';

export default {
	data() {
		return {
			avatarImg,
			routes: [],
		};
	},
	computed: {
		...mapGetters('user', ['isLoggedIn', 'data'])
	},
	methods: {
		async logout() {
			if (await this.$store.dispatch('user/logout')) {
				this.$router.push('/login');
			}
		}
	},
	watch: {
		isLoggedIn(newVal, oldVal) {
			if (this.isLoggedIn) {
				this.routes = [
					{
						icon: HomeIcon,
						name: 'home',
						text: 'Home',
					},
					{
						icon: DoneIcon,
						name: 'done',
						text: 'Done',
					},
				];
			} else  {
				this.routes = [
					{
						icon: LoginIcon,
						name: 'login',
						text: 'Login',
					},
				];
			}
		}
	},
	created() {
		if (this.isLoggedIn) {
			this.routes = [
				{
					icon: HomeIcon,
					name: 'home',
					text: 'Home',
				},
				{
					icon: DoneIcon,
					name: 'done',
					text: 'Done',
				},
			];
		} else  {
			this.routes = [
				{
					icon: LoginIcon,
					name: 'login',
					text: 'Login',
				},
			];
		}
	}
};
</script>

<style module></style>
