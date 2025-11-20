const BASE_URL = `${import.meta.env.VITE_BASE_URL}/schedule`;

export async function importSchedule(scheduleData) {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
    });

    if(!response.ok){
        throw new Error("Failed to import schedule to the database");
    }
    return response.json();
}

export async function getSchedules() {
    const response = await fetch(`${BASE_URL}`);

    if(!response.ok){
        throw new Error("Failed to get all the schedules");
    }

    return response.json();
}
export async function getScheduleById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);

    if(!response.ok){
        throw new Error(`Failed to get schedule with id ${id}`);
    }

    return response.json();
}

export async function getScheduleByTheater(theater_id) {
    const response = await fetch(`${BASE_URL}/theater/${theater_id}`);

    if(!response.ok){
        throw new Error(`Failed to get schedule by theater with id: ${theater_id}`);
    }

    return response.json();
}
export async function getScheduleByMovie(movie_id) {
    const response = await fetch(`${BASE_URL}/movie/${movie_id}`);

    if(!response.ok){
        throw new Error(`Failed to get schedule by movie with id: ${movie_id}`);
    }

    return response.json();
}

export async function getScheduleByAuditorium(auditorium_id) {
    const response = await fetch(`${BASE_URL}/auditorium/${auditorium_id}`);

    if(!response.ok){
        throw new Error(`Failed to get schedule by auditorium with id: ${auditorium_id}`);
    }

    return response.json();
}
export async function getScheduleByDate(date) {
    const response = await fetch(`${BASE_URL}/date/${date}`);

    if(!response.ok){
        throw new Error(`Failed to get schedule by date: ${date}`);
    }

    return response.json();
}

export async function getScheduleByMovieAndTheater(movie_id,theater_id) {
    const response = await fetch(`${BASE_URL}/movie_theater/${movie_id}/${theater_id}`);

    if(!response.ok){
        throw new Error(`Failed to get schedules by movie with id: ${movie_id} and theater with id: ${theater_id}`);
    }

    return response.json();
}

export async function deleteSchedule(id) {
    const response = await fetch(`${BASE_URL}/${id}`,{
        method: "DELETE",
    });

    if(!response.ok){
        throw new Error(`Failed to delete schedule with id: ${id}`);
    }
}


