import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import AddSchedulingForm from "../components/Scheduling/AddSchedulingForm.jsx";
import Navbar from "../components/Navbar.jsx";
import {getMovieByID} from "../api-logic/moviesAPI.jsx";
import ScheduleConfirmation from "../components/Scheduling/ScheduleConfirmation.jsx";

function ScheduleMovie() {
    const { id } = useParams();

    const [scheduleConfirmed, setScheduleConfirmed] = React.useState(false);
    const [movie, setMovie] = React.useState(null);
    const [schedules, setSchedules] = React.useState([]);

    async function loadMovie () {
        try {
            const data = await getMovieByID(id);
            if (!data) throw new Error("Movie not found");
            setMovie(data);
        } catch (err) {
            console.error(`Error loading movie with id ${id}`, err.message);
        }
    }

    function handleScheduled () {
        setScheduleConfirmed(true);
    }

    useEffect(() => {
        loadMovie();
    }, [id])

    return (
        <div>
            <Navbar showLinks={true}/>
            {!movie ? (
                <div>Loading Movie...</div>
            ) : scheduleConfirmed && movie ? (
                <div className="scheduling-confirmation-container">
                    <ScheduleConfirmation movie={movie} />
                </div>

            ) : (
                <div className="scheduling-container">
                    <AddSchedulingForm movie={movie} onScheduled={handleScheduled} />
                </div>
            )}

        </div>

    );
}

export default ScheduleMovie;
