<template>
	<div class="flex items-center">
		<h1 class="flex items-center text-4xl font-bold text-blue-600 me-auto">
			<Icon :svg="mainIcon" classes="text-blue-600 w-8 h-8 mr-3" />

			{{ title }}
		</h1>
		<Select :items="sortTypes" @changed="handleSortingChange">
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
		<button
			class="flex items-center text-xl text-blue-600"
			type="button"
			@click="addTodoModalShown = true"
		>
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

	<AddTodoModal
		:shown="addTodoModalShown"
		@close="addTodoModalShown = false"
	/>
</template>

<script>
import AddTodoModal from '@/components/Modal/AddTodoModal.vue';
import Select from '@/components/Select.vue';
import Icon from '@/components/Icon.vue';

export default {
	components: {
		Icon,
		AddTodoModal,
		Select,
	},
	emits: ['sortTypeChanged'],
	props: {
		mainIcon: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
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
	methods: {
		handleSortingChange(choosedType) {
			this.sortTypes.find(
				(sortType) => sortType.active === true,
			).active = false;

			this.sortTypes.find(
				(sortType) => sortType.name === choosedType.name,
			).active = true;

			this.$emit('sortTypeChanged', choosedType.name);
		},
	},
};
</script>
