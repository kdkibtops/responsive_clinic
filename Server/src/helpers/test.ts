// import * as clinicalTypes from '../config/clinicTypes';

// const newClinicalData = {
//     id: '111',
//     patient_id: '123',
//     patient_national_id: '333',
//     dm: 'yes',
//     htn: 'no',
//     hcv: 'yes',
//     hbv: 'no',
//     hiv: 'yes',
//     hcv_vriology: 'no',
//     hbv_virology: 'yes',
//     hiv_virology: 'no',
//     ckd: 'no',
//     disability: 'no',
//     cardiac: 'yes'
// }

// let newColumns = [];
// let newEntries = [];
// for (const column in newClinicalData) {
//     newColumns.push(column);
//     newEntries.push(newClinicalData[column as keyof typeof newClinicalData]);
// }

// for (let i = 0; i < newEntries.length; i++) {

// }

// function checkTest(user: string) {
//     switch (user) {
//         // case 'mustafa' || 'ahmed' || 'serag': //wrong way
//         //     console.log('first case');
//         //     break
//         case 'hassan':
//         case 'maha':
//         case 'new': {
//             break
//         }

//     }
// }
// /*
// checkTest('new');
// interface newInter {
//     name: string,
//     age: string
// }
// const x: Object = {
//     name: 'mustafa',
//     age: '33'
// }

// const result = {
//     id: 2,
//     firstname: "Mustafa",
//     middlename: "Hassan",
//     lastname: "Heidar",
//     hospital_id: "3442",
//     pat_nat_id: "28812142102773",
//     mobile: "01002651857;01113579900;0233355858",
//     dob: "1970-04-17T22:00:00.000Z",
//     residence: "cairo",
//     gender: "male",
//     rank: "civilian",
//     firstvisit: "2021-04-03T22:00:00.000Z",
//     lastvisit: "2022-05-04T22:00:00.000Z",
//     pat_id: "6",
//     clinic_id: "2",
//     date: "2022-04-19T22:00:00.000Z",
//     attending_phys: 2
// }

// const fullname = result.firstname + ' ' + result.middlename + ' ' + result.lastname;
// const mobiles = result.mobile.split(";");
// const dob: string = result.dob;
// const DOB = result.dob.split('T', 1);
// const dobDiff = Math.abs(Date.now() - Date.parse(dob));
// const age = Math.floor((dobDiff / (1000 * 3600 * 24)) / 365);
// console.log(mobiles);
// console.log(fullname);
// console.log(DOB)
// console.log(dob)
// console.log(age)
// console.log(age)
// console.log(DOB)
// console.log(DOB)
// console.log(DOB)

// */

// type newClient = {
//     name: string,
//     status: string
// }

// const arr: newClient[] = [];
// const x: newClient = {
//     name: '127.0.0.1',
//     status: 'yes'
// }
// const y: newClient = {
//     name: '135.0.0.1',
//     status: 'yes'
// }
// const z: newClient = {
//     name: '134.0.0.1',
//     status: 'yes'
// }
// arr.push(x, y, z);
// arr.forEach(ele => {
//     if (ele.name === '134.0.0.1') {
//         console.log(ele.name);
//     } else {
//         console.log(false);
//     }
// })

// // console.log(arr);

// const u: clinicalTypes.HTMLReq = {
//     method: 'PATCH',
//     toDo: 'showPatients',
//     body: {
//         data: {
//             user: { req_username: 'req_username', username: 'username', password: 'password' },
//             SQL: {},
//             filter: { column: 'column', value: 'value' },
//             body: {
//                 patients_personal: {

//                 }
//             }
//         }
//     }
// }


