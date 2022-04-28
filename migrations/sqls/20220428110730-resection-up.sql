CREATE TABLE resection (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
date DATE,
center VARCHAR(20),
surgeon VARCHAR(30),
complications VARCHAR(100),
outcome VARCHAR(20),
transplant VARCHAR (20),
remarks TEXT
);