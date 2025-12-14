const BASE_URL = `${import.meta.env.VITE_BASE_URL}/schedule`;
import { FetchWithToken } from './FetchWithToken';

export async function importSchedule(scheduleData) {
    const response = await FetchWithToken(`/schedule`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
    });

    if(!response){
        throw new Error("Failed to import schedule to the database");
    }
    return response;
}

export async function getSchedules() {
    const response = await FetchWithToken(`/schedule`);

    if(!response){
        throw new Error("Failed to get all the schedules");
    }

    return response;
}
export async function getScheduleById(id) {
    const response = await FetchWithToken(`/schedule/${id}`);

    if(!response){
        throw new Error(`Failed to get schedule with id ${id}`);
    }

    return response;
}

export async function getScheduleByTheater(theater_id) {
    const response = await FetchWithToken(`/schedule/theater/${theater_id}`);

    if(!response){
        throw new Error(`Failed to get schedule by theater with id: ${theater_id}`);
    }

    return response;
}
export async function getScheduleByMovie(movie_id) {
    const response = await FetchWithToken(`/schedule/movie/${movie_id}`);

    if(!response){
        throw new Error(`Failed to get schedule by movie with id: ${movie_id}`);
    }

    return response;
}

export async function getScheduleByAuditorium(auditorium_id) {
    const response = await FetchWithToken(`/schedule/auditorium/${auditorium_id}`);

    if(!response){
        throw new Error(`Failed to get schedule by auditorium with id: ${auditorium_id}`);
    }

    return response;
}
export async function getScheduleByDate(date) {
    const response = await FetchWithToken(`/schedule/date/${date}`);

    if(!response){
        throw new Error(`Failed to get schedule by date: ${date}`);
    }

    return response;
}

export async function getScheduleByMovieAndTheater(movie_id,theater_id) {
    const response = await FetchWithToken(`/schedule/movie_theater/${movie_id}/${theater_id}`);

    if(!response){
        throw new Error(`Failed to get schedules by movie with id: ${movie_id} and theater with id: ${theater_id}`);
    }

    return response;
}

export async function deleteSchedule(id) {
    const response = await FetchWithToken(`/schedule/${id}`,{
        method: "DELETE",
    });

}


