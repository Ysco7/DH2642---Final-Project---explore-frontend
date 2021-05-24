async function getAllCountries() {
    let res = await fetch('http://localhost:3000/country');
    return res.json();
}

export {
    getAllCountries
}
