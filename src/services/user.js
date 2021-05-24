async function login(email, password) {
    let res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    if (res.status === 200) {
        return res && res.json();
    }
    return null;
}

function getCurrentUser() {
    let user = localStorage.getItem('user');
    return user && JSON.parse(user);
}

export {
    login,
    getCurrentUser
}