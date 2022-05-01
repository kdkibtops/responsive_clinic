import * as clinicTypes from '../../config/clinicTypes'


// example for the request.body sent from frontend to backend while creating new user from scratch
const myNAT = '26004142102773';
const pat_ID = '1_985332'
const invDate = '10-9-2021'
const newRequest: clinicTypes.REQBODY = {
    data: {
        body: {
            patients_personal: {
                firstname: 'Ahmed',
                middlename: 'Mohammad',
                lastname: 'Zidan',
                pat_nat_id: '28812142102773',
                dob: clinicTypes.getDobAgeGender(myNAT).DOB,
                residence: 'Cairo',
                gender: clinicTypes.getDobAgeGender(myNAT).GENDER,
                mobile: '01002651857;01113579900;0233355858',
                hospital_id: pat_ID,
                rank: 'Civilian',
                firstvisit: '10-18-2021',
                lastvisit: '04-20-2022'
            },
            cbc: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                date: '10-8-2021',
                lab: 'cbc',
                hb: 13.5,
                platelets: 180000,
                tlc: 7000,
                inr: 1.2
            },
            chemistry: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                date: invDate,
                lab: 'chemistry',
                ast: 56,
                alt: 54,
                albumin: 4.5,
                bilirubin_direct: 2,
                bilirubin_total: 3,
                s_creat: 1.2,
                urea: 56,
                potassium: 3.4,
                sodium: 48
            },
            clinical_data: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                dm: 'controlled',
                htn: 'No',
                hcv: 'hcv',
                hbv: 'hbv',
                hiv: 'hiv',
                child_pugh: 'A',
                hcv_virology: 'hcvVi',
                hbv_virology: 'hbvVi',
                hiv_virology: 'hivVi',
                ckd: 'yes',
                disability: 'no',
                cardiac: 'cardiac'

            },
            clinics: {
                date: invDate,
                attending_phys: '5'
            },
            ct: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                date: invDate,
                center: 'CT',
                radiologist: 'CT_reporter',
                hfl_lobe: 'Lt',
                hfl_number: '1',
                hfl_segment: '2',
                size: 4.5,
                aphe: 'APHE',
                washout: 'washout',
                capsule: 'capsule',
                growth: 'growth',
                lipidol: 'lipidol',
                mpv: 'mpv',
                rpv: 'rpv',
                lpv: 'lpv',
                ascites: 'ascites',
                cirrhosis: 'cirrhosis',
                ha_origin: 'coeiliac'
            },
            mri: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                date: invDate,
                center: 'mri',
                radiologist: 'mri_reporter',
                hfl_lobe: 'Lt',
                hfl_number: '1',
                hfl_segment: '2',
                size: 4.5,
                aphe: 'APHE',
                washout: 'washout',
                capsule: 'capsule',
                growth: 'growth',
                diffusion: 'diffusion',
                mpv: 'mpv',
                rpv: 'rpv',
                lpv: 'lpv',
                ascites: 'ascites',
                cirrhosis: 'cirrhosis',
                ha_origin: 'coeiliac'
            },
            ultrasound: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                date: invDate,
                center: 'CT',
                radiologist: 'CT_reporter',
                hfl_lobe: 'Lt',
                hfl_number: '1',
                hfl_segment: '2',
                mpv: 'mpv',
                rpv: 'rpv',
                lpv: 'lpv',
                ascites: 'ascites',
                cirrhosis: 'cirrhosis'
            },
            patient_plan: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                date: invDate,
                radiologist: 'PlanningRadiologist',
                plan_setting: 'outpatient',
                decision: 'waiting',
                further: 'update investigations; update imaging; check further',
                remarks: 'Remarks section'
            },
            patients_visits: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                clinic_id: '3',
            },
            resection: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                center: 'resectionCent',
                transplant: 'transplant'
            },
            rfa: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                radiologist: 'rfa radiologist'
            },
            tace: {
                parent_feeding_artery: 'SMA',
                radiologist: 'tace radiologist',
                pat_id: pat_ID,
                pat_nat_id: myNAT
            },
            tumor_markers: {
                lab: 'tumoMark',
                date: invDate,
                pat_id: pat_ID,
                pat_nat_id: myNAT
            },
            virology: {
                pat_id: pat_ID,
                pat_nat_id: myNAT,
                date: invDate,
                lab: 'virology',
                hbv: 'negative'
            }
        },
        filter: { column: '', value: '' },
        SQL: {},

        user: { req_username: '', req_JWT: '', }
    }
}

// exmple for the request.body sent to backend while requesting any other route
// Note that table name is sent as URL param: /main/:tableName/whateverYouWantToDo
const reqBodyOthers: clinicTypes.REQBODY = {
    data: {
        body: {
            patient_plan: {
                pat_nat_id: myNAT,
                pat_id: pat_ID,
                plan_setting: 'inpatient',
                date: invDate,
                decision: 'Pending',
                remarks: 'Remarks',
                radiologist: 'Mustafa Heidar'
            }
        },
        filter: {
            column: 'pat_nat_id',
            value: '28912142102773'
        },
        user: {
            req_username: '',
            req_JWT: ''
        },
        SQL: {

        }
    }
}