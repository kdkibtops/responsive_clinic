CREATE TABLE virology (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
date DATE,
lab VARCHAR(20),
hcv VARCHAR(20),
hbv VARCHAR(20),
hiv VARCHAR(20)
)