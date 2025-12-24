import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, Space, Avatar, Row, Col } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined, DownloadOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { Profile } from '../../types';
import { MOCK_PROFILE, SOCIAL_LINKS } from '../../utils/constants';

const { Title, Text, Paragraph } = Typography;

interface HeroSectionProps {
    initialData?: Profile | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ initialData }) => {
    const [profile, setProfile] = useState<Profile | null>(initialData || null);
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        if (initialData) {
            setProfile(initialData);
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await api.getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile, using mock data', error);
                setProfile(MOCK_PROFILE as any);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [initialData]);

    if (loading) return <div>Loading...</div>;

    return (
        <div id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #001529 0%, #1890ff 100%)', color: 'white', padding: '100px 24px 50px' }}>
            <Row justify="center" align="middle" gutter={[32, 32]} style={{ maxWidth: 1200, width: '100%' }}>
                <Col xs={24} md={10} style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Avatar
                            size={{ xs: 200, sm: 250, md: 300, lg: 350, xl: 400, xxl: 400 }}
                            src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Adilhusen"}
                            style={{ border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                        />
                    </motion.div>
                </Col>
                <Col xs={24} md={14}>
                    <div className="hero-content" style={{ textAlign: 'center', padding: '0 10px' }}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ textAlign: 'left' }}
                        >
                            <Title level={1} style={{ color: 'white', marginBottom: 0, fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                                Hi, I'm <span style={{ color: '#52c41a' }}>{profile?.name}</span>
                            </Title>
                            <Title level={3} style={{ color: 'rgba(255,255,255,0.8)', marginTop: 10, fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}>
                                {profile?.title}
                            </Title>
                            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: 600 }}>
                                {profile?.summary}
                            </Paragraph>

                            <Space size="large" style={{ marginTop: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button type="primary" size="large" icon={<MailOutlined />} href="#contact">
                                        Contact Me
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button size="large" icon={<DownloadOutlined />}>
                                        Download Resume
                                    </Button>
                                </motion.div>
                            </Space>

                            <div style={{ marginTop: 30 }}>
                                <Space size="middle">
                                    <motion.a whileHover={{ y: -5 }} href={profile?.linkedin || SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: 24 }}>
                                        <LinkedinOutlined />
                                    </motion.a>
                                    <motion.a whileHover={{ y: -5 }} href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: 24 }}>
                                        <GithubOutlined />
                                    </motion.a>
                                    <motion.a whileHover={{ y: -5 }} href={`mailto:${profile?.email}`} style={{ color: 'white', fontSize: 24 }}>
                                        <MailOutlined />
                                    </motion.a>
                                </Space>
                            </div>
                        </motion.div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HeroSection;