const x = `{
    "data": {
        "body": {
            "patients_personal": {
                "firstname": "Ahmed",
                "middlename": "Mohammad",
                "lastname": "Zidan",
                "pat_nat_id": "28812142102773",
                "dob": "04-14-1960",
                "residence": "Cairo",
                "gender": "male",
                "mobile": "01002651857;01113579900;0233355858",
                "hospital_id": "1_985332",
                "rank": "Civilian",
                "firstvisit": "10-18-2021",
                "lastvisit": "04-20-2022"
            },
            "cbc": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "date": "10-8-2021",
                "lab": "cbc",
                "hb": 13.5,
                "platelets": 180000,
                "tlc": 7000,
                "inr": 1.2
            },
            "chemistry": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "date": "10-9-2021",
                "lab": "chemistry",
                "ast": 56,
                "alt": 54,
                "albumin": 4.5,
                "bilirubin_direct": 2,
                "bilirubin_total": 3,
                "s_creat": 1.2,
                "urea": 56,
                "potassium": 3.4,
                "sodium": 48
            },
            "clinical_data": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "dm": "controlled",
                "htn": "No",
                "hcv": "hcv",
                "hbv": "hbv",
                "hiv": "hiv",
                "child_pugh": "A",
                "hcv_virology": "hcvVi",
                "hbv_virology": "hbvVi",
                "hiv_virology": "hivVi",
                "ckd": "yes",
                "disability": "no",
                "cardiac": "cardiac"
            },
            "clinics": {
                "date": "10-9-2021",
                "attending_phys": "5"
            },
            "ct": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "date": "10-9-2021",
                "center": "CT",
                "radiologist": "CT_reporter",
                "hfl_lobe": "Lt",
                "hfl_number": "1",
                "hfl_segment": "2",
                "size": 4.5,
                "aphe": "APHE",
                "washout": "washout",
                "capsule": "capsule",
                "growth": "growth",
                "lipidol": "lipidol",
                "mpv": "mpv",
                "rpv": "rpv",
                "lpv": "lpv",
                "ascites": "ascites",
                "cirrhosis": "cirrhosis",
                "ha_origin": "coeiliac"
            },
            "mri": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "date": "10-9-2021",
                "center": "mri",
                "radiologist": "mri_reporter",
                "hfl_lobe": "Lt",
                "hfl_number": "1",
                "hfl_segment": "2",
                "size": 4.5,
                "aphe": "APHE",
                "washout": "washout",
                "capsule": "capsule",
                "growth": "growth",
                "diffusion": "diffusion",
                "mpv": "mpv",
                "rpv": "rpv",
                "lpv": "lpv",
                "ascites": "ascites",
                "cirrhosis": "cirrhosis",
                "ha_origin": "coeiliac"
            },
            "ultrasound": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "date": "10-9-2021",
                "center": "CT",
                "radiologist": "CT_reporter",
                "hfl_lobe": "Lt",
                "hfl_number": "1",
                "hfl_segment": "2",
                "mpv": "mpv",
                "rpv": "rpv",
                "lpv": "lpv",
                "ascites": "ascites",
                "cirrhosis": "cirrhosis"
            },
            "patient_plan": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "date": "10-9-2021",
                "radiologist": "PlanningRadiologist",
                "plan_setting": "outpatient",
                "decision": "waiting",
                "further": "update investigations; update imaging; check further",
                "remarks": "Remarks section"
            },
            "patients_visits": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "clinic_id": "3"
            },
            "resection": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "center": "resectionCent",
                "transplant": "transplant"
            },
            "rfa": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "radiologist": "rfa radiologist"
            },
            "tace": {
                "parent_feeding_artery": "SMA",
                "radiologist": "tace radiologist",
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773"
            },
            "tumor_markers": {
                "lab": "tumoMark",
                "date": "10-9-2021",
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773"
            },
            "virology": {
                "pat_id": "1_985332",
                "pat_nat_id": "26004142102773",
                "date": "10-9-2021",
                "lab": "virology",
                "hbv": "negative"
            }
        },
        "filter": {
            "column": "",
            "value": ""
        },
        "SQL": {},
        "user": {
            "req_username": "",
            "req_JWT": ""
        }
    }
}`

const y = JSON.parse(x);


function createSQLinsert(tableName: string, columnsName: string[], entries: string[]): string {
    let columns = columnsName.join();

    // columnsName.forEach(element => {
    //     columns += element;
    //     columns += ',';
    // });
    let values = '';
    entries.forEach(element => {
        values += `'${element}'`;
        values += ',';
    });
    // columns = columns.slice(0, -1);
    values = values.slice(0, -1);
    let SQL = `INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *;`;
    return SQL;
}


function iterateThroughReqBody(reqBody: any): string[] {
    let tableNames: string[] = []
    let SQLarr: string[] = []
    const reqData = reqBody.data.body
    for (const prop in reqData) {
        tableNames.push(prop);
    }
    for (let i = 0; i < tableNames.length; i++) {
        const tableName = tableNames[i];
        let enteries: string[] = [];
        let columnNames: string[] = [];
        let thisTable = reqData[tableName as keyof typeof reqData]
        for (const column in thisTable) {
            columnNames.push(column);
            enteries.push(String(thisTable[column as keyof typeof thisTable]));
        }
        const SQL = createSQLinsert(tableName, columnNames, enteries);
        SQLarr.push(SQL)
    }
    return SQLarr;
}

console.log(iterateThroughReqBody(y)[0])
