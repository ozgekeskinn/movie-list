import { useState } from 'react';
import { Routes, Route } from "react-router";

import './App.css';

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SearchResult from "./pages/SearchResult";
import MyList from "./pages/MyList";
import NotFound from "./pages/NotFound";

import { getMovieDetails } from "./services/tmdbApi";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function App() {
  const[movies,setMovies] = useState([]);
  const[filterButton, setFilterButton] = useState("all");
  const[watchListMovies, setWatchListMovies] = useState([]);
  const[isWatchListOpen, setIsWatchListOpen] = useState(false);
  
  function handleDeleteMovie(id){
    setMovies((movies) => movies.filter((i) => i.id !== id));
  }

  function handleToggleWatched(id){
    setMovies((movies) =>
      movies.map((movie) =>
        movie.id === id ? {...movie, isWatched: !movie.isWatched} : movie
      )
    );
  }

  function handleClearMovies(){
    setMovies([]);
    setWatchListMovies([]);
  }

  function handleAddtoWatchList(movie){
    const isAlreadyAdded = watchListMovies
    .map((m) => m.id)
    .includes(movie.id);

    if(!isAlreadyAdded){
      setWatchListMovies((list) => [...list,movie]);
    }
  }

  function handleRemoveFromWatchList(id){
    setWatchListMovies((movies) => 
      movies.filter((i) => i.id !== id)
  );
  }

  function handleToggleWatchList() {
    setIsWatchListOpen((prev) => !prev);
  }

  async function handleAddApiMovieToList(apiMovie) {
    const isAlreadyAdded = movies.some(
      (movie) =>
        Number(movie.tmdbId) === Number(apiMovie.id)
    );

    if (isAlreadyAdded) {
      return true;
    }

    try {
      const movieDetails = apiMovie.genres
        ? apiMovie
        : await getMovieDetails(apiMovie.id);

      const newMovie = {
        id: `tmdb-${movieDetails.id}`,
        tmdbId: movieDetails.id,

        title:
          movieDetails.title ||
          movieDetails.original_title,

        type: "Film",

        category:
          movieDetails.genres
            ?.map((genre) => genre.name)
            .join(" / ") || "Tür bilgisi yok",

        rating: Number(
          Number(movieDetails.vote_average || 0).toFixed(1)
        ),

        isWatched: false,

        comment:
          movieDetails.overview ||
          "Bu film için açıklama bulunamadı.",

        image: movieDetails.poster_path
          ? `${TMDB_IMAGE_BASE_URL}${movieDetails.poster_path}`
          : "",
      };

      setMovies((currentMovies) => {
        const alreadyExists = currentMovies.some(
          (movie) =>
            Number(movie.tmdbId) ===
            Number(movieDetails.id)
        );

        if (alreadyExists) {
          return currentMovies;
        }

        return [...currentMovies, newMovie];
      });

      setFilterButton("all");

      return true;
    } catch (error) {
      console.error(
        "Film kişisel listeye eklenemedi:",
        error
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
                onAddToMyList={handleAddApiMovieToList}
              />
            } 
          />

          <Route 
            path="movies" 
            element={
              <Movies
                myListMovies={movies}
                onAddToMyList={handleAddApiMovieToList}
              />
            } 
          />

          <Route 
            path="movies/:id"
            element={
              <MovieDetails
                myListMovies={movies}
                onAddToMyList={handleAddApiMovieToList}
              />
            }
          />

          <Route
            path="search"
            element={
              <SearchResult 
                myListMovies={movies}
                onAddToMyList={handleAddApiMovieToList}
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