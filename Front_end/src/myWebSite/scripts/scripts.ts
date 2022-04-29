/* eslint-disable */
import { User } from "../../../../Server/src/API/models/users";

function getUserInput(): User {
    const fullname = document.getElementById('fullname')?.innerText as string;
    const username = document.getElementById('usernane')?.innerText as string;
    const degree = document.getElementById('degree')?.innerText as string;
    const role = document.getElementById('role')?.innerText as string;
    const password = document.getElementById('password')?.innerText as string;
    const email = document.getElementById('email')?.innerText as string;
    const newUser: User = {
        fullname: fullname,
        username: username,
        degree: degree,
        role: role,
        password: password,
        email: email
    }
    return newUser;
}

async function registerNewUser(url: string, newUser: User) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newUser),
    });
    try {
        const postData = await response.json();
        return postData;
    } catch (err) {
        throw new Error(`Error while posting at script ${err}`);
    }
}

document.addEventListener('click', function (evt) {
    const evtTarget = (evt.target as EventTarget) as HTMLButtonElement;
    const evtTargetID: string = evtTarget.id;
    const passwordConfirmed = (): boolean => {
        const password = document.getElementById('password')?.innerText
        const confirmedPassword = document.getElementById('confirmPassword')?.innerText
        if (password === confirmedPassword) {
            return true;
        } else {
            return false;
        }
    }
    if (!passwordConfirmed()) {
        alert(`Check your password, passwords are not matching!`)
    } else if (passwordConfirmed()) {
        if (evtTargetID === 'register') {
            if (document.getElementById('fullname')?.innerText &&
                document.getElementById('usernane')?.innerText &&
                document.getElementById('degree')?.innerText &&
                document.getElementById('role')?.innerText &&
                document.getElementById('password')?.innerText &&
                document.getElementById('email')?.innerText) {
                const newUser = getUserInput();
                console.log('event readed');
                registerNewUser('/users/create', newUser);
            } else {
                alert('Please complete all fields!');
            }
        }
    }
})