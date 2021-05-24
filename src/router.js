import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Countries from '@/views/Countries'
import Cities from '@/views/Cities'
import Wishes from '@/views/Wishes'

const routes = [
    { path: '/', component: Home },
    { path: '/countries', component: Countries },
    { path: '/cities/:id', component: Cities },
    { path: '/wishes', component: Wishes },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router;
