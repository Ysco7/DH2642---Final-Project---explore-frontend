async function getHotCities() {
    let res = await fetch('http://localhost:3000/city/hot');
    return res.json();
}

async function getCitiesByCountryId(countryId) {
    let res = await fetch('http://localhost:3000/city?countryId=' + countryId);
    return res.json();
}

export {
    getHotCities,
    getCitiesByCountryId
}
