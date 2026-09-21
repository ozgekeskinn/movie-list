import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getPopularSeries } from "../services/tmdbApi";

import ApiSeriesCard from "../components/ApiSeriesCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";

export default function Series({ myListMovies = [], onAddToMyList }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParameter = Number(searchParams.get("page"));

  const page =
    Number.isInteger(pageParameter) && pageParameter > 0 ? pageParameter : 1;

  const [series, setSeries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPopularSeries() {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularSeries(page);

        setSeries(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        setSeries([]);
        setTotalPages(0);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadPopularSeries();
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) {
    return <Loading message="Popüler diziler yükleniyor..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="movies-page">
      <div className="movies-page-header">
        <div>
          <h1 className="page-title">Popüler Diziler</h1>

          <p className="movies-page-description">
            Güncel olarak en çok ilgi gören dizileri keşfedin.
          </p>
        </div>

        {totalPages > 0 && (
          <span className="search-page-info">
            Sayfa {page} / {totalPages}
          </span>
        )}
      </div>

      {series.length === 0 ? (
        <p className="empty-results">Gösterilecek popüler dizi bulunamadı.</p>
      ) : (
        <div className="api-movie-list">
          {series.map((item) => (
            <ApiSeriesCard
              key={item.id}
              series={item}
              isInMyList={myListMovies.some(
                (media) =>
                  Number(media.tmdbId) === Number(item.id) &&
                  media.mediaType === "tv",
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
