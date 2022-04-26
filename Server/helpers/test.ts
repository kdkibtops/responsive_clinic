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


console.log(newColumns);
console.log(newEntries);