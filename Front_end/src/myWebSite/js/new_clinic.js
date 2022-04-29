/* eslint-disable */
/*CLINIC *********************JAVASCRIPT*/
import { indexAllUsers } from './front_helper_functions.js'

// function to create the clinic form
function createClinicForm() {
    const newPatientForm = document.createElement('form');
    const formDiv = document.createElement('div');
    newPatientForm.setAttribute('id', 'newPatientForm');
    formDiv.setAttribute('id', 'formDiv');
    formDiv.appendChild(newPatientForm);
    newPatientForm.innerHTML = `
    <div style='text-align: center;width: 100%;'>
    <h3>Add New Patient</h3>
    </div>
    <div class='wrapDiv'>
        <label for='nameCell' class='newPatientFormLabel'>Name:</label>
        <input type='text' class='inputLabel' id='nameCell'>
    </div>
    <div class='wrapDiv'>
        <label for='nationalID' class='newPatientFormLabel'>National ID:</label>
        <input type='number' maxlength="14" minlength="14" class=' inputLabel' id='nationalID'>
    </div>
    <div class='wrapDiv'>
        <label for='computerID' class='newPatientFormLabel'>Computer ID</label>
        <input type='number' class='inputLabel' id='computerID'>
    </div>
    <div class='wrapDiv'>
        <label for='age' class='newPatientFormLabel'>Age:</label>
        <input type='number' class='inputLabel' id='age'>
    </div>
    <div class='wrapDiv'>
        <label for='sex' class='newPatientFormLabel'>Sex:</label>
        <select class='inputLabel' id='sex'>
            <option value="Male" style='font-weight:Bolder'>Male</option>
            <option value="Female" style='font-weight:Bolder'>Female</option>
        </select>
    </div>
    <div class='wrapDiv'>
        <label for='residence' class='newPatientFormLabel'>Residnce:</label>
        <select class='inputLabel' id='residence' style='font-weight:Bolder'>
            <option value="Alexandria">Alexandria</option>
            <option value="Arish">Arish</option>
            <option value="Assiout">Assiout</option>
            <option value="Aswan">Aswan</option>
            <option value="Banha">Banha</option>
            <option value="Behira">Behira</option>
            <option value="Beni-Suef">Beni-Suef</option>
            <option value="Cairo">Cairo</option>
            <option value="Demietta">Demietta</option>
            <option value="Fayoum">Fayoum</option>
            <option value="Giza">Giza</option>
            <option value="Giza_Suburban">Giza Suburban</option>
            <option value="Kafr_El_Sheikh">Kafr-El-Sheikh</option>
            <option value="Mansoura">Mansoura</option>
            <option value="Matrouh">Matrouh</option>
            <option value="Mehala">Mehala</option>
            <option value="Menofia">Menofia</option>
            <option value="Menya">Menya</option>
            <option value="Port-Said">Port-Said</option>
            <option value="South_Sinai">South Sinai</option>
            <option value="Tanta">Tanta</option>
            <option value="Sohag">Sohag</option>
            <option value="Qena">Qena</option>
            <option value="Qalioubya">Qalioubya</option>
        </select>
    </div>
    <div class='wrapDiv'>
        <label for='phone' class='newPatientFormLabel'>Phone</label>
        <input type='tel' class='inputLabel' id='phone'>
    </div>
    <div class='wrapDiv'>
        <label for='statusCell' class='newPatientFormLabel'>Status:</label>
        <select type='text' class='inputLabel' id='statusCell'>
            <option value="First Visit" style='font-weight:Bolder'>First Visit</option>
            <option value="Recurrent" style='font-weight:Bolder'>Recurrent</option>
        </select>
    </div>
    <div class='wrapDiv' style='padding-left:30%'>
        <div id='submitButton' class='formButton'>Submit</div>
        <div id='resetButton' class='formButton'>Reset</div>
    </div>


    `

    const clinicTable = document.getElementById('clinicTable');
    clinicTable.insertAdjacentElement('beforebegin', newPatientForm);
}

