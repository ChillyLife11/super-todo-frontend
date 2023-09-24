<template>
	<div
		class="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 overflow-hidden"
		:style="moreStyles"
	>
		<img :src="getImagePath" alt="" :class="isImageNull ? 'w-6 h-6' : ''" />
	</div>
</template>

<script>
// :class="[
// 			$style.avatar,
// 			{
// 				[$style['no-avatar']]: image === null,
// 			},
// 		]"

import defaultImage from '@/assets/user-default.svg';

export default {
	props: {
		moreStyles: {
			type: Object,
			default: {},
		},
		image: {
			type: [String, null],
			default: null,
		},
		size: {
			type: String,
			default: 'sm',
			validator(value) {
				return ['sm'].includes(value);
			},
		},
	},
	computed: {
		getImagePath() {
			return !this.isImageNull ? this.image : defaultImage;
		},
		isImageNull() {
			return this.image === null;
		},
	},
};
</script>

<style module>
.avatar {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50px;
	background-color: #a5f3fc;
}

.avatar:not(.no-avatar) img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

.avatar.no-avatar img {
	width: 24px;
	height: 24px;
}
</style>
