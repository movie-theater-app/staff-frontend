import React, {useEffect} from 'react';
import {importMovie} from "../api-logic/addMovieApi.jsx";

function AddMovieForm({movieData}) {

    const [id, setId] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [trailer, setTrailer] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [duration, setDuration] = React.useState('');
    const [poster, setPoster] = React.useState('');
    const [ageRating, setAgeRating] = React.useState('');
    async function formHandler(e) {
        e.preventDefault();
        const movie = {
            id,
            title,
            description,
            trailer_url: trailer,
            genre,
            duration_minutes: duration,
            poster_url: poster,
            age_rating: ageRating };
        await importMovie(movie);
        console.log(movie);
    }

    useEffect(() => {
        setId( movieData.id || '');
        setTitle(movieData.title || '');
        setDescription(movieData.description || '');
        setTrailer(movieData.trailer_url || '');
        setGenre(movieData.genre || '');
        setDuration(movieData.duration_minutes || '');
        setPoster(movieData.poster_url || '');
        setAgeRating(movieData.age_rating || '');
        console.log(movieData.id);
        console.log(movieData.title || '');
    }, [movieData])

    return (
        <div style={{
            color: 'white',
        }}>

            <form onSubmit={formHandler} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
            }}>
                <label htmlFor="titleInput">Title</label>
                <input type="text" id="titleInput" placeholder={"Enter the title"} name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>

                <label htmlFor="descriptionInput">Description</label>
                <input
                    type="text"
                    id="descriptionInput"
                    name="description"
                    placeholder="Enter the description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                <label htmlFor="genreInput">Genre</label>
                <input
                    type="text"
                    id="genreInput"
                    name="genre"
                    placeholder="Enter genre"
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                />

                <label htmlFor="ageRatingInput">Age Rating</label>
                <input
                    type="text"
                    id="ageRatingInput"
                    name="ageRating"
                    placeholder="Enter age rating"
                    value={ageRating}
                    onChange={e => setAgeRating(e.target.value)}
                />

                <label htmlFor="durationInput">Duration (minutes)</label>
                <input
                    type="number"
                    id="durationInput"
                    name="duration"
                    placeholder="Enter duration"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                />


                <label htmlFor="trailerInput">Trailer URL</label>
                <input
                    type="text"
                    id="trailerInput"
                    name="trailer"
                    placeholder="Enter the trailer URL"
                    value={trailer}
                    onChange={e => setTrailer(e.target.value)}
                />



                <label htmlFor="posterInput">Poster URL</label>
                <input
                    type="text"
                    id="posterInput"
                    name="poster"
                    placeholder="Enter poster URL"
                    value={poster}
                    onChange={e => setPoster(e.target.value)}
                />



                <button type="submit">Add New Movie</button>
            </form>
        </div>
    );
}

export default AddMovieForm;