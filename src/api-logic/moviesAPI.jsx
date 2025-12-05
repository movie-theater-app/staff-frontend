const BASE_URL = import.meta.env.VITE_BASE_URL; 
import { FetchWithToken } from './FetchWithToken';

export async function searchTMDBMovie(query){
    const response = await fetch(`${BASE_URL}/movie/tmdb/search?query=${query}`);

    if(!response){
        throw new Error("Failed to fetch tmdb movie list for this movie search");
    }
    return response;
}

export async function getTMDBMovieByID(movieID) {
    const response = await fetch(`${BASE_URL}/movie/tmdb/search/${movieID}`);

    if(!response){
        throw new Error("Failed to fetch tmdb get movie by ID");
    }
    return response;
}

export async function importMovie(movieData) {

    const response = await FetchWithToken(`/movie/import`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });

    if(!response){
        throw new Error("Failed to import movie to the database");
    }
    return response;
}

export async function getMovieByID(movieID) {
    const response = await FetchWithToken(`/movie/${movieID}`);

    if(!response){
        throw new Error("Failed to fetch movie from database by ID");
    }
    return response;
}

export async function updateMovie(movie_id, movieData) {

    console.log(movie_id);
    console.log(movieData);
    const response = await FetchWithToken(`/movie/${movie_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });

    if(!response){
        throw new Error("Failed to update movie in the database");
    }
    return response;
}

export async function getAllMovies() {
    const response = await FetchWithToken(`/movie`);

    if(!response){
        throw new Error("Failed to get all the movies in the database");
    }
    return response;
}