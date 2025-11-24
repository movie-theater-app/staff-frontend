import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import SchedulingForm from "../components/Scheduling/SchedulingForm.jsx";
import Navbar from "../components/Navbar.jsx";
import {getMovieByID} from "../api-logic/moviesAPI.jsx";
import ScheduleList from "../components/Scheduling/ScheduleList.jsx";
import Schedule from "../components/Scheduling/Schedule.jsx";

function ScheduleMovie() {
    const { id } = useParams();

    const [movie, setMovie] = React.useState(null);

    async function loadMovie () {
        try {
            const data = await getMovieByID(id);
            if (!data) throw new Error("Movie not found");
            setMovie(data);
        } catch (err) {
            console.error(`Error loading movie with id ${id}`, err.message);
        }
    }


    useEffect(() => {
        loadMovie();
    }, [id])

    return (
        <div>
            <Navbar showLinks={true}/>
            {!movie ? (
                <div>Loading Movie...</div>
            ) : (
                <Schedule movie={movie}/>
            )}

        </div>

    );
}

export default ScheduleMovie;
