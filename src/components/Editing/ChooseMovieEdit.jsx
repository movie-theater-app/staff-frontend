import React, {useEffect} from 'react';
import {getAllMovies} from "../../api-logic/moviesAPI.jsx";
import "../../CSS/EditMovie.css"

function ChooseMovieEdit({chooseMovie}) {

    const [movies, setMovies] = React.useState([]);
    async function loadMovies() {
        const movies = await getAllMovies();
        console.log(movies);
        setMovies(movies);
    }

    async function goToMovie(id) {
        chooseMovie(id);
    }

    useEffect(() => {
        loadMovies();
    }, [])

    return (
        <div style={{
            color: "white",
            marginTop: "3rem"
        }}>
            <h1>Select movie to edit</h1>
            <div className="choose-movie-edit">
                {movies.map((movie) => (
                    <div className="choose-movie-div" key={movie.id} onClick={() => goToMovie(movie.id)}>
                        <img src={movie.poster_url}/>
                        <h5>{movie.title}</h5>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default ChooseMovieEdit;
