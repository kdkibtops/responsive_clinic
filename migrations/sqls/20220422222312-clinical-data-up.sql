CREATE TABLE clinical_data (
id SERIAL PRIMARY KEY,
patient_id int,
patient_national_id VARCHAR(14),
dm VARCHAR(10),
htn VARCHAR(10),
hcv VARCHAR(10),
hbc VARCHAR(10),
hiv VARCHAR(10),
hcv_virology VARCHAR(10),
hbv_virology VARCHAR(10),
hiv_virology VARCHAR(10),
ckd VARCHAR(10),
disability VARCHAR(10),
cardiac VARCHAR(10)
);