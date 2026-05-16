import { useState } from 'react'
import Sidebar from './Sidebar'
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import AdsPage from './pages/AdsPage'
import ReportsPage from './pages/ReportsPage'
import ChatsPage from './pages/ChatsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function AdminDashboard() {
    const [activePage, setActivePage] = useState('dashboard')
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const user = JSON.parse(
            sessionStorage.getItem("user")
        );
        if (!token) {
            navigate("/login");
        }
        if (user?.role !== "admin") {
            navigate("/");
        }
    }, []);
    const renderPage = () => {
        if (activePage === 'dashboard') return <DashboardPage />
        if (activePage === 'users') return <UsersPage />
        if (activePage === 'ads') return <AdsPage />
        if (activePage === 'reports') return <ReportsPage />
        if (activePage === 'chats') return <ChatsPage />
        if (activePage === 'analytics') return <AnalyticsPage />
        if (activePage === 'settings') return <SettingsPage />
        return <div style={{ padding: '24px' }}>Coming Soon . . .</div>
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>

            <div style={{ width: '250px', flexShrink: 0}}>
                <Sidebar activePage={activePage} setActivePage={setActivePage} />
            </div>

            <div style={{flex: 1, overflow: 'auto'}}>
                {renderPage()}
            </div>
        </div>
    )
}