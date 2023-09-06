import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import Done from '@/pages/Done.vue';
import Login from '@/pages/Login.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: '/done',
		name: 'done',
		component: Done,
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = localStorage.getItem('access_token') !== null;


	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!isAuthenticated) {
			next('/login'); // Redirect to the login page
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;