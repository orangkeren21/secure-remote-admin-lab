# Quick Start Guide - Secure Remote Administration Lab

Panduan cepat untuk setup dan menjalankan dashboard lokal di PC Windows Anda.

## ⚡ 5 Menit Setup

### Step 1: Download dan Install Node.js

1. Kunjungi https://nodejs.org/
2. Download LTS version (rekomendasi)
3. Install dengan default settings
4. Buka PowerShell baru dan verifikasi:

```powershell
node --version
npm --version
```

Harusnya menampilkan versi (misal v18.17.0 dan 9.x.x)

### Step 2: Clone Repository

Buka PowerShell dan jalankan:

```powershell
git clone https://github.com/orangkeren21/secure-remote-admin-lab.git
cd secure-remote-admin-lab
```

**Atau download manual:**
- Kunjungi https://github.com/orangkeren21/secure-remote-admin-lab
- Klik tombol hijau "Code" → "Download ZIP"
- Extract ke folder favorit
- Buka PowerShell di folder tersebut

### Step 3: Install Dependencies

```powershell
npm install
```

Tunggu sampai selesai (biasanya 1-2 menit). Output terakhir harusnya "added XXX packages".

### Step 4: Aktifkan OpenSSH di Windows

Buka PowerShell as Administrator dan jalankan:

