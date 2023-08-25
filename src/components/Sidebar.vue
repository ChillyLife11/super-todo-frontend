<template>
	<aside class="flex flex-col bg-white shadow-lg h-screen">
		<div class="flex p-8 items-center border-b-2 mb-4">
			<Avatar
				:moreStyles="{ marginRight: '10px' }"
				:image="avatarImg"
			></Avatar>
			Harut001
		</div>
		<nav>
			<ul>
				<li v-for="(route, i) in routes" :key="i">
					<router-link
						:to="{ name: route.name }"
						class="flex items-center py-3 px-10 border-l-4 hover:bg-blue-50 hover:border-blue-50"
						exact-active-class="border-blue-600 bg-blue-50 hover:border-blue-600"
					>
						<img :src="route.icon" alt="" class="mr-2" />

						{{ route.text }}
					</router-link>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
import Avatar from '@/components/Avatar.vue';

import HomeIcon from '@/assets/home.svg';
import avatarImg from '@/assets/avatar.png';

export default {
	components: {
		Avatar,
	},
	data() {
		return {
			avatarImg,
			routes: [
				{
					icon: HomeIcon,
					name: 'home',
					text: 'Home',
				},
				{
					icon: HomeIcon,
					name: 'about',
					text: 'About',
				},
			],
		};
	},
};
</script>

<style module></style>
