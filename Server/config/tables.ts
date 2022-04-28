export type cbc = {
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
export type chemistry = {
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
export type clinical_data = {
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
export type clinics = {
    id?: string,
    date?: string,
    attending_phys: string
}
export type ct = {
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
export type mri = {
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
export type patient_plan = {
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
export type patients_personal = {
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
export type resection = {
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
export type rfa = {
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
export type tace = {
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
export type tumor_markers = {
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
export type ultrasound = {
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
export type users = {
    id?: string,
    username?: string,
    fullname?: string,
    degree?: string,
    role?: string,
    email?: string,
    password?: string
}
export type virology = {
    id?: string,
    pat_nat_id?: string,
    pat_id?: string,
    date?: string,
    lab?: string,
    hcv?: string,
    hbv?: string,
    hiv?: string
}
export type users_login = {
    id?: string,
    username?: string,
    login_time?: string
}