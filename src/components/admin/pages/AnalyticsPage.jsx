import { theme } from "../../../theme";
import { Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getUsers, getAds, getReports, getWeeklyStats } from "../../../api";

export default function AnalyticsPage() {
    const [users, setUsers]       = useState([])
    const [ads, setAds]           = useState([])
    const [reports, setReports]   = useState([])
    const [weekData, setWeekData] = useState([])

    useEffect(() => {
        getUsers().then(data => setUsers(data))
        getAds().then(data => setAds(data))
        getReports().then(data => setReports(data))
        getWeeklyStats().then(data => setWeekData(data))
    }, [])

    const maxVal = weekData.length ? Math.max(...weekData.map(w => w.val)) || 1 : 1

    const summaryCards = [
        { label: 'Total Users',     value: users.length,                                   color: theme.purple},
        { label: 'Total Ads',       value: ads.length,                                     color: theme.success},
        { label: 'Active Ads',      value: ads.filter(a => a.status === 'active').length,  color: theme.blue},
        { label: 'Total Reports',   value: reports.length,                                 color: theme.danger},
    ]

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh'}}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px'}}>Analytics</h4>

            <Row className='g-3 mb-4'>
                {summaryCards.map((card, i) => (
                    <Col key={i} xs={6} xl={3}>
                        <Card style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: theme.borderRadius.lg}}>
                            <Card.Body>
                                <h3 style={{ color: card.color, margin: 0 }}>{card.value}</h3>
                                <small style={{color: theme.textMuted }}>{card.label}</small>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: theme.borderRadius.lg}}>
                <Card.Body>
                    <h6 style={{ color: theme.textPrimary, marginBottom: '16px'}}>Weekly Ads Activity</h6>
                    {weekData.map((w, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                            <span style={{ width: '30px', fontSize: '12px', color: theme.textMuted }}>{w.day}</span>
                            <div style={{ flex: 1, height: '20px', backgroundColor: theme.cardBg2, borderRadius: '4px', overflow: 'hidden'}}>
                                <div style={{
                                    width: `${Math.round(w.val / maxVal * 100)}%`,
                                    minWidth: '5%',
                                    height: '100%',
                                    backgroundColor: w.color,
                                    borderRadius: '4px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                                    paddingRight: '8px', fontSize: '11px', color: '#fff'
                                }}>{w.val}</div>
                            </div>
                            <span style={{ width: '30px', fontSize: '12px', color: theme.textPrimary }}>{w.val}</span>
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
}