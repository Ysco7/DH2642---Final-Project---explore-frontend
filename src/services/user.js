async function login(email, password) {
    let res = await fetch('https://murmuring-plains-32160.herokuapp.com/user/login', {
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

async function signUp(email, password) {
    let res = await fetch('https://murmuring-plains-32160.herokuapp.com/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return res.status;
}

function getCurrentUser() {
    let user = localStorage.getItem('user');
    return user && JSON.parse(user);
}

export {
    login,
    getCurrentUser,
    signUp
}
