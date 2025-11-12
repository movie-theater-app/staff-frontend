import React from 'react';
import {searchTMDBMovie} from "../../api-logic/moviesAPI.jsx";

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
        <div className="search-movie-div" style={{
            flex: '1',
        }}>
            <div className="search-input-div" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                color: 'white',
            }}>
                <label htmlFor="movieToSearchInput" > Search for movie </label>
                <input id="movieToSearchInput" onChange={e => setMovieToSearch(e.target.value)} value={movieToSearch} style={{width: '30%',}} />
                <button style={{width: '30%',}} onClick={handleMovieSearch}>Search</button>
            </div>
            <ul style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                flexDirection: 'column',
                height: '500px',
                overflowY: 'scroll',
                marginTop: '50px',
            }}>
                {movieList.map((movie) => {
                    return <li key={movie.id} className="movie" style={
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            color: "white",
                            gap: '30px',
                            padding: '10px',
                            alignItems: "center",
                            width: '85%',
                        }}>
                        <img src={movie.posterPath}/>
                        <p>{movie.title}</p>
                        <p>{movie.releaseDate}</p>
                        <button onClick={() => getMovieByID(movie.id)} style={{width: '115px', height:'60px'}}>Add new movie</button>
                    </li>
                })}
            </ul>
            <button onClick={() => getMovieByID('')}>Add New Movie From Scratch</button>
        </div>
    );
}

export default SearchMovieForm;