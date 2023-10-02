import {API_URL} from '@/constants.js';
import router from '@/router.js';

export default {
    namespaced: true,

	state: {
		isLoggedIn: false,
		data: localStorage.getItem('access_token') !== null ? decodeBase64Token(localStorage.getItem('access_token')) : {}
	},
	getters: {
		isLoggedIn: state => state.isLoggedIn,
		data: state => state.data
	},
	mutations: {
		setLoggedInStatus(state, status) {
			state.isLoggedIn = status;
		},
		setUserData(state, data) {
			state.data = data;
		}
	},
	actions: {
		async login({ commit }, userData) {
			const response = await fetch(API_URL + '/users/login', {
				method: 'POST',
				body: JSON.stringify(userData)
			});

			if (response.ok) {
				const { access_token, refresh_token } = await response.json();
				localStorage.setItem('access_token', access_token);
				localStorage.setItem('refresh_token', refresh_token);

				commit('setLoggedInStatus', true);
				commit('setUserData', decodeBase64Token(access_token));
				return true;
			}
			commit('setLoggedInStatus', false);
			return false;
		},
		async refresh({ commit }) {
			const response = await fetch(API_URL + '/users/refresh', {
				method: 'POST',
				body: JSON.stringify({token: localStorage.getItem('refresh_token')})
			});

			if (!response.ok) {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				commit('setLoggedInStatus', false);
				commit('setUserData', {});

				router.push('/login');
				return;
			}

			const { access_token, refresh_token } = await response.json();
			localStorage.setItem('access_token', access_token);
			localStorage.setItem('refresh_token', refresh_token);
			
			commit('setLoggedInStatus', true);
		},
		async logout({ commit }) {
			const response = await fetch(API_URL + '/users/logout', {
				method: 'POST',
				body: JSON.stringify({token: localStorage.getItem('refresh_token')})
			});

			if (!response.ok) {
				return false;
			}

			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			commit('setLoggedInStatus', false);
			commit('setUserData', {});
			return true;
		}
	}
}

function decodeBase64Token(token) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const decodedJson = decodeURIComponent(window.atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(decodedJson);
}