import React from 'react';
import {updateMovie} from "../../api-logic/moviesAPI.jsx";
import MovieForm from "../AddMovie/MovieForm.jsx";
import {useNavigate} from "react-router-dom";

function EditMovieDetails({movieData, confirmChange}) {

    const navigate = useNavigate();

    async function handleSubmit (movie) {
        try {
            const result = await updateMovie(movie.id, movie);
            if (!result){
                alert(`Can not update movie with id ${movie.id}`);
                throw new Error('Failed to update movie');
            }
            confirmChange(movie);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>EDIT THE DETAILS FOR THE MOVIE</h1>
            <MovieForm movieData={movieData} handleSubmit={handleSubmit}/>
        </div>
    );
}

export default EditMovieDetails;
