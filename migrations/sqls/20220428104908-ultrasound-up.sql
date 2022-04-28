CREATE TABLE ultrasound (
id SERIAL PRIMARY KEy,
pat_nat_id VARCHAR(14),
pat_id VARCHAR(10),
date DATE,
center VARCHAR(20),
radiologist VARCHAR(30),
hfl_number INTEGER,
Lobe VARCHAR(10),
hfl_segment VARCHAR(3),
mpv VARCHAR (10),
rpv VARCHAR (10),
lpv VARCHAR (10),
ascites VARCHAR (10),
cirrhosis VARCHAR(10)
);