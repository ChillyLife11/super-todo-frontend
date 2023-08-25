import { createStore } from 'vuex';
import { API_URL } from '@/constants.js';

const store = createStore({
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
            const { i, name } = payload;

            state.todos[i].name = name;
        },
        addTodo(state, newTodo) {
            state.todos.unshift(newTodo);
        },
        deleteTodo(state, i) {
            state.todos.splice(i, 1);
        }
    },
    actions: {
        async loadTodos({ commit }) {
            const response = await fetch(API_URL + '/todos?done=false');
            const todos = await response.json();

            commit('setTodos', todos);
        },
        async deleteTodo({ commit, getters }, i) {
            const response = await fetch(API_URL + '/todos/' + getters.todos[i].id_todo, {
                method: 'DELETE'
            });

            const removed = response.json();

            if (removed) {
                commit('deleteTodo', i);
            }

        },
        async addTodo({ commit }, name) {
            const response = await fetch(API_URL + '/todos', {
                method: 'POST',
                body: JSON.stringify({name})
            });
            const newTodo = await response.json();

            if (response.ok) {
                commit('addTodo', newTodo);
            }
        },
        async checkTodo({ commit, getters }, i) {
            const crntTodo = getters.todos[i];

            const response = await fetch(API_URL + /todos/ + crntTodo.id_todo, {
                method: 'PATCH',
                body: JSON.stringify({
                    done: true
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            if (response.ok) {
                crntTodo.done = true;
                return true;
            }
        },
        async editTodo({ commit, getters }, payload) {
            const { name, i } = payload;
            const crntTodo = getters.todos[i];

            const response = await fetch(API_URL + /todos/ + crntTodo.id_todo, {
                method: 'PATCH',
                body: JSON.stringify({
                    name
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            if (response.ok) {
                commit('changeName', {i, name});
                return true;
            }
        }
    }
});

export default store;