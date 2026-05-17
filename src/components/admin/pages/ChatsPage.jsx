import { theme } from "../../../theme"
import { useState, useEffect } from 'react'
import { Modal, ListGroup, Button } from 'react-bootstrap'
//import { getChats, getChat } from "../../../api"
import { getAllProductChats, getProductChat } from "../../../api"

export default function ChatsPage() {
    const [chats, setChats]       = useState([])
    const [selected, setSelected] = useState(null)
    const [show, setShow]         = useState(false)

    /*useEffect(() => {
        getChats().then(data => setChats(data))
    }, [])
    */
   useEffect(() => {
    getAllProductChats().then(data => {
        if (Array.isArray(data)) {
            setChats(data)
        } else {
            setChats([])
        }
    })
}, [])

    const handleView = (id) => {
        getChat(id).then(data => {
            setSelected(data)
            setShow(true)
        })
    }
    


    const getStatusBg = (status) => {
        if (status === 'active')  return '#e6f4ec'
        if (status === 'flagged') return '#fdecea'
        if (status === 'closed')  return '#eee'
        return '#eee'
    }

    const getStatusClr = (status) => {
        if (status === 'active')  return '#2d7a4f'
        if (status === 'flagged') return '#b5451b'
        if (status === 'closed')  return '#888'
        return '#888'
    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh' }}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Chats</h4>

            <div style={{ backgroundColor: theme.cardBg, borderRadius: theme.borderRadius.lg, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <thead>
                        <tr style={{ backgroundColor: theme.cardBg2 }}>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '180px' }}>User 1</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '180px' }}>User 2</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}` }}>Subject</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '100px' }}>Status</th>
                            <th style={{ padding: '12px 16px', fontSize: '12px', color: theme.textMuted, fontWeight: '600', borderBottom: `2px solid ${theme.border}`, width: '80px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chats.map(chat => (
                            <tr key={chat._id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                                <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textPrimary, verticalAlign: 'middle' }}>{chat.user1}</td>
                                <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, verticalAlign: 'middle' }}>{chat.user2}</td>
                                <td style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, verticalAlign: 'middle' }}>{chat.subject}</td>
                                <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                                    <span style={{
                                        padding: '3px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        backgroundColor: getStatusBg(chat.status),
                                        color: getStatusClr(chat.status),
                                        border: `1px solid ${getStatusClr(chat.status)}`,
                                    }}>
                                        {chat.status}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                                    <button
                                        onClick={() => handleView(chat._id)}
                                        onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.85)'}
                                        onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
                                        style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', backgroundColor: theme.btnBg, color: theme.textPrimary, cursor: 'pointer', fontWeight: '500' }}
                                    >View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: theme.cardBg, borderBottom: `1px solid ${theme.border}` }}>
                    <Modal.Title style={{ color: theme.textPrimary, fontSize: '15px', fontWeight: '600' }}>
                        {selected?.user1} → {selected?.user2}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: theme.pageBg, padding: '16px', maxHeight: '400px', overflowY: 'auto' }}>
                    {selected?.messages?.map((msg, i) => (
                        <div key={i} style={{
                            backgroundColor: theme.cardBg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: theme.borderRadius.md,
                            padding: '10px 14px',
                            marginBottom: '10px',
                        }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: theme.textPrimary, marginBottom: '4px' }}>{msg.sender}</div>
                            <div style={{ fontSize: '13px', color: theme.textMuted }}>{msg.text}</div>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    )
}