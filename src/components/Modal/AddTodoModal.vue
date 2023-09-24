<template>
	<Modal
		title="Add todo"
		:shown="shown"
		:isBtnDIsabled="inpValInvalid"
		@close="$emit('close')"
		@submited="addTodo"
	>
		<template #body>
			<form>
				<Field
					label="Todo name"
					:errored="inpValInvalid"
					v-model="inpVal"
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
			inpValPattern: /^.{3,256}$/,
			inpValInvalid: false
		}
	},
	methods: {
		addTodo() {
			if (this.$store.dispatch('todo/addTodo', this.inpVal)) {
				this.inpVal = '';
				this.$emit('close');
			}
		}
	},
	watch: {
		inpVal(newVal) {
			this.inpValInvalid = !this.inpValPattern.test(newVal);
		}
	}
}
</script>