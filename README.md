# Simple-Web-App
Simple webb aplication, that allows users to register and then create, edit or delete their contacts. Application was developed using MEAN (mongo, express, angular, nodejs) stack in Visual Studio Code environment.

## Application installation
1. move to root folder of the cloned project
2. type next commands in terminal:
    ``` 
    docker-compose up --no-start
    docker start simple-web-mongodb
    npm install
    npm start

    # open another terminal window
    
    cd app_public
    npm install
    ng serve
    ```
3. open http://localhost:4200 in browser
4. use application as intended
