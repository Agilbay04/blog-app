<h1 align="Center">Blog API</h1>

<p align="center">
  <a href="https://www.typescriptlang.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/768px-Typescript_logo_2020.svg.png" width="120" alt="TypeScript Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" width="120" alt="PostgreSQL Logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://prismalens.vercel.app/header/logo-white.svg" width="360" alt="Prisma Logo" /></a>
</p>

## Description

A simple application for post management, built using the TypeScript, Nest.js framework, PostgreSQL database, and Prisma ORM.


## Project setup

```bash
# clone project
$ git clone https://github.com/Agilbay04/blog-app.git

# install package
$ npm install
```


## Setup .env file

Prepare the .env file used to store the application environment.


## Database setup

In this project, the database uses a Docker container and the ORM uses Prisma.

```bash
# create container database
$ docker-compose up --build -d

# run prisma migration to apply the schema to the database
$ npx prisma migrate dev --name init

# generate prisma client
$ npx prisma generate
```


## Run the project

```bash
# development
$ npm run start

# app listen on
$ http://localhost:5000

# app swagger docs
$ http://localhost:5000/api-docs
```


## Swagger Api Docs

View of api documentation page using swagger. There are two collections named ```Users Collection``` & 
```Post Collection``` which have implemented all request methods (GET, POST, PUT, PATCH, DELETE)

<p align="center">
  <a href="" target="blank"><img src="/img/swagger-01.png" width="100%" alt="Swagger-01 Image" /></a>
</p>

### Contains of User Collection

<p align="center">
  <a href="" target="blank"><img src="/img/swagger-02.png" width="100%" alt="Swagger-02 Image" /></a>
</p>

### Contains of Post Collection

<p align="center">
  <a href="" target="blank"><img src="/img/swagger-03.png" width="100%" alt="Swagger-03 Image" /></a>
</p>




## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
