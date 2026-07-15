import { useEffect, useState } from "react";

import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
} from "../services/tmdbApi";

import ApiMovieCard from "../components/ApiMovieCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SearchForm from "../components/SearchForm";

export default function Home({
    myListMovies=[],
    onAddToMyList,
}) {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadHomeMovies() {
            try {
                setLoading(true);
                setError("");

                const [
                    popularData,
                    topRatedData,
                    upcomingData,
                ] = await Promise.all([
                    getPopularMovies(),
                    getTopRatedMovies(),
                    getUpcomingMovies(),
                ]);
                // Promise.all ile Üç API isteğini arka arkaya bekletmek yerine aynı anda başlatır.

                setPopularMovies(
                    popularData.results?.slice(0, 5) || []
                );

                setTopRatedMovies(
                    topRatedData.results?.slice(0, 5) || []
                );

                setUpcomingMovies(
                    upcomingData.results?.slice(0, 5) || []
                );
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadHomeMovies();
    }, []);

    if (loading) {
        return (
            <Loading message="Ana sayfa hazırlanıyor..." />
        );
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="home-hero-content">
                    <span className="home-hero-label">
                        Film dünyasını keşfet
                    </span>

                    <h1>
                        İzleyeceğin bir sonraki filmi bul.
                    </h1>

                    <p>
                        Popüler yapımları incele, filmler
                        hakkında bilgi edin ve beğendiğin
                        içerikleri kendi listene ekle.
                    </p>

                    <SearchForm />
                </div>
            </section>

            <MovieSection
                title="Popüler Filmler"
                description="Şu anda en çok ilgi gören filmler."
                movies={popularMovies}
                myListMovies={myListMovies}
                onAddToMyList={onAddToMyList}
            />

            <MovieSection
                title="En Yüksek Puanlı Filmler"
                description="İzleyicilerden yüksek puan alan yapımlar."
                movies={topRatedMovies}
                myListMovies={myListMovies}
                onAddToMyList={onAddToMyList}
            />

            <MovieSection
                title="Yakında Gösterimde"
                description="Yakında izleyiciyle buluşacak filmler."
                movies={upcomingMovies}
                myListMovies={myListMovies}
                onAddToMyList={onAddToMyList}
            />
        </div>
    );
}

function MovieSection({
    title,
    description,
    movies,
    myListMovies,
    onAddToMyList,
}) {
    return (
        <section className="home-movie-section">
            <div className="home-section-header">
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>

            {movies.length === 0 ? (
                <p className="empty-results">
                    Bu bölümde gösterilecek film bulunamadı.
                </p>
            ) : (
                <div className="home-movie-grid">
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
        </section>
    );
}