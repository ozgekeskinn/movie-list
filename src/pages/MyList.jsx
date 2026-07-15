import WatchList from "../components/WatchList";
import FilterButtons from "../components/FilterButtons";
import MovieList from "../components/MovieList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

export default function MyList({
    movies,  // gösterilecek film listesi
    filterButton,  // filtreleme butonunun durumu
    setFilterButton,  // filtreleme butonunu güncelleme fonksiyonu
    watchListMovies,  // favori film listesi
    isWatchListOpen,  // favori film listesi açılıp açılmadığı
    onToggleWatchList,  // favori film listesini aç/kapa fonksiyonu
    onClearMovies,  // film listesini temizleme fonksiyonu
    onRemoveFromWatchList,  // favori film listesinden çıkarma fonksiyonu
    onDeleteMovie,  // film silme fonksiyonu
    onToggleMovie,  // film izlenme durumunu değiştirme fonksiyonu
    onAddtoWatchList, // favori film listesine ekleme fonksiyonu
}) {
    return (
        <>
            <section
                className={
                    isWatchListOpen
                        ? "favorites-section open"
                        : "favorites-section"
                }
            >
                <button
                    type="button"
                    className="favorites-toggle-btn"
                    onClick={onToggleWatchList}
                    aria-expanded={isWatchListOpen}
                >
                    <span className="favorites-toggle-left">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="favorites-icon"
                        />

                        <span>Favorilerim</span>

                        <span className="favorites-count">
                            {watchListMovies.length}
                        </span>
                    </span>

                    <FontAwesomeIcon
                        icon={
                            isWatchListOpen
                                ? faChevronUp
                                : faChevronDown
                        }
                        className="favorites-arrow"
                    />
                </button>

                {isWatchListOpen && (
                    <div className="favorites-content">
                        {watchListMovies.length === 0 ? (
                            <div className="favorites-empty">
                                <FontAwesomeIcon icon={faHeart} />

                                <div>
                                    <h3>Henüz favorin yok</h3>

                                    <p>
                                        Listendeki filmlerden beğendiklerini
                                        favorilerine ekleyebilirsin.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <WatchList
                                watchListMovies={watchListMovies}
                                onRemoveFromWatchList={
                                    onRemoveFromWatchList
                                }
                                onToggleMovie={onToggleMovie}
                            />
                        )}
                    </div>
                )}
            </section>

            <FilterButtons
                filterButton={filterButton}
                setFilterButton={setFilterButton}
                onClearMovies={onClearMovies}
            />

            <MovieList 
                movies = {movies}
                onDeleteMovie={onDeleteMovie}
                onToggleMovie={onToggleMovie}
                filterButton={filterButton}
                onAddtoWatchList={onAddtoWatchList}
            />
        </>
    );
}