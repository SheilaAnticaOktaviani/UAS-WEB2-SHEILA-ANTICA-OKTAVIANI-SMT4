const Dashboard = {
    template: `
        <div class="space-y-8">
            <!-- Metrics Summary Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Card 1: Total Barang -->
                <div class="bg-gradient-to-br from-pink-400 to-pink-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                    <div class="flex justify-between items-center">
                        <span class="text-pink-100 text-sm font-semibold uppercase tracking-wider">Total Barang</span>
                        <span class="p-2 bg-white/10 rounded-lg text-lg">📦</span>
                    </div>
                    <h3 class="text-3xl font-extrabold mt-4">{{ totalBarang }}</h3>
                    <p class="text-pink-200 text-xs mt-2">Jenis barang terdaftar</p>
                </div>
                <!-- Card 2: Total Stok -->
                <div class="bg-gradient-to-br from-rose-400 to-rose-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                    <div class="flex justify-between items-center">
                        <span class="text-rose-100 text-sm font-semibold uppercase tracking-wider">Total Stok</span>
                        <span class="p-2 bg-white/10 rounded-lg text-lg">📈</span>
                    </div>
                    <h3 class="text-3xl font-extrabold mt-4">{{ totalStok }} <span class="text-lg font-normal">Unit</span></h3>
                    <p class="text-rose-200 text-xs mt-2">Akumulasi seluruh barang</p>
                </div>
                <!-- Card 3: Total Aset -->
                <div class="bg-gradient-to-br from-fuchsia-500 to-pink-700 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                    <div class="flex justify-between items-center">
                        <span class="text-fuchsia-100 text-sm font-semibold uppercase tracking-wider">Total Nilai Aset</span>
                        <span class="p-2 bg-white/10 rounded-lg text-lg">💰</span>
                    </div>
                    <h3 class="text-3xl font-extrabold mt-4">Rp {{ totalAset.toLocaleString('id-ID') }}</h3>
                    <p class="text-fuchsia-200 text-xs mt-2">Estimasi nilai inventaris</p>
                </div>
                <!-- Card 4: Stok Menipis -->
                <div class="bg-gradient-to-br from-pink-500 to-rose-700 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                    <div class="flex justify-between items-center">
                        <span class="text-pink-100 text-sm font-semibold uppercase tracking-wider">Stok Menipis</span>
                        <span class="p-2 bg-white/10 rounded-lg text-lg">⚠️</span>
                    </div>
                    <h3 class="text-3xl font-extrabold mt-4">{{ stokMenipis }} <span class="text-lg font-normal">Barang</span></h3>
                    <p class="text-pink-200 text-xs mt-2">Stok barang di bawah 10</p>
                </div>
            </div>

            <!-- Main Dashboard Area -->
            <div class="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <!-- Search Box -->
                        <div class="relative w-full sm:w-64">
                            <input v-model="searchQuery" type="text" placeholder="Cari nama barang..." class="w-full border-2 border-gray-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-pink-500 transition duration-150">
                            <span class="absolute left-3.5 top-3.5 text-gray-400 text-sm">🔍</span>
                        </div>
                        <!-- Filter Dropdown -->
                        <select v-model="selectedCategory" class="w-full sm:w-48 border-2 border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:border-pink-500 bg-white transition duration-150">
                            <option value="">Semua Kategori</option>
                            <option v-for="cat in kategori" :key="cat.id" :value="cat.nama_kategori">{{ cat.nama_kategori }}</option>
                        </select>
                    </div>
                    <!-- Add Button -->
                    <button @click="openModal()" class="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition duration-200">
                        + Tambah Barang
                    </button>
                </div>
                
                <!-- Table View -->
                <div class="overflow-x-auto rounded-xl border border-gray-100">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50/70 border-b border-gray-100">
                                <th class="p-4 font-bold text-gray-600 text-sm">Foto</th>
                                <th class="p-4 font-bold text-gray-600 text-sm">Nama Barang</th>
                                <th class="p-4 font-bold text-gray-600 text-sm">Kategori</th>
                                <th class="p-4 font-bold text-gray-600 text-sm">Stok</th>
                                <th class="p-4 font-bold text-gray-600 text-sm">Harga Satuan</th>
                                <th class="p-4 font-bold text-gray-600 text-sm text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filteredBarang" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50/50 transition duration-150">
                                <td class="p-4">
                                    <img v-if="item.gambar" :src="item.gambar" class="w-10 h-10 object-cover rounded-lg border border-pink-100 shadow-sm" alt="Foto">
                                    <span v-else class="text-2xl select-none">{{ getCategoryEmoji(item.nama_kategori) }}</span>
                                </td>
                                <td class="p-4 font-semibold text-gray-800">{{ item.nama_barang }}</td>
                                <td class="p-4">
                                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-100">
                                        {{ item.nama_kategori }}
                                    </span>
                                </td>
                                <td class="p-4">
                                    <span :class="{'px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-100': Number(item.stok) < 10, 'text-gray-700': Number(item.stok) >= 10}">
                                        {{ item.stok }}
                                    </span>
                                </td>
                                <td class="p-4 font-mono text-sm text-gray-600">Rp {{ Number(item.harga).toLocaleString('id-ID') }}</td>
                                <td class="p-4 text-center">
                                    <button @click="openModal(item)" class="text-pink-600 hover:text-pink-900 font-bold mr-4 transition">Edit</button>
                                    <button @click="deleteItem(item.id)" class="text-red-500 hover:text-red-700 font-bold transition">Hapus</button>
                                </td>
                            </tr>
                            <tr v-if="filteredBarang.length === 0">
                                <td colspan="6" class="p-8 text-center text-gray-400">Tidak ada data barang ditemukan.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Modal Add/Edit -->
            <div v-if="showModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition duration-200">
                <div class="bg-white p-6 rounded-2xl w-96 shadow-2xl border border-gray-100 max-w-sm mx-4">
                    <h3 class="font-extrabold text-xl text-gray-900 mb-5">{{ form.id ? 'Edit Data Barang' : 'Tambah Barang Baru' }}</h3>
                    <form @submit.prevent="saveItem" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nama Barang</label>
                            <input v-model="form.nama_barang" placeholder="Contoh: Laptop Asus" class="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:outline-none focus:border-pink-500 transition" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Kategori</label>
                            <select v-model="form.id_kategori" class="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:outline-none focus:border-pink-500 bg-white transition" required>
                                <option value="" disabled selected>Pilih Kategori</option>
                                <option v-for="cat in kategori" :key="cat.id" :value="cat.id">{{ cat.nama_kategori }}</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Stok</label>
                                <input v-model="form.stok" type="number" min="0" placeholder="0" class="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:outline-none focus:border-pink-500 transition" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Harga</label>
                                <input v-model="form.harga" type="number" min="0" placeholder="0" class="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:outline-none focus:border-pink-500 transition" required>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Link Foto Barang (URL)</label>
                            <input v-model="form.gambar" placeholder="Contoh: https://link-foto.com/gambar.jpg" class="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:outline-none focus:border-pink-500 transition">
                        </div>
                        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" @click="showModal=false" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold transition">Batal</button>
                            <button type="submit" class="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            barang: [],
            kategori: [],
            searchQuery: '',
            selectedCategory: '',
            showModal: false,
            form: {
                id: null,
                nama_barang: '',
                id_kategori: '',
                stok: '',
                harga: '',
                gambar: ''
            }
        }
    },
    computed: {
        totalBarang() {
            return this.barang.length;
        },
        totalStok() {
            return this.barang.reduce((sum, item) => sum + Number(item.stok || 0), 0);
        },
        totalAset() {
            return this.barang.reduce((sum, item) => sum + (Number(item.stok || 0) * Number(item.harga || 0)), 0);
        },
        stokMenipis() {
            return this.barang.filter(item => Number(item.stok || 0) < 10).length;
        },
        filteredBarang() {
            return this.barang.filter(item => {
                const matchesSearch = item.nama_barang.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesCategory = this.selectedCategory === '' || item.nama_kategori === this.selectedCategory;
                return matchesSearch && matchesCategory;
            });
        }
    },
    mounted() {
        this.fetchData();
        this.fetchKategori();
    },
    methods: {
        async fetchData() {
            try {
                const res = await axios.get('/barang');
                this.barang = res.data;
            } catch (err) {
                console.error(err);
            }
        },
        async fetchKategori() {
            try {
                const res = await axios.get('/kategori');
                this.kategori = res.data;
            } catch (err) {
                console.error(err);
            }
        },
        getCategoryEmoji(category) {
            const cat = String(category).toLowerCase();
            if (cat.includes('elektronik') || cat.includes('gadget') || cat.includes('hp') || cat.includes('laptop')) return '💻';
            if (cat.includes('tulis') || cat.includes('alat tulis') || cat.includes('buku')) return '✏️';
            if (cat.includes('furnitur') || cat.includes('kursi') || cat.includes('meja') || cat.includes('lemari') || cat.includes('bangku')) return '🪑';
            return '📦';
        },
        openModal(item = null) {
            if (item) {
                this.form = { 
                    id: item.id,
                    nama_barang: item.nama_barang,
                    id_kategori: Number(item.id_kategori),
                    stok: Number(item.stok),
                    harga: Number(item.harga),
                    gambar: item.gambar || ''
                };
            } else {
                this.form = { id: null, nama_barang: '', id_kategori: '', stok: '', harga: '', gambar: '' };
            }
            this.showModal = true;
        },
        async saveItem() {
            try {
                const payload = {
                    nama_barang: this.form.nama_barang,
                    id_kategori: Number(this.form.id_kategori),
                    stok: Number(this.form.stok),
                    harga: Number(this.form.harga),
                    gambar: this.form.gambar
                };

                if (this.form.id) {
                    await axios.put('/barang/' + this.form.id, payload);
                } else {
                    await axios.post('/barang', payload);
                }
                this.showModal = false;
                this.fetchData();
            } catch (e) {
                alert("Terjadi kesalahan simpan: " + (e.response?.data?.message || e.message));
            }
        },
        async deleteItem(id) {
            if (confirm("Hapus barang ini?")) {
                try {
                    await axios.delete('/barang/' + id);
                    this.fetchData();
                } catch (e) {
                    alert("Gagal menghapus barang");
                }
            }
        }
    }
};