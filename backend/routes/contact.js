const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    try {
        const query = `
      INSERT INTO contact_messages (name, email, phone, subject, message, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;
        const values = [name, email, phone, subject, message];
        const { rows } = await db.query(query, values);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
