import React, {useEffect, useState} from 'react';
import ScheduleList from "./ScheduleList.jsx";
import SchedulingForm from "./SchedulingForm.jsx";

function Schedule({movie}) {

    const [reload, setReload] = useState((0));

    function reloadPage () {
        setReload(prev => prev + 1);
    }
    return (
        <div>
            <SchedulingForm movie={movie} onScheduled={reloadPage} />
            <ScheduleList movie={movie} reload={reload} />
        </div>
    );
}

export default Schedule;
