CREATE TABLE chemistry (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
date DATE,
lab VARCHAR(20),
ast integer,
alt integer,
bilirubin_total numeric,
bilirubin_direct numeric,
albumin numeric,
s_creat numeric,
urea numeric,
potassium numeric,
sodium numeric
)