import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getPopularMovies } from "../services/tmdbApi";
import ApiMovieCard from "../components/ApiMovieCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";

export default function Movies({
  myListMovies=[],
  onAddToMyList,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParameter = Number(searchParams.get("page"));
  const page =
    Number.isInteger(pageParameter) && pageParameter > 0
      ? pageParameter
      : 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        setLoading(true);
        setError("");
        const data = await getPopularMovies(page);
        
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        setMovies([]);
        setTotalPages(0);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPopularMovies();
  }, [page]);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    const updatedSearchParams = new URLSearchParams(searchParams);

    if (newPage === 1) {
      updatedSearchParams.delete("page");
    } else {
      updatedSearchParams.set("page", newPage.toString());
    }

    setSearchParams(updatedSearchParams);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (loading) {
    return <Loading message="Popüler filmler yükleniyor..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="movies-page">
      <div className="movies-page-header">
        <div>
          <h1 className="page-title">Popüler Filmler</h1>

          <p className="movies-page-description">
            Güncel olarak en çok ilgi gören filmleri keşfedin.
          </p>
        </div>

        {totalPages > 0 && (
          <span className="search-page-info">
            Sayfa {page} / {totalPages}
          </span>
        )}
      </div>

      {movies.length === 0 ? (
        <p className="empty-results">
          Gösterilecek popüler film bulunamadı.
        </p>
      ) : (
        <div className="api-movie-list">
          {movies.map((movie) => (
            <ApiMovieCard
              key={movie.id}
              movie={movie}
              isInMyList={myListMovies.some(
                (m) => m.tmdbId === movie.id
              )}
              onAddToMyList={onAddToMyList}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}