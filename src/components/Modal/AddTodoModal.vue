<template>
	<Modal
		title="Add todo"
		:shown="shown"
		@close-modal="$emit('closeModal')"
		@add-todo="addTodo"
	>
		<template #body>
			<form>
				<Field
					label="Todo name"
					:inpVal="inpVal"
					@on-input="onInput"
				></Field>
			</form>
		</template>
	</Modal>
</template>

<script>
import Modal from '@/components/Modal/Base.vue';
import Field from "@/components/Field.vue";

export default {
	components: {
		Modal,
		Field
	},
	props: {
		shown: {
			type: Boolean,
			default: false,
			required: true,
		}
	},
	data() {
		return {
			inpVal: '',
		}
	},
	methods: {
		onInput(e) {
			this.inpVal = e.target.value;
		},
		addTodo() {
			this.$store.dispatch('addTodo', this.inpVal);
		}
	}
}
</script>