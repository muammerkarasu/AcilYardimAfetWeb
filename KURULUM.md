# Acil Yardım Afet Web - Kurulum Rehberi

## Gereksinimler

Projeyi çalıştırmak için aşağıdaki yazılımlara ihtiyacınız vardır:

- Node.js (v14 veya üzeri)
- npm (v6 veya üzeri)
- Git

## Kurulum Adımları

1. Bu depoyu bilgisayarınıza klonlayın:

   ```
   git clone <repo-url>
   ```

2. Proje dizinine gidin:

   ```
   cd AcilYardimAfetWeb
   ```

3. Gerekli paketleri yükleyin:

   ```
   npm install
   ```

4. Firebase yapılandırması için `.env` dosyası oluşturun:
   `.env.example` dosyasını `.env` olarak kopyalayın ve kendi Firebase ve Mapbox bilgilerinizle doldurun.

   ```
   REACT_APP_FIREBASE_API_KEY=your-api-key-here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain-here
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id-here
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket-here
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id-here
   REACT_APP_FIREBASE_APP_ID=your-app-id-here
   REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id-here
   REACT_APP_MAPBOX_TOKEN=your-mapbox-token-here
   ```

5. Uygulamayı başlatın:

   ```
   npm start
   ```

   veya Windows'ta:

   ```
   starter.bat
   ```

   Uygulama http://localhost:3000 adresinde çalışacaktır.

## Firebase Yapılandırması

1. [Firebase Console](https://console.firebase.google.com/) üzerinden yeni bir proje oluşturun.
2. Kimlik Doğrulama (Authentication) bölümünden "E-posta/Şifre" yöntemini etkinleştirin.
3. Firestore Database'i oluşturun ve kurallarını yapılandırın.
4. Storage hizmetini etkinleştirin ve kurallarını yapılandırın.
5. Proje ayarlarından web uygulaması için Firebase yapılandırmasını alın ve `.env` dosyasına ekleyin.

## Mapbox Yapılandırması

1. [Mapbox](https://www.mapbox.com/) hesabı oluşturun.
2. Erişim token'ı oluşturun.
3. Token'ı `.env` dosyasına `REACT_APP_MAPBOX_TOKEN` değişkeni olarak ekleyin.

## Derleme

Uygulamayı production için derlemek için:

```
npm run build
```

Derlenen dosyalar `build` klasöründe oluşturulacaktır.
