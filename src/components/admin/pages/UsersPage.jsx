import { theme } from "../../../theme"
import { useState, useEffect } from 'react'
import { Table, Badge, Button, Modal } from 'react-bootstrap'
import axios from "axios"

export default function UsersPage() {
    const [users, setUsers] = useState([])

    const [showModal, setShowModal]         = useState(false)
    const [modalMsg, setModalMsg]           = useState('')
    const [pendingAction, setPendingAction] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(
                "http://localhost:5000/api/users",
                {
                    headers: {
                        Authorization:
                            `Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            );

            const data = res.data;
            const usersWithAds = await Promise.all(
                data.map(async (user) => {
                    const res = await fetch(
                        `http://localhost:5000/api/products/count/${user._id}`
                    )
                    const countData = await res.json()

                    return {
                        ...user,
                        ads: countData.count
                    }
                })
            )
            setUsers(usersWithAds)
        }
        fetchUsers()
    }, [])

    const getStatusColor = (status) => {
        if (status === 'active')    return { bg: '#e6f4ec', color: '#2d7a4f', border: '#2d7a4f' }
        if (status === 'suspended') return { bg: '#fef3de', color: '#b07d1a', border: '#b07d1a' }
        if (status === 'banned')    return { bg: '#fdecea', color: '#b5451b', border: '#b5451b' }
        return { bg: theme.cardBg2, color: theme.textMuted, border: theme.border }
    }

    const confirm = (msg, action) => {
        setModalMsg(msg)
        setPendingAction(() => action)
        setShowModal(true)
    }

    const handleConfirm = async () => {
        setShowModal(false)
        if (pendingAction) await pendingAction()
    }

    const handleUpdate = async (id, status) => {
        if (status === 'banned') {
            confirm('Are you sure you want to ban this user ?', async () => {
                await axios.put(
                    `http://localhost:5000/api/users/${id}`,
                    { status },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${sessionStorage.getItem("token")}`
                        }
                    }
                )
                setUsers(prev => prev.map(u => u._id === id ? { ...u, status } : u))
            })
        } else {
            await axios.put(
                `http://localhost:5000/api/users/${id}`,
                { status },
                {
                    headers: {
                        Authorization:
                            `Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            )
            setUsers(prev => prev.map(u => u._id === id ? { ...u, status } : u))
        }
    }

    const handleDelete = async (id) => {
        confirm('Are you sure you want to delete this user ?', async () => {
            await axios.delete(
                `http://localhost:5000/api/users/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            )
            setUsers(prev => prev.filter(u => u._id !== id))
        })
    }

    const btnStyle = (bg, color) => ({
        padding: '4px 12px',
        fontSize: '12px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: bg,
        color: color,
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'opacity 0.15s',
    })

    const hover = {
        onMouseOver: e => e.currentTarget.style.filter = 'brightness(0.85)',
        onMouseOut:  e => e.currentTarget.style.filter = 'brightness(1)',
    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh' }}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Users</h4>

            <div style={{ backgroundColor: theme.cardBg, borderRadius: theme.borderRadius.lg, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
                <Table hover style={{ margin: 0, tableLayout: 'fixed', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: theme.cardBg2 }}>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '160px' }}>Name</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '230px' }}>Email</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '250px' }}>University</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '60px' }}>Ads</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '200px' }}>Status</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '250px' }}>Actions</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        {users.map(user => {
                            const s = getStatusColor(user.status)
                            return (
                                <tr key={user._id}>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textPrimary, verticalAlign: 'middle' }}>{user.name}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, verticalAlign: 'middle' }}>{user.email}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, verticalAlign: 'middle' }}>{user.uni}</td>
                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, verticalAlign: 'middle' }}>{user.ads}</td>
                                    <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                                        <span style={{
                                            padding: '3px 10px',
                                            borderRadius: '20px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            backgroundColor: s.bg,
                                            color: s.color,
                                            border: `1px solid ${s.border}`,
                                        }}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', verticalAlign: 'middle', width: '240px', minWidth: '240px', whiteSpace: 'nowrap' }}>
                                        <div
                                            style={{display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center'}}>
                                            {user.status === 'active' && (
                                                <button style={btnStyle('#fef3de', '#b07d1a')} {...hover} onClick={() => handleUpdate(user._id, 'suspended')}>Suspend</button>
                                            )}
                                            {user.status === 'suspended' && (
                                                <>
                                                    <button style={btnStyle('#e6f4ec', '#2d7a4f')} {...hover} onClick={() => handleUpdate(user._id, 'active')}>Restore</button>
                                                    <button style={btnStyle('#fdecea', '#b5451b')} {...hover} onClick={() => handleUpdate(user._id, 'banned')}>Ban</button>
                                                </>
                                            )}
                                            {user.status === 'banned' && (
                                                <button style={btnStyle('#e6f4ec', '#2d7a4f')} {...hover} onClick={() => handleUpdate(user._id, 'active')}>Unban</button>
                                            )}
                                            <button style={btnStyle('#fdecea', '#b5451b')} {...hover} onClick={() => handleDelete(user._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: theme.cardBg }}>
                    <Modal.Title style={{ color: theme.textPrimary, fontSize: '16px' }}>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: theme.pageBg, color: theme.textPrimary, fontSize: '14px' }}>
                    {modalMsg}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: theme.cardBg }}>
                    <Button variant="secondary" size='sm' onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" size='sm' onClick={handleConfirm}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}