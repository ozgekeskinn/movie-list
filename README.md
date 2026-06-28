# Film / Dizi Listem

**Film / Dizi Listem**, React ile geliştirilmiş, kullanıcıların film ve dizi listesini görüntüleyebildiği, yeni içerik ekleyebildiği, içerikleri silebildiği, izlenme durumunu değiştirebildiği, filtreleme yapabildiği ve favori/watchlist listesi oluşturabildiği küçük ölçekli bir web uygulamasıdır.

---

## İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Projenin Amacı](#projenin-amacı)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Proje Özellikleri](#proje-özellikleri)
- [Proje Klasör Yapısı](#proje-klasör-yapısı)
- [Component Yapısı](#component-yapısı)
- [State Yönetimi](#state-yönetimi)
- [Veri Yapısı](#veri-yapısı)
- [Film Ekleme Mantığı](#film-ekleme-mantığı)
- [Film Silme Mantığı](#film-silme-mantığı)
- [İzlenme Durumu Güncelleme](#izlenme-durumu-güncelleme)
- [Filtreleme Mantığı](#filtreleme-mantığı)
- [Watchlist / Favoriler Mantığı](#watchlist--favoriler-mantığı)
- [Koşullu Render Kullanımı](#koşullu-render-kullanımı)
- [FontAwesome Kullanımı](#fontawesome-kullanımı)
- [CSS ve Tasarım Mantığı](#css-ve-tasarım-mantığı)
- [Proje Nasıl Çalıştırılır?](#proje-nasıl-çalıştırılır)
- [Geliştirilebilir Özellikler](#geliştirilebilir-özellikler)
- [Genel Sonuç](#genel-sonuç)

---

## Proje Hakkında

Bu uygulama, film ve dizileri kart yapısı ile listeleyen bir React projesidir. Projede başlangıçta hazır bir film/dizi verisi bulunmaktadır. Bu veriler `data.js` dosyasında tutulur ve uygulamanın ilk açılışında ekrana kartlar halinde yazdırılır.

Uygulama yalnızca statik listeleme yapmaz. Kullanıcı arayüz üzerinden yeni film ekleyebilir, listedeki bir filmi silebilir, filmin izlenme durumunu değiştirebilir, yalnızca izlenenleri veya izlenmeyenleri filtreleyebilir ve istediği filmi favoriler/watchlist alanına ekleyebilir.

Bu nedenle proje, React'te state değiştiğinde arayüzün otomatik olarak güncellenmesini gözlemlemek için oldukça uygun bir örnektir.

---

## Projenin Amacı

Bu projenin temel amacı, React'te component tabanlı uygulama geliştirme mantığını öğrenmek ve özellikle state yönetimini pratik etmektir. Proje kapsamında öğrenilen başlıca konular şunlardır:

- React projesi oluşturma
- Vite ile hızlı geliştirme ortamı kurma
- Component mantığını anlama
- Componentler arasında props ile veri gönderme
- `useState` hook'unu kullanma
- Form inputlarını state ile kontrol etme
- Kullanıcıdan alınan veriyi listeye ekleme
- Array üzerinde `map()`, `filter()` ve spread operator kullanma
- Film silme işlemi yapma
- İzlenme durumunu değiştirme
- Listeyi filtreleme
- Favori/watchlist listesi oluşturma
- Koşullu render kullanma
- Dinamik className kullanımı
- FontAwesome ikonlarını React içinde kullanma
- CSS ile modern kart tasarımı oluşturma

---

## Kullanılan Teknolojiler

| Teknoloji | Açıklama |
| --- | --- |
| React | Kullanıcı arayüzünü component tabanlı oluşturmak için kullanıldı. |
| Vite | React projesini hızlı oluşturmak ve geliştirme sunucusunda çalıştırmak için kullanıldı. |
| JavaScript | Uygulama mantığı, state işlemleri, array metotları ve event yönetimi için kullanıldı. |
| CSS | Sayfa düzeni, kart tasarımı, navbar, form ve buton stilleri için kullanıldı. |
| Bootstrap | Header alanında hizalama ve yardımcı class yapıları için kullanıldı. |
| FontAwesome | Navbar, kart detayları ve favori butonu için ikon kullanımında tercih edildi. |
| npm | Proje bağımlılıklarını yönetmek için kullanıldı. |

---

## Proje Özellikleri

Projede bulunan temel özellikler şunlardır:

- Film ve dizi listesini kart yapısında gösterme
- Başlangıç verilerini `data.js` dosyasından alma
- Her film/diziyi ayrı `MovieCard` componenti olarak oluşturma
- Yeni film ekleme
- Film adı ve kategori bilgisini inputlardan alma
- Eklenen filmi mevcut listenin sonuna ekleme
- Film silme
- Tüm listeyi temizleme
- İzlenme durumunu değiştirme
- `İzledim` ve `İzlemedim` durumlarını görsel badge olarak gösterme
- Tüm filmleri listeleme
- Sadece izlenenleri filtreleme
- Sadece izlenmeyenleri filtreleme
- Favori/watchlist alanına film ekleme
- Favori/watchlist listesinden film çıkarma
- Header üzerinde favori sayısını gösterme
- Favori ikonuna tıklayınca watchlist alanını açıp kapatma
- Puana göre otomatik yorum üretme
- Liste boşsa kullanıcıya bilgilendirme mesajı gösterme
- Koyu tema üzerine modern kart tasarımı oluşturma

---

## Proje Klasör Yapısı

Projenin temel klasör yapısı şu şekildedir:

```text
movie-list/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
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
│   │   ├── AddMovieForm.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── Header.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieList.jsx
│   │   └── WatchList.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── data.js
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## Component Yapısı

Projede component yapısı genel olarak aşağıdaki gibidir:

```text
App
├── Header
├── AddMovieForm
├── FilterButtons
├── WatchList
└── MovieList
    └── MovieCard
```

Bu yapı sayesinde proje daha okunabilir, yönetilebilir ve geliştirilebilir hale getirilmiştir. Her componentin farklı bir görevi vardır.

---

### App Component

`App.jsx`, uygulamanın ana componentidir. Projedeki ana state'ler burada tutulur ve diğer componentlere props aracılığıyla gönderilir. `App` componentinin başlıca görevleri şunlardır:

- Film listesini state olarak tutmak
- Aktif filtre bilgisini state olarak tutmak
- Watchlist/favori listesini state olarak tutmak
- Watchlist alanının açık veya kapalı olmasını yönetmek
- Film ekleme fonksiyonunu tanımlamak
- Film silme fonksiyonunu tanımlamak
- İzlenme durumunu değiştiren fonksiyonu tanımlamak
- Tüm filmleri temizleyen fonksiyonu tanımlamak
- Watchlist'e film ekleyen fonksiyonu tanımlamak
- Watchlist'ten film çıkaran fonksiyonu tanımlamak
- Alt componentlere gerekli verileri ve fonksiyonları props ile göndermek

Bu projede state yönetiminin merkezi `App.jsx` dosyasıdır.

---

### Header Component

`Header.jsx`, sayfanın üst kısmındaki navbar alanını oluşturur. Header componenti `children` props'u alır. Böylece header içine yerleştirilecek içerik `App.jsx` tarafında belirlenir. Header alanında şu yapılar bulunur:

- Sol tarafta uygulama adı ve film ikonu
- Orta alanda `Filmler` ve `Diziler` menü yazıları
- Sağ tarafta favori ikonu ve kullanıcı ikonu
- Favori ikonunun yanında watchlist'e eklenen film sayısı

Bu component, sayfanın genel kimliğini ve üst menü görünümünü oluşturur.

---

### AddMovieForm Component

`AddMovieForm.jsx`, kullanıcıdan yeni film bilgisi almak için oluşturulmuştur. Bu component içinde iki ayrı input bulunmaktadır:

- Film adı
- Film kategorisi

Bu componentte `title` ve `category` değerleri ayrı state'lerde tutulur. Kullanıcı inputlara yazı yazdıkça state güncellenir. Form gönderildiğinde yeni bir film object'i oluşturulur ve `onAddMovie` fonksiyonu ile `App` componentine gönderilir. Yeni eklenen filmin varsayılan değerleri şu şekildedir:

```js
{
  id: Date.now(),
  title,
  category,
  rating: 0,
  isWatched: false,
  image: ""
}
```

Burada `Date.now()` değeri yeni film için benzersiz bir `id` oluşturmak amacıyla kullanılmıştır.

---

### FilterButtons Component

`FilterButtons.jsx`, liste üzerinde filtreleme yapmak için kullanılan butonları içerir. Bu componentte bulunan butonlar şunlardır:

- `Tümü`
- `İzledim`
- `İzlemedim`
- `Tümünü Sil`

`filterButton` state'i hangi butonun aktif olduğunu belirler. Aktif butona göre farklı CSS class'ı uygulanır. Bu sayede kullanıcı hangi filtrenin seçili olduğunu görsel olarak anlayabilir.

---

### MovieList Component

`MovieList.jsx`, film listesini ekrana yazdıran componenttir. Bu component, `movies` verisini props olarak alır ve aktif filtre değerine göre listeyi düzenler. 

Daha sonra `filteredMovies` dizisi `map()` metodu ile dönülür ve her film için bir `MovieCard` componenti oluşturulur.

---

### MovieCard Component

`MovieCard.jsx`, tek bir film veya dizi kartını temsil eder. Kart üzerinde film/diziye ait bilgiler gösterilir. MovieCard içinde gösterilen bilgiler şunlardır:

- Afiş görseli
- Film/dizi adı
- Film/dizi türü
- Kategori bilgisi
- Puan bilgisi
- İzlenme durumu
- Puana göre oluşturulan yorum
- Sil butonu
- Watchlist'e ekleme butonu
- Watchlist içinde görüntüleniyorsa çıkar butonu

Bu component hem ana liste içinde hem de watchlist alanında tekrar kullanılmaktadır. Bu, React'te component tekrar kullanılabilirliğine güzel bir örnektir.

---

### WatchList Component

`WatchList.jsx`, favorilere eklenen filmleri ayrı bir bölümde gösterir. Kullanıcı ana listedeki kalp ikonuna tıkladığında ilgili film watchlist listesine eklenir. WatchList componentinin görevleri şunlardır:

- Favorilere eklenen filmleri göstermek
- Her favori film için `MovieCard` componentini kullanmak
- Favorilerdeki film için `Çıkar` butonu göstermek
- Kullanıcı film çıkardığında ilgili filmi watchlist listesinden silmek

Watchlist alanı, headerdaki kalp ikonuna tıklanarak açılıp kapatılır.

---

## State Yönetimi

Bu projede state yönetimi React'in `useState` hook'u ile yapılmıştır. State, uygulama içinde değişebilen verileri tutar. Bir state değiştiğinde React ilgili componentleri yeniden render eder ve arayüz otomatik olarak güncellenir. Projede kullanılan ana state'ler şunlardır:

```js
const [movies, setMovies] = useState(movieData);
const [filterButton, setFilterButton] = useState("all");
const [watchListMovies, setWatchListMovies] = useState([]);
const [isWatchListOpen, setIsWatchListOpen] = useState(false);
```

Bu state'lerin görevleri aşağıdaki gibidir:

| State | Görevi |
| --- | --- |
| `movies` | Ana film/dizi listesini tutar. |
| `filterButton` | Aktif filtre değerini tutar. |
| `watchListMovies` | Favorilere/watchlist'e eklenen filmleri tutar. |
| `isWatchListOpen` | Watchlist bölümünün açık mı kapalı mı olduğunu tutar. |

---

### movies State'i

`movies` state'i uygulamadaki ana film listesidir. Başlangıç değeri olarak `data.js` dosyasından gelen `movieData` kullanılır. Bu state üzerinde şu işlemler yapılır:

- Yeni film ekleme
- Film silme
- İzlenme durumunu değiştirme
- Tüm listeyi temizleme
- Filtreleme için veri kaynağı olarak kullanma

---

### filterButton State'i

`filterButton`, hangi filtre butonunun aktif olduğunu tutar. Alabileceği değerler şunlardır:

| Değer | Anlamı |
| --- | --- |
| `all` | Tüm filmler gösterilir. |
| `watched` | Sadece izlenen filmler gösterilir. |
| `unwatched` | Sadece izlenmeyen filmler gösterilir. |

---

### watchListMovies State'i

`watchListMovies`, kullanıcının favorilere eklediği filmleri tutar. Başlangıçta boş bir array'dir. Kullanıcı bir filmi favorilere eklediğinde bu array güncellenir.

---

### isWatchListOpen State'i

`isWatchListOpen`, watchlist bölümünün görünür olup olmadığını kontrol eder.

- `false` ise watchlist görünmez.
- `true` ise watchlist ekranda görünür.

Headerdaki kalp ikonuna tıklanınca bu değer tersine çevrilir.

---

## Veri Yapısı

Projede hazır film ve dizi verileri `src/data.js` dosyasında tutulur. Her film/dizi bir object olarak tanımlanmıştır. Örnek veri yapısı:

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

Bu object içindeki alanların anlamları şunlardır:

| Alan | Açıklama |
| --- | --- |
| `id` | Her film/dizi için benzersiz kimlik değeridir. |
| `title` | Film veya dizinin adıdır. |
| `type` | İçeriğin film mi dizi mi olduğunu belirtir. |
| `category` | Tür/kategori bilgisidir. |
| `rating` | Puan değeridir. |
| `isWatched` | İzlenme durumunu belirtir. |
| `image` | Afiş görselini temsil eder. |

---

## Film Ekleme Mantığı

Film ekleme işlemi `AddMovieForm` componenti üzerinden yapılır. Kullanıcı film adı ve kategori bilgisini girer. Form gönderildiğinde `handleSubmit` fonksiyonu çalışır. Film ekleme sürecinin adımları şunlardır:

1. Kullanıcı inputlara film adı ve kategori yazar.
2. Input değerleri `title` ve `category` state'lerinde tutulur.
3. Form submit edildiğinde sayfanın yenilenmesi `e.preventDefault()` ile engellenir.
4. Yeni bir film object'i oluşturulur.
5. Oluşturulan object `onAddMovie` fonksiyonu ile `App` componentine gönderilir.
6. `App.jsx` içindeki `handleAddMovie` fonksiyonu çalışır.
7. Yeni film mevcut `movies` array'inin sonuna eklenir.
8. Input alanları temizlenir.

Film ekleyen fonksiyon şu şekildedir:

```js
function handleAddMovie(movie) {
  setMovies((movies) => [...movies, movie]);
  setFilterButton("all");
}
```

Burada spread operator kullanılarak eski liste korunur ve yeni film listenin sonuna eklenir.

---

## Film Silme Mantığı

Film silme işlemi `MovieCard` componentindeki `Sil` butonu ile yapılır. Sil butonuna tıklandığında ilgili filmin `id` değeri üst componente gönderilir. Silme işlemini yapan fonksiyon:

```js
function handleDeleteMovie(id) {
  setMovies((movies) => movies.filter((i) => i.id !== id));
}
```

Bu fonksiyonun mantığı şudur:

- `filter()` metodu ile mevcut liste dolaşılır.
- Silinmek istenen film hariç diğer filmler yeni listeye alınır.
- `setMovies` ile state güncellenir.
- State güncellendiği için arayüz otomatik olarak yeniden render edilir.

Bu yaklaşımda orijinal array doğrudan değiştirilmez. React'te state güncellerken yeni bir array oluşturmak daha doğru bir yaklaşımdır.

---

## İzlenme Durumu Güncelleme

Kullanıcı film kartındaki `İzledim` veya `İzlemedim` badge'ine tıkladığında filmin izlenme durumu değişir. Bu işlem şu fonksiyonla yapılır:

```js
function handleToggleWatched(id) {
  setMovies((movies) =>
    movies.map((movie) =>
      movie.id === id ? { ...movie, isWatched: !movie.isWatched } : movie
    )
  );
}
```

Bu fonksiyonda `map()` metodu kullanılır. Mantık şu şekildedir:

- Liste içindeki her film kontrol edilir.
- Eğer filmin `id` değeri tıklanan filmle eşleşiyorsa yeni bir object oluşturulur.
- Bu object içinde eski film bilgileri korunur.
- Sadece `isWatched` değeri tersine çevrilir.
- Diğer filmler olduğu gibi bırakılır.

Örnek:

```js
isWatched: true  → false
isWatched: false → true
```

Bu işlem sonucunda badge yazısı ve rengi otomatik olarak değişir.

---

## Filtreleme Mantığı

Filtreleme işlemi `filterButton` state'i üzerinden yapılır. Kullanıcı `Tümü`, `İzledim` veya `İzlemedim` butonlarından birine tıkladığında `filterButton` değeri değişir. Bu değer `MovieList` componentine props olarak gönderilir. Filtre değerlerine göre sonuçlar:

| Filtre | Gösterilen Liste |
| --- | --- |
| `all` | Tüm filmler ve diziler |
| `watched` | Sadece izlenenler |
| `unwatched` | Sadece izlenmeyenler |

Bu yapı sayesinde ana veri silinmeden sadece ekranda gösterilen liste değişir.

---

## Watchlist / Favoriler Mantığı

Projede kullanıcı filmleri favori/watchlist listesine ekleyebilir. Ana listedeki kalp ikonuna tıklanınca ilgili film `watchListMovies` state'ine eklenir. Watchlist'e film ekleyen fonksiyon:

```js
function handleAddtoWatchList(movie) {
  const isAlreadyAdded = watchListMovies.map((m) => m.id).includes(movie.id);

  if (!isAlreadyAdded) {
    setWatchListMovies((list) => [...list, movie]);
  }
}
```

Bu fonksiyonda önce filmin daha önce watchlist'e eklenip eklenmediği kontrol edilir. Eğer film zaten listede varsa tekrar eklenmez. Bu sayede favorilerde aynı filmden birden fazla kez oluşması engellenir. Watchlist'ten film çıkaran fonksiyon:

```js
function handleRemoveFromWatchList(id) {
  setWatchListMovies((movies) => movies.filter((i) => i.id !== id));
}
```

Bu fonksiyon da ana listeden silme mantığına benzer şekilde çalışır. İlgili `id` değerine sahip film watchlist listesinden çıkarılır. Header kısmında favori sayısı şu şekilde gösterilir:

```js
<span>{watchListMovies.length}</span>
```

Bu değer, watchlist'e eklenen film sayısını dinamik olarak gösterir.

---

## Koşullu Render Kullanımı

Projede koşullu render birçok yerde kullanılmıştır.

### Liste Boşsa Mesaj Gösterme

Eğer filtrelenmiş film listesi boşsa kullanıcıya bilgilendirme mesajı gösterilir:

```js
{filteredMovies.length == 0 ? (
  <div>Henüz film eklenmedi.</div>
) : (
  filteredMovies.map((movie) => <MovieCard />)
)}
```

Bu sayede boş liste durumunda ekran tamamen boş kalmaz.

---

### İzlenme Durumuna Göre Badge Gösterme

`isWatched` değerine göre farklı yazı ve farklı CSS class'ı kullanılır.

```js
className={
  movieObj.isWatched
    ? "status-badge watched"
    : "status-badge not-watched"
}
```

- `true` ise `İzledim`
- `false` ise `İzlemedim`

şeklinde gösterilir.

---

### Watchlist Açık/Kapalı Durumu

Watchlist bölümü sadece `isWatchListOpen` değeri `true` olduğunda ekranda gösterilir.

```js
{isWatchListOpen && (
  <WatchList
    watchListMovies={watchListMovies}
    onRemoveFromWatchList={handleRemoveFromWatchList}
  />
)}
```

Bu yapı, React'te sık kullanılan kısa koşullu render örneklerinden biridir.

---

### Ana Liste ve Watchlist İçin Farklı Buton Gösterme

`MovieCard` componenti hem ana listede hem de watchlist içinde kullanılır. Bu nedenle `showActions` props'u ile hangi butonların gösterileceği belirlenir. Ana listede:

- Sil butonu
- Watchlist'e ekleme butonu

Watchlist içinde:

- Çıkar butonu

Bu durum şu şekilde kontrol edilir:

```js
{showActions && <button>Sil</button>}
{showActions && <button>Favoriye Ekle</button>}
{!showActions && <button>Çıkar</button>}
```

Bu kullanım, tek bir componentin farklı ekranlarda farklı davranmasını sağlar.

---

### Puana Göre Yorum Oluşturma

Her film için `rating` değerine göre otomatik yorum oluşturulur.

```js
let commentText = "";

if (movieObj.rating >= 9.5)
  commentText = "Favori adayım!";
else if (movieObj.rating >= 9)
  commentText = "Efsane yapım!";
else if (movieObj.rating >= 7)
  commentText = "Güzel görünüyor.";
else
  commentText = "Boş vaktin varsa izlenir";
```

Puan aralıklarına göre yorumlar:

| Puan Aralığı | Gösterilen Yorum |
| --- | --- |
| 9.5 ve üzeri | Favori adayım! |
| 9 ve üzeri | Efsane yapım! |
| 7 ve üzeri | Güzel görünüyor. |
| 7 altı | Boş vaktin varsa izlenir |

---

## FontAwesome Kullanımı

Projede FontAwesome ikonları kullanılmıştır. İkonlar hem navbar alanında hem de film kartları içinde kullanılarak arayüz daha anlaşılır hale getirilmiştir. Kullanılan bazı ikonlar:

| İkon | Kullanıldığı Yer |
| --- | --- |
| `faClapperboard` | Header içinde uygulama logosu yanında |
| `faUser` | Header sağ tarafındaki kullanıcı ikonu |
| `faHeart` | Favorilere ekleme ve watchlist sayısı alanında |
| `faTag` | Film/dizi kategori satırında |
| `faStar` | Puan satırında |
| `faCircleCheck` | İzlenme durumu satırında |
| `faCommentDots` | Yorum satırında |

FontAwesome kullanımı sayesinde sadece metin tabanlı bir görünüm yerine daha görsel ve kullanıcı dostu bir arayüz elde edilmiştir.

---

## CSS ve Tasarım Mantığı

Projede koyu tema tercih edilmiştir. Genel tasarımda siyah arka plan, koyu gri kartlar ve kırmızı/turuncu vurgu renkleri kullanılmıştır. Tasarımda kullanılan temel yaklaşımlar:

- Siyah arka plan
- Koyu gri header ve kart yapısı
- Yuvarlatılmış köşeler
- Grid tabanlı kart yerleşimi
- Film afişi ve detay bilgilerinin iki kolon halinde gösterilmesi
- Aktif/pasif filtre butonu görünümü
- Yeşil `İzledim` etiketi
- Turuncu `İzlemedim` etiketi
- Kırmızı silme butonu
- Kırmızı çerçeveli favori butonu
- Watchlist alanında ayrı grid düzeni

MovieCard yapısı genel olarak şu mantıkla tasarlanmıştır:

```text
MovieCard
├── Sol kolon: Afiş görseli
└── Sağ kolon: Başlık, tür, puan, durum ve yorum bilgileri
```

Ana film listesi iki kolonlu grid yapısıyla gösterilir:

```css
.movie-detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
```

Watchlist alanında da benzer şekilde iki kolonlu yapı kullanılmıştır:

```css
.watchlist-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
```

Bu yapı, kartların düzenli ve okunabilir görünmesini sağlar.

---

## Proje Nasıl Çalıştırılır?

Projeyi bilgisayarda çalıştırmak için aşağıdaki adımlar izlenebilir.

### 1. Projeyi Klonlama

```bash
git clone <repo-linki>
```

### 2. Proje Klasörüne Girme

```bash
cd movie-list
```

### 3. Bağımlılıkları Yükleme

```bash
npm install
```

### 4. Geliştirme Sunucusunu Başlatma

```bash
npm run dev
```

Bu komuttan sonra terminalde verilen localhost bağlantısı tarayıcıda açılarak proje görüntülenebilir. Genellikle Vite projelerinde bağlantı şu şekilde olur:

```text
http://localhost:5173/
```

### 5. Production Build Alma

Projeyi yayınlamaya hazır hale getirmek için şu komut kullanılabilir:

```bash
npm run build
```

### 6. Build Sonucunu Önizleme

```bash
npm run preview
```

---

## Genel Sonuç

Bu proje, React'in temel yapılarını öğrenmek için oldukça faydalı bir örnektir. İlk aşamada film ve dizileri listeleyen basit bir yapı kurulmuş, daha sonra proje state yönetimi ile geliştirilmiştir.

Projede artık kullanıcı etkileşimi bulunan daha dinamik bir yapı vardır. Kullanıcı film ekleyebilir, silebilir, izlenme durumunu değiştirebilir, filtreleme yapabilir ve favori/watchlist listesi oluşturabilir. Bu işlemlerin tamamı React state mantığı ile yönetilmektedir.

Bu nedenle proje; `useState`, props, event handling, array metotları, koşullu render ve componentler arası veri aktarımı gibi React konularını pratik etmek için güçlü bir örnek haline gelmiştir.
