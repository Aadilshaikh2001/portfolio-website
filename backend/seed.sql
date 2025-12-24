-- Profile
INSERT INTO profile (name, title, location, email, phone, linkedin, summary)
VALUES (
  'Adilhusen Shaikh',
  'IT Project Coordinator | Agile & Digital Transformation | Full-Stack Developer',
  'Mississauga, Ontario, Canada',
  'aadilshekh055@gmail.com',
  '(437)-662-4208',
  'https://www.linkedin.com/in/adilhusenshaikh',
  'Results-driven IT Project Coordinator and Full-Stack Developer with expertise in Agile methodologies, digital transformation, and software development. Proven track record of delivering complex projects on time and within budget.'
);

-- Skills
INSERT INTO skills (name, category, proficiency) VALUES
('Project Planning', 'Methodologies', 95),
('Scope Management', 'Methodologies', 95),
('Timeline Management', 'Methodologies', 95),
('Agile/Scrum', 'Methodologies', 95),
('Jira', 'Tools', 90),
('Microsoft Project', 'Tools', 90),
('React', 'Technical', 85),
('Node.js', 'Technical', 85),
('Java', 'Technical', 80),
('Swift', 'Technical', 80);

-- Experience
INSERT INTO experience (company, title, location, start_date, end_date, is_current) VALUES
('Kognotive Sales Solutions', 'Customer Service Team Lead', 'Remote', '2025-04-01', '2025-10-01', false),
('Amazon', 'Warehouse Associate', 'Brampton, ON', '2024-09-01', '2025-01-01', false),
('Dollarama L.P.', 'Merchandiser and cashier', 'Mississauga, ON', '2024-07-01', '2024-09-01', false),
('Accenture (Forage)', 'Project Manager', 'Remote', '2023-06-01', '2023-07-01', false),
('Deloitte Technology (Forage)', 'Software Coding Intern', 'Remote', '2023-02-01', '2023-05-01', false);

-- Experience Achievements (assuming IDs 1-5 for above experiences)
-- Note: In a real script you'd use subqueries or variables to get IDs
INSERT INTO experience_achievements (experience_id, description) VALUES
(1, 'Led a team of customer service representatives to achieve high satisfaction scores.'),
(3, 'Managed inventory and ensured product availability.'),
(4, 'Simulated project management lifecycle from initiation to closure.'),
(5, 'Developed software solutions and participated in code reviews.');

-- Projects
INSERT INTO projects (title, description, technologies, is_featured) VALUES
('AI Customer Support Chatbot', 'Developed an AI-powered chatbot for Algoma University to handle student queries efficiently.', ARRAY['Python', 'NLP', 'React', 'Flask'], true),
('Smart Cities Digital Transformation', 'Proposed digital solutions for urban planning and management.', ARRAY['IoT', 'Data Analytics', 'Cloud Computing'], true),
('Campus Fundraiser', 'Mobile application to facilitate fundraising events on campus.', ARRAY['React Native', 'Firebase'], false);

-- Education
INSERT INTO education (institution, degree, field_of_study, start_date, end_date) VALUES
('Algoma University', 'Post-Graduate Diploma', 'IT Project Management', '2024-01-01', '2025-08-01'),
('KALOL INSTITUTE', 'Bachelor of Engineering', 'Computer Engineering', '2019-05-01', '2022-07-01');

-- Certifications
INSERT INTO certifications (name, issuer, issue_date) VALUES
('Characteristics of a Great Scrum Master', 'LinkedIn', '2023-01-01'),
('Project Management Foundations: Lessons Learned', 'LinkedIn', '2023-01-01'),
('Foundations of Project Management', 'Google', '2023-01-01');
