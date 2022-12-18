async function fetchCarriers(state, policyType) {
    const response = await fetch('/carriers?' + new URLSearchParams({
        state,
        policyType,
    }));
    const jsonResponse = await response.json();
    return jsonResponse.carriers;
}

export default {
    fetchCarriers,
};