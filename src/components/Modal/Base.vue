<template>
	<div
		class="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
		:class="modalClasses"
		tabindex="0"
		@click.self="$emit('close')"
	>
		<transition
			enter-active-class="animate__animated animate__bounceIn"
			leave-active-class="animate__animated animate__bounceOut"
		>
			<div
				v-if="shown"
				class="relative m-4 w-2/5 min-w-[25%] max-w-[25%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl transition-all duration-300"
			>
				<div
					class="flex shrink-0 items-center p-4 font-sans text-2xl font-semibold leading-snug text-blue-gray-900 antialiased">
					{{ title }}
				</div>
				<div
					class="relative border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 p-4 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased">

					<slot name="body"></slot>
				</div>
				<div class="flex shrink-0 flex-wrap items-center justify-end p-4 text-blue-gray-500">
					<button @click.self="$emit('close')" data-ripple-dark="true" data-dialog-close="true"
					        class="middle none center mr-1 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
						Cancel
					</button>
					<button
						class="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						data-ripple-light="true"
						@click="$emit('submited')"
						:disabled="isBtnDIsabled"
					>
						Add
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'Modal Title'
		},
		shown: {
			type: Boolean,
			default: false
		},
		isBtnDIsabled: {
			type: Boolean,
			default: true,
		}
	},
	computed: {
		modalClasses() {
			return {
				'pointer-events-none opacity-0': this.shown !== true,
			};
		}
	}
}
</script>