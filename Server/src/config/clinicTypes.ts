import * as SQLqueries from '../helpers/createSQLString';

export type CBC = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    lab?: string,
    hb?: number,
    platelets?: number,
    tlc?: number,
    inr?: number
}
export type CHEMISTRY = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    lab?: string,
    ast?: number,
    alt?: number,
    bilirubin_total?: number,
    bilirubin_direct?: number,
    albumin?: number,
    s_creat?: number,
    urea?: number,
    potassium?: number,
    sodium?: number
}
export type CLINICAL_DATA = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    dm?: string,
    htn?: string,
    hcv?: string,
    hbv?: string,
    hiv?: string,
    child_pugh?: string,
    hcv_virology?: string,
    hbv_virology?: string,
    hiv_virology?: string,
    ckd?: string,
    disability?: string,
    cardiac?: string
}
export type CLINICS = {
    id?: string,
    date?: string,
    attending_phys?: string
}
export type CT = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    center?: string,
    radiologist?: string,
    hfl_number?: string,
    hfl_lobe?: string,
    hfl_segment?: string,
    size?: number,
    aphe?: string,
    washout?: string,
    capsule?: string,
    growth?: string,
    lipidol?: string,
    mpv?: string,
    rpv?: string,
    lpv?: string,
    ascites?: string,
    cirrhosis?: string,
    ha_origin?: string,
}
export type MRI = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    center?: string,
    radiologist?: string,
    hfl_number?: string,
    hfl_lobe?: string,
    hfl_segment?: string,
    size?: number,
    aphe?: string,
    washout?: string,
    capsule?: string,
    growth?: string,
    diffusion?: string,
    mpv?: string,
    rpv?: string,
    lpv?: string,
    ascites?: string,
    cirrhosis?: string,
    ha_origin?: string
}
export type PATIENT_PLAN = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    radiologist?: string,
    plan_setting?: string,
    decision?: string,
    further?: string,
    remarks?: string
}
export type PATIENTS_PERSONAL = {
    id?: string,
    firstname?: string,
    middlename?: string,
    lastname?: string,
    hospital_id?: string,
    pat_nat_id?: string,
    mobile?: string,
    dob?: string,
    residence?: string,
    gender?: string,
    rank?: string,
    firstvisit?: string,
    lastvisit?: string
}
export type RESECTION = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    center?: string,
    surgeon?: string,
    complications?: string,
    outcome?: string,
    transplant?: string,
    remarks?: string
}
export type RFA = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    center?: string,
    radiologist?: string,
    needle?: string,
    complications?: string,
    outcome?: string,
    remarks?: string
}
export type TACE = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    center?: string,
    radiologist?: string,
    catheter?: string,
    ha_origin?: string,
    parent_feeding_artery?: string,
    complications?: string,
    outcome?: string,
    remarks?: string
}
export type TUMOR_MARKERS = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    lab?: string,
    afp?: number,
    cea?: number,
    ca19_9?: number,
    ca_125?: number
}
export type ULTRASOUND = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    center?: string,
    radiologist?: string,
    hfl_number?: string,
    hfl_lobe?: string,
    hfl_segment?: string,
    mpv?: string,
    rpv?: string,
    lpv?: string,
    ascites?: string,
    cirrhosis?: string
}
export type USERS = {
    id?: string,
    username?: string,
    fullname?: string,
    degree?: string,
    role?: string,
    email?: string,
    password?: string
}
export type VIROLOGY = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    lab?: string,
    hcv?: string,
    hbv?: string,
    hiv?: string
}
export type USERS_LOGIN = {
    id?: string,
    username?: string,
    login_time?: string
}
export type PATIENTS_VISITS = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    clinic_id?: string
}
export type REQDATAFILTER = {
    column?: string,
    value?: string,
    clinicID?: string
}
export type REQDATAUSER = {
    req_username: string,
    req_JWT: string
}
export type REQBODY = {
    data: {
        filter: REQDATAFILTER,
        user: REQDATAUSER,
        body: {
            cbc?: CBC,
            mri?: MRI,
            patient_plan?: PATIENT_PLAN,
            patients_personal?: PATIENTS_PERSONAL,
            patients_visits?: PATIENTS_VISITS,
            resection?: RESECTION,
            rfa?: RFA,
            tace?: TACE,
            tumor_markers?: TUMOR_MARKERS,
            ultrasound?: ULTRASOUND,
            users_login?: USERS_LOGIN,
            chemistry?: CHEMISTRY,
            clinical_data?: CLINICAL_DATA,
            clinics?: CLINICS,
            ct?: CT,
            virology?: VIROLOGY
        },
        SQL: SQLquery
    }
}
export type SQLquery = {
    mainTable?: string,
    joinTable1?: string,
    joinTable2?: string,
    joinTable3?: string,
    joinTable4?: string,
    joinTable5?: string,
    joinTable6?: string,
    onTable1Column?: string,
    onTable2Column?: string,
    onTable3Column?: string,
    onTable4Column?: string,
    onTable5Column?: string,
    onTable6Column?: string,
    equalTable1Column?: string,
    equalTable2Column?: string,
    equalTable3Column?: string,
    equalTable4Column?: string,
    equalTable5Column?: string,
    equalTable6Column?: string,
}
export type CLIINC_PATIENT = {
    response_summary?: {
        fullname: string,
        hospital_id?: string,
        pat_nat_id?: string,
        mobile?: string[],
        dob?: string,
        age?: number,
        residence?: string,
        gender?: string,
        rank?: string,
        firstvisit?: string,
        lastvisit?: string,
        decision?: string,
        futher?: string[],
        remarks?: string,
        radiologist?: string
    },
    patients_personal?: {
        firstname?: string,
        middlename?: string,
        lastname?: string,
        hospital_id?: string,
        pat_nat_id?: string,
        mobile?: string[],
        dob?: string,
        residence?: string,
        gender?: string,
        rank?: string,
        firstvisit?: string,
        lastvisit?: string,
    }
    clinical_data?: CLINICAL_DATA,
    patient_visits?: PATIENTS_VISITS,
    clinics?: CLINICS,
    cbc?: CBC,
    chemistry?: CHEMISTRY,
    virology?: VIROLOGY,
    tumor_markers?: TUMOR_MARKERS,
    ct?: CT,
    mri?: MRI,
    ultrasound?: ULTRASOUND,
    tace?: TACE,
    resection?: RESECTION,
    rfa?: RFA,
    patient_plan?: PATIENT_PLAN,
}
export type DOB_AGE_GENDER = {
    DOB: string,
    GENDER: string,
    AGE: string
}
export function getDobAgeGender(pat_nat_id: string): DOB_AGE_GENDER {
    let century: string;
    if (Number(pat_nat_id.slice(0, 1)) === 2) {
        century = '19';
    } else if (Number(pat_nat_id.slice(0, 1)) === 3) {
        century = '20';
    } else {
        century = '';
    }
    const dob = pat_nat_id.slice(3, 5) + '-' + pat_nat_id.slice(5, 7) + '-' + century + pat_nat_id.slice(1, 3)
    const gender = (((Number(pat_nat_id.slice(-1))) % 2) === 0) ? 'female' : 'male';
    const dobDiff = Math.abs(Date.now() - Date.parse(dob));
    const age = Math.floor((dobDiff / (1000 * 3600 * 24)) / 365);
    const result: DOB_AGE_GENDER = {
        DOB: dob,
        GENDER: gender,
        AGE: String(age)
    }

    return result;
}
// this function iterates through the given request to create SQL queries
// return value is an array through which you can pass each index in a SQL query
export function iterateThroughReqBody(reqBody: REQBODY): string[] {
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
        const SQL = SQLqueries.createSQLinsert(tableName, columnNames, enteries);
        SQLarr.push(SQL)
    }
    return SQLarr;
}


