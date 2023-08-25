<template>
	<div class="relative flex items-center text-xl text-blue-600 me-4 z-10">
		<button class="flex items-center text-xl text-blue-600 me-4" type="button" @click="triggered">
			<slot name="trigger"></slot>
		</button>
		<div
			class="absolute l-0 top-[130%] w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
			:class="listShown ? 'block' : 'hidden'"
		>
			<button
				v-for="(item, i) in items"
				:key="i"
				class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer"
				:class="item.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 hover:text-blue-700'"
				@click.prevent="itemCheck(i)">
				{{ item.text }}
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			listShown: false,
		}
	},
	methods: {
		triggered() {
			this.listShown = !this.listShown;
		},
		itemCheck(i) {
			this.$emit('changed', this.items[i]);

			this.closeList();
		},
		closeList() {
			this.listShown = false;
		}
	}
}
</script>

<style scoped>

</style>