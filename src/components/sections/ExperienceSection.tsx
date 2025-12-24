import React, { useEffect, useState } from 'react';
import { Typography, Timeline, Card, Tag, Grid } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { Experience } from '../../types';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ExperienceSection: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const screens = useBreakpoint();

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await api.getExperience();
                setExperiences(response.data);
            } catch (error) {
                // console.warn('Using mock experience data');
                setExperiences([
                    {
                        id: 1,
                        company_name: 'Kognotive Sales Solutions',
                        position: 'Customer Service Team Lead',
                        location: 'Remote',
                        start_date: '2025-04-01',
                        end_date: '2025-10-01',
                        is_current: false,
                        achievements: [{ id: 1, achievement_text: 'Led a team of 10+ representatives.' }]
                    },
                    {
                        id: 2,
                        company_name: 'Amazon',
                        position: 'Warehouse Associate',
                        location: 'Brampton, ON',
                        start_date: '2024-09-01',
                        end_date: '2025-01-01',
                        is_current: false,
                        achievements: []
                    },
                    {
                        id: 3,
                        company_name: 'Accenture (Forage)',
                        position: 'Project Manager',
                        location: 'Remote',
                        start_date: '2023-06-01',
                        end_date: '2023-07-01',
                        is_current: false,
                        achievements: [{ id: 2, achievement_text: 'Simulated project management lifecycle.' }]
                    }
                ]);
            }
        };

        fetchExperience();
    }, []);

    return (
        <div id="experience" style={{ padding: '80px 0', background: '#f0f2f5' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 50 }}>Experience</Title>

                <Timeline
                    mode={screens.md ? "alternate" : "left"}
                    items={experiences.map(exp => ({
                        key: exp.id,
                        dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                        children: (
                            <Card hoverable style={{ textAlign: 'left', width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                                        <div>
                                            <Title level={4} style={{ margin: 0, fontSize: '1.1rem' }}>{exp.position}</Title>
                                            <Text strong style={{ color: '#1890ff' }}>{exp.company_name}</Text>
                                        </div>
                                        <Tag color={exp.is_current ? 'green' : 'default'} style={{ marginLeft: 0 }}>
                                            {new Date(exp.start_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} -
                                            {exp.is_current ? ' Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '')}
                                        </Tag>
                                    </div>
                                    <Text type="secondary" style={{ display: 'block' }}>{exp.location}</Text>

                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <ul style={{ paddingLeft: 20, margin: '8px 0 0 0' }}>
                                            {exp.achievements.map(ach => (
                                                <li key={ach.id}>{ach.achievement_text}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </Card>
                        )
                    }))}
                />
            </div>
        </div>
    );
};

export default ExperienceSection;
