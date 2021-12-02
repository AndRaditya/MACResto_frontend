import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: 'history',
    routes: [   
        {
            path: '/dashboard',
            meta: { requiresAuth: true},
            component: importComponent('DashboardLayout'),
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    meta: { title: 'Dashboard' },
                    component: importComponent('Dashboard'),
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    meta: { title: 'Profile' },
                    component: importComponent('Profile/profilePage'),
                },
            ],
        },
        {
            path: '/index',
            meta: { requiresAuth: false},
            component: importComponent('TampilanAwal/indexLayout'),
            children: [
                {
                    path: '/index',
                    name: 'Index',
                    meta: { title: 'Index' },
                    component: importComponent('TampilanAwal/indexDashboard'),
                },
                {
                    path: '/login',
                    name: 'Login',
                    meta: { title: 'Login' },
                    component: importComponent('Login_Register/loginPage'),
                },
                {
                    path: '/register',
                    name: 'Register',
                    meta: { title: 'Register' },
                    component: importComponent('Login_Register/registerPage'),
                },
            ],
        },     
        
        //login
        {
            path: '*',
            meta: { requiresAuth: false},
            redirect: '/index'
        },
        {
            path: '*',
            meta: { requiresAuth: true},
            redirect: '/dashboard'

        }
    ],
});

//set judul
router.beforeEach((to, from, next)=>{
    document.title = to.meta.title;
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (localStorage.getItem('token') == null) {
          next({ redirect: '/login'})
        } else {
          next() // go to wherever I'm going
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
});

export default router;