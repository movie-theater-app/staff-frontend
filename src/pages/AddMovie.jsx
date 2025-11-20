import React from 'react';
import Navbar from '../components/Navbar.jsx';
import {getTMDBMovieByID, importMovie} from "../api-logic/moviesAPI.jsx";
import AddMovieForm from '../components/AddMovie/AddMovieForm.jsx';
import SearchMovieForm from "../components/AddMovie/SearchMovieForm.jsx";
import "../CSS/AddMovie.css"
import {useNavigate} from "react-router-dom";
import MovieForm from "../components/AddMovie/MovieForm.jsx";

function AddMovie() {

    const [movieData, setMovieData] = React.useState([]);

    const navigate = useNavigate();

    async function handleGetMovieByID (movieId) {

        if(movieId === ''){
            setMovieData('');
            return;
        }
        try{
            const response = await getTMDBMovieByID(movieId);

            setMovieData(response);
        } catch(error){
            console.log(error);
        }
    }

    async function handleSubmit (movie) {
        try {
            const result = await importMovie(movie);
            if (!result){
                alert("Can not add this movie");
                throw new Error('Failed to add movie');
            }
            navigate(`/movie/${movie.id}/schedule`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar showLinks={true}/>
            <div className='add-movie-div'>
                <SearchMovieForm getMovieByID={handleGetMovieByID}/>
                    <MovieForm movieData={movieData} handleSubmit={handleSubmit}/>
            </div>


        </div>
    );
}

export default AddMovie;