```powershell
# Cek status
Get-Service sshd

# Jika belum ada, install
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# Jalankan service
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

Verifikasi:
```powershell
Get-Service sshd
```

Status harus "Running" (hijau).

### Step 5: Update Konfigurasi Host

Edit file `hosts.json` di folder repo:

Ubah bagian ini:
```json
{
  "id": "localhost",
  "name": "Local Windows PC",
  "host": "127.0.0.1",
  "port": 22,
  "username": "LILAI PC",
  "password": "your-password-here",
  ...
}
```

Menjadi:
```json
{
  "id": "localhost",
  "name": "Local Windows PC",
  "host": "127.0.0.1",
  "port": 22,
  "username": "YourUsername",
  "password": "YourPassword",
  ...
}
```

**Dimana:**
- `YourUsername` = username login Windows Anda (cek di: Win+I → Accounts → Your Info)
- `YourPassword` = password akun Windows Anda

### Step 6: Jalankan Dashboard

Di PowerShell (di folder repo):

```powershell
npm start
```

Output akan menunjukkan:
```
Remote admin lab dashboard running at http://localhost:3000
```

**Jangan tutup PowerShell ini!** Biarkan tetap berjalan.

### Step 7: Buka Dashboard di Browser

Buka browser favorit (Chrome, Firefox, Edge) dan kunjungi:

```
http://localhost:3000
```

Dashboard akan tampil dengan:
- Sidebar kiri (Navigation)
- Dashboard tab aktif
- Status server

## 🎮 Coba Koneksi Terminal

### Via Dashboard

1. Klik tab **Terminal** di sidebar
2. Di dropdown **Host**, pilih "Local Windows PC"
3. Klik tombol **Connect**
4. Tunggu 2-3 detik hingga "Connected" muncul
5. Terminal akan tampil dengan prompt PowerShell

Ketik perintah:
```powershell
whoami
```

Jika berhasil, nama user Anda akan tampil di terminal!

### Via Manual (Optional)

Buka PowerShell baru dan coba:
```powershell
ssh localhost
```

Harus berhasil connect. Ketik `exit` untuk keluar.

## ✅ Checklist Berhasil

Jika semua langkah berikut berhasil, setup Anda sudah lengkap:

- [ ] Node.js installed (cek: `node --version`)
- [ ] Repository cloned/downloaded
- [ ] Dependencies installed (`npm install` berhasil)
- [ ] OpenSSH running (Get-Service sshd = Running)
- [ ] hosts.json updated dengan username/password Anda
- [ ] Dashboard running (`npm start` berjalan)
- [ ] Dashboard accessible (http://localhost:3000 terbuka)
- [ ] Manual SSH works (`ssh localhost` berhasil)
- [ ] Terminal koneksi berhasil via dashboard
- [ ] Perintah PowerShell berhasil dijalankan

## 🚨 Troubleshooting Cepat

### Dashboard tidak muncul di browser

**Cek:**
1. Apakah PowerShell masih menjalankan `npm start`?
2. Apakah URL benar? (http://localhost:3000)
3. Coba refresh browser (F5)

**Solusi:**
- Stop server: Ctrl+C di PowerShell
- Jalankan lagi: `npm start`
- Buka browser baru: http://localhost:3000

### "Connection refused" saat koneksi terminal

**Cek:**
1. Apakah SSH server aktif?
   ```powershell
   Get-Service sshd
   ```
   Harus status "Running"

2. Apakah bisa SSH manual?
   ```powershell
   ssh localhost
   ```
   Harus berhasil

**Solusi:**
```powershell
Start-Service sshd
```

### "Port 3000 is already in use"

**Solusi:**
```powershell
netstat -ano | findstr :3000
```

Cari PID yang mendengarkan port 3000, lalu:
```powershell
taskkill /PID <PID> /F
```

Lalu jalankan `npm start` lagi.

### Terminal tidak bisa ketik perintah

**Cek:**
1. Apakah koneksi sudah berhasil? (status harus hijau "Connected...")
2. Apakah cursor ada di terminal? (Klik di terminal area)

**Solusi:**
- Klik tombol **Disconnect**
- Tunggu 1 detik
- Klik **Connect** lagi

## 📚 Langkah Berikutnya

Setelah setup dasar berhasil, Anda bisa:

### 1. Belajar Lab Security
- Baca: `docs/security-hardening.md`
- Implementasikan SSH key-based auth
- Setup firewall rules

### 2. Setup Lab Multi-Host
- Baca: `docs/step-by-step.md`
- Install VirtualBox
- Buat 3 VM (Bastion, Linux Target, Windows Target)
- Konfigurasi jaringan internal

### 3. Eksplorasi Dashboard
- Klik tab **Dashboard** untuk overview
- Klik tab **Hosts** untuk melihat list host
- Eksperimen dengan berbagai perintah di Terminal

## 🔐 Keamanan Dasar

**PENTING: Jangan simpan password di `hosts.json` untuk sistem production!**

Untuk lab testing dengan PC lokal Anda, boleh. Tapi jika setup di jaringan lebih luas:

1. **Gunakan SSH Key**
   ```powershell
   ssh-keygen -t ed25519
   ```

2. **Edit hosts.json:**
   ```json
   "password": "",
   "privateKeyPath": "C:\\Users\\YourUsername\\.ssh\\id_ed25519"
   ```

3. **Aktifkan key-based auth di SSH server**

Baca lebih lanjut di: `docs/security-hardening.md`

## 📞 Butuh Bantuan?

1. **Cek PowerShell output** - Error message biasanya jelas
2. **Cek hosts.json** - Pastikan username/password benar
3. **Baca docs/** - Dokumentasi lengkap ada di sana
4. **Test manual** - Gunakan `ssh localhost` untuk diagnosa

## 🎯 Target Penguasaan

Setelah menyelesaikan Quick Start ini, Anda sudah bisa:

✅ Setup dan menjalankan dashboard lokal
✅ Koneksi via browser terminal
✅ Eksekusi perintah jarak jauh via SSH
✅ Memahami flow SSH + WebSocket + Terminal

Selanjutnya, Anda siap untuk:
- Setup multi-host dengan VirtualBox
- Implementasi security hardening
- Belajar network segmentation
- Praktik administrasi sistem yang aman

---

**Happy Learning!** 🚀

Jika ada pertanyaan atau masalah, cek dokumentasi lengkap:
- README.md - Overview umum
- docs/ - Panduan teknis mendalam
- Atau tanya di GitHub Issues

