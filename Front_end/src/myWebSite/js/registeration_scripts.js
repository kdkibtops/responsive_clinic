/* eslint-disable */
import { registerNewUser } from './front_helper_functions.js';
// const helper_functions = require './front_helper_functions.js';
// SUBMIT REGISTERATION FUNCTION, RUNS ALL REQUIRED FUNCTIONS (Master Function) then redirects to homepage
async function submitRegisteration() {
    const passowrdConfirmed = checkMatching();
    if (passowrdConfirmed) {
        const formComplete = checkEmptyFields();
        if (formComplete) {
            const newUser = { data: { body: getUserInput() } }
            const resp = await registerNewUser('/users/create', newUser);
            alert(resp);
            if (resp === `Registeration successful`) {
                window.location.href = '../../../index.html';
            }
        } else if (!formComplete) {
            const fields = ['fullname', 'userName', 'degree', 'password', 'confirmPassword', 'email', 'role'];
            for (let i = 0; i < fields.length; i++) {
                const chk = document.getElementById(`${fields[i]}`)
                if (chk.value === '') {
                    document.getElementById(`${fields[i]}`).style.background = 'red';
                } else {
                    document.getElementById(`${fields[i]}`).style.background = 'white';
                }
            }
            alert(`All field are mandatory, please complete the form`);
        }
    } else {
        alert(`Passwords are not matching`);
    }
}


/************************************************************** */
// Functions:

// check password and confirm are matching
function checkMatching() {
    const password = document.getElementById('password').value;
    const confirmedPassword = document.getElementById('confirmPassword').value;
    if (password === confirmedPassword) {
        document.getElementById('confirmPassword').style.background = 'green';
        document.getElementById('password').style.background = 'green';
        return true;
    } else {
        document.getElementById('confirmPassword').style.background = 'red';
        document.getElementById('password').style.background = 'red';
        return false;
    }
}

// Check that all fields are entered
function checkEmptyFields() {
    if (document.getElementById('fullname').value !== '' &&
        document.getElementById('userName').value !== '' &&
        document.getElementById('degree').value !== '' &&
        document.getElementById('role').value !== '' &&
        document.getElementById('password').value !== '' &&
        document.getElementById('email').value !== '') {
        return true
    } else {
        return false;
    }
}

// /gets user input and converts into an Object to be consumed
function getUserInput() {
    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('userName').value;
    const degree = document.getElementById('degree').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const newUser = {
        fullname: fullname,
        username: username.toLowerCase(),
        degree: degree,
        role: role,
        password: password,
        email: email
    }
    return newUser;
}


/**************************************************** */
// Event Listeners

// submit when register is entered
document.addEventListener('click', (evt) => {
        const id = evt.target.id
        if (id === 'register') {
            submitRegisteration();
        }
    })
    // add eventlistener to prevent Enter key default action and instead submit
document.body.addEventListener('keypress', function(eve) {
        if (eve.keyCode === 13) {
            eve.preventDefault();
            submitRegisteration();
        }
    })
    // Check fields are not empty as user type
document.addEventListener('click', (evt) => {
        const event = evt.target;
        const fields = ['fullname', 'userName', 'degree', 'password', 'confirmPassword', 'email', 'role']
        if (fields.includes(event.id)) {
            if (event.value === '') {
                document.getElementById(`${event.id}`).style.background = 'red';
            } else if (event.value !== '') {
                document.getElementById(`${event.id}`).style.background = 'white';
            }
        }
    })
    // Check fields are not empty as user type
document.addEventListener('keyup', (evt) => {
        const event = evt.target;
        const fields = ['fullname', 'userName', 'degree', 'password', 'confirmPassword', 'email', 'role']
        if (fields.includes(event.id)) {
            if (event.value === '') {
                document.getElementById(`${event.id}`).style.background = 'red';
            } else if (event.value !== '') {
                document.getElementById(`${event.id}`).style.background = 'white';
            }
        }
    })
    // runs passwordCheck after typing
document.addEventListener('keyup', (evt) => {
    const id = evt.target.id;
    if (id === 'confirmPassword') {
        checkMatching();
    }
})