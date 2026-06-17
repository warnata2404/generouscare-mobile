# Laporan Pembaruan Aplikasi Mobile GenerousCare (UI/UX & Auth)

Halo Tim! 👋

Dokumen ini merangkum seluruh pembaruan signifikan yang baru saja diimplementasikan pada repositori `generouscare-mobile`. Perubahan ini berfokus pada **peningkatan *User Experience* (UX), penyesuaian tata letak antarmuka (UI), serta perbaikan keamanan autentikasi**. 

Silakan jadikan dokumen ini sebagai acuan (*changelog*) untuk memahami arsitektur UI/UX kita yang baru.

---

## 1. Perbaikan Kritis: Penyimpanan Sesi Login (Supabase) 🔒
Sebelumnya, token sesi dari pengguna tidak disimpan di memori permanen. Hal ini menyebabkan sebuah *bug* di mana pengguna akan selalu ter-logout secara paksa setiap kali mereka menutup penuh aplikasi (*kill app*).

- **Apa yang Berubah**: Kami telah mengonfigurasi *adapter* `expo-secure-store` pada *client* Supabase.
- **Dampak**: 
  - Token login kini terenkripsi dan disimpan dengan standar keamanan tertinggi ke dalam *Keychain* (iOS) atau *Keystore* (Android).
  - Pengguna hanya perlu *login* satu kali. Sesi akan bertahan walaupun aplikasi ditutup dan dibuka kembali.
- **Berkas yang Diubah**: `lib/supabase.ts`

---

## 2. Restrukturisasi Bottom Tabs Navigasi 📱
Sebelumnya, kita menempatkan terlalu banyak menu di *Bottom Tab Bar*, yang membuatnya terlalu padat (*crowded*) dan melanggar prinsip *best practice* desain *mobile* (idealnya 3-5 item maksimal).

- **Apa yang Berubah**: 
  - Tab dikurangi dari 6 menu menjadi 4 menu utama: **Dashboard, Donasi, Pengeluaran, dan Profil**.
  - Halaman **Pusat Notifikasi** dan **Tracker Dana** dikeluarkan dari folder `(tabs)` dan diubah menjadi *Stack Screen* biasa.
  - Untuk mengakses Notifikasi, kami menambahkan ikon Lonceng di sudut kanan atas Header `Dashboard`.
  - Untuk mengakses Tracker, kami menambahkan tombol "Tracker" di sebelah metrik "Dana Tersalurkan" pada halaman `Dashboard`.
- **Berkas yang Diubah**: `app/(tabs)/_layout.tsx`, `app/(tabs)/dashboard.tsx`, perpindahan lokasi `notifications.tsx` & `tracker.tsx`.

---

## 3. Sistem "Toast" Notifikasi yang Lebih Modern 🍞
Sebelumnya, aplikasi sering mengandalkan fitur `Alert.alert` bawaan sistem operasi yang bersifat kaku dan memblokir layar pengguna, misalnya ketika memunculkan peringatan wajib isi form atau sekadar pesan "Berhasil".

- **Apa yang Berubah**: 
  - Menginstal *library* `react-native-toast-message`.
  - Mengganti hampir seluruh `Alert.alert` (kecuali untuk validasi aksi berisiko seperti *Logout*) menjadi notifikasi *Toast* berdesain mulus yang muncul sekilas dari atas layar.
- **Dampak**: Memberikan kesan aplikasi yang jauh lebih modern dan tidak menginterupsi (*non-blocking*) alur kerja pengguna.
- **Berkas yang Diubah**: `app/_layout.tsx` (konfigurasi global), form input donasi/pengeluaran (`DonationForm.tsx`, `ExpenseForm.tsx`), serta halaman otentikasi.

---

## 4. Perlindungan Tata Letak dengan "Safe Area" 🛡️
Di *smartphone* modern, terdapat "poni" (*notch*) kamera atau *status bar* tebal yang seringkali menutupi elemen antarmuka jika desain tidak disesuaikan.

- **Apa yang Berubah**: 
  - Menambahkan pembungkus global `<SafeAreaProvider>`.
  - Mengonversi semua komponen `<View>` utama pada *root* layar menjadi `<SafeAreaView>`.
- **Dampak**: Teks dan komponen kita kini dipastikan selalu berada di zona aman layar, tanpa khawatir terpotong oleh ujung melengkung HP atau *status bar* jam/baterai.
- **Berkas yang Diubah**: Hampir seluruh halaman utama di dalam `app/`.

---

## 5. Peningkatan Pengalaman Form Login & Register ✨
Form otentikasi adalah layar pertama yang berinteraksi dengan pengguna. Kami memastikan pengalamannya sempurna untuk ukuran layar sekecil apa pun.

- **Dukungan Virtual Keyboard**: Kami membungkus *form* dengan `KeyboardAvoidingView` sehingga saat pengguna mengetik, *form* akan bergeser ke atas dan tidak tertutup oleh tombol *keyboard*.
- **Toggle Tampilkan Password (Ikon Mata)**: Menambahkan tombol berbentuk ikon mata untuk menampilkan/menyembunyikan kata sandi. Ini sangat esensial untuk mencegah kesalahan pengetikan di HP genggam.
- **Indikator Interaktif (Focus Ring)**: Saat kotak input (email/nama/password) disentuh/diklik, warna garis pembatasnya (*border*) akan berubah secara otomatis menjadi warna biru aktif. Ini memandu visual pengguna bahwa kotak tersebut sedang aktif untuk diketik.
- **Berkas yang Diubah**: `app/login.tsx`, `app/register.tsx`.

---

*Dengan seluruh perubahan di atas, basis kode UI/UX kita kini sudah mencapai standar aplikasi tingkat produksi (production-ready). Jangan ragu jika ada pertanyaan terkait implementasinya di kode!*
