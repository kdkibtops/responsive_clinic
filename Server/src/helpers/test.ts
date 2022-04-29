import { Console } from "console";

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
            console.log('second case'); //right way
            break
        }

    }
}

checkTest('new');
interface newInter {
    name: string,
    age: string
}
const x: Object = {
    name: 'mustafa',
    age: '33'
}
