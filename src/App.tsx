import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout, theme, App as AntApp } from 'antd';
import HeaderComponent from './components/layout/Header';
import FooterComponent from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import VolunteeringSection from './components/sections/VolunteeringSection';
import LoadingScreen from './components/common/LoadingScreen';
import './App.css';

import { api } from './services/api';
import { Profile, Testimonial, Volunteering } from './types';
import { MOCK_PROFILE } from './utils/constants';
import { AnimatePresence, motion } from 'framer-motion';

const { Content } = Layout;

const PortfolioContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [volunteering, setVolunteering] = useState<Volunteering[]>([]);
  const { message } = AntApp.useApp();

  useEffect(() => {
    const initApp = async () => {
      try {
        // Fetch critical data (Profile) while loading screen is showing
        // We use Promise.all to wait for both the minimum animation time (2s) AND the data
        const [profileResponse, testimonialsResponse, volunteeringResponse] = await Promise.all([
          api.getProfile().catch(() => ({ data: MOCK_PROFILE as any })), // Fallback to mock on fail
          api.getTestimonials().catch(() => ({ data: [] })),
          api.getVolunteering().catch(() => ({ data: [] })),
          new Promise(resolve => setTimeout(resolve, 2000)) // Minimum 2s loading time
        ]);

        setProfileData(profileResponse.data);
        setTestimonials(testimonialsResponse.data);
        setVolunteering(volunteeringResponse.data);
        message.success({ content: 'Connected to Database', key: 'data-source', duration: 3 });
      } catch (error) {
        console.error("App initialization failed", error);
        setProfileData(MOCK_PROFILE as any);
        message.warning({ content: 'Using Local Data (Database Unreachable)', key: 'data-source', duration: 5 });
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, [message]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <HeaderComponent />
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <motion.div
            className="site-layout-content"
            style={{ padding: 24, minHeight: 380 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection initialData={profileData} />
                  <AboutSection />
                  <ExperienceSection />
                  <ProjectsSection />
                  <TestimonialsSection testimonials={testimonials} />
                  <VolunteeringSection volunteering={volunteering} />
                  <EducationSection />
                  <ContactSection />
                </>
              } />
              {/* Add individual routes if needed for detailed views */}
            </Routes>
          </motion.div>
        </Content>
        <FooterComponent />
      </Layout>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorSuccess: '#52c41a',
          fontFamily: 'Inter, sans-serif',
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <AntApp>
        <PortfolioContent />
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
