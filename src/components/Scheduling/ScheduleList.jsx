import React, {useEffect, useState} from 'react';
import {getAllTheaters, getAuditoriums} from "../../api-logic/getTheatersApi.jsx";
import {deleteSchedule, getScheduleByMovieAndTheater} from "../../api-logic/schedulingAPI.jsx";

function ScheduleList({movie, reload} ) {

    const [schedulesByTheater, setSchedulesByTheater] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [actualTheater, setActualTheater] = useState(null);
    const [schedules, setSchedules] = useState([]);


    function changeTheater(theater) {
        setActualTheater(theater);
    }

    async function setSchedulesForTheater() {
        if(!actualTheater) return;
        console.log("theaters", actualTheater);
        const auditoriumsData = await getAuditoriums();
        const res = await getScheduleByMovieAndTheater(movie.id,  actualTheater.id);
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

        setSchedules(newSchedules);
    }
    async function loadTheaterAndSchedule() {
        const theatersData = await getAllTheaters();
        setTheaters(theatersData);
        setActualTheater(theatersData[0]);

       /* const getSchedulesByTheaters = await Promise.all(
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

        setSchedulesByTheater(getSchedulesByTheaters);*/

    }

    async function handleDelete (id) {
        await deleteSchedule(id);
        setSchedulesForTheater();
    }

    useEffect(()=>{
        loadTheaterAndSchedule();
    }, [movie, reload]);

    useEffect(() => {
        setSchedulesForTheater();
    }, [actualTheater]);

    return (
        <div className="schedule-confirmation-div">
            {theaters.length > 0 ? (
                <div className="schedule-theaters-cont">
                    <div className="theaters-cont">
                        {theaters.map((theater) => (
                            <button className="change-theater-btn" key={theater.id} onClick={() => changeTheater(theater)}>{theater.name}</button>
                        ))}
                    </div>
                    <div className="schedules-cont">
                        {schedules.length > 0 ? (
                            <ul className="schedule-list-div">
                                <h4 style={{color:"white"}}>{actualTheater.name}</h4>
                                {schedules.map((s) => (
                                    <li className="schedule-li" key={s.id}>{`${s.screening_date}, ${s.start_time.slice(0,5)} - ${s.end_time.slice(0,5)}. ${s.auditorium_name}`}
                                        <button onClick={() => handleDelete(s.id)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>
                                <h4 style={{color:"white", marginBottom:"4rem"}}>{actualTheater.name}</h4>
                                <p>There are no dates for this theater</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>There are no theaters yet</p>
            )}
        </div>
        /*<div className="schedule-confirmation-div">
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
        </div>*/
    );
}

export default ScheduleList;
