import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm.jsx';
import movieData from "./data.js"
import FilterButtons from './components/FilterButtons.jsx';
import WatchList from './components/WatchList.jsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";

function App() {
  const[movies,setMovies] = useState(movieData);
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

  function handleAddMovie(movie){
    setMovies((movies) => [...movies, movie]);
    setFilterButton("all");
  }

  function handleClearMovies(){
    setMovies([]);
    setWatchListMovies([]);
  }

  function handleAddtoWatchList(movie){
    const isAlreadyAdded = watchListMovies.map((m) => m.id).includes(movie.id);

    if(!isAlreadyAdded){
      setWatchListMovies((list) => [...list,movie]);
    }
  }

  function handleRemoveFromWatchList(id){
    setWatchListMovies((movies) => movies.filter((i) => i.id !== id));
  }

  return (
    <>
      <Header>
        <div className="header-left">
            <span>
                <FontAwesomeIcon icon={faClapperboard} className="me-2"/>
                Film / Dizi Listem
            </span>
        </div>
        <nav className="header-center">
            <span>Filmler</span>
            <span>Diziler</span>
        </nav>
        
        <div className="header-right">
          <div className="favorites p-1">
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => setIsWatchListOpen((prev) => !prev)}
              style={{cursor: "pointer"}}
            />
            <span>{watchListMovies.length}</span>
          </div>
          <div className="user">
            <FontAwesomeIcon 
              icon={faUser}
              style={{cursor: "pointer"}} 
            />
          </div>
            
        </div>
      </Header>
      <AddMovieForm onAddMovie={handleAddMovie}/>
      <FilterButtons 
        filterButton={filterButton}
        setFilterButton={setFilterButton}
        onClearMovies={handleClearMovies}
      />
      { isWatchListOpen && 
        <WatchList 
          watchListMovies={watchListMovies}
          onRemoveFromWatchList={handleRemoveFromWatchList}
        />
      }
      <MovieList 
        movies={movies}
        onDeleteMovie={handleDeleteMovie}
        onToggleMovie={handleToggleWatched}
        filterButton={filterButton}
        onAddtoWatchList={handleAddtoWatchList}
      />
    </>
  );
}

export default App;