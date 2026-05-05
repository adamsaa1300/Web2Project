import { theme } from "../../../theme"
import { useState, useEffect } from 'react'
import { Table, Badge, Button } from 'react-bootstrap'
import { getUsers, updateUser, deleteUser } from '../../../api'

export default function UsersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(data => setUsers(data))
    }, [])

    const getStatusColor = (status) => {
        if (status === 'active')    return 'success'
        if (status === 'suspended') return 'warning'
        if (status === 'banned')    return 'danger'
        return 'secondary'
    }

    const handleUpdate = async (id, status) => {
        await updateUser(id, { status })
        setUsers(prev => prev.map(u => u._id === id ? { ...u, status } : u))
    }

    const handleDelete = async (id) => {
        await deleteUser(id)
        setUsers(prev => prev.filter(u => u._id !== id))
    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh'}}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Users</h4>

            <Table hover style={{ backgroundColor: theme.cardBg}}>
                <thead>
                    <tr style={{ color: theme.textMuted, fontSize: '13px'}}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>University</th>
                        <th>Ads</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.uni}</td>
                            <td>{user.ads}</td>
                            <td>
                                <Badge bg={getStatusColor(user.status)}>
                                    {user.status}
                                </Badge>
                            </td>
                            <td style={{ display: 'flex', gap: '6px' }}>
                                {user.status === 'active' && (
                                    <Button size='sm' variant='warning' onClick={() => handleUpdate(user._id, 'suspended')}>
                                        Suspend
                                    </Button>
                                )}
                                {user.status === 'suspended' && (
                                    <>
                                        <Button size='sm' variant='success' onClick={() => handleUpdate(user._id, 'active')}>
                                            Restore
                                        </Button>
                                        <Button size='sm' variant='danger' onClick={() => handleUpdate(user._id, 'banned')}>
                                            Ban
                                        </Button>
                                    </>
                                )}
                                {user.status === 'banned' && (
                                    <Button size='sm' variant='success' onClick={() => handleUpdate(user._id, 'active')}>
                                        Unban
                                    </Button>
                                )}
                                <Button size='sm' variant='outline-danger' onClick={() => handleDelete(user._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}