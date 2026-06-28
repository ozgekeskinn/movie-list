import { useState } from "react";
export default function AddMovieForm({onAddMovie}){
    const[title,setTitle] = useState("");
    const[category,setCategory] = useState("");

    function handleSubmit(e) {
        e.preventDefault()  
        
        const newMovie = {
            id: Date.now(), 
            title,
            category,
            rating: 0,
            isWatched: false,
            image: ""
        }
        
        onAddMovie(newMovie)
        
        // inputları sıfırla
        setTitle("")
        setCategory("")
    }

    return(
        <form className="add-movie-form" onSubmit={handleSubmit}>
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Film Adı"
            />

            <input 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Film Kategorisi"
            />
            <button type="submit">Ekle</button>
        </form>
    );
}