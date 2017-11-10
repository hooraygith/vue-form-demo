import {  findComponentUpward, findComponentsDownward } from './util.js';


const directive = {
    bind (el, binding, vnode) {
        console.log('bind')
        console.log(el, binding, vnode)

        window.aa = el

        const rules = binding.value

        const context = vnode.context

        const vueForm = findComponentsDownward(context, 'vue-form')
        const formItem = findComponentsDownward(context, 'form-item')

        console.log('4444', vueForm, formItem)
    },
    inserted: (el, binding, vnode) => {
    },
    update: (el, binding, vnode) => {

    },
    componentUpdated(el, binding, vnode) {
    },
    unbind (el, binding, { context }) {
    }
};



Vue.directive('vvalidate', directive)

console.log('directive installed')

