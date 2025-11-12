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

    let newID;
    let exists = true;
    let attempts = 0;
    const maxAttempts = 10;

    while (exists && attempts <= maxAttempts) {
        attempts++;
        const randomNumber = Math.floor(Math.random() * 9999) + 1;
        newID = randomNumber.toString().padStart(3, "0");

        try {
            const existingMovie = await getTMDBMovieByID(newID);

            if (!existingMovie) {
                exists = false;
                movieData.id = newID;
            } else {
                console.log(`ID ${newID} already exists, retrying...`);
            }

        } catch (error) {
            exists = false;
            movieData.id = newID;
        }
    }

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
