import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const HeaderComponent: React.FC = () => {
    const [open, setOpen] = useState(false);
    const screens = useBreakpoint();

    const items = [
        { key: 'home', label: 'Home' },
        { key: 'about', label: 'About' },
        { key: 'experience', label: 'Experience' },
        { key: 'projects', label: 'Projects' },
        { key: 'education', label: 'Education' },
        { key: 'contact', label: 'Contact' },
    ];

    const scrollToSection = (key: string) => {
        const element = document.getElementById(key);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        }
    };

    return (
        <Header style={{ position: 'fixed', zIndex: 1000, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
            <div className="logo" style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => scrollToSection('home')}>
                AS
            </div>

            {screens.md ? (
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                    items={items}
                    onClick={({ key }) => scrollToSection(key)}
                    style={{ flex: 1, justifyContent: 'flex-end', borderBottom: 'none' }}
                />
            ) : (
                <>
                    <Button type="text" icon={<MenuOutlined style={{ color: 'white', fontSize: '20px' }} />} onClick={() => setOpen(true)} />
                    <Drawer
                        title="Menu"
                        placement="right"
                        onClose={() => setOpen(false)}
                        open={open}
                        styles={{ body: { padding: 0 } }}
                    >
                        <Menu
                            mode="vertical"
                            items={items}
                            onClick={({ key }) => scrollToSection(key)}
                            style={{ borderRight: 'none' }}
                        />
                    </Drawer>
                </>
            )}
        </Header>
    );
};

export default HeaderComponent;
