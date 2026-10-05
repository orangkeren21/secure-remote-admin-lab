# Remote Administration Stack

Stack yang direkomendasikan untuk lab ini berfokus pada akses jarak jauh yang sah, aman, dan terkontrol.

## Pilihan stack

### 1. SSH + Bastion
SSH adalah fondasi dalam administrasi Linux yang aman.

Kelebihan:
- Enkripsi kuat
- Integrasi dengan kunci publik
- Mendukung port forwarding dan tunneling
- Banyak digunakan di lingkungan server

Konfigurasi yang disarankan:
- `PasswordAuthentication no`
- `PubkeyAuthentication yes`
- `PermitRootLogin no`
- `AllowUsers adminuser`
- `ListenAddress 10.0.10.10`
- `ClientAliveInterval 300`
- `ClientAliveCountMax 2`

### 2. WireGuard untuk jaringan privat
WireGuard sangat cocok untuk tunnel point-to-point dan antar node.

Contoh penggunaan:
- Admin laptop -> bastion host
- Bastion host -> target internal
- Target internal -> monitoring node

Keuntungan:
- Rendah overhead
- Konfigurasi sederhana
- Kecepatan tinggi
- Enkripsi modern

### 3. OpenVPN sebagai alternatif stabil
OpenVPN tetap valid untuk lab jika Anda menggunakan infrastruktur yang lebih kompleks.

Gunakan jika:
- Anda membutuhkan skenario multi-user dan PKI yang lebih ekstensif
- Infrastruktur organisasi lebih besar
- Diperlukan protokol client yang sudah familiar

### 4. RDP untuk Windows
Remote Desktop Protocol adalah alat resmi untuk administrasi Windows.

Poin utama:
- Aktifkan NLA
- Batasi akses hanya dari VPN internal
- Jangan membuka port publik
- Gunakan account non-admin untuk operasi biasa

### 5. xrdp dan FreeRDP
Untuk mengelola desktop Linux atau Windows dari sistem berbasis Linux, `xrdp` dan `FreeRDP` adalah alat yang layak dipertimbangkan.

- `xrdp` untuk desktop Linux berbasis GUI
- `xfreerdp` untuk klien Linux cepat dan stabil
- Sesi GUI harus disensor dan dibatasi haknya

### 6. VNC (opsional)
VNC cocok untuk kebutuhan akses desktop GUI namun harus diatur dengan hati-hati.

Catatan keamanan:
- Tidak buka ke internet
- Gunakan SSH tunnel
- Gunakan password yang kuat atau auth berbasis token

### 7. WinRM / PowerShell Remoting
Windows dapat dikelola secara aman dengan PowerShell Remoting.

Cara aman:
- Gunakan HTTPS atau koneksi dalam VPN
- Batasi host yang dapat terhubung
- Gunakan run-as dengan peran minimum

## Arsitektur rekomendasi

### Skema A: Bastion hanya
Semua akses masuk lewat bastion. Target tidak memiliki port publik. Ini adalah model yang paling aman.

### Skema B: VPN + tunnel internal
VPN membentuk jaringan privat, lalu SSH/RDP dibuat melalui internal only.

### Skema C: Hybrid dengan jump host khusus
Bastion untuk admin umum; mesin khusus lain untuk target yang sensitif. Ini cocok untuk lab bertingkat.

## Tools yang digunakan di lab

- `ssh`, `scp`, `sftp`
- `wireguard`, `wg-quick`
- `ufw` atau `nftables`
- `fail2ban`
- `auditd`, `journald`
- `xfreerdp`, `rdesktop`, `xrdp`
- `PowerShell Remoting` untuk Windows

## Rekomendasi final

Untuk lab yang sederhana namun aman, kombinasi berikut paling efektif:

- WireGuard untuk traffic terenkripsi
- SSH key-based access ke bastion
- RDP melalui VPN ke Windows target
- SSH ke Linux target melalui bastion
- Firewall minimal dan monitoring log

Ini membentuk lingkungan yang aman, mudah dipelihara, dan sesuai dengan prinsip least privilege.
