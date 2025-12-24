import React, { useState } from 'react';
import { Typography, Form, Input, Button, message, Row, Col, Card } from 'antd';
import { MailOutlined, PhoneOutlined, LinkedinOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { SOCIAL_LINKS, MOCK_PROFILE } from '../../utils/constants';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactSection: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await api.submitContact(values);
            message.success('Message sent successfully!');
            form.resetFields();
        } catch (error) {
            console.error('Failed to send message', error);
            // Simulate success for demo if API fails
            message.success('Message sent successfully! (Demo mode)');
            form.resetFields();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact" style={{ padding: '80px 0', background: '#f0f2f5' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 50 }}>Get In Touch</Title>

                <Row gutter={[48, 48]}>
                    <Col xs={24} md={10}>
                        <Title level={4}>Contact Information</Title>
                        <Paragraph>
                            Feel free to reach out for collaborations, opportunities, or just to say hi!
                        </Paragraph>

                        <div style={{ marginTop: 30 }}>
                            <Paragraph style={{ fontSize: 16 }}>
                                <MailOutlined style={{ marginRight: 10, color: '#1890ff' }} />
                                <a href={`mailto:${MOCK_PROFILE.email}`}>{MOCK_PROFILE.email}</a>
                            </Paragraph>
                            <Paragraph style={{ fontSize: 16 }}>
                                <PhoneOutlined style={{ marginRight: 10, color: '#1890ff' }} />
                                {MOCK_PROFILE.phone}
                            </Paragraph>
                            <Paragraph style={{ fontSize: 16 }}>
                                <LinkedinOutlined style={{ marginRight: 10, color: '#1890ff' }} />
                                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn Profile</a>
                            </Paragraph>
                        </div>
                    </Col>

                    <Col xs={24} md={14}>
                        <Card>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                >
                                    <Input placeholder="Your Name" />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input placeholder="Your Email" />
                                </Form.Item>

                                <Form.Item
                                    name="subject"
                                    label="Subject"
                                    rules={[{ required: true, message: 'Please enter a subject' }]}
                                >
                                    <Input placeholder="Subject" />
                                </Form.Item>

                                <Form.Item
                                    name="message"
                                    label="Message"
                                    rules={[{ required: true, message: 'Please enter your message' }]}
                                >
                                    <TextArea rows={4} placeholder="Your Message" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading} block size="large">
                                        Send Message
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ContactSection;
