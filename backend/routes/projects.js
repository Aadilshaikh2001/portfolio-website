const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM projects ORDER BY is_featured DESC, id DESC');
        // Fetch achievements for each project
        const projectsWithAchievements = await Promise.all(rows.map(async (proj) => {
            const achievements = await db.query('SELECT * FROM project_achievements WHERE project_id = $1', [proj.id]);
            return { ...proj, achievements: achievements.rows };
        }));
        res.json(projectsWithAchievements);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
