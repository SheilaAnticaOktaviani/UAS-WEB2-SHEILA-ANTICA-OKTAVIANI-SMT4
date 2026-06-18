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
<img width="955" height="435" alt="image" src="https://github.com/user-attachments/assets/c599d5bf-1edb-4eab-8aac-5e0f4e5d01b3" />
 


    "username": "admin",
    "password": "password"

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
