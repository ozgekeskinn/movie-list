# Mini Film / Dizi Listem

Mini Film / Dizi Listem, React ile geliştirilmiş basit ve görsel olarak düzenli bir film/dizi listeleme uygulamasıdır. Projede kullanıcıya hazır bir film ve dizi listesi gösterilir. Her yapım kart şeklinde ekrana basılır ve kart üzerinde yapımın adı, türü, puanı, izlenme durumu, kategori bilgisi ve puana göre oluşturulan kısa yorum yer alır.

Bu proje, React component mantığını, props kullanımını, listeleme işlemlerini, koşullu render yapısını ve temel stil düzenlemelerini öğrenmek amacıyla hazırlanmıştır.

---

## İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Projenin Amacı](#projenin-amacı)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Proje Özellikleri](#proje-özellikleri)
- [Proje Klasör Yapısı](#proje-klasör-yapısı)
- [Component Yapısı](#component-yapısı)
- [Veri Yapısı](#veri-yapısı)
- [Koşullu Render Kullanımı](#koşullu-render-kullanımı)
- [FontAwesome Kullanımı](#fontawesome-kullanımı)
- [CSS ve Tasarım Mantığı](#css-ve-tasarım-mantığı)
- [Proje Nasıl Çalıştırılır?](#proje-nasıl-çalıştırılır)
- [Geliştirilebilir Özellikler](#geliştirilebilir-özellikler)

---

## Proje Hakkında

Bu proje, film ve dizileri kart yapısı ile listeleyen küçük ölçekli bir React uygulamasıdır. Uygulamada her film/dizi bilgisi bir JavaScript object yapısı olarak tutulur. Bu object'ler bir array içinde saklanır ve `map()` metodu ile ekrana dinamik olarak yazdırılır. Projede her yapım için şu bilgiler gösterilir:

- Yapım adı
- Film veya dizi bilgisi
- Tür/kategori bilgisi
- Puan bilgisi
- İzlenme durumu
- Puana göre kısa yorum
- Afiş görseli

Uygulama koyu tema üzerine tasarlanmıştır. Film/dizi kartları, modern bir arayüz görünümü oluşturacak şekilde grid yapısı, rounded card tasarımı, FontAwesome ikonları ve koşullu etiketlerle desteklenmiştir.

---

## Projenin Amacı

Bu projenin temel amacı React'te component tabanlı yapı kurmayı öğrenmektir. Proje küçük görünse de React'in temel konularını pratik etmek için oldukça uygundur. Proje kapsamında amaçlanan başlıca kazanımlar şunlardır:

- React projesi oluşturmak
- Component yapısını anlamak
- Componentleri birbirine bağlamak
- Props ile veri aktarmak
- Array içindeki verileri `map()` ile listelemek
- Koşullu render kullanmak
- Dinamik className kullanımı yapmak
- Görselleri React projesine dahil etmek
- CSS ile kart ve navbar tasarımı oluşturmak
- FontAwesome ikonlarını React içinde kullanmak

---

## Kullanılan Teknolojiler

Bu projede kullanılan temel teknolojiler şunlardır:

| Teknoloji | Açıklama |
| --- | --- |
| React | Component tabanlı kullanıcı arayüzü geliştirmek için kullanıldı. |
| Vite | React projesini hızlı oluşturmak ve çalıştırmak için kullanıldı. |
| JavaScript | Proje mantığı, array yapısı ve koşullu işlemler için kullanıldı. |
| CSS | Sayfa tasarımı, grid yapısı ve kart stilleri için kullanıldı. |
| Bootstrap | Temel hizalama ve yardımcı class yapıları için kullanıldı. |
| FontAwesome | Navbar ve kart detaylarında ikon göstermek için kullanıldı. |

---

## Proje Özellikleri

Projede bulunan temel özellikler şunlardır:

- Film ve dizi listesi gösterme
- Her film/diziyi ayrı kart componenti olarak oluşturma
- Film ve dizi ayrımını etiket olarak gösterme
- İzlenme durumunu `İzledim` / `İzlemedim` şeklinde gösterme
- İzlenme durumuna göre farklı badge tasarımı kullanma
- Puana göre otomatik yorum oluşturma
- Liste boşsa kullanıcıya mesaj gösterme
- Afiş görsellerini `assets` klasöründen çekme
- FontAwesome ikonları ile kart detaylarını daha okunabilir hale getirme
- Koyu tema üzerine modern kart tasarımı oluşturma

---

## Proje Klasör Yapısı

Projenin temel klasör yapısı şu şekildedir:

```text
movie-list/
├── public/
├── src/
│   ├── assets/
│   │   ├── interstellar.jpg
│   │   ├── breaking-bad.jpg
│   │   ├── dark.jpg
│   │   ├── inception.jpg
│   │   ├── queens-gambit.jpg
│   │   ├── stranger-things.jpg
│   │   ├── the-last-of-us.jpg
│   │   ├── sherlock.jpg
│   │   ├── la-la-land.jpg
│   │   ├── the-office.jpg
│   │   ├── shutter-island.jpg
│   │   └── friends.jpg
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MovieList.jsx
│   │   └── MovieCard.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

---

## Component Yapısı

Projede üç temel component bulunmaktadır:

```text
App
├── Header
└── MovieList
    └── MovieCard
```

### App Component

`App.jsx`, uygulamanın ana componentidir. Sayfada hangi componentlerin gösterileceğini belirler. Bu projede `App` componentinin görevi:

- `Header` componentini göstermek
- `MovieList` componentini göstermek
- Sayfanın genel component akışını oluşturmak

---

### Header Component

`Header.jsx`, sayfanın üst kısmındaki navbar alanını oluşturur. Header içinde şu alanlar bulunur:

- Sol tarafta uygulama adı ve film ikonu
- Ortada `Filmler` ve `Diziler` sekmeleri
- Sağ tarafta kullanıcı ikonu

Bu component, sayfanın genel kimliğini ve üst menü görünümünü oluşturur.

---

### MovieList Component

`MovieList.jsx`, film ve dizi verilerinin tutulduğu componenttir. Bu component içinde bir `movies` array'i bulunur. Bu array içindeki her eleman bir film veya dizi object'idir. `map()` metodu ile array dönülür ve her eleman için bir `MovieCard` componenti oluşturulur. MovieList componentinin görevleri:

- Film/dizi verilerini tutmak
- Liste boşsa mesaj göstermek
- Liste doluysa her veri için `MovieCard` oluşturmak
- Film verisini props ile `MovieCard` componentine göndermek

---

### MovieCard Component

`MovieCard.jsx`, tek bir film veya dizi kartını temsil eder. Bu component, `MovieList` componentinden gelen `movieObj` props'unu kullanır. Kart üzerinde yapımın adı, görseli, türü, puanı, izlenme durumu ve yorum bilgisi gösterilir. MovieCard componentinin görevleri:

- Afiş görselini göstermek
- Film/dizi adını göstermek
- Film veya dizi etiketini göstermek
- Tür bilgisini göstermek
- Puan bilgisini göstermek
- İzlenme durumunu koşullu olarak göstermek
- Puana göre yorum üretmek

---

## Veri Yapısı

Projede film ve dizi bilgileri `movies` adlı bir array içinde tutulur. Her bir yapım, object yapısı ile temsil edilir. Örnek veri yapısı:

```js
{
  id: 1,
  title: "Interstellar",
  type: "Film",
  category: "Bilim Kurgu",
  rating: 9.2,
  isWatched: true,
  image: interstellarImg
}
```

Bu object içinde bulunan alanlar şu anlama gelir:

| Alan | Açıklama |
| --- | --- |
| `id` | Her film/dizi için benzersiz kimlik değeridir. |
| `title` | Film veya dizinin adıdır. |
| `type` | Yapımın film mi dizi mi olduğunu belirtir. |
| `category` | Yapımın tür/kategori bilgisidir. |
| `rating` | Yapımın puan değeridir. |
| `isWatched` | Yapımın izlenip izlenmediğini belirtir. |
| `image` | Afiş görselini temsil eder. |

---

## Koşullu Render Kullanımı

Projede koşullu render iki farklı yerde kullanılmıştır.

### 1. Liste Boşsa Mesaj Gösterme

`MovieList` componentinde `movies` array'i kontrol edilir. Eğer liste boşsa kullanıcıya şu mesaj gösterilir:

```text
Henüz film eklenmedi.
```

Liste boş değilse `map()` metodu ile her film/dizi için kart oluşturulur. 

---

### 2. İzlenme Durumuna Göre Yazı Gösterme

`MovieCard` componentinde `isWatched` değeri kontrol edilir.

- `true` ise `İzledim`
- `false` ise `İzlemedim`

şeklinde ekrana yazdırılır. Ayrıca bu değere göre farklı CSS class'ları kullanılarak görsel olarak farklı durum etiketleri oluşturulmuştur.

---

### 3. Puana Göre Yorum Oluşturma

`MovieCard` componentinde `rating` değerine göre özel yorum oluşturulur.

| Puan Aralığı | Gösterilen Yorum |
| --- | --- |
| 9.5 ve üzeri | Favori adayım! |
| 9 ve üzeri | Efsane yapım! |
| 7 ve üzeri | Güzel görünüyor. |
| 7 altı | Boş vaktin varsa izlenir. |

Bu yapı sayesinde her kart kendi puanına göre farklı bir yorum gösterebilir.

---

## FontAwesome Kullanımı

Projede FontAwesome ikonları kullanılmıştır. İkonlar hem navbar bölümünde hem de film kartlarının detay alanlarında yer almaktadır. Kullanılan bazı ikonlar:

| İkon | Kullanıldığı Yer |
| --- | --- |
| `faClapperboard` | Header içinde uygulama logosu yanında |
| `faUser` | Header sağ tarafındaki kullanıcı ikonu |
| `faTag` | Kart içinde tür satırı |
| `faStar` | Kart içinde puan satırı |
| `faCircleCheck` | Kart içinde izlenme durumu satırı |
| `faCommentDots` | Kart içinde yorum satırı |

FontAwesome sayesinde kart detayları daha okunabilir ve görsel olarak daha düzenli hale getirilmiştir.

---

## CSS ve Tasarım Mantığı

Projede koyu tema tercih edilmiştir. Sayfa arka planı siyah, kart ve header alanları ise koyu gri tonlarında tasarlanmıştır. Tasarımda kullanılan temel yaklaşımlar:

- Siyah arka plan
- Koyu gri navbar
- Koyu gri kart tasarımı
- Yuvarlatılmış köşeler
- Kartlarda grid düzeni
- Film afişi ve detay bilgilerinin iki kolon halinde yerleşmesi
- Kırmızı/turuncu vurgu rengi
- Yeşil `İzledim` etiketi
- Turuncu `İzlemedim` etiketi

MovieCard yapısı CSS grid ile iki ana kolona ayrılmıştır:

```text
MovieCard
├── Sol kolon: Afiş görseli
└── Sağ kolon: Başlık, tür, puan, durum ve yorum bilgileri
```

Bu sayede kartlar hem düzenli hem de okunabilir bir yapıya sahip olmuştur.

---

## Proje Nasıl Çalıştırılır?

Projeyi çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### 1. Projeyi bilgisayarınıza klonlayın

```bash
git clone https://github.com/kullanici-adi/movie-list.git
```

### 2. Proje klasörüne girin

```bash
cd movie-list
```

### 3. Gerekli paketleri yükleyin

```bash
npm install
```

### 4. Projeyi başlatın

```bash
npm run dev
```

### 5. Tarayıcıda açın

Terminalde verilen localhost adresini tarayıcıda açın.

---

## Geliştirilebilir Özellikler

Bu proje temel React konularını öğrenmek amacıyla hazırlanmıştır. İlerleyen aşamalarda şu özellikler eklenebilir:

- Film ve dizi filtreleme
- Sadece izlenenleri gösterme
- Sadece izlenmeyenleri gösterme
- Arama çubuğu ekleme
- Yeni film/dizi ekleme formu
- Kart silme özelliği
- Favorilere ekleme özelliği
- LocalStorage ile listeyi kaydetme
- Responsive mobil tasarım geliştirme
- Detay sayfası oluşturma
- Puan sıralama özelliği

---

## Genel Değerlendirme

Mini Film / Dizi Listem projesi, React'in temel yapılarını öğrenmek için hazırlanmış sade ama öğretici bir uygulamadır. Projede component yapısı, props kullanımı, listeleme, koşullu render ve CSS ile modern kart tasarımı gibi konular birlikte uygulanmıştır.

Bu proje sayesinde statik HTML/CSS mantığından React'in component tabanlı yapısına geçiş yapılmış ve verilerin dinamik olarak ekrana basılması öğrenilmiştir.