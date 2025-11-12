import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getTMDBMovieByID} from "../../api-logic/moviesAPI.jsx"
import {addMinutes} from "date-fns";
import Select from "react-select";


function AddSchedulingForm(props) {

    const {id} = useParams();
    const [selectedDates, setSelectedDates] = useState([ new Date() ]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [duration, setDuration] = useState(0);


    const cinemas = [
        { value: 'Cinema Nova Oulu', label: 'Cinema Nova Oulu' },
        { value: 'Kino Baltic Turku', label: 'Kino Baltic Turku' },
        { value: 'Elokuvateatteri Helsinki Central', label: 'Elokuvateatteri Helsinki Central' },
    ];

    const auditoriums = [
        { value: 'Auditorium 1 (Oulu)', label: 'Auditorium 1 (Oulu)' },
        { value: 'Auditorium 2 (Oulu)', label: 'Auditorium 2 (Oulu)' },
        { value: 'Auditorium 3 (Oulu)', label: 'Auditorium 3 (Oulu)' },

        { value: 'Auditorium 1 (Turku)', label: 'Auditorium 1 (Turku)' },
        { value: 'Auditorium 2 (Turku)', label: 'Auditorium 2 (Turku)' },
        { value: 'Auditorium 3 (Turku)', label: 'Auditorium 3 (Turku)' },
        { value: 'Auditorium 4 (Turku)', label: 'Auditorium 4 (Turku)' },

        { value: 'Auditorium 1 (Helsinki)', label: 'Auditorium 1 (Helsinki)' },
        { value: 'Auditorium 2 (Helsinki)', label: 'Auditorium 2 (Helsinki)' },
    ];


    const [selectedCinemas, setSelectedCinemas] = useState(null);
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
            console.error(err);
        }
    }
    useEffect(() => {
        loadMovie();
        handleStartTimeChange(new Date());
    }, [id, duration]);

    function handleStartTimeChange(date) {
        setStartTime(date);
        if(duration) {
            const newEndTime = addMinutes(date, duration);
            setEndTime(newEndTime);
        }
    }

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
                        onChange={(date) => handleStartTimeChange(date)}
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
                        defaultValue={selectedCinemas}
                        onChange={setSelectedCinemas}
                        options={cinemas}
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
                        options={auditoriums}
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
