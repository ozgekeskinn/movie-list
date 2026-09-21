<div align="center">
  <img src="src/assets/branding/film-dizi-listem-logo.png" alt="Film / Dizi Listem" width="420" />

  <h1>Film / Dizi Listem</h1>

  <p>
    React ve TMDB API ile geliştirilen; film ve dizileri keşfetmeyi,
    detaylarını incelemeyi ve kişisel izleme listesi oluşturmayı sağlayan
    modern bir frontend uygulaması.
  </p>
</div>

---

## İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Öne Çıkan Özellikler](#öne-çıkan-özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Uygulama Sayfaları](#uygulama-sayfaları)
- [TMDB API Entegrasyonu](#tmdb-api-entegrasyonu)
- [LocalStorage Yapısı](#localstorage-yapısı)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Çalıştırma Komutları](#çalıştırma-komutları)
- [Uygulama Akışı](#uygulama-akışı)
- [Teknik Notlar](#teknik-notlar)

---

## Proje Hakkında

**Film / Dizi Listem**, kullanıcıların güncel film ve dizileri keşfedebildiği, içerik detaylarını görüntüleyebildiği ve beğendiği yapımları kendi listesine ekleyebildiği bir React uygulamasıdır.

Uygulamadaki film ve dizi verileri **TMDB API** üzerinden dinamik olarak alınır. Kullanıcının oluşturduğu kişisel liste ve favoriler ise tarayıcıdaki **LocalStorage** üzerinde saklanır. Böylece sayfa yenilendiğinde veya uygulama yeniden açıldığında liste verileri korunur.

Proje; React component yapısı, routing, API entegrasyonu, asenkron veri yönetimi, URL parametreleri, pagination ve tarayıcı tarafında kalıcı veri saklama gibi temel frontend konularını uygulamalı olarak bir araya getirir.

---

## Öne Çıkan Özellikler

- TMDB API üzerinden güncel film verilerinin alınması
- Popüler filmlerin listelenmesi
- En yüksek puanlı filmlerin gösterilmesi
- Yakında vizyona girecek filmlerin gösterilmesi
- Popüler dizilerin ayrı bir sayfada listelenmesi
- Film ve dizi detay sayfaları
- Film arama özelliği
- Arama sonuçlarında pagination
- Popüler film ve dizi sayfalarında pagination
- Film ve dizileri kişisel listeye ekleme
- Aynı içeriğin listeye tekrar eklenmesini engelleme
- İçerikleri **İzledim / İzlemedim** olarak işaretleme
- Listeyi izlenme durumuna göre filtreleme
- Favori listesi oluşturma
- Listeden ve favorilerden içerik kaldırma
- Tüm kişisel listeyi temizleme
- LocalStorage ile kalıcı veri saklama
- Loading ve hata durumlarının kullanıcıya gösterilmesi
- Geçersiz route'lar için 404 sayfası
- Responsive arayüz
- Film ve dizi detaylarında afiş, arka plan, puan, tür ve açıklama bilgilerinin gösterilmesi

---

## Kullanılan Teknolojiler

| Teknoloji             | Kullanım Amacı                                 |
| --------------------- | ---------------------------------------------- |
| **React 19**          | Component tabanlı kullanıcı arayüzü            |
| **React Router**      | Sayfalar ve dinamik detay route'ları           |
| **Vite**              | Geliştirme ve build altyapısı                  |
| **JavaScript (ES6+)** | Uygulama mantığı ve veri işlemleri             |
| **TMDB API**          | Film ve dizi verilerinin alınması              |
| **Fetch API**         | HTTP isteklerinin gerçekleştirilmesi           |
| **LocalStorage**      | Kişisel liste ve favorilerin kalıcı saklanması |
| **Bootstrap 5**       | Yardımcı arayüz sınıfları                      |
| **Font Awesome**      | Arayüz ikonları                                |
| **CSS3**              | Özel tasarım ve responsive düzen               |

---

## Uygulama Sayfaları

### Anasayfa

Anasayfa TMDB API üzerinden üç farklı film grubunu paralel olarak yükler:

- Popüler Filmler
- En Yüksek Puanlı Filmler
- Yakında Gösterimde

İstekler `Promise.all()` kullanılarak birlikte başlatılır. Her bölümde ilk 5 içerik gösterilir.

### Filmler

`/movies` route'u üzerinden güncel popüler filmler görüntülenir.

Sayfa numarası URL query parametresiyle yönetilir:

```text
/movies?page=2
```

### Diziler

`/series` route'u üzerinden güncel popüler diziler görüntülenir.

Film sayfasında kullanılan pagination mantığı diziler için de uygulanır:

```text
/series?page=2
```

### Film Detayı

Dinamik route:

```text
/movies/:id
```

Film detay ekranında afiş, backdrop görseli, puan, yayın tarihi, süre, türler, açıklama, orijinal başlık, orijinal dil ve oy sayısı görüntülenir. Film doğrudan bu ekrandan kişisel listeye eklenebilir.

### Dizi Detayı

Dinamik route:

```text
/series/:id
```

Dizi detay ekranında afiş, backdrop görseli, puan, ilk yayın tarihi, sezon sayısı, bölüm sayısı, türler, açıklama, orijinal ad, orijinal dil ve oy sayısı görüntülenir. Diziler de doğrudan kişisel listeye eklenebilir.

### Arama

Arama sayfası URL üzerinden sorguyu taşır:

```text
/search?q=inception
```

Arama sonuçları TMDB'nin film arama servisi üzerinden alınır ve pagination desteklenir.

> Mevcut sürümde arama özelliği film aramasına odaklıdır.

### Listem

`/my-list` sayfası kullanıcının eklediği film ve dizileri tek bir kişisel listede gösterir.

Bu sayfada kullanıcı:

- Tüm içerikleri görüntüleyebilir
- Sadece izlediklerini filtreleyebilir
- Sadece izlemediklerini filtreleyebilir
- İzlenme durumunu değiştirebilir
- İçeriği favorilere ekleyebilir
- İçeriği listeden silebilir
- Tüm listeyi temizleyebilir

Favoriler bölümü açılıp kapanabilen ayrı bir alan olarak sunulur.

---

## TMDB API Entegrasyonu

API işlemleri merkezi olarak şu dosyada yönetilir:

```text
src/services/tmdbApi.js
```

Kullanılan temel servisler:

```text
/movie/popular
/movie/top_rated
/movie/upcoming
/movie/:id
/search/movie
/tv/popular
/tv/:id
```

Uygulama TMDB isteklerinde Türkçe içerik tercih eder:

```js
language: "tr-TR";
```

Yakında gösterime girecek filmler için ayrıca Türkiye bölgesi kullanılır:

```js
region: "TR";
```

Tüm istekler ortak `request()` fonksiyonu üzerinden gerçekleştirilir. Bu yapı Authorization header oluşturma, response kontrolü ve JSON dönüşümünü tek noktada yönetir.

---

## LocalStorage Yapısı

Kişisel liste ve favoriler `App.jsx` içerisinde React state ile yönetilir ve değişiklik oldukça LocalStorage'a yazılır.

Kullanılan anahtarlar:

```text
movieSeriesList
favoriteMovieSeriesList
```

Uygulama ilk açıldığında kayıtlı veriler okunarak state başlangıç değeri oluşturulur.

Film ve dizilerin TMDB ID değerleri aynı olabileceği için uygulama içindeki benzersiz ID şu şekilde oluşturulur:

```js
id: `${mediaType}-${mediaDetails.id}`;
```

Örneğin:

```text
movie-123
tv-123
```

Bu sayede aynı sayısal TMDB ID değerine sahip farklı medya türlerinin birbiriyle çakışması engellenir.

---

## Proje Yapısı

```text
movie-list/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   └── branding/
│   │       └── film-dizi-listem-logo.png
│   │
│   ├── components/
│   │   ├── AddMovieForm.jsx
│   │   ├── ApiMovieCard.jsx
│   │   ├── ApiSeriesCard.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieList.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchForm.jsx
│   │   └── WatchList.jsx
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Movies.jsx
│   │   ├── MyList.jsx
│   │   ├── NotFound.jsx
│   │   ├── SearchResult.jsx
│   │   ├── Series.jsx
│   │   └── SeriesDetails.jsx
│   │
│   ├── services/
│   │   └── tmdbApi.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

### Klasörlerin Sorumlulukları

- **components/**: Tekrar kullanılabilir kullanıcı arayüzü bileşenleri
- **pages/**: Route seviyesindeki sayfalar
- **layouts/**: Ortak navbar ve sayfa yerleşimi
- **services/**: TMDB API iletişimi
- **assets/**: Logo ve görsel dosyaları
- **App.jsx**: Route tanımları, kişisel liste state'i ve LocalStorage yönetimi

---

## Kurulum

Projeyi klonlayın:

```bash
git clone https://github.com/ozgekeskinn/movie-list.git
```

Proje klasörüne geçin:

```bash
cd movie-list
```

Bağımlılıkları yükleyin:

```bash
npm install
```

Ardından proje kök dizininde `.env` dosyası oluşturun ve TMDB erişim tokenınızı ekleyin.

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Terminalde gösterilen local adresi tarayıcıda açın.

---

## Ortam Değişkenleri

Proje TMDB erişim tokenını doğrudan kaynak kodda tutmaz.

Proje kök dizininde:

```text
.env
```

dosyası oluşturun:

```env
VITE_TMDB_ACCESS_TOKEN=TMDB_ACCESS_TOKENINIZ
```

Uygulamada token şu şekilde okunur:

```js
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
```

`.env` dosyası `.gitignore` içerisinde yer aldığı için Git deposuna dahil edilmez.

> API tokenlarını doğrudan JavaScript dosyalarına veya GitHub reposuna eklemeyin.

---

## Çalıştırma Komutları

Projeyi geliştirme ortamında başlatmak için:

```bash
npm run dev
```

---

## Uygulama Akışı

```text
TMDB API
   │
   ▼
src/services/tmdbApi.js
   │
   ├── Popüler Filmler
   ├── Yüksek Puanlı Filmler
   ├── Yakında Gösterimde
   ├── Film Arama
   ├── Film Detayı
   ├── Popüler Diziler
   └── Dizi Detayı
          │
          ▼
React Sayfaları ve Component'leri
          │
          ├── Listeme Ekle
          ├── İzledim / İzlemedim
          └── Favorilere Ekle
                  │
                  ▼
              App.jsx
                  │
                  ▼
              LocalStorage
```

---

## Teknik Notlar

### Ortak Film / Dizi Veri Yapısı

TMDB'den gelen film ve dizi nesnelerinin alan adları farklı olabildiği için kişisel listeye ekleme sırasında veriler ortak bir yapıya dönüştürülür.

Film alanları:

```js
title;
original_title;
```

Dizi alanları:

```js
name;
original_name;
```

Uygulama `mediaType` değerine göre doğru alanı kullanır:

```js
const isSeries = mediaType === "tv";
```

Kişisel listedeki medya tipi ayrıca `movie` veya `tv` olarak saklanır.

### Duplicate Kontrolü

Aynı film veya dizinin tekrar eklenmesi şu iki bilgi birlikte kontrol edilerek engellenir:

```text
TMDB ID + mediaType
```

### URL Tabanlı Pagination

Filmler, diziler ve arama sonuçlarında aktif sayfa URL query parametresinde tutulur:

```text
?page=2
```

Bu sayede sayfa bilgisi URL ile senkron kalır.

### Loading ve Error State

API kullanan sayfalarda veri yüklenme ve hata durumları ayrı component'lerle yönetilir:

```text
Loading.jsx
ErrorMessage.jsx
```

---

## Repository

GitHub:

```text
https://github.com/ozgekeskinn/movie-list
```

---

<div align="center">
  <strong>Film / Dizi Listem</strong><br />
  React + TMDB API ile geliştirilmiştir.
</div>
