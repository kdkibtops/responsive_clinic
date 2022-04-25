CREATE TABLE patients_personal (
id SERIAL PRIMARY KEY,
firstName VARCHAR (20),
middleName VARCHAR(20),
lastName VARCHAR(20),
hospitalID VARCHAR (30),
nationalID VARCHAR(14),
mobile VARCHAR(100),
dob DATE,
residence VARCHAR(20),
gender VARCHAR (10),
rank VARCHAR (10),
firstVisit DATE,
lastVisit DATE
);