// function to create new empty table for patients in the clinic
function createClinicTable() {
    const clinicTable = document.createElement('table');
    const tableBody = clinicTable.createTBody();
    const tableHeader = clinicTable.createTHead();
    const tableFooter = clinicTable.createTFoot();
    const tableCaption = clinicTable.createCaption();
    const tableDiv = document.createElement('div');

    tableDiv.setAttribute('id', 'tableDiv');
    clinicTable.setAttribute('id', 'clinicTable');
    tableBody.setAttribute('id', 'tableBody')
    tableCaption.setAttribute('id', 'tableCaption')

    tableDiv.appendChild(clinicTable);

    // update contents
    tableCaption.textContent = 'Patients'

    const nameCell = document.createElement('td');
    nameCell.innerText = 'Name';
    tableHeader.appendChild(nameCell)
    const nationalIDCell = document.createElement('td');
    nationalIDCell.textContent = 'National ID';
    tableHeader.appendChild(nationalIDCell)
    const computerIDCell = document.createElement('td');
    computerIDCell.textContent = 'Computer ID';
    tableHeader.appendChild(computerIDCell)
    const ageCell = document.createElement('td');
    ageCell.textContent = 'Age';
    tableHeader.appendChild(ageCell)
    const sexCell = document.createElement('td');
    sexCell.textContent = 'Sex';
    tableHeader.appendChild(sexCell)
    const residenceCell = document.createElement('td');
    residenceCell.textContent = 'Residence';
    tableHeader.appendChild(residenceCell)
    const phoneCell = document.createElement('td');
    phoneCell.textContent = 'Phone Number';
    tableHeader.appendChild(phoneCell)
    const statusCell = document.createElement('td');
    statusCell.textContent = 'Status';
    tableHeader.appendChild(statusCell)

    const mainDiv = document.getElementById('mainDiv');
    mainDiv.insertAdjacentElement("afterend", clinicTable)

}


// reset form button
document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'resetButton') {
        resetForm();
    }
})

function resetForm() {
    document.getElementById('nameCell').value = '';
    document.getElementById('nationalID').value = '';
    document.getElementById('computerID').value = '';
    document.getElementById('age').value = '';
    document.getElementById('sex').value = '';
    document.getElementById('residence').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('statusCell').value = '';
}

// post clinic data including the date and attending doctor to the server

const postNewClinic = async(url = '', newData = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });
    try {
        const postedData = await response.json();
        return postedData;
    } catch (error) {
        console.log('error', error);
    }
}

// create new instance of the clinic including date, attending doctor, creating patients table, and new patient form
document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'startNewClinic') {
        const dateValue = document.getElementById('date').value;
        const attendingDoctor = document.getElementById('attending_doctor').value;
        if (dateValue !== '' && attendingDoctor !== '') {
            let newData = {};
            newData.date = document.getElementById('date').value;
            newData.attendingDoctor = document.getElementById('attending_doctor').value;
            postNewClinic('/startNewClinic', newData); //add new handler for this route !!pending
            newClinic();
        } else {
            alert('Please Enter valid date and the name of attending Doctor!');
        }
    }
})

// Get clinic data from server
const newClinic = async(url = '/currentClinic') => {
    const request = await fetch(url);
    try {
        const clinicDate = document.createElement('h2');
        const attendingDoctor = document.createElement('h3');
        clinicDate.id = 'displayClinicDate';
        attendingDoctor.id = 'displayAttendingDoctor';
        const mainDiv = document.getElementById('mainDiv');
        mainDiv.innerHTML = '';
        mainDiv.appendChild(clinicDate);
        mainDiv.appendChild(attendingDoctor);
        const recievedData = await request.json();
        clinicDate.innerHTML = 'Clinic Date: ' + recievedData.date;
        attendingDoctor.innerHTML = 'Attending Doctor: ' + recievedData.attendingPhysician;
        createClinicTable();
        createClinicForm();
        return recievedData;
    } catch (error) {
        console.log('error', error);
    }
}

