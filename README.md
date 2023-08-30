# Tutorly

## What are we trying to do?
Tutorly is set for development because we, as students at EAFIT University, find it difficult to find and access class materials for some courses, especially the most difficult ones. Cases like students not knowing if the subject has a tutor, seeing none or inconsistent schedules for tutoring hours, searching, and not finding good exercises to practice before an exam are problems students fight each semester.

We, as a team, intend to develop an app that will help these fellow students in their university journey and give people in EAFIT a space where they can help themselves and others.

# How to run the project
## Clone the repository
Run the next command on your terminal in a directory of your choice.
```bash
$ git clone https://github.com/mvillegas6/IntegratedProyect1.git
```

## Install NodeJS and NPM
From the [Node](https://nodejs.org/en) official page, download NodeJS (LTS recommended), and then check if it was correctly installed by running the next command of your terminal:
```bash
$ node -v
$ npm -v
```
If the terminal returns a prompt like *v18.17.1* you're good to go.

## Docker and Mongo container
### Docker 
We use Docker as a way to manage the stored information and applications between different operational systems (Linux, Mac, and Windows). You can download the application by following the steps provided on the [official page](https://www.docker.com/).

### Mongo container
Mongo is our database of usage for this project. To build your own Mongo container, first make sure your Docker desktop application is running in the background by running the following command:
```bash
$ docker ps
> CONTAINER ID   IMAGE      COMMAND ...
```
If it looks something like that, then you can head to the project repository and run the *docker-compose up -d*
```bash
~/../IntegratedProyect1
$ docker-compose up-d
```
This command will create and start the Mongo container on your Docker application **(make sure port 27017 is available)**.

## Dependencies
On the project folder run the following command:
```bash
~/../IntegratedProyect1
$ npm i
```
and it will install the necessary dependencies for the project to work correctly. If you want to know which dependencies are  being used, head to the *package.json* file.

## Final Step
Run the command
```bash
npm run dev
```
and then head to the http://localhost:3000/. If you see the Tutorly name and web page, then congratulations! You are officially running the Tutorly web service.
