import axios from 'axios';
import { Profile, Skill, Experience, Project, Education, Certification, ContactMessage, Testimonial, Volunteering } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 2000, // Fail fast (2s) if backend is unreachable/slow
});

export const api = {
    getProfile: () => apiClient.get<Profile>('/profile'),
    getSkills: () => apiClient.get<Skill[]>('/skills'),
    getExperience: () => apiClient.get<Experience[]>('/experience'),
    getProjects: () => apiClient.get<Project[]>('/projects'),
    getEducation: () => apiClient.get<Education[]>('/education'),
    getCertifications: () => apiClient.get<Certification[]>('/certifications'),
    getTestimonials: () => apiClient.get<Testimonial[]>('/testimonials'),
    getVolunteering: () => apiClient.get<Volunteering[]>('/volunteering'),
    submitContact: (data: ContactMessage) => apiClient.post('/contact', data),
};
