import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import "./App.css";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SearchResult from "./pages/SearchResult";
import MyList from "./pages/MyList";
import NotFound from "./pages/NotFound";
import Series from "./pages/Series";
import SeriesDetails from "./pages/SeriesDetails";

import { getMovieDetails, getSeriesDetails } from "./services/tmdbApi";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const MOVIE_SERIES_STORAGE_KEY = "movieSeriesList";
const FAVORITES_STORAGE_KEY = "favoriteMovieSeriesList";

function getStoredList(key) {
  try {
    const storedData = localStorage.getItem(key);

    return storedData ? JSON.parse(storedData) : [];
  } catch {
    return [];
  }
}

function App() {
  const [movies, setMovies] = useState(() =>
    getStoredList(MOVIE_SERIES_STORAGE_KEY),
  );

  const [filterButton, setFilterButton] = useState("all");

  const [watchListMovies, setWatchListMovies] = useState(() =>
    getStoredList(FAVORITES_STORAGE_KEY),
  );

  const [isWatchListOpen, setIsWatchListOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(MOVIE_SERIES_STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(watchListMovies),
    );
  }, [watchListMovies]);

  function handleDeleteMovie(id) {
    setMovies((movies) => movies.filter((i) => i.id !== id));
  }

  function handleToggleWatched(id) {
    setMovies((movies) =>
      movies.map((movie) =>
        movie.id === id ? { ...movie, isWatched: !movie.isWatched } : movie,
      ),
    );
  }

  function handleClearMovies() {
    setMovies([]);
    setWatchListMovies([]);
  }

  function handleAddtoWatchList(movie) {
    const isAlreadyAdded = watchListMovies.map((m) => m.id).includes(movie.id);

    if (!isAlreadyAdded) {
      setWatchListMovies((list) => [...list, movie]);
    }
  }

  function handleRemoveFromWatchList(id) {
    setWatchListMovies((movies) => movies.filter((i) => i.id !== id));
  }

  function handleToggleWatchList() {
    setIsWatchListOpen((prev) => !prev);
  }

  async function handleAddApiMediaToList(apiMedia, mediaType = "movie") {
    const isAlreadyAdded = movies.some(
      (item) =>
        Number(item.tmdbId) === Number(apiMedia.id) &&
        (item.mediaType || "movie") === mediaType,
    );

    if (isAlreadyAdded) {
      return true;
    }

    try {
      let mediaDetails;

      if (apiMedia.genres) {
        mediaDetails = apiMedia;
      } else if (mediaType === "tv") {
        mediaDetails = await getSeriesDetails(apiMedia.id);
      } else {
        mediaDetails = await getMovieDetails(apiMedia.id);
      }

      const isSeries = mediaType === "tv";

      const newMedia = {
        id: `${mediaType}-${mediaDetails.id}`,
        tmdbId: mediaDetails.id,
        mediaType,

        title: isSeries
          ? mediaDetails.name || mediaDetails.original_name
          : mediaDetails.title || mediaDetails.original_title,

        type: isSeries ? "Dizi" : "Film",

        category:
          mediaDetails.genres?.map((genre) => genre.name).join(" / ") ||
          "Tür bilgisi yok",

        rating: Number(Number(mediaDetails.vote_average || 0).toFixed(1)),
        isWatched: false,

        comment:
          mediaDetails.overview ||
          `${isSeries ? "Bu dizi" : "Bu film"} için açıklama bulunamadı.`,

        image: mediaDetails.poster_path
          ? `${TMDB_IMAGE_BASE_URL}${mediaDetails.poster_path}`
          : "",
      };

      setMovies((currentMovies) => {
        const alreadyExists = currentMovies.some(
          (item) =>
            Number(item.tmdbId) === Number(mediaDetails.id) &&
            (item.mediaType || "movie") === mediaType,
        );

        if (alreadyExists) {
          return currentMovies;
        }

        return [...currentMovies, newMedia];
      });

      setFilterButton("all");
      return true;
    } catch (error) {
      console.error(
        `${mediaType === "tv" ? "Dizi" : "Film"} kişisel listeye eklenemedi:`,
        error,
      );
      return false;
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <Home
                myListMovies={movies}
                onAddToMyList={handleAddApiMediaToList}
              />
            }
          />

          <Route
            path="movies"
            element={
              <Movies
                myListMovies={movies}
                onAddToMyList={handleAddApiMediaToList}
              />
            }
          />

          <Route
            path="movies/:id"
            element={
              <MovieDetails
                myListMovies={movies}
                onAddToMyList={handleAddApiMediaToList}
              />
            }
          />

          <Route
            path="series"
            element={
              <Series
                myListMovies={movies}
                onAddToMyList={handleAddApiMediaToList}
              />
            }
          />

          <Route
            path="series/:id"
            element={
              <SeriesDetails
                myListMovies={movies}
                onAddToMyList={handleAddApiMediaToList}
              />
            }
          />

          <Route
            path="search"
            element={
              <SearchResult
                myListMovies={movies}
                onAddToMyList={handleAddApiMediaToList}
              />
            }
          />

          <Route
            path="my-list"
            element={
              <MyList
                movies={movies}
                filterButton={filterButton}
                setFilterButton={setFilterButton}
                watchListMovies={watchListMovies}
                isWatchListOpen={isWatchListOpen}
                onToggleWatchList={handleToggleWatchList}
                onClearMovies={handleClearMovies}
                onRemoveFromWatchList={handleRemoveFromWatchList}
                onDeleteMovie={handleDeleteMovie}
                onToggleMovie={handleToggleWatched}
                onAddtoWatchList={handleAddtoWatchList}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
