# WEB BASED RESPONSIVE CLINIC APPLICATION:
## Under development....

The idea is creating a fully responsive web based application for managing clinic and patients data
The HTML and CSS codes used so far are used from youtube video for creating fully responsive web page to be compatible with all devices.
Refrences for all my work will be added as I go on with the project.
I am intending to use:
- Node.js for the server side.
- React for creating single page application.
- PostgreSQL DB for managing and storing data.


## Structure of the Project:
### Front end:

### Server:
#### Database:
#### Server:
#### API:
## Update [28-3-2022]:
  - I succeeded in creating a new models_functions.ts file and main_handler.ts file that will take care of all Database CRUD operations whatever the table being manipulated:
    The request body should be like below:
```
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

      - Table name will be supplies in the URL as a parameter
      - The API URLs will be:
        -  ``` 
        /main/:tableName/registerentry 
        ```
        -  ``` 
        /main/:tableName/show 
        ```
        -  ``` 
        /main/:tableName/showall 
        ```
        -  ``` 
        /main/:tableName/update 
        ```
        -  ```
        /main/:tableName/delete 
        ```


- Models:
    - Users:
        - Create user: POST ('/users/create')
            - Req.body{
                "fullname": "",
                "username": "",
                "password": "",
                "role": "",
                "degree": "",
                "email":""
                }
        - Index all users: GET ('/users/index') Req.headers.authorization (BEARER JWT)
        - Index all users without token: GET ('/users/indexNot')
        - Shows user: GET ('/users/show/:username')  
        - Update user: PUT ('/users/update')
          - Req.body {"update_username":"", "updateField":"","updateValue":""}
        - Delete user: DELETE ('/users/delete') Req.body {"req_username":"", "delete_username":""}
    - Patients:
        - Register new patient: POST ('patients/registerpatient')
            - Req.body{
              "firstName":"",
              "middleName":"",
              "lastName":"",
              "hospitalID":"",
              "nationalID":"",
              "mobile":"",
              "DOB":"",
              "residence":"",
              "gender":"",
              "rank":"",
              "firstVisit":"",
              "lastVisit":""
            }
        - Index all patients: GET ('patients/indexpatients')
        - Shows patient: GET ('patients/showpatient') Req.body {"field":"", "value":""}
        - Update patients: PUT ('patients/updatepatient')
          - Req.body {"field":"", "value":"", "updateField":"","updateValue":""}
        - Delete patients: DELETE ('patients/deletepatient') Req.body {"field":"", "value":""}
    - Clinics:


- Handlers:
