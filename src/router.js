import Vue from 'vue'
import VueRouter from 'vue-router'

import login from './views/login.vue'
import home from './views/home.vue'
import welcome from './components/welcome.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{path: '*', redirect: '/'},
		{name: 'login', path: '/login', component: login},
		{
			name: 'home', path: '/', component: home, redirect: 'welcome',
			children: [
				{name: 'welcome', path: 'welcome', component: welcome}
			]
		}
	]
})

router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token')
	if (token) {
		next()
	} else {
		if (to.path !== '/login') {
			next({path: '/login'})
		} else {
			next()
		}
	}
})

export default router