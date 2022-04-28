/* eslint-disable */

import { signIn, getData } from './front_helper_functions.js';
let goodtogo = false;
let JWT = '';

// SUBMIT REGISTERATION FUNCTION, IT RUNS ALL REQUIRED FUNCTIONS (Master function)
async function submit() {
    const formComplete = checkEmptyFields();
    if (formComplete) {
        try {
            const newUser = { data: { body: getUserInput() } };
            console.log(newUser);
            const signedIn = await signIn('/authenticate', newUser);
            if (signedIn.status === 200) {
                const response = await getData(`/users/show/${newUser.username_to_show}`, signedIn.JWT);
                if (response.status === 200) {
                    // window.location.href = 'registered_index.html'
                    resetPage(response.data.username);
                    createUserTable();
                    showUserInTable(response.data);
                    addNextButton();
                    goodtogo = true;
                    JWT = signedIn.JWT
                    sessionStorage.setItem('JWT', signedIn.JWT);
                    sessionStorage.setItem('authenticated', true);

                } else {
                    alert(`You are not authorized to access this data`);
                }
            } else {
                alert(`Sign in failed, ` + signedIn.JWT)
            }

        } catch (error) {
            throw new Error(`${error}`);
        }
    } else if (!formComplete) {
        const fields = ['password', 'userName'];
        for (let i = 0; i < fields.length; i++) {
            const chk = document.getElementById(`${fields[i]}`)
            if (chk.value === '') {
                document.getElementById(`${fields[i]}`).style.background = 'red';
            } else {
                document.getElementById(`${fields[i]}`).style.background = 'white';
            }
        }
        alert(`All field are mandatory, please enter username & password`);
    }

}

/************************************************************* */
// Check that all fields are entered before submitting the request
function checkEmptyFields() {
    if (document.getElementById('userName').value !== '' &&
        document.getElementById('password').value !== ''
    ) {
        return true
    } else {
        return false;
    }
}
// /gets user input and converts it to an object to be passed
function getUserInput() {
    const username = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const newUser = {
        username: username.toLowerCase(),
        password: password,
        username_to_show: username.toLowerCase()
    }
    return newUser;
}


/************************************************************** */
// Update sign in page to list retrieved users data

