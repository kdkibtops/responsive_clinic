CREATE TABLE clinical_data (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
dm VARCHAR(10),
htn VARCHAR(10),
hcv VARCHAR(10),
hbv VARCHAR(10),
hiv VARCHAR(10),
child_pugh VARCHAR(2),
hcv_virology VARCHAR(10),
hbv_virology VARCHAR(10),
hiv_virology VARCHAR(10),
ckd VARCHAR(10),
disability VARCHAR(10),
cardiac VARCHAR(10)
);