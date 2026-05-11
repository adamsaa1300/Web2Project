import { theme } from '../../theme'

const navItems = [
    { key: 'dashboard', label: 'Dashboard'},
    { key: 'users',     label: 'Users'    },
    { key: 'ads',       label: 'Ads'      },
    { key: 'reports',   label: 'Reports'  },
    { key: 'chats',     label: 'Chats'    },
    { key: 'analytics', label: 'Analytics'},
    { key: 'settings',  label: 'Settings' },
]

export default function Sidebar({ activePage, setActivePage }) {
    return (
        <div style={{
            height: '100vh',
            backgroundColor: theme.cardBg,
            borderLeft: `1px solid ${theme.border}`,
        }}>
            <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border}`}}>
                <h5 style={{ color: theme.textPrimary, margin: 0}}>Sawweq</h5>
                <small style={{ color: theme.textMuted }}>Admin Dashboard</small>
            </div>

            <ul style={{ listStyle: 'none', padding: '10px', margin: 0}}>
                {navItems.map(item => (
                    <li key={item.key} style={{marginBottom: '5px'}}>
                        <button
                            onClick={() => setActivePage(item.key)}
                            style={{
                                width: '100%',
                                textAlign: "left",
                                padding: '10px 15px',
                                border: 'none',
                                borderRadius: theme.borderRadius.md,
                                cursor: 'pointer',
                                fontFamily: theme.fontFamily,
                                fontSize: theme.fontSizes.md,
                                backgroundColor: activePage === item.key ? theme.btnBg : 'transparent',
                                color: activePage === item.key ? theme.textPrimary : theme.textMuted,
                                fontWeight: activePage === item.key ? '700' : '400',
                            }}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}