<template>
    <!-- skl-20. 受控props覆盖内部状态 -->
    <!-- 如果子组件中的状态和父组件传入的props想同时存在并对子组件生效，可在子组件中进行改造： -->
    <h3 @click="handleToggle">{{ title }}</h3>
    <slot v-if="$hidden"></slot>
</template>

<script lang="ts">
    import { ref, computed, getCurrentInstance } from 'vue';
    export default {
        name: 'Toggle',
        // skl-21.组件的元数据
        // 外部组件知道这个信息的用处
        /**
         * (1) 保持单个组件的版本号
         * (2) 用于构建工具的自定义标签，以区别对待组件
         * (3) 为组件添加自定义功能，而不是通过computed、data、watch等
         */
        columns: 3,
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
        setup(props: any, config: any) {
            const { proxy } = getCurrentInstance();
            // skl-20.组件内部管理自己的显隐状态
            const _hidden = ref<boolean>(false)
            const handleToggle = () => {
                console.log(config, 'config')   // { emit, attrs, slots, expose }
                console.log(proxy.$options.columns, 'proxy...')
                if (props.hidden !== undefined) {
                    console.log('props! ')
                    config.emit('toggle-hidden')
                } else {    
                    console.log('state! ')
                    _hidden.value = !_hidden.value
                }
            }

            // skl-21.联系 组件内部访问组件元数据
            console.log('组件内部访问组件元数据: ', proxy.$options.columns);

            // skl-20.传入的props可以覆盖组件内部的状态，并且可以同时存在
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