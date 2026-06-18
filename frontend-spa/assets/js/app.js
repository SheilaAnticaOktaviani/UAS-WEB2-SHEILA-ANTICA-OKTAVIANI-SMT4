// PUSAT KONFIGURASI
axios.defaults.baseURL = 'http://localhost:8080/api';

// Interceptor Request: Menyisipkan Token secara otomatis
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
}, error => Promise.reject(error));

// Interceptor Response: Penanganan Error Global
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            alert("Sesi berakhir, silakan login kembali.");
            localStorage.clear();
            window.location.href = '#/login';
        }
        return Promise.reject(error);
    }
);

const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: typeof Login !== 'undefined' ? Login : {} },
    { path: '/dashboard', component: typeof Dashboard !== 'undefined' ? Dashboard : {}, meta: { requiresAuth: true } }
];

const router = createRouter({ history: createWebHashHistory(), routes });

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (to.meta.requiresAuth && !isLoggedIn) next('/login');
    else next();
});

const app = createApp({
    data() { return { isLoggedIn: !!localStorage.getItem('token') } },
    methods: {
        logout() {
            localStorage.clear();
            this.isLoggedIn = false;
            this.$router.push('/login');
            setTimeout(() => window.location.reload(), 100);
        }
    }
});

app.use(router);
app.mount('#app');