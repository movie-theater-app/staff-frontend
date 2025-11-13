import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getTMDBMovieByID} from "../../api-logic/moviesAPI.jsx"
import {addMinutes} from "date-fns";
import Select from "react-select";
import {getAllTheaters, getAuditoriums, getTheaterById} from "../../api-logic/getTheatersApi.jsx";


function AddSchedulingForm(props) {

    const {id} = useParams();
    const [selectedDates, setSelectedDates] = useState([ new Date() ]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [duration, setDuration] = useState(0);

    const [theatersOptions, setTheatersOptions]  = useState([]);;
    const [auditoriumsOptions, setAuditoriumsOptions]  = useState([]);;


    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedAuditoriums, setSelectedAuditoriums] = useState(null);


    async function formHandler(e) {
        e.preventDefault();
    }

    async function loadMovie() {
        try {
            const data = await getTMDBMovieByID(id);
            if (!data) throw new Error("Movie not found");
            console.log(data);
            const newDuration = parseInt(data.duration_minutes);
            setDuration(newDuration);
        } catch (err) {
            console.error(`Error loading movie with id ${id}`, err.message);
        }
    }

    async function getTheatersList(){
        try {
            const newTheaters = await getAllTheaters();
            if (!newTheaters) throw new Error("Theaters not found");

            let theatersList = [];

            newTheaters.map((theater) => {
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

    async function getAuditoriumsList() {
        try {
            const newAuditoriums = await getAuditoriums();
            if (!newAuditoriums) throw new Error("Auditoriums not found");

            let newAuditoriumsList = [];

            newAuditoriums.map(async (auditorium) => {
                const theaterAuditorium = await getTheaterById(auditorium.theater_id);
                const theaterName = theaterAuditorium.name;
                newAuditoriumsList.push({
                    value: auditorium.id,
                    label: `${auditorium.name}, (${theaterName})`,
                });
                setAuditoriumsOptions(newAuditoriumsList);
            });
        } catch (error) {
            console.error(`Error getting auditoriums`, error.message);
        }
    }

    useEffect(() => {
        if (duration > 0 && startTime) {
            setEndTime(addMinutes(startTime, duration));
        } else {
            setEndTime(startTime);
        }
    }, [startTime, duration]);


    useEffect(() => {
        loadMovie();
        getTheatersList();
        getAuditoriumsList();
    }, [id]);


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

                <div className="date-div"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '40px',
                }}>
                    <DatePicker
                    selectedDates={selectedDates}
                    selectsMultiple
                    onChange={(dates) => {setSelectedDates(dates)}}
                    shouldCloseOnSelect={false}
                    minDate={new Date()}
                    disabledKeyboardNavigation
                    />
                </div>
                <div className="times-div"
                     style={{
                         display: 'flex',
                         flexDirection: 'row',
                         gap: '40px',
                     }}>
                    <DatePicker
                        id="start-time-input"
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                    <DatePicker
                        id="end-time-input"
                        selected={endTime}
                        showTimeSelect
                        showTimeSelectOnly
                        disabled
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                </div>
                <div className="times-div"
                     style={{
                         display: 'flex',
                         flexDirection: 'row',
                         gap: '40px',
                     }}>
                    <Select
                        defaultValue={selectedTheater}
                        onChange={setSelectedTheater}
                        options={theatersOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                    />
                </div>
                <div className="times-div"
                     style={{
                         display: 'flex',
                         flexDirection: 'row',
                         gap: '40px',
                     }}>
                    <Select
                        defaultValue={selectedAuditoriums}
                        onChange={setSelectedAuditoriums}
                        options={auditoriumsOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                    />
                </div>





                <button type="submit">Add New Movie</button>
            </form>
        </div>
    );
}

export default AddSchedulingForm;
