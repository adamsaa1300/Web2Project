const BASE = 'http://localhost:5000/api'

export const getUsers = async () => {
    const res = await fetch(`${BASE}/users`)
    return res.json()
}

export const getAds = async () => {
    const res = await fetch(`${BASE}/ads`)
    return res.json()
}

export const getReports = async () => {
    const res = await fetch(`${BASE}/reports`)
    return res.json()
}

export const getChats = async () => {
    const res = await fetch(`${BASE}/chats`)
    return res.json()
}

export const getChat = async (id) => {
    const res = await fetch(`${BASE}/chats/${id}`)
    return res.json()
}

export const updateUser = async (id, data) => {
    const res = await fetch(`${BASE}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const deleteUser = async (id) => {
    await fetch(`${BASE}/users/${id}`, { method: 'DELETE' })
}

export const deleteReport = async (id) => {
    await fetch(`${BASE}/reports/${id}`, { method: 'DELETE'})
}

export const deleteAd = async (id) => {
    await fetch(`${BASE}/ads/${id}`, { method: 'DELETE' })
}

export const getWeeklyStats = async () => {
    const res = await fetch(`${BASE}/ads/weekly`)
    return res.json()
}

export const getAdmin = async () => {
    const res = await fetch(`${BASE}/admin`)
    return res.json()
}

export const updateAdmin = async (id, data) => {
    const res = await fetch(`${BASE}/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const changePassword = async (id, data) => {
    const res = await fetch(`${BASE}/admin/password/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return res.json()
}