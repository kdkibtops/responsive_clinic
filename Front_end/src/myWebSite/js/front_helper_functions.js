// THIS JS MODULE WILL BE USED TO EXPORT ALL FUNCTIONS THAT AN BE USED BY MULTIPLE PAGES TO AVOID REPEATING CODE

// routes to create user route
export async function registerNewUser(hostURL, newUser) {
    try {
        const data = JSON.stringify(newUser);
        const url = 'http://127.0.0.1:8000' + hostURL;
        console.log(url);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            body: data,
        });
        const rcvData = await response.json();
        return rcvData
    } catch (err) {
        throw new Error(`Error while posting at script ${err}`);
    }
}

// passes getUserInput data to authentication route
export async function signIn(url, newUser) {
    try {
        const data = JSON.stringify(newUser);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            body: data,
        });
        const rcvData = await response.json();
        const resObject = {
            status: response.status,
            JWT: rcvData
        }
        return resObject;
    } catch (err) {
        throw new Error(`Error while posting at script ${err}`);
    }
}

// if user is authenticated, then this function will be called accepting JWT to verify user to access data
export async function getData(url, JWT, req_data) {
    try {
        const reqData = JSON.stringify(req_data);
        const response = await fetch(url, {
            method: 'PATCH',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `BEARER ` + JWT
            },
            body: reqData
        });

        const rcvData = await response.json();
        const resObject = {
            status: response.status,
            data: rcvData
        }
        return resObject
    } catch (err) {
        throw new Error(`Error while posting at script ${err}`);
    }
}

// routes to create user route
export async function indexAllUsers(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
        });

        const rcvData = await response.json();
        const resObject = {
            status: response.status,
            data: rcvData
        }
        return resObject
    } catch (err) {
        throw new Error(`Error  while posting at script ${err}`);
    }
}