import React, {useEffect} from 'react';
import {getMovieByID, updateMovie} from "../api-logic/moviesAPI.jsx";
import MovieForm from "../components/AddMovie/MovieForm.jsx";
import {useParams} from "react-router";

function EditMovie() {
    const { movie_id } = useParams();

    const [movieData, setMovieData] = React.useState();

    async function loadMovieData() {
        const data = await getMovieByID(movie_id);
        setMovieData(data);
    }

    async function submitHandler () {

    }

    async function formHandler(e, {movie}) {
        e.preventDefault();
        if (movie.duration <= 0){
            alert("Please enter a valid duration, it can not be less than zero");
            throw new Error ('Duration can not be less than zero');
        }
        try {
            const updatedMovie = {
                id : movie.id,
                title: movie.title,
                description: movie.description,
                trailer_url: movie.trailer,
                genre: movie.genre,
                duration_minutes: movie.duration,
                poster_url: movie.poster,
                age_rating: movie.ageRating };
            const result = await updateMovie(updatedMovie);
            if (!result){
                alert("Can not update this movie");
                throw new Error('Failed to update movie');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadMovieData();
    }, [movie_id])

    return (
        <div>
            {movieData ? (
                <MovieForm movieData={movieData} formHandler={formHandler} />
            ) : (
                <div>There is no movie to edit</div>
            )}
        </div>
    );
}

export default EditMovie;
