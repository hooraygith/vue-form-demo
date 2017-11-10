<template>
<div :data-vv-scope="name" style="width: 100%">
    <slot></slot>
</div>
</template>
<script>
import {  findComponentUpward, findComponentsDownward } from './util.js';
export default {
    name: 'vue-form',
    props: ['name', 'rate'],
    data() {
        return {
            newRate: this.rate,
            formItems: findComponentsDownward(this, 'form-item')
        }
    },
    watch: {
        'rate'(val) {
            this.newRate = val
            this.formItems.forEach(item => {
                item.parentRate = val
            })
        }
    },
    methods: {

    },
    created() {
        this.formItems.forEach(item => {
            this.formItems.parentRate = this.rate
        })
    }

}
</script>
