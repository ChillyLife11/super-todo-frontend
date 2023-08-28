import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import Done from '@/pages/Done.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/done',
		name: 'done',
		component: Done,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;