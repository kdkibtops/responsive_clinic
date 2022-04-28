CREATE TABLE patients_personal (
id SERIAL PRIMARY KEY,
firstName VARCHAR (20),
middleName VARCHAR(20),
lastName VARCHAR(20),
hospital_id VARCHAR (30),
pat_nat_id VARCHAR(14),
mobile VARCHAR(100),
dob DATE,
residence VARCHAR(20),
gender VARCHAR (10),
rank VARCHAR (10),
firstVisit DATE,
lastVisit DATE
);