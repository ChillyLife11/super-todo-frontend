<template>
    <div class="icon-div" v-html="svg" :class="classes"></div>
</template>

<script>
export default {
    props: {
        classes: {
            type: String,
            default: ''
        },
        svg: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
:deep(svg) {
    width: inherit;
    height: inherit;
}
</style>