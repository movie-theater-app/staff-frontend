const BASE_URL = import.meta.env.VITE_BASE_URL + "/statistics";

export async function getAllStatistics() {
    const response = await fetch(`${BASE_URL}`);

    if(!response.ok){
        const text = await response.text();
        throw new Error(`Failed to fetch all statistics: ${response.status} ${text}`);
    }
    return response.json();
}

export async function getStatisticsByPeriod(year, month) {
    const response = await fetch(`${BASE_URL}/period?year=${year}&month=${month}`);

    if(!response.ok){
        const text = await response.text();
        throw new Error(`Failed to fetch statistics for ${year}-${month}: ${response.status} ${text}`);
    }
    return response.json();
}
