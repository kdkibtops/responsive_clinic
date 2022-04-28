CREATE TABLE tace (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
date DATE,
center VARCHAR(20),
radiologist VARCHAR(30),
catheter VARCHAR(30),
ha_origin VARCHAR(20),
parent_feeding_artery VARCHAR(20),
complications VARCHAR(100),
outcome VARCHAR(20),
remarks TEXT
);