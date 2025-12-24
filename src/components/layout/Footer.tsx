import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Adilhusen Shaikh ©{new Date().getFullYear()} Created with React & Ant Design
        </Footer>
    );
};

export default FooterComponent;
