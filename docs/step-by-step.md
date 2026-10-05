# Langkah Demi Langkah Membangun Lab

Panduan ini mengasumsikan Anda memiliki lingkungan lokal atau virtual untuk lab. Tujuan utama adalah membangun akses administrasi yang aman, bukan buka port publik secara sembarangan.

## 1. Siapkan jaringan lab

Buat subnet internal seperti:

- `10.10.10.0/24` — jaringan admin
- `10.10.20.0/24` — jaringan Linux target
- `10.10.30.0/24` — jaringan Windows target

Gunakan NAT atau internal-only network agar semua host tidak terhubung langsung ke internet publik.

## 2. Siapkan bastion host

Instal OS minimal yang aman seperti Ubuntu Server atau Debian.

Langkah penting:

- Update OS
- Buat user khusus untuk administrasi
- Pastikan user tidak memiliki hak root
- Instal `openssh-server`, `ufw`, `fail2ban`
- Instal `wireguard` jika memakai VPN

Contoh:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y openssh-server ufw fail2ban wireguard
```

## 3. Aktifkan otentikasi berbasis kunci

Buat pasangan kunci di workstation admin:

```bash
ssh-keygen -t ed25519 -C "admin@lab"
```

Salin kunci publik ke bastion:

```bash
ssh-copy-id admin@bastion
```

Pada bastion, pastikan konfigurasi SSH aman:

```bash
sudo nano /etc/ssh/sshd_config
```

Gunakan opsi berikut:

```text
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin no
MaxAuthTries 3
AllowUsers admin
```

Restart SSH:

```bash
sudo systemctl restart ssh
```

## 4. Aktifkan firewall dan batasi akses

Gunakan `ufw` atau `nftables` untuk membatasi port yang dibuka.

Contoh:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 51820/udp
sudo ufw enable
```

Jika koneksi hanya via VPN, buka port hanya di interface VPN atau hanya dari subnet internal.

## 5. Pasang VPN pada bastion

### WireGuard example

Pada bastion, buat konfigurasi server:

```bash
sudo apt install wireguard
```

Untuk lab kecil, buat interface `wg0` dengan subnet internal seperti `10.10.100.0/24`.

Pada client admin, konfigurasi contoh bisa dilihat di `configs/wireguard-client.conf.example`.

## 6. Siapkan Linux target

Instal OS target Linux. Pastikan semua akses masuk hanya dari bastion.

Langkah:

- Non-root user untuk admin
- `sudo` hanya untuk peran tertentu
- `sshd_config` dibatasi
- firewall internal hanya izinkan port SSH dari bastion subnet

Contoh rule:

```bash
sudo ufw allow from 10.10.10.0/24 to any port 22 proto tcp
sudo ufw enable
```

## 7. Siapkan target Windows

Pada Windows Server / Windows 10 Pro:

- Pastikan Remote Desktop aktif
- aktifkan `Network Level Authentication`
- Batasi user yang diizinkan remote desktop
- Matikan RDP dari internet publik
- Pastikan firewall mengizinkan RDP hanya dari subnet bastion atau VPN

Untuk akses dari Linux, gunakan klien seperti:

```bash
xfreerdp /u:administrator /v:10.10.30.10
```

## 8. Logging dan audit

Instal `auditd` dan aktifkan log sudo/ssh/RDP.

Contoh:

```bash
sudo apt install auditd audispd-plugins
```

Aktifkan log perintah sudo:

```bash
sudo visudo
```

Tambahkan:

```text
Defaults logfile="/var/log/sudo.log"
```

## 9. Uji koneksi

Lakukan langkah berikut:

- Hubungkan ke VPN dari admin workstation
- Login ke bastion via SSH dengan kunci publik
- Dari bastion, masuk ke target Linux lewat SSH
- Dari bastion, akses target Windows via RDP atau WinRM
- Verifikasi log di bastion dan target

## 10. Uji monitoring

Pastikan Anda bisa menangkap:

- login SSH berhasil/gagal
- login RDP
- perubahan konfigurasi penting
- command yang dijalankan sebagai sudo

## Praktik yang disarankan

- Gunakan user non-root untuk login admin
- Batasi perintah sudo
- Terapkan passwordless SSH
- Tahan akses publik untuk seluruh layanan admin
- Simpan semua konfigurasi di repositori versi dan backup

## Kesalahan umum yang harus dihindari

- Membuka port SSH ke internet publik
- Menyimpan password di repositori
- Menggunakan akun administrator default untuk semua akses
- Menggunakan RDP tanpa VPN
- Mengaktifkan VNC tanpa memfilter akses

## Hasil yang diharapkan

Setelah lab ini selesai, Anda akan memiliki lingkungan administrasi jarak jauh yang:

- aman secara default
- hanya dapat diakses melalui mekanisme yang terkontrol
- terdokumentasi dengan jelas
- siap untuk pengujian dan latihan keamanan operasi
