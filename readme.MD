# WEB BASED RESPONSIVE CLINIC APPLICATION: #
## Under development.... ##

The idea is creating a fully responsive web based application for managing clinic and patients data
The HTML and CSS codes used so far are used from youtube video for creating fully responsive web page to be compatible with all devices.
Refrences for all my work will be added as I go on with the project.
I am intending to use:
- Node.js for the server side.
- React for creating single page application.
- PostgreSQL DB for managing and storing data.



## Structure of the Project:
  ### Front end:
    - Still undetermined.
  ### Server:
  #### Database:
  #### Server:
  #### API:
  ## Update [28-3-2022]: ###
  - I succeeded in creating a new models_functions.ts file and main_handler.ts file that will take care of all Database CRUD operations whatever the table being manipulated:
    The request body should be like below:
```JSON
  {
        "data":{
          "body":{
                  "column_name":"value"
          },
          "filter":{
              "column":"id",
              "value":"2"
          }     
        }

      } 
```
### Table name will be supplies in the URL as a parameter: ###
### The API URLs will be as follow: ###  

#### Main Handlers: ####
```
/main/:tableName/registerentry 
```

``` 
/main/:tableName/show  <token requires>
```

``` 
/main/:tableName/showall  <token requires>
```

``` 
/main/:tableName/update   <token requires>
```

```
/main/:tableName/delete   <token requires>
```

Token: to be passed as follow:
```
Req.headers.authorization (BEARER JWT) 

```

#### User handler: ####
  - Create user: POST 

```
  '/users/create'
```

    The request.body should look like this:

```JSON
{
  "data": {
    "body":{
      "fullname": "",
      "username": "",
      "password": "",
      "role": "",
      "degree": "",
      "email":""
    }
  }
}        
```

Route   |   URL   |   Method
------- |---------|----------
Index all users   |```/users/index```| PATCH
Show user| ```/users/show/:username```| GET

# Suggested Workflow: #

[ ] Home page is served containing login and register as well as most relevant newsfeed (Still developing).
[x] User registers and then signs in to account.
[x] After sign in JWT is passed to the user.
[x] The user passes JWT with Req.headers.authorization.
[ ] Registered homepage with have the following:
  - Patients:
    - Add new patient
    - Browse all patients (patients summary)
    - Show a patient:
      - Summary:
        __Fullname, Age, National_id, Residence, Contacts, Rank, Last_visit, Furthers, Decision, Next_visit__
      - Personal data:
        __Date of birth, Hospital_id, Gender__
      - Clinical data:
        __DM, HTN, HCV, HBV, HIV, CKD, Disability, Cardiac__
      - Laboratory:
        - CBC: __Hb, TLC, Platelets, INR__
        - Chemistry: __All__
        - Virology: __All__
        - Tumor markers: __All__
      - Imaging:
        - Ultrasound: __All__
        - CT: __All__
        - MRI: __All__
      - Interventions:
        - TACE: __All__
        - RFA: __All__
        - Resection: __All__
      - Patient Plan:
        __Decision, Furthers, Radiologist, Remarks__
    - Edit a patient: Each table to be edited separtely according to data updated.
    - Delete a patient
    - Browse patients with filters
    - Add patient to a clinic: will use `patients_visits` router
  - Clinics: 
    - Add new clinic
    - Browse all clinics (clinic summary)
    - Show a clinic: __Date, Attending physician, Number of patient__
    - Edit a clinic: __Date, Attending_phsyician__
    - Delete a clinic
  - Newsfeed