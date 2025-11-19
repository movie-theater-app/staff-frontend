import React from 'react';
import {searchTMDBMovie} from "../../api-logic/moviesAPI.jsx";
import "../../CSS/AddMovie.css"

function SearchMovieForm({getMovieByID} ) {

    const [movieToSearch, setMovieToSearch] = React.useState('');
    const [movieList, setMovieList] = React.useState([]);

    async function handleMovieSearch () {
        try{
            const response = await searchTMDBMovie(movieToSearch);

            setMovieList(response);
        } catch(error){
            console.log(error);
        }
    }


    return (
        <div className="search-movie-div">
            <div className="search-input-div">
                <label htmlFor="movie-search-input" > Search for movie </label>
                <input id="movie-search-input" onChange={e => setMovieToSearch(e.target.value)} value={movieToSearch} style={{width: '30%',}} />
                <button className="search-btn" style={{width: '30%',}} onClick={handleMovieSearch}>Search</button>
            </div>
            <ul className="search-movie-list">
                {movieList.filter(movie => movie.title && movie.releaseDate).map((movie) => {
                    return <li key={movie.id} className="movie-li">
                        {movie.posterPath ? <img src={movie.posterPath}/> : ""}
                        <p>{movie.title}</p>
                        <p>{movie.releaseDate}</p>
                        <button className="movie-li-btn"onClick={() => getMovieByID(movie.id)}>Add new movie</button>
                    </li>
                })}
            </ul>
            <button className="add-movie-scratch-btn"onClick={() => getMovieByID('')}>Add New Movie From Scratch</button>
        </div>
    );
}

export default SearchMovieForm;