CREATE TABLE virology (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
date DATE,
lab VARCHAR(20),
hcv integer,
hbv integer,
hiv integer
)