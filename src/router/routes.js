export default [
    {
        path: '/',
        name: 'home',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/Home')
    },
    {
        path: '/coin/:id',
        name: 'coin',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/Coin')
    },
]