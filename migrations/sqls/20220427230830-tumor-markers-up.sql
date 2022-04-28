CREATE TABLE tumor_markers (
id SERIAL PRIMARY KEY,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
date DATE,
lab VARCHAR(20),
AFP integer,
CEA integer,
CA19_9 integer,
CA_125 integer
)