import { theme } from "../../../theme";
import { useState, useEffect } from 'react';
import { Table, Badge, Modal, ListGroup } from 'react-bootstrap'
import { getChats, getChat } from "../../../api";

export default function ChatsPage() {
    const [chats, setChats]       = useState([])
    const [selected, setSelected] = useState(null)
    const [show, setShow]         = useState(false)

    useEffect(() => {
        getChats().then(data => setChats(data))
    }, [])

    const handleView = (id) => {
        getChat(id).then(data => {
            setSelected(data)
            setShow(true)
        })
    }

    const getStatusColor = (status) => {
        if (status === 'active')    return 'success'
        if (status === 'flagged')   return 'danger'
        if (status === 'closed')    return 'secondary'
        return 'secondary'
    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh' }}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Chats</h4>

            <Table hover style={{ backgroundColor: theme.cardBg }}>
                <thead>
                    <tr style={{ color: theme.textMuted, fontSize: '13px' }}>
                        <th>User 1</th>
                        <th>User 2</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {chats.map(chat => (
                        <tr key={chat._id}>
                            <td>{chat.user1}</td>
                            <td>{chat.user2}</td>
                            <td>{chat.subject}</td>
                            <td>
                                <Badge bg={getStatusColor(chat.status)}>
                                    {chat.status}
                                </Badge>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleView(chat._id)}
                                    style={{
                                        padding: '3px 12px',
                                        borderRadius: theme.borderRadius.sm,
                                        border: `1px solid ${theme.border}`,
                                        backgroundColor: theme.btnBg,
                                        color: theme.textPrimary,
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    Veiw
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton style={{ backgroundColor: theme.cardBg}}>
                    <Modal.Title style={{ color: theme.textPrimary, fontSize: '16px'}}>
                        {selected?.user1} to {selected?.user2}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: theme.pageBg }}>
                    <ListGroup variant='flush'>
                        {selected?.messages?.map((msg, i) => (
                            <ListGroup.Item key={i} style={{ backgroundColor: theme.cardBg, marginBottom: '8px', borderRadius: theme.borderRadius.sm}}>
                                <strong style={{ color: theme.textPrimary }}>{msg.sender}</strong>
                                <p style={{ color: theme.textMuted, margin: 0 }}>{msg.text}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </div>
    )
}