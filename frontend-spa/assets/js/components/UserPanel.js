const UserPanel = {
    template: `
        <div class="space-y-8">
            <!-- Header Catalog -->
            <div class="bg-gradient-to-r from-pink-500 to-rose-600 p-8 rounded-3xl text-white shadow-xl text-center relative overflow-hidden">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <h2 class="text-3xl font-extrabold tracking-wide flex items-center justify-center gap-2">
                    ✨ E-Catalog UAS
                </h2>
                <p class="text-pink-100 mt-2 font-medium">Temukan produk berkualitas dengan harga bersahabat & stok terjamin.</p>
            </div>

            <!-- Filter Area -->
            <div class="p-6 bg-white rounded-3xl shadow-xl border border-pink-50/50">
                <div class="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
                    <div class="relative w-full sm:w-80">
                        <input v-model="searchQuery" type="text" placeholder="Cari barang impian Anda..." class="w-full border-2 border-gray-100 pl-10 pr-4 py-3 rounded-2xl focus:outline-none focus:border-pink-500 transition duration-150">
                        <span class="absolute left-3.5 top-4 text-gray-400 text-sm">🔍</span>
                    </div>
                    <select v-model="selectedCategory" class="w-full sm:w-56 border-2 border-gray-200 px-4 py-3 rounded-2xl focus:outline-none focus:border-pink-500 bg-white transition duration-150">
                        <option value="">Semua Kategori</option>
                        <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                </div>

                <!-- Product Catalog Card Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="item in filteredBarang" :key="item.id" class="bg-white rounded-3xl overflow-hidden border border-pink-50 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex flex-col">
                        <!-- Card Image Area (Using category gradients, custom images or fallback emojis) -->
                        <div class="h-48 relative overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100/30">
                            <!-- Floating Category Badge -->
                            <span class="absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-bold bg-white/90 text-pink-700 shadow-sm border border-pink-100 z-10">
                                {{ item.nama_kategori }}
                            </span>
                            <!-- Custom Image if exists, otherwise Emoji Fallback -->
                            <img v-if="item.gambar" :src="item.gambar" class="w-full h-full object-cover transform hover:scale-105 transition duration-300" alt="Foto Produk">
                            <div v-else class="w-full h-full flex items-center justify-center">
                                <span class="text-7xl filter drop-shadow-md select-none">
                                    {{ getCategoryEmoji(item.nama_kategori) }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Card Body Content -->
                        <div class="p-6 flex-1 flex flex-col justify-between">
                            <div class="space-y-2.5 mb-4">
                                <!-- Product Name -->
                                <h3 class="text-xl font-extrabold text-gray-800 tracking-tight">{{ item.nama_barang }}</h3>
                                
                                <!-- Stock Status Indicator -->
                                <div class="flex items-center">
                                    <span v-if="Number(item.stok) > 10" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        ● Ready ({{ item.stok }} unit)
                                    </span>
                                    <span v-else-if="Number(item.stok) > 0" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                                        ● Terbatas ({{ item.stok }} unit)
                                    </span>
                                    <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                                        ● Habis
                                    </span>
                                </div>
                            </div>

                            <!-- Price & Button Actions -->
                            <div class="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <div class="flex flex-col">
                                    <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Harga Jual</span>
                                    <span class="text-xl font-black text-pink-600">Rp {{ Number(item.harga).toLocaleString('id-ID') }}</span>
                                </div>
                                <button v-if="Number(item.stok) > 0" @click="openBuyModal(item)" class="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-4 py-2.5 rounded-2xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-1.5 font-bold text-sm">
                                    🛒 Beli
                                </button>
                                <button v-else disabled class="bg-gray-100 text-gray-400 px-4 py-2.5 rounded-2xl font-bold text-sm cursor-not-allowed">
                                    Habis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="filteredBarang.length === 0" class="py-16 text-center">
                    <span class="text-5xl">🛍️</span>
                    <h3 class="text-lg font-bold text-gray-500 mt-4">Katalog barang kosong atau tidak cocok.</h3>
                </div>
            </div>

            <!-- Buy Modal (Checkout Simulator) -->
            <div v-if="showBuyModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition duration-200">
                <div class="bg-white p-6 rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 relative max-h-[90vh] flex flex-col">
                    <button @click="showBuyModal=false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold z-10">×</button>
                    
                    <div class="mb-2">
                        <h3 class="font-black text-2xl text-gray-900 flex items-center gap-2">🛍️ Formulir Pesanan</h3>
                        <p class="text-gray-500 text-sm mt-1 border-b border-gray-100 pb-3">Konfirmasi produk dan jumlah yang ingin dipesan.</p>
                    </div>
                    
                    <div class="space-y-4 overflow-y-auto pr-1 flex-1">
                        <!-- Product Info Summary -->
                        <div class="bg-pink-50/30 p-4 rounded-2xl border border-pink-100/50 flex gap-4">
                            <div class="w-12 h-12 rounded-xl overflow-hidden shadow-sm bg-white flex items-center justify-center">
                                <img v-if="buyingItem.gambar" :src="buyingItem.gambar" class="w-full h-full object-cover" alt="Foto">
                                <span v-else class="text-3xl select-none">{{ getCategoryEmoji(buyingItem.nama_kategori) }}</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-800">{{ buyingItem.nama_barang }}</h4>
                                <p class="text-xs text-gray-500">{{ buyingItem.nama_kategori }}</p>
                                <p class="text-sm font-extrabold text-pink-600 mt-1">Rp {{ Number(buyingItem.harga).toLocaleString('id-ID') }}</p>
                            </div>
                        </div>

                        <!-- User Name Input -->
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nama Anda</label>
                            <input v-model="customerName" type="text" placeholder="Masukkan nama lengkap Anda" class="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:outline-none focus:border-pink-500 transition" required>
                        </div>

                        <!-- Address Input -->
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Alamat Pengiriman</label>
                            <textarea v-model="customerAddress" class="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:outline-none focus:border-pink-500 transition" placeholder="Masukkan alamat lengkap untuk pengiriman barang" rows="2" required></textarea>
                        </div>

                        <!-- Quantity Selector -->
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Jumlah Pesanan (Maksimal {{ buyingItem.stok }})</label>
                            <input v-model="buyQuantity" type="number" min="1" :max="buyingItem.stok" class="w-full border-2 border-gray-100 p-2.5 rounded-xl focus:outline-none focus:border-pink-500 transition" required>
                        </div>

                        <!-- Payment Method Selector -->
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Metode Pembayaran</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label class="flex items-center justify-center p-3 rounded-2xl border-2 cursor-pointer transition duration-150" :class="paymentMethod === 'cod' ? 'border-pink-500 bg-pink-50/30 text-pink-700 font-bold' : 'border-gray-100 text-gray-500'">
                                    <input type="radio" v-model="paymentMethod" value="cod" class="sr-only">
                                    💵 COD (Di Tempat)
                                </label>
                                <label class="flex items-center justify-center p-3 rounded-2xl border-2 cursor-pointer transition duration-150" :class="paymentMethod === 'tf' ? 'border-pink-500 bg-pink-50/30 text-pink-700 font-bold' : 'border-gray-100 text-gray-500'">
                                    <input type="radio" v-model="paymentMethod" value="tf" class="sr-only">
                                    🏦 Transfer (TF)
                                </label>
                            </div>
                        </div>

                        <!-- Bank Account Details (Conditional) -->
                        <div v-if="paymentMethod === 'tf'" class="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 text-xs text-gray-600 space-y-1.5 animate-fadeIn">
                            <p class="font-bold text-gray-700 flex items-center gap-1">🏦 Info Rekening Bank:</p>
                            <div class="bg-white p-2.5 rounded-xl border border-gray-100 font-mono text-sm font-extrabold text-gray-800 flex justify-between items-center">
                                <span>BCA: 7701234567</span>
                            </div>
                            <p class="text-gray-500">Atas Nama: <span class="font-semibold text-gray-700">Sheila Antica Oktaviani</span></p>
                            <p class="text-[10px] text-gray-400 font-medium">⚠️ Harap lampirkan bukti transfer saat mengirim pesan WhatsApp.</p>
                        </div>

                        <!-- Total Calculation -->
                        <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-sm font-bold text-gray-600">Total Pembayaran:</span>
                            <span class="text-2xl font-black text-pink-600">Rp {{ totalOrderCost.toLocaleString('id-ID') }}</span>
                        </div>

                        <!-- CTA WhatsApp Action -->
                        <button @click="sendWhatsAppOrder" :disabled="!customerName || !customerAddress || buyQuantity < 1" class="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center gap-2 mt-4 text-base">
                            💬 Kirim Pesanan via WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            barang: [],
            searchQuery: '',
            selectedCategory: '',
            showBuyModal: false,
            buyingItem: {},
            buyQuantity: 1,
            customerName: '',
            customerAddress: '',
            paymentMethod: 'cod'
        }
    },
    computed: {
        uniqueCategories() {
            const categories = this.barang.map(item => item.nama_kategori);
            return [...new Set(categories)].filter(Boolean);
        },
        filteredBarang() {
            return this.barang.filter(item => {
                const matchesSearch = item.nama_barang.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesCategory = this.selectedCategory === '' || item.nama_kategori === this.selectedCategory;
                return matchesSearch && matchesCategory;
            });
        },
        totalOrderCost() {
            return (this.buyingItem.harga || 0) * (this.buyQuantity || 1);
        }
    },
    mounted() {
        this.fetchPublicData();
    },
    methods: {
        async fetchPublicData() {
            try {
                const res = await axios.get('/public-barang');
                this.barang = res.data;
            } catch (err) {
                console.error("Gagal memuat katalog barang:", err);
            }
        },
        getCategoryEmoji(category) {
            const cat = String(category).toLowerCase();
            if (cat.includes('elektronik') || cat.includes('gadget') || cat.includes('hp') || cat.includes('laptop')) return '💻';
            if (cat.includes('tulis') || cat.includes('alat tulis') || cat.includes('buku')) return '✏️';
            if (cat.includes('furnitur') || cat.includes('kursi') || cat.includes('meja') || cat.includes('lemari') || cat.includes('bangku')) return '🪑';
            return '📦';
        },
        openBuyModal(item) {
            this.buyingItem = item;
            this.buyQuantity = 1;
            this.customerName = localStorage.getItem('nama_lengkap') || '';
            this.customerAddress = localStorage.getItem('alamat') || '';
            this.showBuyModal = true;
        },
        sendWhatsAppOrder() {
            const phoneNumber = '6285178152157'; // Format internasional diperlukan (kode negara 62)
            const paymentText = this.paymentMethod === 'tf' ? 'Transfer' : 'COD';
            const textMessage = `Halo Admin, saya ingin beli *${this.buyingItem.nama_barang}* (${this.buyQuantity} unit).\n\n*Nama Pemesan:* ${this.customerName}\n*Alamat Kirim:* ${this.customerAddress}\n*Pembayaran:* ${paymentText}\n*Total:* *Rp ${this.totalOrderCost.toLocaleString('id-ID')}*.`;

            const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;
            window.open(waUrl, '_blank');
            this.showBuyModal = false;
        }
    }
};
