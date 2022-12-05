const axios = require('axios');

const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

async function fetchSheet(sheetId, sheetName) {
    sheetName = encodeURIComponent(sheetName);
    // TODO: Handle limits and pagination, handle errors more gracefully
    const result = await axios({
        method: 'GET',
        url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}`,
        params: {
            key: API_KEY,
        },
    });
    return result.data && result.data.values || [];
}

module.exports = {
    fetchSheet,
};