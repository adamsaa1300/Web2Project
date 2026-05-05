import { theme } from "../../../theme"
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from "react"
import { getAdmin, updateAdmin, changePassword } from "../../../api"

export default function SettingsPage() {
    const [admin, setAdmin]                     = useState(null)
    const [name, setName]                       =   useState('')
    const [email, setEmail]                     = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword]         = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        getAdmin().then(data => {
            setAdmin(data)
            setName(data.name)
            setEmail(data.email)
        })
    }, [])

    const handleSave = async () => {
        await updateAdmin(admin._id, { name, email })
        alert('Saved')
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!')
            return
        }
        const res = await changePassword(admin._id, { currentPassword, newPassword })
        if (res.error) {
            alert(res.error)
        } else {
            alert('Password updated!')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <div style={{ padding: '24px', backgroundColor: theme.pageBg, minHeight: '100vh' }}>
            <h4 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Settings</h4>

            <Row className='g-3'>
                <Col xs={12} md={6}>
                    <Card style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: theme.borderRadius.lg }}>
                        <Card.Body>
                            <h6 style={{ color: theme.textPrimary, marginBottom: '16px' }}>Account Info</h6>

                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontSize: '12px', color: theme.textMuted }}>Full Name</Form.Label>
                                <Form.Control type='text' value={name} onChange={e => setName(e.target.value)} style={{ backgroundColor: theme.pageBg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontSize: '13px' }} />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontSize: '12px', color: theme.textMuted }}>Email</Form.Label>
                                <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} style={{ backgroundColor: theme.pageBg, border: `1px solid ${theme.border}`, color: theme.textPrimary, fontSize: '13px' }} />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontSize: '12px', color: theme.textMuted }}>Role</Form.Label>
                                <Form.Control type='text' value={admin?.role || ''} disabled style={{ backgroundColor: theme.pageBg, border: `1px solid ${theme.border}`, color: theme.textMuted, fontSize: '13px' }} />
                            </Form.Group>

                            <Button onClick={handleSave} style={{ backgroundColor: theme.accent, border: 'none', fontSize: '13px' }}>
                                Save Changes
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6}>
                    <Card style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: theme.borderRadius.lg }}>
                        <Card.Body>
                            <h6 style={{ color: theme.textPrimary, marginBottom: '16px' }}>Change Password</h6>

                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontSize: '12px', color: theme.textMuted }}>Current Password</Form.Label>
                                <Form.Control type='password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} style={{ backgroundColor: theme.pageBg, border: `1px solid ${theme.border}`, fontSize: '13px' }} />

                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontSize: '12px', color: theme.textMuted }}>New Password</Form.Label>
                                <Form.Control type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{ backgroundColor: theme.pageBg, border: `1px solid ${theme.border}`, fontSize: '13px' }} />

                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label style={{ fontSize: '12px', color: theme.textMuted }}>Confirm Password</Form.Label>
                                <Form.Control type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ backgroundColor: theme.pageBg, border: `1px solid ${theme.border}`, fontSize: '13px' }} />
                            </Form.Group>

                            <Button onClick={handleChangePassword} style={{ backgroundColor: theme.accent, border: 'none', fontSize: '13px' }}>
                                Update Password
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}