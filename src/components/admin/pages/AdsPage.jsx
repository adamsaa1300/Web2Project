import { theme } from "../../../theme"
import { useState, useEffect } from 'react'
import { Table, Badge, Button, Modal } from 'react-bootstrap'
import axios from "axios"
import {
    useNavigate,
    useLocation
} from "react-router-dom"
export default function AdsPage() {
    const [ads, setAds] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const [pendingAction, setPendingAction] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const fetchAds = async () => {

            try {

                const res = await axios.get(
                    "http://localhost:5000/api/products",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${sessionStorage.getItem("token")}`
                        }
                    }
                );

                setAds(res.data);

            } catch (err) {

                console.log(err);

            }

        };

        fetchAds();
    }, [])

    const getStatusBg = (status) => {
        if (status === 'active')   return '#e6f4ec'
        if (status === 'pending')  return '#fef3de'
        if (status === 'rejected') return '#fdecea'
        return '#eee'
    }

    const getStatusClr = (status) => {
        if (status === 'active')   return '#2d7a4f'
        if (status === 'pending')  return '#b07d1a'
        if (status === 'rejected') return '#b5451b'
        return '#888'
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

    const handleDelete = (id) => {
        confirm('are you sure you want to delete this ad ?', async () => {
            await axios.delete(
                `http://localhost:5000/api/products/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            )
            setAds(prev => prev.filter(a => a._id !== id))
        })
    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh' }}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Ads</h4>

            <div style={{ backgroundColor: theme.cardBg, borderRadius: theme.borderRadius.lg, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
                <Table  style={{ margin: 0, tableLayout: 'fixed', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: theme.cardBg2 }}>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '200px' }}>Title</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '160px' }}>User</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '130px' }}>Category</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '80px' }}>Price</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '100px' }}>Status</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '100px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map(ad => (
                            <tr key={ad._id}>
                                <td
                                    onClick={() => navigate("/search", {
                                        state: {
                                            selectedProductId: ad._id,
                                            from: location.pathname
                                        }
                                    })}

                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#8b6b4f"
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = theme.textPrimary
                                    }}

                                    style={{
                                        padding: '12px 16px',
                                        fontSize: '13px',
                                        color: theme.textPrimary,
                                        verticalAlign: 'middle',
                                        cursor: 'pointer',
                                        transition: '0.2s ease',
                                        fontWeight: '750'
                                    }}
                                >
                                    {ad.title}
                                </td>

                                <td
                                    onClick={() =>
                                        navigate(`/profile/${ad.user}`, {
                                            state: {
                                                from: location.pathname
                                            }
                                        })
                                    }

                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#8b6b4f"
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = theme.textPrimary
                                    }}

                                    style={{
                                        padding: '12px 16px',
                                        fontSize: '13px',
                                        color: theme.textPrimary,
                                        verticalAlign: 'middle',
                                        cursor: 'pointer',
                                        transition: '0.2s ease',
                                        fontWeight: '750'
                                    }}
                                >
                                    {ad.userName || "Unknown User"}
                                </td>
                                <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, verticalAlign: 'middle',  fontWeight: '650' }}>{ad.category}</td>
                                <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, verticalAlign: 'middle',  fontWeight: '650' }}>{ad.price}</td>
                                <td style={{ padding: '12px 16px', verticalAlign: 'middle' ,  fontWeight: '650'}}>
                                    <span style={{
                                        padding: '3px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        backgroundColor: getStatusBg(ad.status),
                                        color: getStatusClr(ad.status),
                                        border: `1px solid ${getStatusClr(ad.status)}`,
                                    }}>
                                        {ad.status}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                    <button
                                        onClick={() => handleDelete(ad._id)}
                                        onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.85)'}
                                        onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
                                        style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#fdecea', color: '#b5451b', cursor: 'pointer', fontWeight: '500' }}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
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