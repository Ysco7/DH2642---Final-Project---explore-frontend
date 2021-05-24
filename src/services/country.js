async function getAllCountries() {
    let res = await fetch('https://murmuring-plains-32160.herokuapp.com/country');
    return res.json();
}

export {
    getAllCountries
}
