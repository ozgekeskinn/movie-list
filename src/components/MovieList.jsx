import MovieCard from "./MovieCard";
import interstellarImg from "../assets/interstellar.jpg";
import breakingBadImg from "../assets/breaking-bad.jpg";
import darkImg from "../assets/dark.jpg";
import inceptionImg from "../assets/inception.jpg";
import queensGambitImg from "../assets/queens-gambit.jpg";
import strangerThingsImg from "../assets/stranger-things.jpg";
import lastOfUsImg from "../assets/the-last-of-us.jpg";
import sherlockImg from "../assets/sherlock.jpg";
import laLaLandImg from "../assets/la-la-land.jpg";
import theOfficeImg from "../assets/the-office.jpg";
import shutterIslandImg from "../assets/shutter-island.jpg";
import friendsImg from "../assets/friends.jpg";

export default function MovieList() {
  const movies = [
    {
      id: 1,
      title: "Interstellar",
      type: "Film",
      category: "Bilim Kurgu",
      rating: 9.2,
      isWatched: true,
      image: interstellarImg,
    },
    {
      id: 2,
      title: "Breaking Bad",
      type: "Dizi",
      category: "Suç / Dram",
      rating: 9.5,
      isWatched: true,
      image: breakingBadImg,
    },
    {
      id: 3,
      title: "Dark",
      type: "Dizi",
      category: "Gizem / Bilim Kurgu",
      rating: 8.7,
      isWatched: false,
      image: darkImg,
    },
    {
      id: 4,
      title: "Inception",
      type: "Film",
      category: "Bilim Kurgu / Aksiyon",
      rating: 8.8,
      isWatched: true,
      image: inceptionImg,
    },
    {
      id: 5,
      title: "The Queen's Gambit",
      type: "Dizi",
      category: "Dram",
      rating: 8.6,
      isWatched: false,
      image: queensGambitImg,
    },
    {
      id: 6,
      title: "Stranger Things",
      type: "Dizi",
      category: "Bilim Kurgu / Korku",
      rating: 8.7,
      isWatched: true,
      image: strangerThingsImg,
    },
    {
      id: 7,
      title: "The Last of Us",
      type: "Dizi",
      category: "Dram / Macera",
      rating: 8.8,
      isWatched: false,
      image: lastOfUsImg,
    },
    {
      id: 8,
      title: "Sherlock",
      type: "Dizi",
      category: "Gizem / Suç",
      rating: 9.1,
      isWatched: true,
      image: sherlockImg,
    },
    {
      id: 9,
      title: "La La Land",
      type: "Film",
      category: "Müzikal / Romantik",
      rating: 8.0,
      isWatched: false,
      image: laLaLandImg,
    },
    {
      id: 10,
      title: "The Office",
      type: "Dizi",
      category: "Komedi",
      rating: 9.0,
      isWatched: true,
      image: theOfficeImg,
    },
    {
      id: 11,
      title: "Shutter Island",
      type: "Film",
      category: "Gerilim / Gizem",
      rating: 8.2,
      isWatched: true,
      image: shutterIslandImg,
    },
    {
      id: 12,
      title: "Friends",
      type: "Dizi",
      category: "Komedi / Sitcom",
      rating: 8.9,
      isWatched: false,
      image: friendsImg,
    },
  ];

  return (
    <div className="movie-list">
      <div className="movie-title">
        <h2 className="title">Listendekiler</h2>
      </div>

      <div className="movie-detail">
        {movies.length == 0 ? 
            (<div>Henüz film eklenmedi.</div>
            ) : (
                movies.map((movie) => (
                    <MovieCard key={movie.id} movieObj={movie} />
                ))
            )
        }
      </div>
    </div>
  );
}