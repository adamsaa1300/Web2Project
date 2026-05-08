import { theme } from "../../../theme"
import { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { getReports, deleteReport } from "../../../api"

export default function ReportsPage() {
    const [reports, setReports] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const [pendingAction, setPendingAction] = useState(null)

    useEffect(() => {
        getReports().then(data => setReports(data))
    }, [])

    const getStatusBg = (status) => {
        if (status === 'pending')  return '#fef3de'
        if (status === 'resolved') return '#e6f4ec'
        if (status === 'rejected') return '#fdecea'
        return '#eee'
    }

    const getStatusClr = (status) => {
        if (status === 'pending')  return '#b07d1a'
        if (status === 'resolved') return '#2d7a4f'
        if (status === 'rejected') return '#b5451b'
        return '#888'
    }

    const getTagBg = (tag) => {
        if (tag === 'ad')   return '#e6f0fa'
        if (tag === 'user') return '#eeedfe'
        if (tag === 'chat') return '#fdecea'
        return '#eee'
    }

    const getTagClr = (tag) => {
        if (tag === 'ad')   return '#185fa5'
        if (tag === 'user') return '#534ab7'
        if (tag === 'chat') return '#b5451b'
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

    const handleIgnore = (id) => {
        confirm('are you sure you want to ignore this report ?', async () => {
            await deleteReport(id)
            setReports(prev => prev.filter(r => r._id !== id))
        })
    }

    const handleResolve = (id) => {
        confirm('are you sure you want to resolve this report ?', async () => {
            await deleteReport(id)
            setReports(prev => prev.filter(r => r._id !== id))
        })
    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh' }}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Reports</h4>

            <div style={{ backgroundColor: theme.cardBg, borderRadius: theme.borderRadius.lg, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <thead>
                        <tr style={{ backgroundColor: theme.cardBg2 }}>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '80px' }}>Type</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '200px' }}>Title</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}` }}>Description</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '100px' }}>Status</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '150px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => (
                            <tr key={report._id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                                <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                                    <span style={{
                                        padding: '3px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        backgroundColor: getTagBg(report.tag),
                                        color: getTagClr(report.tag),
                                        border: `1px solid ${getTagClr(report.tag)}`,
                                    }}>
                                        {report.tag}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textPrimary, verticalAlign: 'middle' }}>{report.title}</td>
                                <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, verticalAlign: 'middle' }}>{report.desc}</td>
                                <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                                    <span style={{
                                        padding: '3px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        backgroundColor: getStatusBg(report.status),
                                        color: getStatusClr(report.status),
                                        border: `1px solid ${getStatusClr(report.status)}`,
                                    }}>
                                        {report.status}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button
                                            onClick={() => handleIgnore(report._id)}
                                            onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.85)'}
                                            onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
                                            style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', backgroundColor: theme.cardBg2, color: theme.textMuted, cursor: 'pointer', fontWeight: '500' }}
                                        >Ignore</button>
                                        <button
                                            onClick={() => handleResolve(report._id)}
                                            onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.85)'}
                                            onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
                                            style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#e6f4ec', color: '#2d7a4f', cursor: 'pointer', fontWeight: '500' }}
                                        >Resolve</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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