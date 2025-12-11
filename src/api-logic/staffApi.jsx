import { FetchWithToken } from './FetchWithToken';

// list staff
export async function getAllStaff() {
    return await FetchWithToken('/staff') 
}
// add new staff (by admin)
export async function createStaff(name, email, role) {
    return await FetchWithToken('/staff', {
        method: 'POST',
        body: JSON.stringify({name, email, role })
    })
}
// update staff (by admin)
export async function updateStaff(id, name, email, role) {
    return await FetchWithToken(`/staff/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({name, email, role})
    })
}
// own profile view
export async function getMyProfile() {
    return await FetchWithToken('/staff/profile')
}
// update profile
export async function updateMyProfile({name}) {
    return await FetchWithToken('/staff/profile', {
        method: 'PATCH',
        body: JSON.stringify({name})
    })
}
// change password (note -> not reset)
export async function changePassword(currentPassword, newPassword) {
    return await FetchWithToken('/staff/profile/password', {
        method: 'PATCH',
        body: JSON.stringify({currentPassword, newPassword})
    })
}
// delete staff (by admin)
export async function deleteStaff(id) {
    return await FetchWithToken(`/staff/${id}`, {
        method: 'DELETE'
    })
}