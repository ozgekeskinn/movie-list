import { Link } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function ApiSeriesCard({
  series,
  isInMyList = false,
  onAddToMyList,
}) {
  const seriesTitle = series.name || series.original_name;

  const releaseYear = series.first_air_date
    ? series.first_air_date.slice(0, 4)
    : "Tarih yok";

  const rating = Number(series.vote_average || 0).toFixed(1);

  function handleAddToList() {
    if (isInMyList || !onAddToMyList) {
      return;
    }
    onAddToMyList(series, "tv");
  }

  return (
    <article className="api-movie-card">
      <button
        type="button"
        className={isInMyList ? "api-card-add-btn added" : "api-card-add-btn"}
        disabled={isInMyList}
        title={isInMyList ? "Bu dizi listenizde" : "Listeme ekle"}
        onClick={handleAddToList}
      >
        <FontAwesomeIcon icon={isInMyList ? faCheck : faPlus} />
      </button>

      <Link to={`/series/${series.id}`} className="api-movie-card-link">
        <div className="api-movie-poster">
          {series.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${series.poster_path}`}
              alt={`${seriesTitle} dizi afişi`}
            />
          ) : (
            <div className="no-poster">Görsel bulunamadı</div>
          )}
        </div>

        <div className="api-movie-card-content">
          <h2>{seriesTitle}</h2>

          <div className="api-movie-meta">
            <span>{releaseYear}</span>
            <span className="api-movie-rating">★ {rating}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
