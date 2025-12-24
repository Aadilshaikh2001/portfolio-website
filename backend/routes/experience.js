const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM experience ORDER BY start_date DESC');
        // Fetch achievements for each experience
        const experienceWithAchievements = await Promise.all(rows.map(async (exp) => {
            const achievements = await db.query('SELECT * FROM experience_achievements WHERE experience_id = $1', [exp.id]);
            return { ...exp, achievements: achievements.rows };
        }));
        res.json(experienceWithAchievements);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
