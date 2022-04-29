CREATE TABLE patients_visits (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(50),
clinic_id VARCHAR(50)
);