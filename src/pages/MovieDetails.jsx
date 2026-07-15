import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import { getMovieDetails } from "../services/tmdbApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL =
  "https://image.tmdb.org/t/p/original";

export default function MovieDetails({
  myListMovies = [],
  onAddToMyList,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);

        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]);

  function handleGoBack() {
    if (location.key === "default") {
      navigate("/movies");
      return;
    }

    navigate(-1);
  }

  /*
   * API'den gelen filmleri kişisel listede saklarken:
   *
   * id: "tmdb-1007757"
   * tmdbId: 1007757
   *
   * biçimini kullanıyoruz.
   *
   * Bu nedenle detay sayfasındaki movie.id değeri,
   * listedeki tmdbId değeriyle karşılaştırılmalıdır.
   */
  const isInMyList = movie
    ? myListMovies.some(
        (listMovie) =>
          Number(listMovie.tmdbId) === Number(movie.id)
      )
    : false;

  async function handleAddToList() {
    if (
      !movie ||
      isInMyList ||
      isAdding ||
      !onAddToMyList
    ) {
      return;
    }

    try {
      setIsAdding(true);

      await onAddToMyList(movie);
    } catch (error) {
      console.error(
        "Film kişisel listeye eklenemedi:",
        error
      );
    } finally {
      setIsAdding(false);
    }
  }

  if (loading) {
    return (
      <Loading message="Film detayları yükleniyor..." />
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return (
      <ErrorMessage message="Film bilgisi bulunamadı." />
    );
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null;

  const genres = movie.genres?.length
    ? movie.genres
        .map((genre) => genre.name)
        .join(", ")
    : "Tür bilgisi yok";

  const releaseDate = movie.release_date
    ? movie.release_date.split("-").reverse().join(".")
    : "Tarih bilgisi yok";

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)} sa ${
        movie.runtime % 60
      } dk`
    : "Süre bilgisi yok";

  const rating = Number(
    movie.vote_average || 0
  ).toFixed(1);

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
              <img
                src={posterUrl}
                alt={`${movie.title} film afişi`}
              />
            ) : (
              <div className="no-poster">
                Görsel bulunamadı
              </div>
            )}
          </div>

          <div className="movie-details-content">
            <h1>{movie.title}</h1>

            {movie.tagline && (
              <p className="movie-tagline">
                “{movie.tagline}”
              </p>
            )}

            <div className="movie-details-meta">
              <span>⭐ {rating}</span>
              <span>{releaseDate}</span>
              <span>{runtime}</span>
            </div>

            <div className="movie-details-actions">
              <button
                type="button"
                className={
                  isInMyList
                    ? "add-to-list-btn added"
                    : "add-to-list-btn"
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
              {movie.genres?.map((genre) => (
                <span key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-overview">
              <h2>Film Hakkında</h2>

              <p>
                {movie.overview ||
                  "Bu film için Türkçe açıklama bulunamadı."}
              </p>
            </div>

            <div className="movie-extra-details">
              <p>
                <strong>Türler:</strong> {genres}
              </p>

              <p>
                <strong>Orijinal adı:</strong>{" "}
                {movie.original_title}
              </p>

              <p>
                <strong>Orijinal dili:</strong>{" "}
                {movie.original_language?.toUpperCase()}
              </p>

              <p>
                <strong>Oy sayısı:</strong>{" "}
                {movie.vote_count}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}