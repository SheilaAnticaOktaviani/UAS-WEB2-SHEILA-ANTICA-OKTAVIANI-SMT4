const Dashboard = {
    template: `
        <div class="p-6 bg-white rounded-xl shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Daftar Inventaris</h2>
                <button @click="openModal()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">+ Barang Baru</button>
            </div>
            
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-3">Nama Barang</th>
                        <th class="p-3">Kategori</th>
                        <th class="p-3">Stok</th>
                        <th class="p-3">Harga</th>
                        <th class="p-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in barang" :key="item.id" class="border-b hover:bg-gray-50">
                        <td class="p-3">{{ item.nama_barang }}</td>
                        <td class="p-3">{{ item.nama_kategori }}</td>
                        <td class="p-3">{{ item.stok }}</td>
                        <td class="p-3">Rp {{ item.harga.toLocaleString('id-ID') }}</td>
                        <td class="p-3 text-center">
                            <button @click="openModal(item)" class="text-blue-600 font-bold mr-3">Edit</button>
                            <button @click="deleteItem(item.id)" class="text-red-600 font-bold">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Modal -->
            <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded-lg w-96">
                    <h3 class="font-bold text-lg mb-4">{{ form.id ? 'Edit Data' : 'Tambah Data' }}</h3>
                    <form @submit.prevent="saveItem">
                        <input v-model="form.nama_barang" placeholder="Nama Barang" class="w-full border p-2 mb-2 rounded" required>
                        <input v-model="form.id_kategori" type="number" placeholder="ID Kategori" class="w-full border p-2 mb-2 rounded" required>
                        <input v-model="form.stok" type="number" placeholder="Stok" class="w-full border p-2 mb-2 rounded" required>
                        <input v-model="form.harga" type="number" placeholder="Harga" class="w-full border p-2 mb-4 rounded" required>
                        <div class="flex justify-end gap-2">
                            <button type="button" @click="showModal=false" class="bg-gray-300 px-4 py-2 rounded">Batal</button>
                            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return { barang: [], showModal: false, form: {} }
    },
    mounted() { this.fetchData(); },
    methods: {
        async fetchData() {
            try {
                const res = await axios.get('/barang');
                this.barang = res.data;
            } catch (err) { console.error(err); }
        },
        openModal(item = null) {
            this.form = item ? { ...item } : {};
            this.showModal = true;
        },
        async saveItem() {
            try {
                if (this.form.id) await axios.put('/barang/' + this.form.id, this.form);
                else await axios.post('/barang', this.form);
                this.showModal = false;
                this.fetchData();
            } catch (e) { alert("Terjadi kesalahan simpan"); }
        },
        async deleteItem(id) {
            if (confirm("Hapus barang ini?")) {
                await axios.delete('/barang/' + id);
                this.fetchData();
            }
        }
    }
};