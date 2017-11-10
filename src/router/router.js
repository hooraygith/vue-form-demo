import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/apply', meta: {title: '申请客户报备'}, name: 'apply', component: r => require.ensure([], () => r(require('../view/apply.vue')), 'apply')}
    ]
})
router.beforeEach(async (to, from, next) => {

    // router hooks here

    next()
})

export default router