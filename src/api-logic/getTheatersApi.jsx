const BASE_URL = import.meta.env.VITE_BASE_URL + "/theatres";
import { FetchWithToken } from './FetchWithToken';

export async function getAllTheaters(){
    const response = await FetchWithToken(`/theatres`);

    if(!response){
        throw new Error("Failed fetching all theaters");
    }
    return response;
}

export async function getTheaterById(id){
    const response = await FetchWithToken(`/theatres/${id}`);

    if(!response){
        throw new Error(`Failed fetching theater with id: ${id}`);
    }
    return response;
}

export async function getAuditoriums(){
    const response = await FetchWithToken(`/theatres/auditoriums`);


    if(!response){
        throw new Error(`Failed fetching all auditoriums`);
    }
    return response;
}

export async function getAuditoriumById(id){
    const response = await FetchWithToken(`/theatres/auditoriums/${id}`);

    if(!response){
        throw new Error(`Failed fetching auditorium with id: ${id}`);
    }

    return response;
}

export async function getAuditoriumByTheater(theaterId){
    const response = await FetchWithToken(`/theatres/${theaterId}/auditoriums`);

    if(!response){
        throw new Error(`Failed fetching auditoriums of theater with id: ${theaterId}`);
    }

    return response;
}

