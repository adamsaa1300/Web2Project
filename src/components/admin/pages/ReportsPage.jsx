import { theme } from "../../../theme"
import { useState, useEffect } from 'react'
import { Table, Badge, Button } from 'react-bootstrap'
import { getReports, deleteReport } from "../../../api"

export default function ReportsPage() {
    const [reports, setReports] = useState([])


    useEffect(() => {
        getReports().then(data => setReports(data))
    }, [])

    const getStatusColor = (status) => {
        if (status === 'pending') return 'warning'
        if (status === 'resolved') return 'success'
        if (status === 'rejected') return 'danger'
        return 'secondary'
    }

    const getTagColor = (tag) => {
        if (tag === 'ad') return 'primary'
        if (tag === 'user') return 'purple'
        if (tag === 'chat') return 'danger'
        return 'secondary'
    }

    const handleIgnore = async (id) => {
        await deleteReport(id)
        setReports(prev => prev.filter(r => r._id !== id))
    }

    const handleResolve = async (id) => {
        await deleteReport(id)
        setReports(prev => prev.filter(r => r._id !== id))

    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh'}}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px'}}>Reports</h4>

            <Table hover style={{ backgroundColor: theme.cardBg}}>
                <thead>
                    <tr style={{ color: theme.textMuted, fontSize: '13px'}}>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report._id}>
                            <td>
                                <Badge bg={getTagColor(report.tag)}>
                                    {report.tag}
                                </Badge>
                            </td>
                            <td>{report.title}</td>
                            <td>{report.desc}</td>
                            <td>
                                <Badge bg={getStatusColor(report.status)}>
                                    {report.status}
                                </Badge>
                            </td>
                            <td style={{ display: 'flex', gap: '6px'}}>
                                <Button size='sm' variant='outline-secondary' onClick={() => handleIgnore(report._id)}>
                                    Ignore
                                </Button>
                                <Button size='sm' variant='danger' onClick={() => handleResolve(report._id)}>
                                    Resolve
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}