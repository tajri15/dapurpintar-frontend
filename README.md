DapurPintar Frontend 🍽️
Ini adalah antarmuka pengguna (frontend) untuk aplikasi DapurPintar, dibangun menggunakan React dan Vite. Aplikasi ini menyediakan UI yang bersih dan interaktif bagi pengguna untuk mengelola "dapur" virtual mereka, menemukan resep yang bisa dimasak, dan melihat detail instruksi memasak.

✨ Fitur Utama
Antarmuka Modern: Dibangun dengan React dan Vite untuk pengalaman pengguna yang cepat dan responsif.

Navigasi Multi-Halaman: Menggunakan React Router untuk halaman Login, Registrasi, Pantry, dan Detail Resep.

Manajemen State Global: Menggunakan React Context untuk mengelola status autentikasi pengguna di seluruh aplikasi.

Manajemen Pantry Interaktif: Pengguna bisa menambah dan menghapus bahan secara real-time tanpa perlu me-refresh halaman.

Penemuan Resep Visual: Menampilkan hasil pencarian resep dalam format kartu yang menarik dan mudah dinavigasi.

Halaman Detail Resep: Halaman khusus untuk menampilkan gambar, daftar bahan, dan instruksi memasak yang terformat dengan baik.

🛠️ Teknologi yang Digunakan
Library: React 18

Build Tool: Vite

Routing: React Router DOM

HTTP Client: Axios

State Management: React Context

🚀 Instalasi & Setup Lokal
Penting: Pastikan backend DapurPintar API sudah berjalan di http://127.0.0.1:8000 sebelum menjalankan frontend.

Clone repositori ini:

git clone https://github.com/NAMA_ANDA/dapurpintar-frontend.git
cd dapurpintar-frontend

Install dependensi NPM:

npm install

Jalankan server development:

npm run dev

Aplikasi sekarang berjalan di http://localhost:5173 (atau port lain yang tersedia).