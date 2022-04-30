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
    size?: string,
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
    lobe?: string,
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
export interface REQDATAFILTER {
    column?: string,
    value?: string,
    clinicID?: string
}
export interface REQDATAUSER {
    req_username: string,
    req_JWT: string
}
export interface REQBODY {
    data: {
        filter: REQDATAFILTER,
        user: REQDATAUSER,
        body: CBC,
        SQL: SQLquery
    }
}
export interface SQLquery {
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
export interface CLIINC_PATIENT {
    basic: {
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