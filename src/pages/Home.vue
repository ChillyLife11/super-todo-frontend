<template>
	<div class="flex items-center">
		<h1 class="flex items-center text-4xl font-bold text-blue-600 me-auto">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 25 25"
				fill="none"
				class="relative top-[-3px] mr-4"
			>
				<path
					d="M5.20834 13.2913C5.20834 11.8769 5.20834 11.1698 5.49424 10.5482C5.78014 9.92656 6.31706 9.46634 7.3909 8.54591L8.43256 7.65305C10.3735 5.98937 11.344 5.15754 12.5 5.15754C13.656 5.15754 14.6265 5.98937 16.5675 7.65305L17.6091 8.54591C18.683 9.46634 19.2199 9.92656 19.5058 10.5482C19.7917 11.1698 19.7917 11.8769 19.7917 13.2913V17.7083C19.7917 19.6725 19.7917 20.6546 19.1815 21.2648C18.5713 21.875 17.5892 21.875 15.625 21.875H9.37501C7.41082 21.875 6.42873 21.875 5.81854 21.2648C5.20834 20.6546 5.20834 19.6725 5.20834 17.7083V13.2913Z"
					stroke="#1e88e5"
				/>
				<path
					d="M15.1042 21.875V16.625C15.1042 16.0727 14.6565 15.625 14.1042 15.625H10.8958C10.3436 15.625 9.89584 16.0727 9.89584 16.625V21.875"
					stroke="#1e88e5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			Home
		</h1>
		<Select :items="sortTypes" @changed="sortTodos">
			<template #trigger>
				<svg
					width="32"
					height="32"
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="block me-2"
				>
					<path
						d="M9.37502 13.5417L9.02147 13.1881L9.37502 12.8345L9.72857 13.1881L9.37502 13.5417ZM9.87502 22.9167C9.87502 23.1928 9.65116 23.4167 9.37502 23.4167C9.09888 23.4167 8.87502 23.1928 8.87502 22.9167L9.87502 22.9167ZM3.81313 18.3964L9.02147 13.1881L9.72857 13.8952L4.52024 19.1035L3.81313 18.3964ZM9.72857 13.1881L14.9369 18.3964L14.2298 19.1035L9.02147 13.8952L9.72857 13.1881ZM9.87502 13.5417L9.87502 22.9167L8.87502 22.9167L8.87502 13.5417L9.87502 13.5417Z"
						fill="#1e88e5"
					/>
					<path
						d="M15.625 11.4583L15.2715 11.8119L15.625 12.1655L15.9786 11.8119L15.625 11.4583ZM16.125 2.08334C16.125 1.8072 15.9012 1.58334 15.625 1.58334C15.3489 1.58334 15.125 1.8072 15.125 2.08334L16.125 2.08334ZM10.0631 6.60356L15.2715 11.8119L15.9786 11.1048L10.7702 5.89646L10.0631 6.60356ZM15.9786 11.8119L21.1869 6.60356L20.4798 5.89646L15.2715 11.1048L15.9786 11.8119ZM16.125 11.4583L16.125 2.08334L15.125 2.08334L15.125 11.4583L16.125 11.4583Z"
						fill="#1e88e5"
					/>
				</svg>
				Sort by name
			</template>
		</Select>
		<button class="flex items-center text-xl text-blue-600" type="button" @click="addTodoModalShown = true">
			<svg
				width="32"
				height="32"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12.5 6.25L12.5 18.75"
					stroke="#1e88e5"
					stroke-linecap="round"
				/>
				<path
					d="M18.75 12.5L6.25 12.5"
					stroke="#1e88e5"
					stroke-linecap="round"
				/>
			</svg>
			Add a Todo
		</button>
	</div>

	<div class="py-10 grid grid-cols-1 gap-4">
		<Todo
			v-for="(todo, i) in todos"
			:key="todo.id_todo"
			:name="todo.name"
			:done="todo.done"
			:dt_add="todo.dt_add"
			@save="name => saveTodo(i, name)"
			@check="checkTodo(i)"
			@delete="deleteTodo(i)"
		/>
	</div>

	<AddTodoModal
		:shown="addTodoModalShown"
		@close-modal="addTodoModalShown = false"
	/>
</template>

<script>
import { mapGetters } from 'vuex';
import Todo from '@/components/Todo.vue';
import Select from '@/components/Select.vue';
import AddTodoModal from "@/components/Modal/AddTodoModal.vue";

export default {
	components: {
		AddTodoModal,
		Todo,
		Select
	},
	data() {
		return {
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
		...mapGetters(['todos']),
	},
	methods: {
		checkTodo(i) {
			if (this.$store.dispatch('checkTodo', i)) {
				setTimeout(() => {
					this.$store.commit('filterTodosByUndone');
				}, 800);
			}
		},
		saveTodo(i, name) {
			this.$store.dispatch('editTodo', {i, name});
		},
		deleteTodo(i) {
			console.log('asd');
			this.$store.dispatch('deleteTodo', i);
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
		this.$store.dispatch('loadTodos');
	},
};
</script>

<style module></style>
