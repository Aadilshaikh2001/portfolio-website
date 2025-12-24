const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Check if we should use DATABASE_URL or individual params
const poolConfig = process.env.DATABASE_URL
  ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
  : {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
  };

const pool = new Pool(poolConfig);

async function seedDatabase() {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database seed...\n');

    // Read and execute schema.sql
    console.log('🏗️  Applying schema...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);

    // Start transaction for data insertion
    await client.query('BEGIN');

    // Insert Profile
    console.log('👤 Inserting profile...');
    await client.query(`
      INSERT INTO profile (full_name, title, location, email, phone, linkedin_url, personal_website_url, summary, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [
      'Adilhusen Shaikh',
      'IT Project Coordinator | Agile & Digital Transformation Specialist | Full-Stack Developer',
      'Mississauga, Ontario, Canada',
      'aadilshekh055@gmail.com',
      '+1 (437) 662-4208',
      'https://www.linkedin.com/in/adilhusenshaikh',
      'https://adilhusen-shaikh-yo7vuzd.gamma.site/',
      'Technical Project Coordinator with 2+ years of hands-on experience coordinating IT projects and cross-functional teams using Agile methodologies. Expert in bridging the gap between technical complexity and business impact.',
      `Technical Project Coordinator with 2+ years of hands-on experience coordinating IT projects and cross-functional teams using Agile methodologies. Expert in bridging the gap between technical complexity and business impact, translating developer language into stakeholder value.

**What drives me:** The challenge of coordinating technical projects where every day brings new problems to solve, new team dynamics to navigate, and new opportunities to learn. Software projects are my sweet spot—complex, technical, and thrilling. They require someone who can speak both developer and stakeholder, someone who sees knowledge gaps as invitations rather than roadblocks.

**My approach:** Over the past two years coordinating IT and software development initiatives, I've learned that the most valuable skill isn't knowing everything—it's being curious about everything. When I don't understand something, I ask until I do. When teams approach problems differently, I find the thread that connects them. When technical jargon threatens to derail stakeholder alignment, I translate it into business value.

**Professional approach:** Colleagues describe my approach as "unique." I genuinely believe every project is a learning experience, not just a deliverable. My organized approach makes chaos make sense, and my quick adaptability ensures project success when realities shift.`
    ]);

    // Insert Skills
    console.log('💡 Inserting skills...');
    const skills = [
      // Project Management & Methodologies
      ['Methodologies', 'Agile/Scrum', 'Expert', 1],
      ['Methodologies', 'Project Planning', 'Expert', 2],
      ['Methodologies', 'Scope Management', 'Expert', 3],
      ['Methodologies', 'Timeline Management', 'Expert', 4],
      ['Methodologies', 'Sprint Planning', 'Expert', 5],
      ['Methodologies', 'Risk Management', 'Advanced', 6],
      ['Methodologies', 'SDLC', 'Advanced', 7],

      // Tools
      ['Tools', 'Jira', 'Expert', 1],
      ['Tools', 'Microsoft Project', 'Expert', 2],
      ['Tools', 'Trello', 'Advanced', 3],
      ['Tools', 'Confluence', 'Advanced', 4],
      ['Tools', 'Slack/Teams', 'Expert', 5],

      // Technical - Frontend
      ['Technical', 'React.js', 'Advanced', 1],
      ['Technical', 'HTML5/CSS3', 'Expert', 2],
      ['Technical', 'JavaScript/TypeScript', 'Advanced', 3],

      // Technical - Backend & DB
      ['Technical', 'Node.js', 'Advanced', 4],
      ['Technical', 'Express.js', 'Advanced', 5],
      ['Technical', 'PostgreSQL/SQL', 'Advanced', 6],
      ['Technical', 'MongoDB', 'Intermediate', 7],

      // Technical - Other
      ['Technical', 'Git/GitHub', 'Advanced', 8],
      ['Technical', 'Java', 'Intermediate', 9],
      ['Technical', 'Python', 'Intermediate', 10],
      ['Technical', 'AWS/Google Cloud Basics', 'Intermediate', 11]
    ];

    for (const skill of skills) {
      await client.query(
        'INSERT INTO skills (category, skill_name, proficiency_level, display_order) VALUES ($1, $2, $3, $4)',
        skill
      );
    }

    // Insert Languages
    console.log('🌍 Inserting languages...');
    await client.query(`
      INSERT INTO languages (language_name, proficiency_level, display_order) VALUES
      ('English', 'Professional Working Proficiency', 1),
      ('Gujarati', 'Native or Bilingual Proficiency', 2),
      ('Hindi', 'Full Professional Proficiency', 3)
    `);

    // Insert Experience
    console.log('💼 Inserting experience...');

    // Kognitive Sales Solutions
    const kognitiveResult = await client.query(`
      INSERT INTO experience (company_name, position, location, employment_type, start_date, end_date, is_current, description, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, ['Kognitive Sales Solutions', 'Customer Service Team Lead', 'Mississauga, Ontario', 'Full-time', '2025-04-01', '2025-10-31', false, 'Led customer service initiatives for financial product adoption in retail environments.', 1]);

    await client.query(`
      INSERT INTO experience_achievements (experience_id, achievement_text, display_order) VALUES
      ($1, 'Engaged with 50+ daily clients, translating complex financial product details into clear value propositions', 1),
      ($1, 'Collaborated across sales teams to achieve monthly targets while enhancing customer satisfaction metrics', 2),
      ($1, 'Monitored sales analytics and refined client engagement strategies using data-driven insights', 3),
      ($1, 'Developed training materials and onboarding processes, improving team efficiency by 20%', 4)
    `, [kognitiveResult.rows[0].id]);

    // Amazon
    const amazonResult = await client.query(`
      INSERT INTO experience (company_name, position, location, employment_type, start_date, end_date, is_current, description, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, ['Amazon', 'Warehouse Associate', 'St Thomas, Ontario', 'Part-time', '2024-09-01', '2025-01-31', false, 'Managed warehouse operations including inventory handling and process optimization.', 2]);

    await client.query(`
      INSERT INTO experience_achievements (experience_id, achievement_text, display_order) VALUES
      ($1, 'Identified and resolved labeling discrepancies, reducing shipment delays by 15%', 1),
      ($1, 'Maintained 99.8% accuracy rate in inventory management through systematic verification', 2),
      ($1, 'Collaborated with cross-functional teams to streamline receiving and shipping procedures', 3)
    `, [amazonResult.rows[0].id]);

    // Dollarama
    const dollaramaResult = await client.query(`
      INSERT INTO experience (company_name, position, location, employment_type, start_date, end_date, is_current, description, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, ['Dollarama L.P.', 'Merchandiser and Cashier', 'Hamilton, Ontario', 'Part-time', '2024-07-01', '2024-09-30', false, 'Managed point-of-sale operations and merchandising displays.', 3]);

    await client.query(`
      INSERT INTO experience_achievements (experience_id, achievement_text, display_order) VALUES
      ($1, 'Processed 100+ daily transactions efficiently with zero cash discrepancies', 1),
      ($1, 'Maintained 95%+ customer satisfaction levels through prompt service', 2),
      ($1, 'Contributed to 12% improvement in sales performance through organized displays', 3)
    `, [dollaramaResult.rows[0].id]);

    // Accenture
    const accentureResult = await client.query(`
      INSERT INTO experience (company_name, position, location, employment_type, start_date, end_date, is_current, description, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, ['Accenture (via Forage)', 'Project Manager - Virtual Experience Program', 'Remote', 'Internship', '2023-06-01', '2023-07-31', false, 'Managed three concurrent Agile projects for distributed teams.', 4]);

    await client.query(`
      INSERT INTO experience_achievements (experience_id, achievement_text, display_order) VALUES
      ($1, 'Directed 3 Agile teams achieving 100% on-time delivery across all projects with zero scope creep', 1),
      ($1, 'Coordinated 10+ sprint meetings, improving team alignment by 40%', 2),
      ($1, 'Managed comprehensive issue logs identifying 5+ critical roadblocks for proactive mitigation', 3),
      ($1, 'Increased meeting efficiency by 25% through optimized communication strategies', 4)
    `, [accentureResult.rows[0].id]);

    // Deloitte
    const deloitteResult = await client.query(`
      INSERT INTO experience (company_name, position, location, employment_type, start_date, end_date, is_current, description, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, ['Deloitte Technology (via Forage)', 'Software Coding Intern - Virtual Experience Program', 'Remote', 'Internship', '2023-02-01', '2023-05-31', false, 'Coordinated mobile app development and web platform projects.', 5]);

    await client.query(`
      INSERT INTO experience_achievements (experience_id, achievement_text, display_order) VALUES
      ($1, 'Coordinated development of 3 mobile applications achieving 50,000+ combined downloads', 1),
      ($1, 'Collaborated with 5+ developers to resolve 20+ critical bugs, reducing app crashes by 20%', 2),
      ($1, 'Contributed to React/Node.js platform development driving 30% increase in user engagement', 3),
      ($1, 'Improved code maintainability scores by 15% through systematic review processes', 4)
    `, [deloitteResult.rows[0].id]);

    // Insert Projects
    console.log('🚀 Inserting projects...');

    // AI Chatbot
    const chatbotResult = await client.query(`
      INSERT INTO projects (project_name, organization, role, start_date, end_date, description, technologies, is_featured, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, [
      'AI Customer Support Chatbot',
      'Algoma University',
      'Tech Lead & Scrum Master',
      '2025-01-01',
      '2025-03-31',
      'Led an 8-member cross-functional team in developing an AI-powered customer support chatbot using NLP and machine learning.',
      ['Python', 'NLP', 'TensorFlow', 'Jira', 'Agile/Scrum', 'REST APIs'],
      true,
      1
    ]);

    await client.query(`
      INSERT INTO project_achievements (project_id, achievement_text, display_order) VALUES
      ($1, 'Achieved 70% first-contact resolution rate with 10,000+ training interactions', 1),
      ($1, 'Reduced average response time from 8 minutes to 90 seconds (81% improvement)', 2),
      ($1, 'Facilitated collaboration between QA, data science, and customer service teams', 3),
      ($1, 'Implemented continuous learning pipeline improving accuracy from 65% to 92%', 4)
    `, [chatbotResult.rows[0].id]);

    // Smart Cities
    const smartCityResult = await client.query(`
      INSERT INTO projects (project_name, organization, role, start_date, end_date, description, technologies, is_featured, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, [
      'Smart Cities Digital Transformation Research',
      'Algoma University',
      'Group Research Lead',
      '2025-01-01',
      '2025-03-31',
      'Directed comprehensive research initiative analyzing AI, IoT, and Big Data technologies for urban infrastructure.',
      ['AI/ML', 'IoT Sensor Networks', 'Big Data Analytics', 'Cloud Computing'],
      true,
      2
    ]);

    await client.query(`
      INSERT INTO project_achievements (project_id, achievement_text, display_order) VALUES
      ($1, 'Delivered 50-page report demonstrating 30% potential traffic congestion reduction', 1),
      ($1, 'Identified $2.3M in potential annual savings for mid-sized cities', 2),
      ($1, 'Presented findings to university stakeholders and local government representatives', 3)
    `, [smartCityResult.rows[0].id]);

    // Fundraising
    const fundraisingResult = await client.query(`
      INSERT INTO projects (project_name, organization, role, start_date, end_date, description, technologies, is_featured, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
    `, [
      'Campus Fundraising Campaign',
      'Algoma University',
      'Project Manager',
      '2024-01-01',
      '2024-07-31',
      'Managed end-to-end fundraising campaign coordinating 20+ volunteers and developing marketing strategy.',
      ['Project Management', 'Marketing Strategy', 'Financial Planning', 'Event Planning'],
      false,
      3
    ]);

    await client.query(`
      INSERT INTO project_achievements (project_id, achievement_text, display_order) VALUES
      ($1, 'Exceeded CAD $15K goal by 33% (raised $20K)', 1),
      ($1, 'Achieved 15:1 ROI on marketing investments', 2),
      ($1, 'Resulted in 45% increase in repeat donations compared to previous year', 3)
    `, [fundraisingResult.rows[0].id]);

    // Insert Education
    console.log('🎓 Inserting education...');
    await client.query(`
      INSERT INTO education (institution_name, degree, field_of_study, location, start_date, end_date, display_order) VALUES
      ('Algoma University', 'Post-Graduate Diploma', 'IT Project Management', 'Mississauga, ON', '2024-01-01', '2025-08-31', 1),
      ('KALOL Institute of Technology', 'Bachelor of Engineering', 'Computer Engineering', 'Gujarat, India', '2019-05-01', '2022-07-31', 2),
      ('Excel Institute of Diploma Studies', 'Diploma of Education', 'Computer Engineering', 'Gujarat, India', '2016-04-01', '2019-08-31', 3)
    `);

    // Insert Certifications
    console.log('📜 Inserting certifications...');
    await client.query(`
      INSERT INTO certifications (certification_name, issuing_organization, issue_date, display_order) VALUES
      ('Agile Project Management', 'LinkedIn Learning', '2024-03-01', 1),
      ('Project Management Foundations: Lessons Learned', 'LinkedIn Learning', '2024-02-01', 2),
      ('Characteristics of a Great Scrum Master', 'LinkedIn Learning', '2024-01-01', 3),
      ('Foundations of Project Management', 'Google / Coursera', '2023-12-01', 4)
    `);

    // Insert Testimonials
    console.log('💬 Inserting testimonials...');
    await client.query(`
      INSERT INTO testimonials (name, role, company, quote, display_order) VALUES
      ('Senior Developer', 'Senior Developer', 'Deloitte Virtual Program', 'Adil has a unique ability to cut through complexity and get teams aligned on what matters. His curiosity and persistence in understanding both technical and business sides make him invaluable on any project.', 1),
      ('Program Mentor', 'Program Mentor', 'Accenture Virtual Program', 'What impressed me most about Adil was his organized approach to chaos. He took three parallel projects that were all struggling and turned them into success stories through systematic planning and clear communication.', 2),
      ('Team Lead', 'Team Lead', 'AI Chatbot Project', 'Adil doesn''t just coordinate tasks—he understands the ''why'' behind the work and helps everyone else understand it too. That''s what makes him more than just a project coordinator; he''s a strategic partner.', 3)
    `);

    // Insert Volunteering
    console.log('🤝 Inserting volunteering...');
    await client.query(`
      INSERT INTO volunteering (role, organization, description, start_date, end_date, display_order) VALUES
      ('Campus Volunteer Coordinator', 'Algoma University', 'Coordinated student volunteer activities and events.', '2024-01-01', '2024-12-31', 1),
      ('Tech Workshop Facilitator', 'Youth Programs', 'Facilitated technology workshops for youth.', '2023-01-01', '2023-12-31', 2),
      ('Student Mentor', 'Computer Engineering Department', 'Mentored junior students in computer engineering concepts.', '2021-01-01', '2022-12-31', 3)
    `);

    // Insert Career Objectives
    console.log('🎯 Inserting career objectives...');
    await client.query(`
      INSERT INTO career_objectives (objective_type, description, display_order) VALUES
      ('Short-term', 'Complete Post-Graduate Diploma in IT Project Management and secure a full-time position as Technical Project Coordinator or Scrum Master.', 1),
      ('Medium-term', 'Progress to Senior Project Coordinator role, lead enterprise-level software projects, and obtain PMP certification.', 2),
      ('Long-term', 'Transition to Program Manager, drive digital transformation initiatives, and become a thought leader in technical project management.', 3)
    `);

    // Commit transaction
    await client.query('COMMIT');

    // Verify counts
    const counts = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM profile) as profiles,
        (SELECT COUNT(*) FROM skills) as skills,
        (SELECT COUNT(*) FROM experience) as experience,
        (SELECT COUNT(*) FROM projects) as projects,
        (SELECT COUNT(*) FROM testimonials) as testimonials,
        (SELECT COUNT(*) FROM volunteering) as volunteering
    `);

    console.log('\n✅ Database seeded successfully!');
    console.log('📊 Record counts:', counts.rows[0]);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error during seed:', err);
    process.exit(1);
  });
