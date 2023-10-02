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
        async loadTodos({commit, dispatch}) {
            let response = await fetch(API_URL + '/todos?done=false', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            });

            let todos = [];

            if (response.status === 400 || response.status === 401) {
                await dispatch('user/refresh', null, {root: true});

                response = await fetch(API_URL + '/todos?done=false', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                });
            }

            todos = await response.json();

            commit('setTodos', todos);
            return true;
        },
        async loadDoneTodos({commit, dispatch}) {
            let response = await fetch(API_URL + '/todos?done=true', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            });

            let todos = [];

            if (response.status === 400 || response.status === 401) {
                await dispatch('user/refresh', null, {root: true});

                response = await fetch(API_URL + '/todos?done=false', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                });
            }

            todos = await response.json();

            commit('setTodos', todos);
            return true;
        },
        async deleteTodo({commit, getters, dispatch}, i) {
            let response = await fetch(API_URL + '/todos/' + getters.todos[i].id_todo, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            });

            if (response.status === 400 || response.status === 401) {
                await dispatch('user/refresh', null, {root: true});

                response = await fetch(API_URL + '/todos/' + getters.todos[i].id_todo, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                });
            }

            const removed = await response.json();

            if (removed) {
                commit('deleteTodo', i);
            }

        },
        async addTodo({commit, dispatch}, name) {
            let response = await fetch(API_URL + '/todos', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body: JSON.stringify({name})
            });

            if (response.status === 400 || response.status === 401) {
                await dispatch('user/refresh', null, {root: true});

                response = await fetch(API_URL + '/todos', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    },
                    body: JSON.stringify({name})
                });
            }

            const newTodo = await response.json();

            commit('addTodo', newTodo);
            return true;
        },
        async checkTodo({commit, getters, dispatch}, i) {
            const crntTodo = getters.todos[i];

            let response = await fetch(API_URL + /todos/ + crntTodo.id_todo, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body: JSON.stringify({
                    done: true
                }),
            });

            if (response.status === 400 || response.status === 401) {
                await dispatch('user/refresh', null, {root: true});

                response = await fetch(API_URL + /todos/ + crntTodo.id_todo, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    },
                    body: JSON.stringify({
                        done: true
                    }),
                });
            }

            crntTodo.done = true;
            return true;
        },
        async editTodo({commit, getters, dispatch}, payload) {
            const {name, i} = payload;
            const crntTodo = getters.todos[i];

            let response = await fetch(API_URL + /todos/ + crntTodo.id_todo, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body: JSON.stringify({
                    name
                }),
            });

            if (response.status === 400 || response.status === 401) {
                await dispatch('user/refresh', null, {root: true});

                response = await fetch(API_URL + /todos/ + crntTodo.id_todo, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    },
                    body: JSON.stringify({
                        name
                    }),
                });
            }

            commit('changeName', {i, name});
            return true;
        }
    }
}