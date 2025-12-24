import React, { useEffect, useState } from 'react';
import { Typography, List, Card, Row, Col } from 'antd';
import { BookOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { Education, Certification } from '../../types';

const { Title, Text } = Typography;

const EducationSection: React.FC = () => {
    const [education, setEducation] = useState<Education[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eduRes = await api.getEducation();
                setEducation(eduRes.data);
                const certRes = await api.getCertifications();
                setCertifications(certRes.data);
            } catch (error) {
                // console.warn('Using mock education data');
                setEducation([
                    {
                        id: 1,
                        institution_name: 'Algoma University',
                        degree: 'Post-Graduate Diploma',
                        field_of_study: 'IT Project Management',
                        start_date: '2024-01-01',
                        end_date: '2025-08-01'
                    },
                    {
                        id: 2,
                        institution_name: 'KALOL INSTITUTE',
                        degree: 'Bachelor of Engineering',
                        field_of_study: 'Computer Engineering',
                        start_date: '2019-05-01',
                        end_date: '2022-07-01'
                    }
                ]);
                setCertifications([
                    { id: 1, certification_name: 'Characteristics of a Great Scrum Master', issuing_organization: 'LinkedIn', issue_date: '2023-01-01' },
                    { id: 2, certification_name: 'Project Management Foundations', issuing_organization: 'LinkedIn', issue_date: '2023-01-01' },
                    { id: 3, certification_name: 'Foundations of Project Management', issuing_organization: 'Google', issue_date: '2023-01-01' }
                ]);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="education" style={{ padding: '80px 0', background: '#fff' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 50 }}>Education & Certifications</Title>

                <Row gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <Title level={4}><BookOutlined /> Education</Title>
                        <List
                            itemLayout="vertical"
                            dataSource={education}
                            renderItem={item => (
                                <List.Item>
                                    <Card hoverable>
                                        <Title level={5}>{item.institution_name}</Title>
                                        <Text strong>{item.degree}</Text> in <Text>{item.field_of_study}</Text>
                                        <br />
                                        <Text type="secondary">
                                            {new Date(item.start_date).getFullYear()} - {new Date(item.end_date).getFullYear()}
                                        </Text>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={4}><SafetyCertificateOutlined /> Certifications</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={certifications}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<SafetyCertificateOutlined style={{ fontSize: 24, color: '#52c41a' }} />}
                                        title={item.certification_name}
                                        description={item.issuing_organization}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default EducationSection;
