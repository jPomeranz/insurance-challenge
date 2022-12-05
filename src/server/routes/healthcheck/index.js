const express = require('express');
const router = new express.Router();

router.get('/healthcheck', (_, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
