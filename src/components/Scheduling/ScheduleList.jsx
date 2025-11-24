import React, {useEffect, useState} from 'react';
import {getAllTheaters, getAuditoriums} from "../../api-logic/getTheatersApi.jsx";
import {deleteSchedule, getScheduleByMovieAndTheater} from "../../api-logic/schedulingAPI.jsx";

function ScheduleList({movie, reload} ) {

    const [schedulesByTheater, setSchedulesByTheater] = useState([]);


    async function loadSchedules() {
        const [theatersData, auditoriumsData] = await Promise.all([
            getAllTheaters(),
            getAuditoriums(),
        ]);

        const getSchedulesByTheaters = await Promise.all(
            theatersData.map(async(theater) => {
                const res = await getScheduleByMovieAndTheater(movie.id, theater.id);
                const schedules = res.schedules || [] ;
                const newSchedules = schedules.map((schedule) => {
                    const auditorium = auditoriumsData.find(
                        (a) => a.id === schedule.auditorium_id
                    );

                    return {
                        ...schedule,
                        auditorium_name : auditorium ? auditorium.name : null
                    };
                });

                return {
                    theater_name: theater.name,
                    schedules: newSchedules,
                }
            })
        );

        setSchedulesByTheater(getSchedulesByTheaters);

    }

    async function handleDelete (id) {
        await deleteSchedule(id);
        loadSchedules();
    }

    useEffect(()=>{
        loadSchedules();
    }, [movie, reload]);

    return (
        <div className="schedule-confirmation-div">
            {schedulesByTheater.length > 0 ? (
                <div className="schedule-theaters-cont">
                    {schedulesByTheater.map((theater) => (
                        <div className="schedule-list-div">
                            <h3>{theater.theater_name}</h3>
                            <ul>
                                {theater.schedules.map((s) => (
                                    <li className="schedule-li" key={s.id}>{`${s.screening_date}, ${s.start_time.slice(0,5)} - ${s.end_time.slice(0,5)}. ${s.auditorium_name}`}
                                    <button onClick={() => handleDelete(s.id)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No schedules for this movie</p>
            )}
        </div>
    );
}

export default ScheduleList;
