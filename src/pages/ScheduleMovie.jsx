import React from 'react';
import { useParams } from 'react-router';
import AddSchedulingForm from "../components/Scheduling/AddSchedulingForm.jsx";

function ScheduleMovie() {
    const { id } = useParams();

    return (
        <div>
            <AddSchedulingForm />
        </div>
    );
}

export default ScheduleMovie;
