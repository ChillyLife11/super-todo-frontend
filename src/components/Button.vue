<template>
	<button
		type="button"
		class="px-5 py-2.5 text-sm font-medium text-white inline-flex items-centerfocus:ring-4 focus:outline-none rounded-lg text-center"
		:class="getTypeClass"
	>
		<slot name="svg"></slot>
		{{ text }}
	</button>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'primary',
			validator: value => {
				return value === 'primary' || value === 'error' || value === 'secondary'
			}
		},
		text: {
			type: String,
			default: 'Button'
		}
	},
	computed: {
		getTypeClass() {
			switch (this.type) {
				case 'primary':
					return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300';
				case 'error':
					return 'bg-red-600 hover:bg-red-700 focus:ring-red-300';
				case 'secondary':
					return 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-300';
			}
		}
	}
}
</script>