import { json } from "body-parser";

const newClinicalData = {
    id: '111',
    patient_id: '123',
    patient_national_id: '333',
    dm: 'yes',
    htn: 'no',
    hcv: 'yes',
    hbv: 'no',
    hiv: 'yes',
    hcv_vriology: 'no',
    hbv_virology: 'yes',
    hiv_virology: 'no',
    ckd: 'no',
    disability: 'no',
    cardiac: 'yes'
}

let newColumns = [];
let newEntries = [];
for (const column in newClinicalData) {
    newColumns.push(column);
    newEntries.push(newClinicalData[column as keyof typeof newClinicalData]);
}

for (let i = 0; i < newEntries.length; i++) {

}

function checkTest(user: string) {
    switch (user) {
        // case 'mustafa' || 'ahmed' || 'serag': //wrong way
        //     console.log('first case');
        //     break
        case 'hassan':
        case 'maha':
        case 'new': {
            break
        }

    }
}
/*
checkTest('new');
interface newInter {
    name: string,
    age: string
}
const x: Object = {
    name: 'mustafa',
    age: '33'
}

const result = {
    id: 2,
    firstname: "Mustafa",
    middlename: "Hassan",
    lastname: "Heidar",
    hospital_id: "3442",
    pat_nat_id: "28812142102773",
    mobile: "01002651857;01113579900;0233355858",
    dob: "1970-04-17T22:00:00.000Z",
    residence: "cairo",
    gender: "male",
    rank: "civilian",
    firstvisit: "2021-04-03T22:00:00.000Z",
    lastvisit: "2022-05-04T22:00:00.000Z",
    pat_id: "6",
    clinic_id: "2",
    date: "2022-04-19T22:00:00.000Z",
    attending_phys: 2
}

const fullname = result.firstname + ' ' + result.middlename + ' ' + result.lastname;
const mobiles = result.mobile.split(";");
const dob: string = result.dob;
const DOB = result.dob.split('T', 1);
const dobDiff = Math.abs(Date.now() - Date.parse(dob));
const age = Math.floor((dobDiff / (1000 * 3600 * 24)) / 365);
console.log(mobiles);
console.log(fullname);
console.log(DOB)
console.log(dob)
console.log(age)
console.log(age)
console.log(DOB)
console.log(DOB)
console.log(DOB)

*/

const arr = ['a', 'b', 'c'];

console.log(arr.indexOf('a'));
