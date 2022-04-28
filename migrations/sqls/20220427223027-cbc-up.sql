CREATE TABLE cbc (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
date DATE,
lab VARCHAR(20),
hb numeric,
platelets integer,
tlc integer,
inr numeric
)