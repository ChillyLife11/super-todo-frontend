<template>
	<button
		:type="type"
		class="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center focus:ring-4 focus:outline-none rounded-lg justify-center"
		:class="getVariantClass + ' ' + moreClasses"
	>
		<slot name="svg"></slot>
		{{ text }}
	</button>
</template>

<script>
export default {
	props: {
		variant: {
			type: String,
			default: 'primary',
			validator: value => {
				return value === 'primary' || value === 'error' || value === 'secondary'
			}
		},
		type: {
			type: String,
			default: 'button'
		},
		text: {
			type: String,
			default: 'Button'
		},
		moreClasses: {
			type: String,
		}
	},
	computed: {
		getVariantClass() {
			switch (this.variant) {
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