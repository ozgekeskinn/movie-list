import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { searchMovies } from "../services/tmdbApi";
import ApiMovieCard from "../components/ApiMovieCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";

export default function SearchResult({ myListMovies = [], onAddToMyList }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() || "";

  const pageParameter = Number(searchParams.get("page"));

  const page =
    Number.isInteger(pageParameter) && pageParameter > 0 ? pageParameter : 1;

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("page", newPage.toString());
    setSearchParams(updatedSearchParams);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (!query) {
      return;
    }

    async function loadSearchResults() {
      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query, page);

        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        setMovies([]);
        setTotalResults(0);
        setTotalPages(0);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadSearchResults();
  }, [query, page]);

  if (!query) {
    return (
      <section className="search-results-page">
        <h1 className="page-title">Film Ara</h1>

        <p className="empty-results">
          Arama yapmak için yukarıdaki alana bir film adı yazın.
        </p>
      </section>
    );
  }

  if (loading) {
    return <Loading message={`“${query}” için sonuçlar yükleniyor...`} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="search-results-page">
      <div className="search-results-header">
        <div>
          <h1 className="page-title">“{query}” Arama Sonuçları</h1>

          <p className="search-results-summary">{totalResults} sonuç bulundu</p>
        </div>

        {totalPages > 0 && (
          <span className="search-page-info">
            Sayfa {page} / {totalPages}
          </span>
        )}
      </div>

      {movies.length === 0 ? (
        <p className="empty-results">Aramanızla eşleşen bir film bulunamadı.</p>
      ) : (
        <div className="api-movie-list">
          {movies.map((movie) => (
            <ApiMovieCard
              key={movie.id}
              movie={movie}
              isInMyList={myListMovies.some((m) => m.tmdbId === movie.id)}
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
