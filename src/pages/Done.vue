<template>
	<Header
		title="Done"
		:main-icon="mainSvg"
	/>

	<div class="py-10 grid grid-cols-1 gap-4">
		<Todo
			v-for="(todo, i) in todos"
			:key="todo.id_todo"
			:name="todo.name"
			:done="todo.done"
			@save="name => saveTodo(i, name)"
			@check="checkTodo(i)"
			@delete="deleteTodo(i)"
		/>
	</div>
	<AddTodoModal
		:shown="addTodoModalShown"
		@close="addTodoModalShown = false"
	/>
</template>

<script>
import {mapGetters} from 'vuex';
import Todo from '@/components/Todo.vue';
import Select from '@/components/Select.vue';
import AddTodoModal from "@/components/Modal/AddTodoModal.vue";
import Header from "@/components/templates/Header.vue";

export default {
	components: {
		AddTodoModal,
		Todo,
		Select,
		Header
	},
	data() {
		return {
			mainSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.20948 17.5602C9.04155 17.5676 8.87603 17.5183 8.73948 17.4202L4.24948 13.7102C3.9602 13.4541 3.91665 13.0186 4.14948 12.7102C4.40515 12.4223 4.83734 12.3748 5.14948 12.6002L9.14948 15.8602L19.6495 6.15024C19.96 5.91711 20.3971 5.95953 20.657 6.24802C20.9169 6.5365 20.9136 6.97565 20.6495 7.26024L9.71948 17.3602C9.58026 17.488 9.39843 17.5593 9.20948 17.5602Z" fill="currentColor"/>
</svg>`,
			addTodoModalShown: false,
			sortTypes: [
				{
					name: 'newest',
					text: 'Date (newest)',
					active: true,
				},
				{
					name: 'oldest',
					text: 'Date (oldest)',
					active: false,
				},
				{
					name: 'nameDown',
					text: 'Name (A-Z)',
					active: false,
				},
				{
					name: 'nameUp',
					text: 'Name (Z-A)',
					active: false,
				},
			],
		};
	},
	computed: {
		...mapGetters('todo', { todos: 'todos' }),
	},
	methods: {
		checkTodo(i) {
			if (this.$store.dispatch('todo/checkTodo', i)) {
				setTimeout(() => {
					this.$store.commit('todo/filterTodosByUndone');
				}, 800);
			}
		},
		saveTodo(i, name) {
			this.$store.dispatch('todo/editTodo', {i, name});
		},
		deleteTodo(i) {
			console.log('asd');
			this.$store.dispatch('todo/deleteTodo', i);
		},
		sortTodos(activeItem) {
			this.sortTypes.find(
				(sortType) => sortType.active === true,
			).active = false;
			activeItem.active = true;
			if (activeItem.name === 'newest') {
				this.todos.sort((a, b) => {
					const dateA = new Date(a.dt_add);
					const dateB = new Date(b.dt_add);
					return dateB - dateA;
				});
				return;
			}
			if (activeItem.name === 'oldest') {
				this.todos.sort((a, b) => {
					const dateA = new Date(a.dt_add);
					const dateB = new Date(b.dt_add);
					return dateA - dateB;
				});
				return;
			}
			if (activeItem.name === 'nameDown') {
				this.todos.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
			}
			if (activeItem.name === 'nameUp') {
				this.todos.sort((a, b) => {
					if (a.name < b.name) {
						return 1;
					}
					if (a.name > b.name) {
						return -1;
					}
					return 0;
				});
			}
		}
	},
	created() {
		this.$store.dispatch('todo/loadDoneTodos');
	},
}
</script>
