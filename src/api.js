const BASE = 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('token')

const authHeaders = () => ({
    'Authorization': `Bearer ${getToken()}`
})

export const login = async (email, password) => {
    const res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    return res.json()
}

export const getUsers = async () => {
    const res = await fetch(`${BASE}/users`, {
        headers: authHeaders()
    })
    return res.json()
}

export const getAds = async () => {
    const res = await fetch(`${BASE}/ads`, {
        headers: authHeaders()
    })
    return res.json()
}

export const getReports = async () => {
    const res = await fetch(`${BASE}/reports`, {
        headers: authHeaders()
    })
    return res.json()
}

export const getChats = async () => {
    const res = await fetch(`${BASE}/chats`, {
        headers: authHeaders()
    })
    return res.json()
}

export const getChat = async (id) => {
    const res = await fetch(`${BASE}/chats/${id}`, {
        headers: authHeaders()
    })
    return res.json()
}

export const updateUser = async (id, data) => {
    const res = await fetch(`${BASE}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const deleteUser = async (id) => {
    await fetch(`${BASE}/users/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    })
}

export const deleteReport = async (id) => {
    await fetch(`${BASE}/reports/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    })
}

export const deleteAd = async (id) => {
    await fetch(`${BASE}/ads/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    })
}

export const getWeeklyStats = async () => {
    const res = await fetch(`${BASE}/ads/weekly`, {
        headers: authHeaders()
    })
    return res.json()
}

export const getAdmin = async () => {
    const res = await fetch(`${BASE}/admin`, {
        headers: authHeaders()
    })
    return res.json()
}

export const updateAdmin = async (id, data) => {
    const res = await fetch(`${BASE}/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data)
    })
    return res.json()
}

export const changePassword = async (id, data) => {
    const res = await fetch(`${BASE}/admin/password/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(data)
    })
    return res.json()
}