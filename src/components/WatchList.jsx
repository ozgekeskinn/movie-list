import MovieCard from "./MovieCard"

export default function WatchList({watchListMovies,onRemoveFromWatchList,showActions}){
    return(
        <div className="watchlist">
            <h2>Favorilerim</h2>
            <div className="watchlist-grid">
                {watchListMovies.map((movie) => (
                    <div className="watchlist-item" key={movie.id}>
                        <MovieCard 
                            movieObj={movie}
                            showActions={false}
                            onRemoveFromWatchList={onRemoveFromWatchList}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}