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
      - __Summary:__
        Fullname, Age, National_id, Residence, Contacts, Rank, Last_visit, Furthers, Decision, Next_visit
      - __Personal data:__
        Date of birth, Hospital_id, Gender
      - __Clinical data:__
        DM, HTN, HCV, HBV, HIV, CKD, Disability, Cardiac
      - __Laboratory:__
        - CBC: Hb, TLC, Platelets, INR
        - Chemistry: All
        - Virology: All
        - Tumor markers: All
      - __Imaging:__
        - Ultrasound: All
        - CT: All
        - MRI: All
      - __Interventions:__
        - TACE: All
        - RFA: All
        - Resection: All
      - __Patient Plan:__
        Decision, Furthers, Radiologist, Remarks
    - __Edit a patient:__ Each table to be edited separtely according to data updated.
    - __Delete a patient:__
    - __Browse patients with filters__
    - __Add patient to a clinic:__ 
      - Will use `patients_visits` router.
      - Patient must registered first before adding to patients_visits
  - Clinics: 
    - __Add new clinic:__
    - __Browse all clinics:__ (clinic summary)
    - __Show a clinic:__ Date, Attending physician, Number of patient
    - __Edit a clinic:__ Date, Attending_phsyician
    - __Delete a clinic:__
  - Newsfeed