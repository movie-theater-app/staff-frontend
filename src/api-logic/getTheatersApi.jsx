const BASE_URL = import.meta.env.VITE_BASE_URL + "/theatres";

export async function getAllTheaters(){
    const response = await fetch(`${BASE_URL}`);

    if(!response.ok){
        throw new Error("Failed fetching all theaters");
    }
    return response.json();
}

export async function getTheaterById(id){
    const response = await fetch(`${BASE_URL}/${id}`);

    if(!response.ok){
        throw new Error(`Failed fetching theater with id: ${id}`);
    }
    return response.json();
}

export async function getAuditoriums(){
    const response = await fetch(`${BASE_URL}/auditoriums`);


    if(!response.ok){
        throw new Error(`Failed fetching all auditoriums`);
    }
    return response.json();
}

export async function getAuditoriumById(id){
    const response = await fetch(`${BASE_URL}/auditoriums/${id}`);

    if(!response.ok){
        throw new Error(`Failed fetching auditorium with id: ${id}`);
    }

    return response.json();
}

export async function getAuditoriumByTheater(theaterId){
    const response = await fetch(`${BASE_URL}/${theaterId}/auditoriums`);

    if(!response.ok){
        throw new Error(`Failed fetching auditoriums of theater with id: ${theaterId}`);
    }

    return response.json();
}

