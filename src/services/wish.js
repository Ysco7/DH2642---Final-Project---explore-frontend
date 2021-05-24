async function addWish(userId, cityId) {
    let res = await fetch('http://localhost:3000/wish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, cityId })
    });
    if (res.status === 201) {
        return true;
    }
    return null;
}

async function getAllWished(userId) {
    let res = await fetch('http://localhost:3000/wish/' + userId);
    return res.json();
}

async function deleteWish(userId, cityId) {
    let res = await fetch('http://localhost:3000/wish', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, cityId })
    });
    if (res.status === 200) {
        return true;
    }
    return null;
}

export {
    addWish,
    getAllWished,
    deleteWish
}
