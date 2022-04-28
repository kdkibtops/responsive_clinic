CREATE TABLE patient_plan (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
date DATE,
radiologist VARCHAR(30),
plan_setting VARCHAR(50),
decision VARCHAR(20),
further TEXT,
remarks TEXT
);