export interface Profile {
    id: number;
    full_name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedin_url: string;
    personal_website_url?: string;
    summary: string;
    bio?: string;
    avatar_url?: string;
}

export interface Skill {
    id: number;
    skill_name: string;
    category: 'Technical' | 'Methodologies' | 'Tools' | 'Soft Skills';
    proficiency_level: string;
    icon_url?: string;
}

export interface Experience {
    id: number;
    company_name: string;
    position: string;
    location: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
    description?: string;
    logo_url?: string;
    achievements?: Achievement[];
}

export interface Achievement {
    id: number;
    achievement_text: string;
}

export interface Project {
    id: number;
    project_name: string;
    description: string;
    technologies: string[];
    image_url?: string;
    github_url?: string;
    demo_url?: string;
    is_featured: boolean;
    achievements?: Achievement[];
}

export interface Education {
    id: number;
    institution_name: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    logo_url?: string;
}

export interface Certification {
    id: number;
    certification_name: string;
    issuing_organization: string;
    issue_date: string;
    credential_url?: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    image_url?: string;
}

export interface Volunteering {
    id: number;
    role: string;
    organization: string;
    description: string;
    start_date: string;
    end_date?: string;
}

export interface ContactMessage {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}
