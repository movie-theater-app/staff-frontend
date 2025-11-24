import React from 'react';
import {getMovieByID, } from "../api-logic/moviesAPI.jsx";
import ChooseMovieEdit from "../components/Editing/ChooseMovieEdit.jsx";
import Navbar from "../components/Navbar.jsx";
import EditMovieDetails from "../components/Editing/EditMovieDetails.jsx";
import Schedule from "../components/Scheduling/Schedule.jsx";

function EditMovie() {

    const [movieData, setMovieData] = React.useState();
    const [movieChoosen, setMovieChoosen] = React.useState(false);
    const [editSchedule, setEditSchedule] = React.useState(false);

    async function chooseMovie(id) {
        if(!id) return;
        const movie = await getMovieByID(id);
        setMovieData(movie);
        setMovieChoosen(true);
    }

    function confirmDetails(movie) {
        setMovieData(movie)
        setEditSchedule(true);
    }


    return (
        <div>
            <Navbar showLinks={true}/>
            {movieData && movieChoosen && !editSchedule ? (
                <EditMovieDetails movieData={movieData} confirmChange={confirmDetails}/>
            ) : !movieChoosen ? (
                <ChooseMovieEdit chooseMovie={chooseMovie} />
            ) : movieData && movieChoosen && editSchedule ? (
                <div>
                    <Schedule movie={movieData} />
                </div>

            ) : (
                <p>There is an error to edit the movie.</p>
            )}
        </div>
    );
}

export default EditMovie;
