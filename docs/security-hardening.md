# Security Hardening untuk Remote Administration

Dokumen ini menyoroti praktik terbaik untuk memperkuat lab administrasi jarak jauh agar aman.

## 1. Hardening SSH

File `/etc/ssh/sshd_config`:

```text
Port 22
Protocol 2
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin no
AllowUsers admin
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
PrintMotd no
Subsystem sftp internal-sftp
```

Contoh lengkap ada di `configs/sshd_config.example`.

## 2. Fail2ban

Instal fail2ban untuk memblokir brute-force.

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

Konfigurasi standar biasanya sudah cukup untuk SSH.

## 3. Firewall

Gunakan `ufw` atau `nftables` untuk default deny. Hanya buka porta yang memang diperlukan.

Contoh:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 10.10.10.0/24 to any port 22 proto tcp
sudo ufw allow 51820/udp
sudo ufw enable
```

## 4. Bantuan MFA

Untuk keamanan tambahan, aktifkan MFA pada bastion atau VPN.

Pilihan populer:

- YubiKey
- pam_google_authenticator
- Duo Security
- Azure MFA
- IdP internal seperti FreeIPA atau Keycloak

## 5. Penguatan akun admin

- Tidak gunakan akun root untuk login jarak jauh
- Sediakan akun admin terpisah untuk operasi pemeliharaan
- Gunakan `sudo` dengan rule yang ketat

Contoh `sudoers`:

```sudoers
admin ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart ssh, /usr/bin/systemctl restart fail2ban
```

## 6. Windows hardening

Pada sistem Windows:

- Non-admin account untuk tugas harian
- Aktifkan NLA untuk RDP
- Hapus user default yang tidak dipakai
- Batasi akses Group Policy
- Aktifkan auditing login dan koneksi remote

## 7. Audit dan logging

Sistem ini harus mencatat:

- login SSH gagal/berhasil
- login RDP
- penggunaan `sudo`
- perubahan konfigurasi yang krusial
- kebijakan firewall

Direkomendasikan:

- `journald` untuk sistem Linux
- `auditd` untuk audit perintah dan file
- log central untuk semua target

## 8. Perangkat lunak yang aman dan relevan

Gunakan perangkat lunak berikut yang memang dirancang untuk administrasi jarak jauh yang sah:

- OpenSSH
- Linux `sudo`
- WireGuard / OpenVPN
- xrdp
- FreeRDP
- Microsoft Remote Desktop
- WinRM / PowerShell Remoting
- Fail2ban
- UFW / nftables

### Dihindari

- Aplikasi remote support yang tidak terdokumentasi
- Tool yang berdiri sendiri tanpa kontrol otorisasi dan log audit
- Akses yang dibuka ke seluruh internet tanpa pembatasan

## 9. Praktik kendali akses

Gunakan prinsip berikut:

- least privilege
- role-based access control
- segmented network
- approval sebelum akses admin ke sistem produksi
- rotasi credential secara berkala

## 10. Checklist keamanan

Sebelum lab dianggap selesai, cek semua item berikut:

- [ ] SSH key-based authentication aktif
- [ ] Password login dinonaktifkan
- [ ] Root SSH dinonaktifkan
- [ ] Firewall default deny
- [ ] Port publik dibatasi seminimal mungkin
- [ ] Bastion host satu-satunya titik masuk
- [ ] VPN aktif sebelum akses internal
- [ ] Logging dan audit aktif
- [ ] MFA dipasang di bastion atau VPN
- [ ] User admin memiliki hak minimum

Ini adalah fondasi keamanan yang sehat untuk remote administration dalam lab atau lingkungan yang Anda kendalikan sendiri.
