import {API_URL} from '@/constants.js';

export default {
    namespaced: true,
    state: {
        todos: []
    },
    getters: {
        todos: state => state.todos
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },
        filterTodosByUndone(state) {
            state.todos = state.todos.filter(todo => {
                return todo.done !== true;
            });
        },
        changeName(state, payload) {
            const {i, name} = payload;

            state.todos[i].name = name;
        },
        addTodo(state, newTodo) {
            state.todos.push(newTodo);
        },
        deleteTodo(state, i) {
            state.todos.splice(i, 1);
        }
    },
    actions: {
        async loadTodos({commit, rootState}) {
            const todoResponse = await fetch(API_URL + '/todos?done=false', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            });

            let todos = [];

            if (todoResponse.ok) {
                console.log('ok');
                todos = await todoResponse.json();
            } else  {
                const refreshResponse = await fetch(API_URL + '/users/refresh', {
                    method: 'POST',
                    body: JSON.stringify({token: localStorage.getItem('refresh_token')})
                });

                if (!refreshResponse.ok) {
                    console.log('refresh error');
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');

                    return false;
                }
                const { access_token, refresh_token } = await refreshResponse.json();

				localStorage.setItem('access_token', access_token);
				localStorage.setItem('refresh_token', refresh_token);

                const todoResponse = await fetch(API_URL + '/todos?done=false', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                });

                todos = await todoResponse.json();
            }
            commit('setTodos', todos);
            return true;
        },
        async loadDoneTodos({commit}) {
            const response = await fetch(API_URL + '/todos?done=true', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            });
            const todos = await response.json();
            commit('setTodos', todos);
        },
        async deleteTodo({commit, getters}, i) {
            const response = await fetch(API_URL + '/todos/' + getters.todos[i].id_todo, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            });

            const removed = await response.json();

            if (removed) {
                commit('deleteTodo', i);
            }

        },
        async addTodo({commit}, name) {
            const response = await fetch(API_URL + '/todos', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body: JSON.stringify({name})
            });
            const newTodo = await response.json();

            if (response.ok) {
                commit('addTodo', newTodo);
                return true;
            }
        },
        async checkTodo({commit, getters}, i) {
            const crntTodo = getters.todos[i];

            const response = await fetch(API_URL + /todos/ + crntTodo.id_todo, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body: JSON.stringify({
                    done: true
                }),
            });

            if (response.ok) {
                crntTodo.done = true;
                return true;
            }
        },
        async editTodo({commit, getters}, payload) {
            const {name, i} = payload;
            const crntTodo = getters.todos[i];

            const response = await fetch(API_URL + /todos/ + crntTodo.id_todo, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body: JSON.stringify({
                    name
                }),
            });

            if (response.ok) {
                commit('changeName', {i, name});
                return true;
            }
        }
    }
}