<template>
    <!-- skl-20. 受控props覆盖内部状态 -->
    <!-- 如果子组件中的状态和父组件传入的props想同时存在并对子组件生效，可在子组件中进行改造： -->
    <h3 @click="handleToggle">{{ title }}</h3>
    <slot v-if="$hidden"></slot>
</template>

<script lang="ts">
    import { ref, computed } from 'vue';
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            hidden: {
                type: Boolean,
                default: undefined
            }
        },
        emits: ['toggle-hidden'],
        setup(props: any, { emit }) {
            // 组件内部管理自己的显隐状态
            const _hidden = ref<boolean>(false)
            const handleToggle = () => {
                if (props.hidden !== undefined) {
                    console.log('props! ')
                    emit('toggle-hidden')
                } else {    
                    console.log('state! ')
                    _hidden.value = !_hidden.value
                }
            }

            // 传入的props可以覆盖组件内部的状态，并且可以同时存在
            const $hidden = computed(() => {
                return props.hidden !== undefined ? props.hidden : _hidden.value
            })

            return {
                $hidden,
                handleToggle
            }
        },
    }
</script>

<style>

</style>