export default function FilterButtons({filterButton , setFilterButton , onClearMovies}){
    // filterButton: hangi buton aktif
    // setFilterButton: butona tıklayınca değiştirmek için
    return(
        <div className="filter-buttons">
            <button className={filterButton === "all" ? "btn-active" : "btn-passive"} onClick={() => setFilterButton("all")}>Tümü</button>
            <button className={filterButton === "watched" ? "btn-active" : "btn-passive"} onClick={() => setFilterButton("watched")}>İzledim</button>
            <button className={filterButton === "unwatched" ? "btn-active" : "btn-passive"} onClick={() => setFilterButton("unwatched")}>İzlemedim</button>
            <button className="clear-all-btn" onClick={onClearMovies}>Tümünü Sil</button>
        </div>
    )
}