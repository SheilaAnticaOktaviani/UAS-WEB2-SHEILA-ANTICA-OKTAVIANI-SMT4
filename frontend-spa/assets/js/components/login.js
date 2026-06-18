const Login = {
    template: `
        <div class="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden mt-12">
            <!-- Header Banner -->
            <div class="bg-gradient-to-r from-pink-500 to-rose-600 p-8 text-center text-white">
                <h2 class="text-3xl font-extrabold">{{ isRegister ? 'Daftar Akun' : 'Login Sistem' }}</h2>
                <p class="text-pink-100 mt-2">{{ isRegister ? 'Buat akun administrator baru' : 'Masukkan kredensial administrator Anda' }}</p>
            </div>
            
            <!-- Form -->
            <form @submit.prevent="submitForm" class="p-8 space-y-4">
                <div>
                    <label class="block text-pink-900 text-sm font-bold mb-1.5">Username</label>
                    <input v-model="username" type="text" class="w-full border-2 border-pink-100 focus:border-pink-500 p-3.5 rounded-xl focus:outline-none transition duration-150" placeholder="Username Anda" required>
                </div>
                <div>
                    <label class="block text-pink-900 text-sm font-bold mb-1.5">Password</label>
                    <input v-model="password" type="password" class="w-full border-2 border-pink-100 focus:border-pink-500 p-3.5 rounded-xl focus:outline-none transition duration-150" placeholder="••••••••" required>
                </div>

                <!-- Registration Only Fields -->
                <div v-if="isRegister" class="space-y-4 pt-2 border-t border-pink-50">
                    <div>
                        <label class="block text-pink-900 text-sm font-bold mb-1.5">Nama Lengkap</label>
                        <input v-model="nama_lengkap" type="text" class="w-full border-2 border-pink-100 focus:border-pink-500 p-3.5 rounded-xl focus:outline-none transition duration-150" placeholder="Nama lengkap Anda" required>
                    </div>
                    <div>
                        <label class="block text-pink-900 text-sm font-bold mb-1.5">Alamat Lengkap</label>
                        <textarea v-model="alamat" class="w-full border-2 border-pink-100 focus:border-pink-500 p-3.5 rounded-xl focus:outline-none transition duration-150" placeholder="Alamat pengiriman barang..." rows="2" required></textarea>
                    </div>
                </div>
                
                <!-- Submit Button -->
                <button type="submit" class="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition duration-200 mt-4">
                    {{ isRegister ? 'Daftar Sekarang' : 'Masuk ke Dashboard' }}
                </button>

                <!-- Toggle Link -->
                <div class="text-center pt-2">
                    <button type="button" @click="toggleMode" class="text-sm font-semibold text-pink-600 hover:text-pink-850 hover:underline transition duration-150">
                        {{ isRegister ? 'Sudah punya akun? Login di sini' : 'Belum punya akun? Daftar sekarang' }}
                    </button>
                </div>
            </form>
        </div>
    `,
    data() {
        return { 
            username: '', 
            password: '',
            nama_lengkap: '',
            alamat: '',
            isRegister: false
        }
    },
    methods: {
        toggleMode() {
            this.isRegister = !this.isRegister;
            this.username = '';
            this.password = '';
            this.nama_lengkap = '';
            this.alamat = '';
        },
        submitForm() {
            if (this.isRegister) {
                this.prosesRegister();
            } else {
                this.prosesLogin();
            }
        },
        prosesLogin() {
            axios.post('http://localhost:8080/api/login', {
                username: this.username,
                password: this.password
            })
            .then(res => {
                // Simpan token, role, dan profil ke brankas browser
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', res.data.data.role);
                localStorage.setItem('nama_lengkap', res.data.data.nama_lengkap || '');
                localStorage.setItem('alamat', res.data.data.alamat || '');
                
                this.$root.isLoggedIn = true;
                this.$root.isAdmin = (res.data.data.role === 'admin');
                
                if (res.data.data.role === 'admin') {
                    this.$router.push('/dashboard');
                } else {
                    this.$router.push('/');
                }
            })
            .catch(err => {
                alert("Login Gagal! Pastikan username dan password benar.");
            });
        },
        prosesRegister() {
            axios.post('http://localhost:8080/api/register', {
                username: this.username,
                password: this.password,
                nama_lengkap: this.nama_lengkap,
                alamat: this.alamat
            })
            .then(res => {
                alert("Registrasi Berhasil! Silakan masuk dengan akun baru Anda.");
                this.isRegister = false;
                this.password = '';
                this.nama_lengkap = '';
                this.alamat = '';
            })
            .catch(err => {
                alert("Registrasi Gagal: " + (err.response?.data?.messages?.error || err.response?.data?.message || "Username sudah terdaftar atau terjadi kesalahan."));
            });
        }
    }
};