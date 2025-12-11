import React, {useEffect} from 'react';
import "../../CSS/AddMovie.css"
function MovieForm({movieData, handleSubmit, getMovieByID}) {

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
        if (duration <= 0){
            alert("Please enter a valid duration, it can not be less than zero");
            throw new Error ('Duration can not be less than zero');
        }
        const movie = {
            id,
            title,
            description,
            trailer_url: trailer,
            genre,
            duration_minutes: duration,
            poster_url: poster,
            age_rating: ageRating };
        await handleSubmit(movie);
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
    }, [movieData])

    return (
        <div className="add-movie-form-div">
            <form onSubmit={formHandler}>

                <div className="form-field">
                    <label htmlFor="title-input">Title</label>
                    <input type="text" id="title-input" placeholder={"Enter the title"} name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div className="form-field">
                    <label htmlFor="genre-input">Genre</label>
                    <input
                        type="text"
                        id="genre-input"
                        name="genre"
                        placeholder="Enter genre"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-grouping">
                    <div className="form-field">
                        <label htmlFor="age-rating-input">Age Rating</label>
                        <input
                            type="text"
                            id="age-rating-input"
                            name="ageRating"
                            placeholder="Enter age rating"
                            value={ageRating}
                            onChange={e => setAgeRating(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="duration-input">Duration (minutes)</label>
                        <input
                            type="number"
                            id="duration-input"
                            name="duration"
                            placeholder="Enter duration"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-field"> <label htmlFor="trailer-input">Trailer URL</label>
                    <input
                        type="text"
                        id="trailer-input"
                        name="trailer"
                        placeholder="Enter the trailer URL"
                        value={trailer}
                        onChange={e => setTrailer(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="poster-input">Poster URL</label>
                    <input
                        type="text"
                        id="poster-input"
                        name="poster"
                        placeholder="Enter poster URL"
                        value={poster}
                        onChange={e => setPoster(e.target.value)}
                        required
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="description-input">Description</label>
                    <textarea
                        id="description-input"
                        name="description"
                        placeholder="Enter the description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>



                <div className="btn-movie-form-div">
                    <button className="empty-btn" type="button" onClick={() => getMovieByID('')}>Empty Data</button>
                    <button className="add-movie-btn" type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default MovieForm;