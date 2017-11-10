<template>
<div class="form-item">

    <div :style="{width: leftWidth}" v-if="$slots.label">
        <slot name="label"></slot>
    </div>
    <div :style="{width: leftWidth}" v-else>
        {{realLabel}}
    </div>

    <div :style="{width: rightWidth}" class="input-wrap">
        <slot></slot>
        <div class="error">
            <p v-show="errCheck.has('name1.联系人姓名1')">111{{errCheck.first('name1.联系人姓名1')}}</p>
        </div>
    </div>
</div>
</template>
<script>
import {  findComponentUpward, findComponentsDownward } from './util.js';
export default {
    name: 'form-item',
    props: ['label', 'rate', 'labelFull', 'eeee'],
    data() {
        const parent = findComponentUpward(this, 'vue-form')
        const formScope = this.findFormScope(this, 'data-vv-scope')
        return {
            parent: parent,
            parentRate: parent.rate,
            realLabel: this.label || '',
            fullLabel: parent.name ? `${parent.name}.${this.label}` : this.label,
            leftWidth: '',
            rightWidth: '',
            errCheck: this.$vnode.context.errors
        }
    },
    watch: {
        'parentRate'(val) {
            this.realRate = this.rate || val
            this.parseRate(this.realRate)
        },
        'rate'(val) {
            if (val) {
                this.realRate = val
                this.parseRate(this.realRate)
            }
        },
        'label'(val) {
            if (val) {
                this.realLabel = val
                this.fullLabel = this.parent.name ? `${this.parent.name}.${this.label}` : this.label
                console.log('watch', this.realLabel)
            }
        }
    },
    methods: {
        parseRate(rate) {
            if (rate) {
                const list = rate.split(':')
                if (list && list.length) {
                    const newList = list.map(item => parseInt(item))
                    const total = newList[0] + newList[1]
                    this.leftWidth = (newList[0] * 100 / total).toFixed(2) + '%'
                    this.rightWidth = (newList[1] * 100 / total).toFixed(2) + '%'
                } else {
                    throw 'rate 传参错误'
                }
            }
        },
        findChildrenHasDirectives(vnodes) {
            return find(vnodes)

            function find(vnodes) {
                for (let node of vnodes) {
                    if (node.data && node.data.directives) {
                        const hasValidate = node.data.directives.some(directive => {
                            return directive.name === 'validate'
                        })
                        if (hasValidate) {
                            return node.elm
                        }
                    }
                    if (node.children && node.children.length) {
                        return find(node.children)
                    }

                }
                return {}
            }
        }

    },
    mounted() {
        // 子元素需要有 v-validate
        // 或者子组件需要有 v-validate
        const child = this.findChildrenHasDirectives(this.$slots.default, 'validate')

        this.realLabel = child.name || this.label
        this.fullLabel = this.parent.name ? `${this.parent.name}.${this.label}` : this.label
    },
    created() {

        this.parseRate(this.parentRate || this.rate)
    }

}
</script>
<style>
.form-item {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .input-wrap {
        position: relative;
        .error {
            color: red;
        }
        input {
            width: 100%;
        }
    }
}
</style>

