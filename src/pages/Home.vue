<template>
	<Header
		title="Home"
		:main-icon="mainSvg"
		:show-add-btn="true"
		@sort-type-changed="sortTodos"
	/>

	<div class="py-10 grid grid-cols-1 gap-4">
		<Todo
			v-for="(todo, i) in todos"
			:key="todo.id_todo"
			:name="todo.name"
			:done="todo.done"
			@save="(name) => saveTodo(i, name)"
			@check="checkTodo(i)"
			@delete="deleteTodo(i)"
		/>
	</div>
</template>

<script>
import Todo from '@/components/Todo.vue';
import Header from '@/components/templates/Header.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		Todo,
		Header,
	},
	data() {
		return {
			activeSortType: 'newest',
			mainSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.29 7.00048L14.73 2.89048C13.1036 1.70317 10.8964 1.70317 9.27 2.89048L3.72 7.00048C2.64544 7.77462 2.0061 9.01612 2 10.3405V17.7705C2.06002 20.1637 4.04665 22.0564 6.44 22.0005H17.56C19.9534 22.0564 21.94 20.1637 22 17.7705V10.3305C21.9914 9.01185 21.3567 7.77576 20.29 7.00048ZM20.5 17.7705C20.4404 19.3354 19.1251 20.5568 17.56 20.5005H6.44C4.87698 20.5512 3.56502 19.333 3.5 17.7705V10.3405C3.50534 9.4904 3.91817 8.69448 4.61 8.20048L10.16 4.10048C11.2561 3.30006 12.7439 3.30006 13.84 4.10048L19.39 8.21048C20.0812 8.6959 20.4948 9.48583 20.5 10.3305V17.7705ZM7.5 15.7505H16.5C16.9142 15.7505 17.25 16.0863 17.25 16.5005C17.25 16.9147 16.9142 17.2505 16.5 17.2505H7.5C7.08579 17.2505 6.75 16.9147 6.75 16.5005C6.75 16.0863 7.08579 15.7505 7.5 15.7505Z" fill="currentColor"/>
</svg>`,
		};
	},
	computed: {
		...mapGetters({
			todos: 'todo/todos',
		}),
	},
	methods: {
		checkTodo(i) {
			if (this.$store.dispatch('todo/checkTodo', i)) {
				setTimeout(() => {
					this.$store.commit('todo/filterTodosByUndone');
				}, 600);
			}
		},
		saveTodo(i, name) {
			this.$store.dispatch('todo/editTodo', { i, name });
		},
		deleteTodo(i) {
			this.$store.dispatch('todo/deleteTodo', i);
		},
		sortTodos(name) {
			this.activeSortType = name;

			switch (this.activeSortType) {
				case 'newest':
					this.todos.sort((a, b) => {
						const dateA = new Date(a.dt_add);
						const dateB = new Date(b.dt_add);
						return dateB - dateA;
					});
					break;
				case 'oldest':
					this.todos.sort((a, b) => {
						const dateA = new Date(a.dt_add);
						const dateB = new Date(b.dt_add);
						return dateA - dateB;
					});
					break;
				case 'nameDown':
					this.todos.sort((a, b) => {
						if (a.name < b.name) {
							return -1;
						}
						if (a.name > b.name) {
							return 1;
						}
						return 0;
					});
					break;
				case 'nameUp':
					this.todos.sort((a, b) => {
						if (a.name < b.name) {
							return 1;
						}
						if (a.name > b.name) {
							return -1;
						}
						return 0;
					});
					break;
				default:
					break;
			}
		},
	},
	watch: {
		todos: {
			handler(newTodos, oldTodos) {
				if (newTodos.length > oldTodos.length) {
					this.sortTodos(this.activeSortType);
				}
			},
			deep: true
		}
	},
	created() {
		this.$store.dispatch('todo/loadTodos');
	},
};
</script>

<style module></style>
