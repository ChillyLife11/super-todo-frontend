<template>
	<div class="relative flex items-center py-4 px-7 shadow rounded-md border" :class="mainBlockClasses">
		<div
			class="w-[21px] h-[21px] border rounded-full me-4 cursor-pointer"
			:class="done ? '' : 'border-blue-600'"
			@click="check"
		>
			<svg
				width="23"
				height="24"
				viewBox="0 0 23 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="w-full h-full"
				:class="done ? 'block' : 'hidden'"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M11.25 23.25C17.4632 23.25 22.5 18.2132 22.5 12C22.5 5.7868 17.4632 0.75 11.25 0.75C5.0368 0.75 0 5.7868 0 12C0 18.2132 5.0368 23.25 11.25 23.25ZM10.7682 16.3902L17.0182 8.89018L15.4818 7.60982L9.9328 14.2686L6.95711 11.2929L5.54289 12.7071L9.29289 16.4571L10.0672 17.2314L10.7682 16.3902Z"
					class="fill-blue-600"
					:class="done ? 'fill-white' : 'fill-blue-600'"
				/>
			</svg>
		</div>
		<div
			class="grow"
		>
			<input
				type="text"
				class="block bg-inherit text-inherit w-full outline-none"
				:class="inputClasses"
				v-model="baseName"
				@focus="inpFocused = true"
				@focusout="onFocusOut"
			/>
		</div>
		<transition
			enter-active-class="animate__animated animate__bounceIn"
			leave-active-class="animate__animated animate__fadeOut animate__faster"
		>
			<div v-if="inpFocused" class="absolute right-7 top-50 flex gap-2">
				<Button
					text="Save"
					@click="save"
				>
					<template #svg>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						     stroke="currentColor" class="w-5 h-5 text-white mr-2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
						</svg>
					</template>
				</Button>
				<Button
					variant="secondary"
					text="Cancel"
					@click="cancelEditing"
				>
					<template #svg>
						<svg class="w-5 h-5 text-white mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
							      d="M6.57 11.4199C7.18323 11.6939 7.68677 12.1657 8 12.7599L10.64 17.5699C10.8376 17.9277 10.9376 18.3312 10.93 18.7399L10.88 20.7399C10.8784 21.1527 10.6575 21.5335 10.3 21.7399C10.1368 21.8263 9.95468 21.8709 9.77 21.8699C9.54744 21.869 9.32945 21.8067 9.14 21.6899L7.46 20.6899C7.11098 20.4744 6.82475 20.1709 6.63 19.8099L4 14.9999C3.66864 14.3855 3.55581 13.6768 3.68 12.9899C3.75635 12.3414 4.1246 11.7632 4.68 11.4199C5.27514 11.1235 5.97485 11.1235 6.57 11.4199ZM8.23 19.3599L9.39 20.0599L9.38 18.6799C9.37661 18.5332 9.33894 18.3894 9.27 18.2599L6.64 13.4499C6.48697 13.1471 6.23704 12.9042 5.93 12.7599C5.82744 12.7087 5.71462 12.6813 5.6 12.6799C5.51638 12.6807 5.43414 12.7012 5.36 12.7399C5.19422 12.851 5.08762 13.0311 5.07 13.2299C5.0243 13.5762 5.09463 13.9278 5.27 14.2299L7.9 18.9999C7.97088 19.1506 8.08599 19.2762 8.23 19.3599Z" fill="#fff"/>
							<path fill-rule="evenodd" clip-rule="evenodd"
							      d="M13.2199 2.34988L20.2199 9.34988C20.3682 9.49766 20.4479 9.70069 20.4399 9.90988V16.9099C20.4399 18.1697 19.9395 19.3778 19.0487 20.2686C18.1579 21.1594 16.9497 21.6599 15.6899 21.6599H12.8199C12.4057 21.6599 12.0699 21.3241 12.0699 20.9099C12.0699 20.4957 12.4057 20.1599 12.8199 20.1599H15.6899C17.4826 20.1544 18.9344 18.7025 18.9399 16.9099V10.6599H14.6899C13.1734 10.6544 11.9454 9.42639 11.9399 7.90988V3.65988H9.6899C7.89498 3.65988 6.4399 5.11496 6.4399 6.90988V9.55988C6.4399 9.9741 6.10412 10.3099 5.6899 10.3099C5.27569 10.3099 4.9399 9.9741 4.9399 9.55988V6.90988C4.93192 5.64491 5.42883 4.42901 6.3205 3.53172C7.21216 2.63442 8.42491 2.12986 9.6899 2.12988H12.6899C12.8888 2.13006 13.0794 2.20919 13.2199 2.34988ZM13.4399 4.68988V7.90988C13.4399 8.60024 13.9995 9.15988 14.6899 9.15988H17.9099L13.4399 4.68988Z" fill="#fff"/>
						</svg>

					</template>
				</Button>
				<Button
					variant="error"
					text="Delete"
					@click="deleteTodo"
				>
					<template #svg>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						     stroke="currentColor" class="w-5 h-5 text-white mr-2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</template>
				</Button>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import Button from "@/components/Button.vue";
import { computed, Ref, ref, watch } from 'vue';

interface Props {
	name: string,
	done: boolean
}

type TOnlyStringClasses<T> = {
	[K in keyof T]: K extends string ? T[K] : never
}

interface IMainBlockClasses {
	'bg-blue-600 text-white': boolean,
	'border-blue-600': boolean,
	'border-pink-500': boolean
}

interface IInpClasses {
	'text-pink-500': boolean,
}


const props = defineProps<Props>();

const baseName: Ref<string> = ref(props.name);
const inpFocused: Ref<boolean> = ref(false);
const inpErrored: Ref<boolean> = ref(false);
const namePattern: Ref<RegExp> = ref(/^.{3,256}$/);

	
const emit = defineEmits<{
	(e: 'save', value: string): void,
	(e: 'check'): void,
	(e: 'deleteTodo'): void,
	(e: 'onFocusOut'): void,
	(e: 'cancelEditing'): void,
}>();


const mainBlockClasses = computed((): TOnlyStringClasses<IMainBlockClasses> => {
	return {
		'bg-blue-600 text-white': props.done,
		'border-blue-600': inpFocused.value,
		'border-pink-500': inpErrored.value,
	}
});

const inputClasses = computed((): TOnlyStringClasses<IInpClasses> => {
	return {
		'text-pink-500': inpErrored.value,
	}
});


function save(): void {
	if (baseName.value !== props.name) {
		if (namePattern.value.test(baseName.value)) {
			emit('save', baseName.value);
			inpFocused.value = false;
		} else {
			inpErrored.value = true;
		}
	}
}

function check(): void {
	if (!props.done) {
		emit('check');
	}
}

function deleteTodo(): void {
	if (!props.done) {
		emit('check');
	}
}

function onFocusOut(): void {
	if (baseName.value === props.name) {
		inpFocused.value = false;
	}
}

function cancelEditing(): void {
	inpFocused.value = false;
	baseName.value = props.name;
}

watch(baseName, (): boolean | '' => inpErrored.value ? inpErrored.value = false : '');
</script>