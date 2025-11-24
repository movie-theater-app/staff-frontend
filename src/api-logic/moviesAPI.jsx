const BASE_URL = import.meta.env.VITE_BASE_URL + "/movie";

export async function searchTMDBMovie(query){
    const response = await fetch(`${BASE_URL}/tmdb/search?query=${query}`);

    if(!response.ok){
        throw new Error("Failed to fetch tmdb movie list for this movie search");
    }
    return response.json();
}

export async function getTMDBMovieByID(movieID) {
    const response = await fetch(`${BASE_URL}/tmdb/search/${movieID}`);

    if(!response.ok){
        throw new Error("Failed to fetch tmdb get movie by ID");
    }
    return response.json();
}

export async function importMovie(movieData) {

    const response = await fetch(`${BASE_URL}/import`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });

    if(!response.ok){
        throw new Error("Failed to import movie to the database");
    }
    return response.json();
}

export async function getMovieByID(movieID) {
    const response = await fetch(`${BASE_URL}/${movieID}`);

    if(!response.ok){
        throw new Error("Failed to fetch movie from database by ID");
    }
    return response.json();
}

export async function updateMovie(movie_id, movieData) {

    console.log(movie_id);
    console.log(movieData);
    const response = await fetch(`${BASE_URL}/${movie_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });

    if(!response.ok){
        throw new Error("Failed to update movie in the database");
    }
    return response.json();
}

export async function getAllMovies() {
    const response = await fetch(`${BASE_URL}`);

    if(!response.ok){
        throw new Error("Failed to get all the movies in the database");
    }
    return response.json();
}