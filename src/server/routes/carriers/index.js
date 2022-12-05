const express = require('express');
const logger = require('../../modules/logger');
const insuranceCarriers = require('../../modules/insuranceCarriers');

const router = new express.Router();

router.get('/carriers', async (req, res) => {
    try {
        const { state, policyType } = req.query;
        let carriers = await insuranceCarriers.fetchCarriers();
        carriers = insuranceCarriers.filterCarriers(carriers, state, policyType);
        res.json({ carriers });
    } catch (err) {
        // TODO: Add caching of insurance carriers and more robust retry strategy
        logger.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;