<template>
    <div id="icon">
        <!-- TODO -->
    </div>
</template>

<script lang="ts">
export default {
    name: 'IconComponent',
    props: {
        src: {
            type: String,
            default: null,
        },
        alt: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: 'sm',
            validator(value: string) {
                return ['xs', 'sm', 'md', 'lg'].includes(value)
            },
        },
        type: {
            type: String,
            default: 'bulb'
        }
    }
}
</script>

<style>
    #icon {
        background-color: aliceblue;
        border-radius: 100%;
        width: 3em;
        height: 3em;
    }
</style>