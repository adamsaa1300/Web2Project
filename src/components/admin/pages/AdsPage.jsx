import { theme } from "../../../theme"
import { useState, useEffect } from 'react'
import { Table, Badge, Button } from 'react-bootstrap'
import { getAds, deleteAd } from '../../../api'

export default function AdsPage() {
    const [ads, setAds] = useState([])

    useEffect(() => {
        getAds().then(data => setAds(data))
    }, [])

    const getStatusColor = (status) => {
        if (status === 'active')    return 'success'
        if (status === 'pending')   return 'warning'
        if (status === 'rejected')   return 'danger'
        return 'secondary'
    }

    const handleDelete = async (id) => {
        await deleteAd(id)
        setAds(prev => prev.filter(a => a._id !== id))
    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh'}}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px'}}>Ads</h4>

            <Table hover style={{ backgroundColor: theme.cardBg }}>
                <thead>
                    <tr style={{ color: theme.textMuted, fontSize: '13px' }}>
                        <th>Title</th>
                        <th>User</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map(ad => (
                        <tr key={ad._id}>
                            <td>{ad.title}</td>
                            <td>{ad.user}</td>
                            <td>{ad.category}</td>
                            <td>{ad.price}</td>
                            <td>
                                <Badge bg={getStatusColor(ad.status)}>
                                    {ad.status}
                                </Badge>
                            </td>
                            <td>
                                <Button size='sm' variant='outline-danger' onClick={() => handleDelete(ad._id)}>
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