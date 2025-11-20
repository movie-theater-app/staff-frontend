import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addMinutes} from "date-fns";
import Select from "react-select";
import {
    getAllTheaters, getAuditoriumById,
    getAuditoriumByTheater,
    getTheaterById
} from "../../api-logic/getTheatersApi.jsx";
import { importSchedule } from "../../api-logic/schedulingAPI.jsx";
import "../../CSS/Scheduling.css"


function SchedulingForm({movie, onScheduled}) {

    const [selectedDates, setSelectedDates] = useState([ new Date() ]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [duration, setDuration] = useState(0);

    const [theatersOptions, setTheatersOptions]  = useState([]);
    const [auditoriumsOptions, setAuditoriumsOptions]  = useState([]);


    const [selectedTheaters, setselectedTheaters] = useState([]);
    const [selectedAuditoriums, setSelectedAuditoriums] = useState([]);


    async function formHandler(e) {
        e.preventDefault();


        let newSchedules = [];
        async function createSchedules() {
            for (const date of selectedDates) {
                const dateToSend = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

                for ( const auditorium of selectedAuditoriums) {
                    const a = await getAuditoriumById(auditorium.value);
                    newSchedules.push({
                        movie_id: movie.id,
                        theater_id: a.theater_id,
                        auditorium_id: a.id,
                        screening_date: dateToSend,
                        start_time: formatTime(startTime),
                        end_time: formatTime(endTime),
                    })
                }
            }

        }
        await createSchedules();

        try {
            await Promise.all(
                newSchedules.map((schedule) => importSchedule(schedule)),
            );
        } catch (error) {
            console.error("Failed to create some schedules:", error);

        }

        if(onScheduled) onScheduled();

    }

    function formatTime(time) {
        const timeZoneValue = time.getTimezoneOffset() >= 0 ? "-" : "+";
        const offSetHours = String(Math.abs(Math.floor(time.getTimezoneOffset() / 60))).padStart(2, "0");
        return `${time.getHours()}:${time.getMinutes()}:00${timeZoneValue}${offSetHours}`;
    }

    async function getMovieDuration() {
        if(movie){
            const newDuration = parseInt(movie.duration_minutes);
            setDuration(newDuration);
        } else {
            console.error("Movie does not exist")
        }

    }

    async function getTheatersList(){
        try {
            const newTheaters = await getAllTheaters();
            if (!newTheaters) throw new Error("Theaters not found");

            let theatersList = [];


            newTheaters.forEach((theater) => {
                theatersList.push({
                    value: theater.id,
                    label: theater.name,
                });
            });
            setTheatersOptions(theatersList);
        } catch (error) {
            console.error(`Error getting theaters`, error.message);
        }
    }



    useEffect(() => {
        async function loadAuditoriums() {
            let newAuditoriumsList = [];

            if(!selectedTheaters || selectedTheaters.length === 0){
                setAuditoriumsOptions([]);
                setSelectedAuditoriums([]);
                return;
            }

            for (const theater of selectedTheaters) {
                const theaterAuditorium = await getTheaterById(theater.value);
                const theaterName = theaterAuditorium.name;
                const auditoriums = await getAuditoriumByTheater(theater.value);

                for (const auditorium of auditoriums) {
                    newAuditoriumsList.push({
                        value: auditorium.id,
                        label: `${auditorium.name}, (${theaterName})`
                    });
                }
            }
            console.log(selectedAuditoriums)

            setAuditoriumsOptions(newAuditoriumsList);

            if(selectedAuditoriums.length > 0){
                setSelectedAuditoriums(prevSelected => {
                    return prevSelected.filter(a =>
                        newAuditoriumsList.some(opt => opt.value === a.value)
                    );
                });
            }



        }
        loadAuditoriums();
    }, [selectedTheaters]);

    useEffect(() => {
        if (duration > 0 && startTime) {
            setEndTime(addMinutes(startTime, duration));
        } else {
            setEndTime(startTime);
        }
    }, [startTime, duration]);


    useEffect(() => {
        getMovieDuration();
        getTheatersList();
    }, [movie]);


    return (
        <div className="scheduling-div">
            <h2>ADD/EDIT THE SCHEDULE OF THE MOVIE</h2>
            <form onSubmit={formHandler}>
                <div className="form-field">
                    <label htmlFor="date-input">Select Dates</label>
                    <DatePicker
                        id="date-input"
                        selectedDates={selectedDates}
                        selectsMultiple
                        onChange={(dates) => {setSelectedDates(dates)}}
                        shouldCloseOnSelect={false}
                        minDate={new Date()}
                        disabledKeyboardNavigation
                        isClearable
                        required
                    />
                </div>

                <div className="times-container">
                    <div className="form-field">
                        <label htmlFor="start-time-input">Start Time</label>
                        <DatePicker
                            className="start-time-input"
                            selected={startTime}
                            onChange={(date) => setStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="end-time-input">End Time</label>
                        <DatePicker
                            className="end-time-input"
                            selected={endTime}
                            showTimeSelect
                            showTimeSelectOnly
                            disabled
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            required
                        />
                    </div>
                </div>
                <div className="form-field">
                    <label htmlFor="theaters-input">Select Theaters</label>
                    <Select
                        className="theaters-input"
                        value={selectedTheaters}
                        onChange={setselectedTheaters}
                        options={theatersOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="auditoriums-input">Select Theaters</label>
                    <Select
                        className="auditoriums-input"
                        value={selectedAuditoriums}
                        onChange={setSelectedAuditoriums}
                        options={auditoriumsOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        required
                    />
                </div>





                <button className="submit-button" type="submit">Add New Schedule</button>
            </form>
        </div>
    );
}

export default SchedulingForm;
