# covid web

## Goal

  - Program is website for easy communication between people in quarantine who need store products and people willing to help them.
  - showing the current status of covid cases in Poland 
 
- ![#1589F0](https://via.placeholder.com/15/1589F0/000000?text=+) `#1589F0`

## Content

1. [General Info](#info)
2. [Technologies](#Technologies)
3. [Setup](#Setup)
4. [Status](#Status)
5. [Current page layout](#layout)

## General info <a name="info"></a>

Main branch have development code (production in branch -> production), it will only run locally, with a clean database and without superuser. Main functionalities of website is the possibility to select a volunteer or needy, depending on the selected category, you have specific functions. Volunteer can create announcements and add products that he needs. Needy can assign to product which he want to buy for person in quarantine. Additionally website show total amount of confirmed cases of covid and deaths on chart. Data is downloaded and updated every day at midnight from the site https://github.com/CSSEGISandData/COVID-19.

## Technologies <a name="technologies"></a>

  - docker 20.10
  - docker-compose 1.27


   backend                            | frontend                        
------------------------------|-------------------------------------------                                                                     
  postgres                               | react                                 
  rabbitmq                               |    node 10                             
  celery 4.2                                 |       react-icons                       
  celery-beat                             |        axios                        
  Django 4.0                              |         react-chartjs-2                        
  python 3.8                     |          react-router-dom                                                                                     
  djangorestframework 3.12                                                   
      


      
 More info about used library in dockerfiles ([docker-compose](./docker-compose.yml), [frontend](./frontend/Dockerfile), [backend](./backend/Dockerfile)) and [requierements.txt](./backend/requirements.txt)
 
 react installation instruction is on this site https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
 

## Setup

To make site working install [docker-engine](https://docs.docker.com/engine/install/)  and docker-compose (dockerfiles in repo are for linux), next you have to create in /backend/base/ folder file with name .env where will be all private settigns. Example of file is shown below:

     SECRET_KEY= 'random string of characters',
     
     POSTGRES_HOST = 'name of database host',
     PORT = 'port of database',
     POSTGRES_DB = 'name of database',
     POSTGRES_USER = 'username',
     POSTGRES_PASSWORD = 'password',
     
     RABBITMQ_DEFAULT_USER = 'username of rabbitmq',
     RABBITMQ_DEFAULT_PASS = 'password',
     CELERY_BROKER_URL = 'pyamqp://[$RABBITMQ_DEFAULT_USER]:[$RABBITMQ_DEFAULT_PASS]@rabbitmq:5672//',
     CELERY_RESULT_BACKEND = 'django-db',
     
     EMAIL_HOST_USER = 'mail which will send account activation mail to user',
     EMAIL_HOST_PASSWORD = 'password to mail'
     
Next type in terminal this command to start site

     $ sudo docker-compose up --build
     
After few minutes site should work at address http://0.0.0.0:3000/ with backend at http://0.0.0.0:8000/


If something went wrong most likely there are conflicting files in the folder that need to be deleted, such as a .pid file/


  
                                


## Status <a name="Status"></a>

  - [x]  registration
  - [x]  login
  - [x]  token JWT management (sliding session technique)
  - [x]  downloading covid data form github each day
  - [x]  diplaying chart and data of covid in frontend
  - [x]  possibility to choose a volunteer and a sick person 
  - [x]  exceptions management
  - [x]  frontend (all)
  - [x]  backend (all)
  - [x]  production on the herok cloud
  - [x]  announcements management
  - [ ]  changing password/forget password
 
 ## Current page layout  <a name="layout"></a>
 ### home/
![alt text](../main/1.png?raw=true)
 ### shopping/
![alt text](../main/2.png?raw=true)
![alt text](../main/3.png?raw=true)
![alt text](../main/4.png?raw=true)
