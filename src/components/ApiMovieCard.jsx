import { Link } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function ApiMovieCard({ 
  movie,
  isInMyList = false,
  onAddToMyList,
}) {
  const movieTitle = movie.title || movie.original_title;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "Tarih yok";

  const rating = Number(movie.vote_average).toFixed(1);

  function handleAddToList() {
    if (isInMyList || !onAddToMyList) {
      return;
    }

    onAddToMyList(movie);
  }

  return (
    <article className="api-movie-card">
      <button
        type="button"
        className={
          isInMyList
            ? "api-card-add-btn added"
            : "api-card-add-btn"
        }
        disabled={isInMyList}
        title={
          isInMyList
            ? "Bu film listenizde"
            : "Listeme ekle"
        }
        aria-label={
          isInMyList
            ? `${movieTitle} listenizde`
            : `${movieTitle} filmini listeme ekle`
        }
        onClick={handleAddToList}
      >
        <FontAwesomeIcon
          icon={isInMyList ? faCheck : faPlus}
        />
      </button>
      
      <Link
        to={`/movies/${movie.id}`}
        className="api-movie-card-link"
      >
        <div className="api-movie-poster">
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={`${movieTitle} film afişi`}
            />
          ) : (
            <div className="no-poster">Görsel bulunamadı</div>
          )}
        </div>

        <div className="api-movie-card-content">
          <h2>{movieTitle}</h2>

          <div className="api-movie-meta">
            <span>{releaseYear}</span>
            <span className="api-movie-rating">
              ★ {rating}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}