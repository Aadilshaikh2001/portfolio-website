import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Tag, Modal, Button } from 'antd';
import { GithubOutlined, GlobalOutlined, EyeOutlined } from '@ant-design/icons';
import { api } from '../../services/api';
import { Project } from '../../types';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const ProjectsSection: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.getProjects();
                setProjects(response.data);
            } catch (error) {
                // console.warn('Using mock projects data');
                setProjects([
                    {
                        id: 1,
                        project_name: 'AI Customer Support Chatbot',
                        description: 'Developed an AI-powered chatbot for Algoma University to handle student queries efficiently.',
                        technologies: ['Python', 'NLP', 'React', 'Flask'],
                        is_featured: true,
                        achievements: [{ id: 1, achievement_text: 'Reduced support ticket volume by 30%.' }]
                    },
                    {
                        id: 2,
                        project_name: 'Smart Cities Digital Transformation',
                        description: 'Proposed digital solutions for urban planning and management.',
                        technologies: ['IoT', 'Data Analytics', 'Cloud Computing'],
                        is_featured: true,
                        achievements: []
                    },
                    {
                        id: 3,
                        project_name: 'Campus Fundraiser App',
                        description: 'Mobile application to facilitate fundraising events on campus.',
                        technologies: ['React Native', 'Firebase'],
                        is_featured: false,
                        achievements: []
                    }
                ]);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div id="projects" style={{ padding: '80px 0', background: '#fff' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 50 }}>Featured Projects</Title>

                <Row gutter={[32, 32]}>
                    {projects.map(project => (
                        <Col xs={24} sm={12} lg={8} key={project.id}>
                            <Card
                                hoverable
                                cover={
                                    <div style={{ height: 200, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {project.image_url ? (
                                            <img alt={project.project_name} src={project.image_url} style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                                        ) : (
                                            <EyeOutlined style={{ fontSize: 48, color: '#ccc' }} />
                                        )}
                                    </div>
                                }
                                actions={[
                                    project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" key="github"><GithubOutlined /></a>,
                                    project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" key="demo"><GlobalOutlined /></a>,
                                    <Button type="link" onClick={() => setSelectedProject(project)}>Details</Button>
                                ].filter(Boolean)}
                            >
                                <Meta
                                    title={project.project_name}
                                    description={
                                        <>
                                            <Paragraph ellipsis={{ rows: 2 }}>{project.description}</Paragraph>
                                            <div style={{ marginTop: 10 }}>
                                                {project.technologies.slice(0, 3).map(tech => (
                                                    <Tag key={tech}>{tech}</Tag>
                                                ))}
                                            </div>
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Modal
                    title={selectedProject?.project_name}
                    open={!!selectedProject}
                    onCancel={() => setSelectedProject(null)}
                    footer={[
                        <Button key="close" onClick={() => setSelectedProject(null)}>
                            Close
                        </Button>
                    ]}
                    width={700}
                >
                    {selectedProject && (
                        <div>
                            <Paragraph>{selectedProject.description}</Paragraph>
                            <Title level={5}>Technologies</Title>
                            <div style={{ marginBottom: 20 }}>
                                {selectedProject.technologies.map(tech => (
                                    <Tag key={tech} color="blue">{tech}</Tag>
                                ))}
                            </div>

                            {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                                <>
                                    <Title level={5}>Key Achievements</Title>
                                    <ul>
                                        {selectedProject.achievements.map(ach => (
                                            <li key={ach.id}>{ach.achievement_text}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <div style={{ marginTop: 20 }}>
                                {selectedProject.github_url && (
                                    <Button icon={<GithubOutlined />} href={selectedProject.github_url} target="_blank" style={{ marginRight: 10 }}>
                                        View Code
                                    </Button>
                                )}
                                {selectedProject.demo_url && (
                                    <Button icon={<GlobalOutlined />} href={selectedProject.demo_url} target="_blank">
                                        Live Demo
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default ProjectsSection;
