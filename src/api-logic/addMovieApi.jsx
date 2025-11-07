const BASE_URL = "http://localhost:3000/api/movie";

export async function searchTMDBMovie(query){
    try {
        const response = await fetch(`${BASE_URL}/tmdb/search?query=${query}`);

        if(!response.ok){
            throw new Error("Failed to fetch tmdb movie list for this movie search");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return "There was an error fetching movie";
    }
}

export async function getTMDBMovieByID(movieID) {
    try {
        const response = await fetch(`${BASE_URL}/tmdb/search/${movieID}`);

        if(!response.ok){
            throw new Error("Failed to fetch tmdb get movie by ID");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return "There was an error importing the movie";
    }
}

export async function importMovie(movieData) {
    try {
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
        return await response.json();
    } catch (error) {
        console.error(error);
        return "There was an error importing the movie";
    }
}
