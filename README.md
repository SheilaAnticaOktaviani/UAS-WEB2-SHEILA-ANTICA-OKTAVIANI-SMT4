# UAS-WEB2-SHEILA-ANTICA-OKTAVIANI-SMT4

# Backend API Sistem Manajemen Barang

## Ujian Akhir Semester (UAS)

---

## Deskripsi Proyek

Backend API Sistem Manajemen Barang merupakan aplikasi berbasis **CodeIgniter 4** yang dikembangkan sebagai bagian dari tugas **Ujian Akhir Semester (UAS)**. Sistem ini menyediakan layanan **RESTful API** yang berfungsi sebagai backend untuk mengelola data barang serta proses autentikasi pengguna.

API dibangun menggunakan konsep **Model-View-Controller (MVC)** sehingga memiliki struktur kode yang terorganisir, mudah dipelihara, dan mudah dikembangkan. Seluruh komunikasi data menggunakan format **JSON**, sehingga backend dapat diintegrasikan dengan berbagai platform frontend seperti website maupun aplikasi mobile.

---

# Tujuan Pengembangan

Tujuan dari pengembangan sistem ini adalah:

- Mengimplementasikan konsep REST API menggunakan CodeIgniter 4.
- Menerapkan arsitektur MVC pada pengembangan aplikasi backend.
- Mengelola data barang melalui operasi CRUD (Create, Read, Update, Delete).
- Menyediakan layanan autentikasi pengguna.
- Menjadi backend yang siap diintegrasikan dengan aplikasi frontend.

---
# Teknologi yang Digunakan

| Teknologi | Keterangan |
|------------|------------|
| PHP 8.x | Bahasa pemrograman backend |
| CodeIgniter 4 | Framework PHP |
| MySQL | Database |
| Composer | Dependency Manager |
| REST API | Komunikasi antar sistem |
| JSON | Format pertukaran data |

---
# Fitur Sistem

Sistem menyediakan beberapa layanan utama, yaitu:

- Autentikasi Login
- Menampilkan seluruh data barang
- Menampilkan detail barang
- Menambahkan data barang
- Mengubah data barang
- Menghapus data barang
- Response API dalam format JSON
- Struktur kode berbasis MVC

---
Aplikasi akan berjalan pada:

```
http://localhost:8080
```
# Dokumentasi Login
<img width="953" height="447" alt="image" src="https://github.com/user-attachments/assets/3b83e4f1-d90b-4500-9ee3-70ad32c3f83c" />

# Tampilan Dashboard sebagai admin
<img width="952" height="440" alt="image" src="https://github.com/user-attachments/assets/eebcc545-f464-4c72-bcf4-5e276a61e074" />

# Tampilan Dashboard sebagai user
<img width="950" height="440" alt="image" src="https://github.com/user-attachments/assets/eee08ec3-fa99-4921-adcc-7d4c40be4ff0" />

# Tampilan ketika ingin membeli barang
<img width="952" height="432" alt="image" src="https://github.com/user-attachments/assets/c5b1e36f-0098-41a6-8699-1ad26e131c98" />

# Tampilan Tambahkan barang baru
<img width="949" height="440" alt="image" src="https://github.com/user-attachments/assets/f652d3c9-1ffa-4aa6-b75b-a1c1bb328844" />

    "username : "budi"
    "password: "password123"
---

# Login admin
    "username": "admin"
    "password": "admin"

# Link Hosting Wesite 
https://sheilaantica.ct.ws/#/

---

### Data Barang

| Method | Endpoint | Fungsi |
|---------|----------|--------|
| GET | /api/barang | Menampilkan seluruh data barang |
| GET | /api/barang/{id} | Menampilkan detail barang |
| POST | /api/barang | Menambahkan barang |
| PUT | /api/barang/{id} | Mengubah data barang |
| DELETE | /api/barang/{id} | Menghapus data barang |

---

# Arsitektur Sistem

Alur kerja sistem adalah sebagai berikut:

1. Client mengirimkan request HTTP ke endpoint API.
2. Request diterima oleh Controller.
3. Controller melakukan validasi data.
4. Controller memanggil Model untuk berinteraksi dengan database.
5. Database mengembalikan hasil proses.
6. Controller mengirimkan response dalam format JSON kepada client.

---

---

# Kesimpulan

Backend API Sistem Manajemen Barang berhasil dikembangkan menggunakan framework CodeIgniter 4 dengan menerapkan konsep RESTful API dan arsitektur MVC. Sistem mampu menyediakan layanan autentikasi serta pengelolaan data barang melalui operasi CRUD sehingga dapat digunakan sebagai backend yang siap diintegrasikan dengan berbagai aplikasi frontend.

---
