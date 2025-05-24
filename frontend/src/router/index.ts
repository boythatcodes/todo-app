import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EVF from '../views/EmailVerificaitonView.vue';
import Auth from '../views/AuthView.vue';
import Logout from '../views/Logout.vue';

declare module 'vue-router' {
    interface RouteMeta {
        public?: boolean;
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    // Auth
    {
        path: '/login',
        name: 'login',
        component: Auth,
        props: {
            authType: 'login',
        },
        meta: {
            public: true
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: Auth,
        props: {
            authType: 'signup',
        },
        meta: {
            public: true
        }
    },
    {
        path: '/email-verification',
        name: 'email-verification',
        component: EVF,
        props: {
            title: 'Please Verify your email',
            desc: 'Check the email you just used and click the link we sent you. If you don’t see it in your inbox, be sure to check your spam or junk folder as well.',
        },
        meta: {
            public: true
        }
    },
    {
        path: '/email-verfication-error',
        name: 'email-verfication-error',
        component: EVF,
        props: {
            title: 'Email Verification Error: ',
            desc: 'The link you used was incorrect. Please check for the most recent link we sent you, or click the button below to resend a new one.',
        },
        meta: {
            public: true
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('session') !== null;
    const isPublicRoute = to.matched.some(record => record.meta.public);

    if (isAuthenticated && isPublicRoute) {
        return next('/');
    }

    if (!isAuthenticated && !isPublicRoute) {
        return next('/login');
    }

    next();
});

export default router
