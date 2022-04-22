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
        - Index all users: GET ('/users/index')
        - Index all users without token: GET ('/users/indexNot')
        - Shows user: GET ('/users/show')
        - Update user: PUT ('/users/update')
        - Delete user: DELETE ('/users/delete')


    - Clinics:
- Handlers: