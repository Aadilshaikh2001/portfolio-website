const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/testimonials
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM testimonials ORDER BY display_order ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
