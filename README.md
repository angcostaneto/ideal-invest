# Ideal Backend Desafio

## .env file

Is necessary to put informations into `.env` file, this file contains the information for configuration of project

## Postman collection folder

In this folder contains, all requests made for this project.

## How to run project in dev mod

1. Is necessary to have docker and docker-compose installed in your machine
2. Run on terminal `docker-compose up -d` to up containers
3. Run on terminal `npm install` to install project dependecies
4. Run on terminal `npm run dev` to run project in dev mode

## How to build project

1. Run on terminal `npm run build`, this command will create a folder called `dist`, in this folder has project compiled

## How project is structured

The project is structured in clean architecture, that is, each action in project is a use case and the controllers is only the entrypoint.

Each use case, has one dto for request and one for response.

## Routes

| Route                    | Method | Necessary Authenticate Token | Must be admin |
| ------------------------ | ------ | ---------------------------- | ------------- |
| api/cliente/create       | POST   | No                           | No            |
| api/cliente/admin/create | POST   | No                           | No            |
| api/ordem/create         | POST   | Yes                          | No            |
| api/produto/create       | POST   | Yes                          | Yes           |
| api/ordem/:idTransacao   | GET    | Yes                          | No            |
| api/login                | POST   | Yes                          | No            |
| api/logout               | POST   | Yes                          | No            |

## TODO

- [ ] Configure Swagger to autogenerate documents
- [ ] Do better error handler
- [ ] Make test for error cases