/*function to add new patient to the clinic, it will validate empty fields 
then call addNewPatientFunction and reset the form, if empty field it will pop up alert*/

document.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    if (evtTarget.id === 'submitButton') {
        if (document.getElementById('nameCell').value !== '' &&
            document.getElementById('nationalID').value !== '' &&
            document.getElementById('computerID').value !== '' &&
            document.getElementById('age').value !== '' &&
            document.getElementById('sex').value !== '' &&
            document.getElementById('residence').value !== '' &&
            document.getElementById('phone').value !== '' &&
            document.getElementById('statusCell').value !== '') {
            addNewPatient();
            resetForm();
        } else {
            alert('Please complete all fields!');
        }
    }
})

/**Create patient row and update its field from the form then append it to the patients
 * table, then it call async function to send data to the server to be stored there.
 */
function addNewPatient() {
    // create new row for the patient
    const tableBody = document.getElementById('tableBody');
    const newPatient = document.createElement('tr');

    const nameCell = document.createElement('td');
    const nationalIDCell = document.createElement('td');
    const computerIDCell = document.createElement('td');
    const ageCell = document.createElement('td');
    const sexCell = document.createElement('td');
    const residenceCell = document.createElement('td');
    const phoneCell = document.createElement('td');
    const statusCell = document.createElement('td');
    newPatient.appendChild(nameCell);
    newPatient.appendChild(nationalIDCell);
    newPatient.appendChild(computerIDCell);
    newPatient.appendChild(ageCell);
    newPatient.appendChild(sexCell);
    newPatient.appendChild(residenceCell);
    newPatient.appendChild(phoneCell);
    newPatient.appendChild(statusCell);

    // fill the patient row from the form
    nameCell.innerText = document.getElementById('nameCell').value;
    nationalIDCell.textContent = document.getElementById('nationalID').value;
    computerIDCell.textContent = document.getElementById('computerID').value;
    ageCell.textContent = document.getElementById('age').value;
    sexCell.textContent = document.getElementById('sex').value;
    residenceCell.textContent = document.getElementById('residence').value;
    phoneCell.textContent = document.getElementById('phone').value;
    statusCell.textContent = document.getElementById('statusCell').value;

    // append the patient row to the table
    tableBody.appendChild(newPatient);

    // send patient data to /newPatient route to be stored in server
    let newData = {};
    newData.patientName = document.getElementById('nameCell').value;
    newData.nationalID = document.getElementById('nationalID').value;
    newData.computerID = document.getElementById('computerID').value;
    newData.age = document.getElementById('age').value;
    newData.sex = document.getElementById('sex').value;
    newData.residence = document.getElementById('residence').value;
    newData.phone = document.getElementById('phone').value;
    newData.status = document.getElementById('statusCell').value;

    // call async function to send data to server
    postNewPatient('/newPatient', newData);
    // 
}

/*ASYNC POST FUNCTION TO SEND PATIENT DATA TO THE SERVER*/

const postNewPatient = async(url = '', newData = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });
    try {
        const postedData = await response.json();
        return postedData;
    } catch (error) {
        console.log('error', error);
    }
}

upDatePage();

// function to update attending physician list with newly registered users
async function upDatePage() {
    const attendingDoctor = document.getElementById('attending_doctor');
    const all_users = await indexAllUsers('/users/indexNot');
    for (let i = 0; i < all_users.data.length; i++) {
        addnewUserOption(all_users.data[i]);
    }

}

// adding each user to the attending physician list... to be used within updatePage()
function addnewUserOption(user) {
    const attendingDocList = document.getElementById('attending_doctor');
    const newOption = document.createElement('option');
    newOption.setAttribute('value', user.id);
    newOption.textContent = user.fullname;
    attendingDocList.appendChild(newOption);

}