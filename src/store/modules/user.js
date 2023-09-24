import {API_URL} from '@/constants.js';

export default {
    namespaced: true,

	state: {
		isLoggedIn: false,
		data: {}
	},
	getters: {
		isLoggedIn: state => state.isLoggedIn,
		data: state => state.data
	},
	mutations: {
		setLoggedInStatus(state, status) {
			state.isLoggedIn = status;
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
				return true;
			}
		},

		async
	}
}