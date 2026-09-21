import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { getSeriesDetails } from "../services/tmdbApi";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function SeriesDetails({ myListMovies = [], onAddToMyList }) {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadSeriesDetails() {
      try {
        setLoading(true);
        setError("");

        const data = await getSeriesDetails(id);

        setSeries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadSeriesDetails();
  }, [id]);

  function handleGoBack() {
    if (location.key === "default") {
      navigate("/series");
      return;
    }

    navigate(-1);
  }

  const isInMyList = series
    ? myListMovies.some(
        (item) =>
          Number(item.tmdbId) === Number(series.id) && item.mediaType === "tv",
      )
    : false;

  async function handleAddToList() {
    if (!series || isInMyList || isAdding || !onAddToMyList) {
      return;
    }

    try {
      setIsAdding(true);

      await onAddToMyList(series, "tv");
    } finally {
      setIsAdding(false);
    }
  }

  if (loading) {
    return <Loading message="Dizi detayları yükleniyor..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!series) {
    return <ErrorMessage message="Dizi bilgisi bulunamadı." />;
  }

  const posterUrl = series.poster_path
    ? `${IMAGE_BASE_URL}${series.poster_path}`
    : null;

  const backdropUrl = series.backdrop_path
    ? `${BACKDROP_BASE_URL}${series.backdrop_path}`
    : null;

  const genres = series.genres?.length
    ? series.genres.map((genre) => genre.name).join(", ")
    : "Tür bilgisi yok";

  const firstAirDate = series.first_air_date
    ? series.first_air_date.split("-").reverse().join(".")
    : "Tarih bilgisi yok";

  const rating = Number(series.vote_average || 0).toFixed(1);

  return (
    <section className="movie-details-page">
      <button
        type="button"
        className="back-link back-button"
        onClick={handleGoBack}
      >
        ← Geri dön
      </button>

      <div
        className="movie-details-backdrop"
        style={
          backdropUrl
            ? {
                backgroundImage: `
                  linear-gradient(
                    rgba(0, 0, 0, 0.65),
                    rgba(0, 0, 0, 0.92)
                  ),
                  url(${backdropUrl})
                `,
              }
            : undefined
        }
      >
        <div className="movie-details-container">
          <div className="movie-details-poster">
            {posterUrl ? (
              <img src={posterUrl} alt={`${series.name} dizi afişi`} />
            ) : (
              <div className="no-poster">Görsel bulunamadı</div>
            )}
          </div>

          <div className="movie-details-content">
            <h1>{series.name}</h1>

            {series.tagline && (
              <p className="movie-tagline">“{series.tagline}”</p>
            )}

            <div className="movie-details-meta">
              <span>⭐ {rating}</span>

              <span>{firstAirDate}</span>

              <span>{series.number_of_seasons} Sezon</span>

              <span>{series.number_of_episodes} Bölüm</span>
            </div>

            <div className="movie-details-actions">
              <button
                type="button"
                className={
                  isInMyList ? "add-to-list-btn added" : "add-to-list-btn"
                }
                disabled={isInMyList || isAdding}
                onClick={handleAddToList}
              >
                {isInMyList
                  ? "✓ Listeme Eklendi"
                  : isAdding
                    ? "Ekleniyor..."
                    : "+ Listeme Ekle"}
              </button>
            </div>

            <div className="movie-genres">
              {series.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <div className="movie-overview">
              <h2>Dizi Hakkında</h2>

              <p>
                {series.overview || "Bu dizi için Türkçe açıklama bulunamadı."}
              </p>
            </div>

            <div className="movie-extra-details">
              <p>
                <strong>Türler:</strong> {genres}
              </p>

              <p>
                <strong>Orijinal adı:</strong> {series.original_name}
              </p>

              <p>
                <strong>Orijinal dili:</strong>{" "}
                {series.original_language?.toUpperCase()}
              </p>

              <p>
                <strong>Oy sayısı:</strong> {series.vote_count}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
