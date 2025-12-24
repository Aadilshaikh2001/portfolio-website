import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Tag, Space } from 'antd';
import { api } from '../../services/api';
import { Skill } from '../../types';

const { Title, Paragraph } = Typography;

const AboutSection: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skillsRes, profileRes] = await Promise.all([
                    api.getSkills(),
                    api.getProfile()
                ]);
                setSkills(skillsRes.data);
                setProfile(profileRes.data);
            } catch (error) {
                console.warn('Error fetching data', error);
                // Mock skills if API fails
                setSkills([
                    { id: 1, skill_name: 'React', category: 'Technical', proficiency_level: 'Advanced' },
                    { id: 2, skill_name: 'Node.js', category: 'Technical', proficiency_level: 'Advanced' },
                    { id: 3, skill_name: 'TypeScript', category: 'Technical', proficiency_level: 'Advanced' },
                    { id: 4, skill_name: 'Agile/Scrum', category: 'Methodologies', proficiency_level: 'Expert' },
                    { id: 5, skill_name: 'Jira', category: 'Tools', proficiency_level: 'Expert' },
                    { id: 6, skill_name: 'Project Planning', category: 'Methodologies', proficiency_level: 'Expert' },
                ]);
            }
        };

        fetchData();
    }, []);

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <div id="about" style={{ padding: '80px 0', background: '#fff' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 50 }}>About Me & Skills</Title>

                <Row gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <Title level={4}>Professional Summary</Title>
                        {profile?.bio ? (
                            <div style={{ fontSize: 16, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                                {profile.bio}
                            </div>
                        ) : (
                            <>
                                <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                                    I am a dedicated IT Project Coordinator and Full-Stack Developer with a passion for driving digital transformation.
                                    With a strong foundation in Agile methodologies and software development, I bridge the gap between technical teams and business stakeholders.
                                    My experience ranges from leading customer service teams to managing complex IT projects and developing robust web applications.
                                </Paragraph>
                                <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                                    I thrive in dynamic environments where I can leverage my problem-solving skills and technical expertise to deliver high-quality solutions.
                                </Paragraph>
                            </>
                        )}
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={4}>Skills</Title>
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <div key={category} style={{ marginBottom: 24 }}>
                                <Title level={5} style={{ color: '#1890ff' }}>{category}</Title>
                                <div>
                                    {categorySkills.map(skill => (
                                        <Tag key={skill.id} color="blue" style={{ padding: '5px 10px', fontSize: 14, marginBottom: 8 }}>
                                            {skill.skill_name}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AboutSection;
