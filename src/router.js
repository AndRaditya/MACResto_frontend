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
                {
                    path: '/menu',
                    name: 'Menu',
                    meta: { title: 'Menu' },
                    component: importComponent('Menu/menuPage'),
                },
            ],
        },
        {
            path: '/dashboard_menu',
            meta: { requiresAuth: true},
            component: importComponent('DashboardLayout_Menu'),
            children: [
                 {
                    path: '/review',
                    name: 'Review',
                    meta: { title: 'Review' },
                    component: importComponent('Review/reviewPage'),
                },
                {
                    path: '/dashboard_menu',
                    name: 'DashboardMenu',
                    meta: { title: 'DashboardMenu' },
                    component: importComponent('Dashboard'),
                },
            ],
        },

        {
            path: '/dashboard_admin',
            meta: { requiresAuth: true},
            component: importComponent('DashboardLayout_Admin'),
            children: [
                {
                    path: '/dashboard_admin',
                    name: 'DashboardAdmin',
                    meta: { title: 'DashboardAdmin' },
                    component: importComponent('Dashboard'),
                },
                {
                    path: '/reviewAdmin',
                    name: 'ReviewAdmin',
                    meta: { title: 'ReviewAdmin' },
                    component: importComponent('Review/reviewPageAdmin'),
                },
                {
                    path: '/profileAdmin',
                    name: 'ProfileAdmin',
                    meta: { title: 'ProfileAdmin' },
                    component: importComponent('Profile/profilePageAdmin'),
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
        {
            path: '/index_admin',
            meta: { requiresAuth: false},
            component: importComponent('TampilanAwal/indexLayout_Admin'),
            children: [
                {
                    path: '/index_admin',
                    name: 'IndexAdmin',
                    meta: { title: 'IndexAdmin' },
                    component: importComponent('TampilanAwal/indexDashboard'),
                },
                {
                    path: '/login_admin',
                    name: 'LoginAdmin',
                    meta: { title: 'LoginAdmin' },
                    component: importComponent('Login_Register/loginPageAdmin'),
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