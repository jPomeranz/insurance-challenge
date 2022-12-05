const googleSheets = require('../googleSheets');

const GOOGLE_SHEETS_SHEET_ID = '14bEe8qFkJptV0stpkIrkBw3GCADte6XuZv9jXpRllWg';
const GOOGLE_SHEETS_AUTO_FIRE_SHEET_NAME = 'Auto/Fire';
const GOOGLE_SHEETS_FLOOD_SHEET_NAME = 'Flood';

// Accepts array of arrays corresponding to sheet rows by state columns and outputs an array of STATE/CARRIER tuples
function getCarrierMapFromSheet(sheet, positiveCellValues) {
    const headers = sheet[0];
    if (!headers) {
        throw Error('Missing expected headers')
    }
    // For each row in spreadsheet after headers
    const results = [];
    for (let i = 1; i < sheet.length; i++) {
        const row = sheet[i];
        const carrier = row[0];
        for (let j = 1; j < row.length; j++) {
            // Empty cells are ignored
            if (positiveCellValues.includes(row[j])) {
                const outputRow = [];
                const state = headers[j];
                outputRow.push(state, carrier);
                results.push(outputRow);
            }
        }
    }
    return results;
}

function getFloodInsuranceCarriers(sheet) {
    return getCarrierMapFromSheet(sheet, ['Yes']);
}

function getFireInsuranceCarriers(sheet) {
    return getCarrierMapFromSheet(sheet, ['Both', 'FIRE']);
}

function getAutoInsuranceCarriers(sheet) {
    return getCarrierMapFromSheet(sheet, ['Both', 'AUTO']);
}

async function fetchCarriers() {
    // Fetch all state/carrier tuples offered for each insurance type
    // TODO: Support chunking of datasets
    const fireAndAutoSheet = await googleSheets.fetchSheet(GOOGLE_SHEETS_SHEET_ID, GOOGLE_SHEETS_AUTO_FIRE_SHEET_NAME);
    const fireInsuranceCarriers = getFireInsuranceCarriers(fireAndAutoSheet);
    const autoInsuranceCarriers = getAutoInsuranceCarriers(fireAndAutoSheet);
    const floodSheet = await googleSheets.fetchSheet(GOOGLE_SHEETS_SHEET_ID, GOOGLE_SHEETS_FLOOD_SHEET_NAME);
    const floodInsuranceCarriers = getFloodInsuranceCarriers(floodSheet);
    // Unify tuples into one output list including policy type: STATE/CARRIER/POLICY_TYPE
    fireInsuranceCarriers.map(row => row.push('FIRE'));
    autoInsuranceCarriers.map(row => row.push('AUTO'));
    floodInsuranceCarriers.map(row => row.push('FLOOD'));
    return [...fireInsuranceCarriers, ...autoInsuranceCarriers, ...floodInsuranceCarriers];
}

function filterCarriers(carriers, state, policyType) {
    return carriers.filter(carrier => {
        if (state && state !== carrier[0]) {
            return false;
        }
        if (policyType && policyType !== carrier[2]) {
            return false;
        }
        return true;
    })
}

module.exports = {
    fetchCarriers,
    filterCarriers,
};