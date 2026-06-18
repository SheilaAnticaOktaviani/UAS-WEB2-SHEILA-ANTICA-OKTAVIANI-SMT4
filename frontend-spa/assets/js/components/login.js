const Login = {
    template: `
        <div class="max-w-md mx-auto bg-white p-8 mt-12 rounded-xl shadow-2xl border border-gray-100">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-extrabold text-gray-900">Login Sistem</h2>
                <p class="text-gray-500 mt-2">Masukkan kredensial administrator Anda</p>
            </div>
            <form @submit.prevent="prosesLogin">
                <div class="mb-5">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input v-model="username" type="text" class="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-indigo-500 transition" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input v-model="password" type="password" class="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-indigo-500 transition" required>
                </div>
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-200">
                    Masuk ke Dashboard
                </button>
            </form>
        </div>
    `,
    data() {
        return { username: '', password: '' }
    },
    methods: {
        prosesLogin() {
            axios.post('http://localhost:8080/api/login', {
                username: this.username,
                password: this.password
            })
            .then(res => {
                // Simpan token ke brankas browser
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('isLoggedIn', 'true');
                this.$router.push('/dashboard');
                window.location.reload();
            })
            .catch(err => {
                alert("Login Gagal! Pastikan username dan password benar.");
            });
        }
    }
};