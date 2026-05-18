import { theme } from "../../../theme";
import { Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AnalyticsPage() {
    const [users, setUsers]       = useState([])
    const [ads, setAds]           = useState([])
    const [reports, setReports]   = useState([])
    const [weekData, setWeekData] = useState([])
    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const headers = {
                    Authorization:
                        `Bearer ${sessionStorage.getItem("token")}`
                };

                const usersRes = await axios.get(
                    "http://localhost:5000/api/users",
                    { headers }
                );

                const adsRes = await axios.get(
                    "http://localhost:5000/api/products",
                    { headers }
                );

                const reportsRes = await axios.get(
                    "http://localhost:5000/api/reports",
                    { headers }
                );

                setUsers(usersRes.data);

                setAds(adsRes.data);

                setReports(reportsRes.data);

                setWeekData([
                    { day: "Mon", val: 4, color: "#7b5647" },
                    { day: "Tue", val: 7, color: "#a67c6b" },
                    { day: "Wed", val: 3, color: "#d8c1af" },
                    { day: "Thu", val: 6, color: "#7fa36b" },
                    { day: "Fri", val: 8, color: "#5f4034" },
                    { day: "Sat", val: 5, color: "#b08a5a" },
                    { day: "Sun", val: 2, color: "#8d6f61" },
                ]);

            } catch (err) {

                console.log(err);

            }

        };

        fetchAnalytics();

    }, []);

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