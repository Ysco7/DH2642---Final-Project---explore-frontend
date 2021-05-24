async function getHotCities() {
    let res = await fetch('https://murmuring-plains-32160.herokuapp.com/city/hot');
    return res.json();
}

async function getCitiesByCountryId(countryId) {
    let res = await fetch('https://murmuring-plains-32160.herokuapp.com/city?countryId=' + countryId);
    return res.json();
}

export {
    getHotCities,
    getCitiesByCountryId
}
