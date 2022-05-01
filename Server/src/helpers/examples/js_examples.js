// JS request.body to be passed when creating new user
const reqBodyNewUser = {
    data: {
        body: {
            patients_personal: [Object],
            cbc: [Object],
            chemistry: [Object],
            clinical_data: [Object],
            clinics: [Object],
            ct: [Object],
            mri: [Object],
            ultrasound: [Object],
            patient_plan: [Object],
            patients_visits: [Object],
            resection: [Object],
            rfa: [Object],
            tace: [Object],
            tumor_markers: [Object],
            virology: [Object]
        },
        filter: { column: '', value: '' },
        SQL: {},
        user: { req_username: '', req_JWT: '' }
    }
}

// JS request.body to be passed when using any other routes
const reqBodyOthers = {
    data: {
        body: {
            data: {
                pat_nat_id: '27010102103773',
                pat_id: '10',
                dm: 'updated',
                htn: 'updated'
            }
        },
        filter: {
            column: 'pat_nat_id',
            value: '28912142102773'
        }
    }
}