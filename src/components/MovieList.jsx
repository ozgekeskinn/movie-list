import MovieCard from "./MovieCard";

export default function MovieList({movies,onDeleteMovie,onToggleMovie,filterButton,onAddtoWatchList}) {
  let filteredMovies = movies;
  if (filterButton === "watched") 
      filteredMovies = movies.filter((m) => m.isWatched);
  else if (filterButton === "unwatched") 
      filteredMovies = movies.filter((m) => !m.isWatched);

  return (
    <div className="movie-list">
      <div className="movie-title">
        <h2 className="title">Listendekiler</h2>
      </div>

      <div className="movie-detail">
        {filteredMovies.length == 0 ? 
            (<div>Henüz film eklenmedi.</div>
            ) : (
                filteredMovies.map((movie) => (
                    <MovieCard 
                      key={movie.id} 
                      movieObj={movie} 
                      onDeleteMovie = {onDeleteMovie}
                      onToggleMovie = {onToggleMovie}
                      onAddtoWatchList = {onAddtoWatchList}
                      showActions={true}
                    />
                ))
            )
        }
      </div>
    </div>
  );
}