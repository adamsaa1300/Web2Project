import { theme } from "../../../theme"
import { Row, Col, Card, Badge } from 'react-bootstrap'
import { FaUsers, FaBullhorn, FaShoppingCart, FaFlag } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { getUsers, getAds, getReports, getWeeklyStats } from '../../../api'

export default function DashboardPage() {
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

    const statsCards = [
        { icon: <FaUsers/>,        title: "Total Users",   value: users.length,                                  color: theme.purple  },
        { icon: <FaBullhorn/>,     title: "Active Ads",    value: ads.filter(a => a.status === 'active').length, color: theme.success },
        { icon: <FaShoppingCart/>, title: "Today's Deals", value: 0,                                             color: theme.warning },
        { icon: <FaFlag/>,         title: "New Reports",   value: reports.length,                                color: theme.danger  },
    ]

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh' }}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px'}}>Dashboard</h4>

            <Row className='g-3 mb-4'>
                {statsCards.map((card, index) => (
                    <Col key={index} xs={12} sm={6} xl={3}>
                        <Card style={{
                            backgroundColor: theme.cardBg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: theme.borderRadius.lg,
                        }}>
                            <Card.Body>
                                <div style={{ fontSize: '20px', marginBottom: '8px'}}>{card.icon}</div>
                                <h3 style={{ color: card.color, margin: 0}}>{card.value}</h3>
                                <small style={{ color: theme.textMuted }}>{card.title}</small>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className='g-3 mb-4'>
                <Col xs={12} md={6}>
                    <Card style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: theme.borderRadius.lg }}>
                        <Card.Body>
                            <h6 style={{ color: theme.textPrimary, marginBottom: '12px' }}>Latest Reports</h6>
                            {reports.slice(0, 3).map(r => (
                                <div key={r._id} style={{ padding: '8px 0', borderBottom: `1px solid ${theme.border}` }}>
                                    <Badge bg='warning' style={{ marginBottom: '4px' }}>{r.tag}</Badge>
                                    <div style={{ fontSize: '12px', color: theme.textPrimary }}>{r.title}</div>
                                    <div style={{ fontSize: '11px', color: theme.textMuted }}>{r.desc}</div>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6}>
                    <Card style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: theme.borderRadius.lg }}>
                        <Card.Body>
                            <h6 style={{ color: theme.textPrimary, marginBottom: '12px' }}>Latest Users</h6>
                            {users.slice(0, 3).map(u => (
                                <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${theme.border}` }}>
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: '500', color: theme.textPrimary }}>{u.name}</div>
                                        <div style={{ fontSize: '11px', color: theme.textMuted }}>{u.uni}</div>
                                    </div>
                                    <Badge bg={u.status === 'active' ? 'success' : u.status === 'suspended' ? 'warning' : 'danger'}>
                                        {u.status}
                                    </Badge>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: theme.borderRadius.lg }}>
                <Card.Body>
                    <h6 style={{ color: theme.textPrimary, marginBottom: '16px' }}>Weekly Activity</h6>
                    {weekData.map((w, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <span style={{ width: '30px', fontSize: '12px', color: theme.textMuted }}>{w.day}</span>
                            <div style={{ flex: 1, height: '20px', backgroundColor: theme.cardBg2, borderRadius: '4px', overflow: 'hidden' }}>
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