/*

const d = getDobAgeGender('28912142102773');
const arr = ['DOB', 'GENDER', 'AGE']

arr.forEach(element => {
    console.log(d[element as keyof typeof d])
});

for (const val in d) {
    console.log(val);
    console.log(d[val as keyof typeof d])
}
console.log(d[arr[0] as keyof DOB_AGE_GENDER])
console.log(d[arr[1] as keyof typeof d])


console.log(tableNames)
const x3 = tableNames[0]
const personalDATA = reqData[x3 as keyof typeof reqData] ;
const toPrint = personalDATA!['residence' as keyof typeof personalDATA] || 'da'

console.log(toPrint)
*/

/*
const x: REQBODY = {
    data: {
        filter: {
            column: '',
            value: '',
        },
        user: {
            req_JWT: '',
            req_username: ''
        },
        body: {
        },
        SQL: {

        }
    },

}

/**const patient: CLIINC_PATIENT = {
    response_summary: {
        fullname: '',
    },
    patients_personal: {
        firstname: 'Ahmed',
        middlename: 'Mohammed',
        lastname: 'Zidan',
        hospital_id: '1_244',
        pat_nat_id: '26010122103773',
        dob: '',
        residence: 'Cairo',
        gender: 'Male',
        rank: 'Civilian',
        firstvisit: '10-2-2021',
        lastvisit: '03-19-2022'
    },
    clinical_data: {

    },
    patient_visits: {},
    clinics: {},
    cbc: {},
    chemistry: {},
    virology: {},
    tumor_markers: {},
    ct: {},
    mri: {},
    ultrasound: {},
    tace: {},
    resection: {},
    rfa: {},
    patient_plan: {},

} */