// create new empty table for user 
function createUserTable() {
    const userTable = document.createElement('table');
    const tableBody = userTable.createTBody();
    const tableHeader = userTable.createTHead();
    const tableFooter = userTable.createTFoot();
    const tableCaption = userTable.createCaption();
    const tableDiv = document.createElement('div');

    tableDiv.setAttribute('id', 'tableDiv');
    userTable.setAttribute('id', 'userTable');
    tableBody.setAttribute('id', 'tableBody')
    tableCaption.setAttribute('id', 'tableCaption')

    tableDiv.appendChild(userTable);
    // update contents
    tableCaption.textContent = 'Log in user data:'

    const idCell = document.createElement('td');
    idCell.textContent = 'DB ID';
    tableHeader.appendChild(idCell)

    const fullnameCell = document.createElement('td');
    fullnameCell.textContent = 'Full Name';
    tableHeader.appendChild(fullnameCell)

    const usernameCell = document.createElement('td');
    usernameCell.innerText = 'Username';
    tableHeader.appendChild(usernameCell)

    const degreeCell = document.createElement('td');
    degreeCell.textContent = 'Degree';
    tableHeader.appendChild(degreeCell)

    const roleCell = document.createElement('td');
    roleCell.textContent = 'Role';
    tableHeader.appendChild(roleCell)

    const emailCell = document.createElement('td');
    emailCell.textContent = 'E-mail';
    tableHeader.appendChild(emailCell)
    const mainDiv = document.getElementById('mainDiv');
    mainDiv.insertAdjacentElement("afterend", userTable);

}
// remove buttons and forms and add logged in as username
function resetPage(username) {
    const mainDiv = document.getElementById('mainDiv')
    const formdata = document.getElementById('formdata')
    const signInbutton = document.getElementById('signInButton')
    const cancelButton = document.getElementById('cancelButton')
    const formButtonDiv = document.getElementById('formbuttons')

    const pageTitle = document.getElementById('pageTitle')
    pageTitle.innerText = `Logged in as ${username}`
    cancelButton.remove();
    formdata.remove();
    signInbutton.remove();
    formButtonDiv.remove();
}
// add user data in the table
function showUserInTable(user) {
    // create new row for the patient
    const tableBody = document.getElementById('tableBody');
    const userRow = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.setAttribute('id', 'currentUser');
    const fullnameCell = document.createElement('td');
    const usernameCell = document.createElement('td');
    const degreeCell = document.createElement('td');
    const roleCell = document.createElement('td');
    const emailCell = document.createElement('td');

    userRow.appendChild(idCell);
    userRow.appendChild(fullnameCell);
    userRow.appendChild(usernameCell);
    userRow.appendChild(degreeCell);
    userRow.appendChild(roleCell);
    userRow.appendChild(emailCell);

    // fill the patient row from the form
    idCell.innerText = user.id;
    fullnameCell.textContent = user.fullname;
    usernameCell.textContent = user.username;
    degreeCell.textContent = user.degree;
    roleCell.textContent = user.role;
    emailCell.textContent = user.email;

    tableBody.appendChild(userRow);

}
// add next button to the form
function addNextButton() {
    const nextButton = document.createElement('div');
    nextButton.setAttribute('id', 'nextButton');
    nextButton.setAttribute('class', 'registerationPage_button');
    nextButton.style.width = 'fit-content'

    nextButton.innerText = 'Next'
    const showUsersButton = document.createElement('div');
    showUsersButton.setAttribute('id', 'showUsersButton');
    showUsersButton.setAttribute('class', 'registerationPage_button');
    showUsersButton.style.width = 'fit-content'
    showUsersButton.innerText = 'Show users'
    showUsersButton.style.width = 'fit-content'
    const buttonsDiv = document.createElement('div');
    buttonsDiv.setAttribute('id', 'formbuttons')
    buttonsDiv.setAttribute('class', 'registerationPageDiv')
    buttonsDiv.appendChild(nextButton)
    buttonsDiv.appendChild(showUsersButton)
    const tableDiv = document.getElementById('userTable')
    tableDiv.insertAdjacentElement("afterend", buttonsDiv);

}

/************************************************************** */
// Event listeners:

// Check fields are not empty as click on field
document.addEventListener('click', (evt) => {
    const event = evt.target;
    const fields = ['userName', 'password']
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
    const fields = ['userName', 'password']
    if (fields.includes(event.id)) {
        if (event.value === '') {
            document.getElementById(`${event.id}`).style.background = 'red';
        } else if (event.value !== '') {
            document.getElementById(`${event.id}`).style.background = 'white';
        }
    }
})

// submit when register is clicked
document.addEventListener('click', (evt) => {
    const id = evt.target.id
    if (id === 'signInButton') {
        submit();
    }
})

// add eventlistener to prevent Enter key default action and instead submit or if signed in then redirect to home
document.body.addEventListener('keypress', function(eve) {
    if (eve.keyCode === 13) {
        if (goodtogo === false) {
            eve.preventDefault();
            submit();
        } else if (goodtogo === true) {
            eve.preventDefault();
            window.location.href = 'registered_index.html'
        }
    }
})

// add event listener for next button to redirect to registered home page
document.addEventListener('click', (evt) => {
    const id = evt.target.id
    if (id === 'nextButton') {
        window.location.href = 'registered_index.html'
    }
})

// add event listener for show users button to show all users
document.addEventListener('click', async(evt) => {
    const id = evt.target.id
    if (id === 'showUsersButton') {
        const allUsers = await getData('/users/index', JWT);
        if (allUsers.status === 200) {
            const currenUserId = document.getElementById('currentUser').innerText;
            for (let i = 0; i < allUsers.data.length; i++) {
                if (allUsers.data[i].id != currenUserId) {
                    showUserInTable(allUsers.data[i]);
                }
            }
        } else if (allUsers.status === 401) {
            alert(`you are not authorized to access this data`)
        }
    }
})