import MovieCard from "./MovieCard";

export default function WatchList({
  watchListMovies = [],
  onRemoveFromWatchList,
  onToggleMovie,
}) {
  return (
    <div className="watchlist">
      <div className="watchlist-grid">
        {watchListMovies.map((movie) => (
          <div className="watchlist-item" key={movie.id}>
            <MovieCard
              movieObj={movie}
              showActions={false}
              onRemoveFromWatchList={onRemoveFromWatchList}
              onToggleMovie={onToggleMovie}
            />
          </div>
        ))}
      </div>
    </div>
  );
}