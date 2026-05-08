import { theme } from "../../../theme"
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from "react"
import { getAdmin, updateAdmin, changePassword } from "../../../api"

export default function SettingsPage() {
    const [admin, setAdmin]                     = useState(null)
    const [name, setName]                       = useState('')
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

    const [successMsg, setSuccessMsg] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    const showAlert = (msg) => {
        setSuccessMsg(msg)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2500)
    }

    const handleSave = async () => {
        await updateAdmin(admin._id, { name, email })
        showAlert('Saved Successfully')
    }

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            showAlert('Passwords do not match')
            return
        }
        const res = await changePassword(admin._id, { currentPassword, newPassword })
        if (res.error) {
            showAlert(res.error)
        } else {
            showAlert('Password updated!')
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

                            <Button
                                onClick={handleSave}
                                onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.85)'}
                                onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
                                style={{ backgroundColor: theme.accent, border: 'none', fontSize: '13px', cursor: 'pointer' }}
                            >
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

                            <Button
                                onClick={handleChangePassword}
                                onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.85)'}
                                onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
                                style={{ backgroundColor: theme.accent, border: 'none', fontSize: '13px', cursor: 'pointer' }}
                            >
                                Update Password
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {showSuccess && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                    borderRadius: theme.borderRadius.md,
                    padding: '12px 20px',
                    fontSize: '13px',
                    color: theme.textPrimary,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 9999,
                }}>
                    {successMsg}
                </div>
            )}
        </div>
    )
}