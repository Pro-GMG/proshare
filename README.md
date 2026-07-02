📡 ProShare
ProShare, kendi sunucunuz üzerinden çalışan, şifre korumalı, WebRTC tabanlı dosya paylaşım sistemidir. Vercel + WebSocket + WebRTC ile çalışır, PeerJS veya üçüncü parti servislere ihtiyaç duymaz.

🚀 Özellikler
Özellik	Açıklama
Kendi Sunucunuz	Vercel Serverless Functions ile çalışır
Şifre Koruması	Verici şifre belirler, alıcı şifre girmeden bağlanamaz
WebRTC	Dosyalar doğrudan cihazdan cihaza gider (sunucudan geçmez)
Sınırsız Dosya Boyutu	Büyük dosyalar gönderilebilir
Mobil Uyum	Android ve iOS ile çalışır (TURN sunucuları ile)
Sürükle-Bırak	Kolay dosya yükleme
Modern Arayüz	Sade ve şık tasarım
İsim Değiştirme	Cihaz adı değiştirilebilir
📦 Teknolojiler
Teknoloji	Ne işe yarar?
Vercel	Sunucu barındırma (Serverless)
WebSocket	Sinyal sunucusu (cihazları buluşturur)
WebRTC	Doğrudan cihazdan cihaza veri transferi
STUN/TURN	Android ve farklı ağlar için bağlantı
HTML + CSS + JavaScript	Arayüz ve istemci mantığı
📁 Proje Yapısı
text
proshare/
├── api/
│   └── socket.js          # WebSocket sunucusu
├── public/
│   └── index.html         # Ana arayüz
├── package.json           # Bağımlılıklar
└── vercel.json            # Vercel yapılandırması
⚙️ Kurulum
1. Projeyi Klonla
bash
git clone https://github.com/kullaniciadi/proshare.git
cd proshare
2. Bağımlılıkları Yükle
bash
npm install
3. Vercel'e Deploy Et
bash
vercel
Veya GitHub ile otomatik deploy:

GitHub'a push et

Vercel'de repo'yu bağla

Otomatik deploy olsun

🔧 Yapılandırma
vercel.json
json
{
  "functions": {
    "api/socket.js": {
      "runtime": "nodejs20.x"
    }
  }
}
package.json
json
{
  "name": "proshare",
  "version": "1.0.0",
  "dependencies": {
    "ws": "^8.14.2"
  }
}
📱 Kullanım
1. Siteyi Aç
Her cihazdan aynı URL'yi aç:

text
https://proshare-xxx.vercel.app
2. İsmini Belirle
Varsayılan olarak Cihaz-XXX şeklinde otomatik isim alır

"Yeni cihaz adı" yazıp Değiştir ile değiştirebilirsin

3. Şifre Koy (Opsiyonel)
"Bağlantı şifresi" toggle'ını aç

Bir şifre belirle

Alıcı bu şifreyi girmeden bağlanamaz

4. Bağlan
Bağlanmak istediğin cihazın adını yaz

Şifre varsa gir

Bağlan butonuna tıkla

5. Dosya Gönder
Dosyaları sürükle-bırak veya tıkla ve seç

Dosyalar bağlı tüm cihazlara gider

6. Dosyaları İndir
"Gelenler" sekmesine tıkla

İndirmek istediğin dosyanın yanındaki 📥 butonuna tıkla

🔒 Şifre Sistemi Nasıl Çalışır?
text
1. Verici (Cihaz A):
   - Şifre belirler (örn: "1234")
   - "Bağlantı şifresi" toggle'ını açar

2. Alıcı (Cihaz B):
   - Verici'nin adını yazar
   - "Şifre (gerekirse)" alanına şifreyi girer
   - Şifre doğruysa bağlanır

3. Eğer şifre yanlışsa:
   - Bağlantı reddedilir
   - Hata mesajı gösterilir
🧪 Test Etme
Cihaz	Ne yapmalısın?
Bilgisayar	Vercel URL'ini aç
Telefon	Aynı URL'yi aç (aynı Wi-Fi)
Tablet	Aynı URL'yi aç (aynı Wi-Fi)
❓ Sık Sorulan Sorular
1. Dosyalar nereye gidiyor?
Dosyalar doğrudan cihazdan cihaza (WebRTC) gider. Sunucudan geçmez.

2. Büyük dosyalar gönderebilir miyim?
Evet. WebRTC sınırsız dosya boyutunu destekler.

3. Android'de çalışıyor mu?
Evet. TURN sunucuları ile Android uyumlu hale getirildi.

4. Şifreyi unutursam ne olur?
Şifreyi verici cihazda yeniden belirleyebilirsin.

5. Kaç cihaz bağlanabilir?
Sınırsız. WebSocket sunucusu tüm cihazları yönetir.

🛠️ Geliştirme
Yeni Özellik Ekleme
public/index.html'de arayüzü güncelle

api/socket.js'de sunucu mantığını güncelle

GitHub'a push et

Vercel otomatik deploy yapar

Log'ları Görüntüleme
Vercel Dashboard → Proje → Functions → Logs

📝 Lisans
MIT

👨‍💻 Katkıda Bulunun
Fork'la

Yeni bir branch oluştur (git checkout -b yeni-ozellik)

Değişiklikleri commit et (git commit -m 'Yeni özellik eklendi')

Push et (git push origin yeni-ozellik)

Pull Request aç

⚡ Hızlı Başlangıç
bash
# 1. Klonla
git clone https://github.com/kullaniciadi/proshare.git
cd proshare

# 2. Bağımlılıkları yükle
npm install

# 3. Vercel'e deploy et
vercel

# 4. URL'i aç
# https://proshare-xxx.vercel.app
📞 İletişim
Soruların için GitHub üzerinden Issue açabilirsin.

ProShare ile dosya paylaşımı artık çok kolay! 🚀

