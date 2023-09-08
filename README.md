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

## Dependencies
On the project folder run the following command:
```bash
~/../IntegratedProyect1
$ npm i
```
and it will install the necessary dependencies for the project to work correctly. If you want to know which dependencies are  being used, head to the *package.json* file.

If it is necessary run the command with the '*--force*' flag.

## File .env
You need to create a .env file on the main folder, you can use the next command:
```bash
$ touch .env
```
then inside place the next information:
```
DB_URL_ATLAS='mongodb+srv://firstUser:zXMsriX2nDN9YrxF@tutorly.dwwnc51.mongodb.net/?retryWrites=true&w=majority'
CLOUDINARY_CLOUD_NAME=dzemwu9yn
CLOUDINARY_KEY=787284336515933
CLOUDINARY_SECRET=aeuNq5czvelgMoGafaVPOPvb670
```
## Final Step
Run the command
```bash
npm run dev
```
and then head to the http://localhost:3000/. If you see the Tutorly name and web page, then congratulations! You are officially running the Tutorly web service.

### Contributors
The main constributors of this project are:  
- [Miguel Vasquez Bojanini](https://github.com/mvasquezb99) -> [mvasquezb@eafit.edu.co](mailto:mvasquezb@eafit.edu.co) 
- [Esteban Muriel Roldan](https://github.com/Estebanmr30) -> [emurielr@eafit.edu.co](mailto:emurielr@eafit.edu.co)  
- [Manuel Villegas Michel](https://github.com/mvillegas6) -> [mvillegas6@eafit.edu.co](mailto:mvillegas6@eafit.edu.co)  
