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
<img width="953" height="443" alt="image" src="https://github.com/user-attachments/assets/9bb3a54b-c93a-4dc6-bef4-fdbd6ae4d4f9" />

# Tampilan Dashboard sebagai user
<img width="953" height="440" alt="image" src="https://github.com/user-attachments/assets/12882401-cff3-48a6-a600-67d23c49a23a" />

# Tampilan ketika ingin membeli barang
<img width="952" height="430" alt="image" src="https://github.com/user-attachments/assets/dd28f975-e431-41e0-8379-1db732c138c4" />

# Tampilan Tambahkan barang baru
<img width="951" height="441" alt="image" src="https://github.com/user-attachments/assets/5f3b5c83-9c71-4f0f-ace8-d98f3b6193e4" />

# Login user 
    "username : "budi"
    "password: "password123"
---

# Login admin
    "username": "admin"
    "password": "admin123"

# Link Hosting Wesite 
https://sensational-profiterole-734848.netlify.app/

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
