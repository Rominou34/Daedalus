# Daedalus

## About

Daedalus is a website / webapp parsing data about your last Dota 2 matches using the Steam API ( like Dotabuff or OpenDota, but worse ).

I started this as a side project in order to discover NodeJS development and the ~~fun~~ of developping a website relying on an API

The app works using NodeJS and two frameworks:
* Meteor as a back-end framework, running on the server
* React as a front-end server, in charge of displaying the UI through components

As the back-end framework is Meteor, the database is running on MongoDB, the only one compatible.

## Installation

If you want to run this code on your own server, there are some steps to do in order to have the project running fine.

### 1. Install Meteor

So, first of all install [Meteor](https://www.meteor.com/install), depending on your OS

### 2. Import the code

Next, import the code from GitHub. Usually, I just git clone in a directory with a random name and copy paste the content into the Meteor project folder
```
git clone https://github.com/Rominou34/Daedalus.git
```

### 3. Install all NPM dependencies

This project relies on some NPM dependencies in order to run ( not exactly my fault, more like React's one ), so go into the project's folder and install them:
```
cd Daedalus
meteor npm install
```

### 4. Install Meteor packages

On top of NPM dependencies, this project also relies on Meteor packages
```
meteor add http
meteor add react-meteor-data
```

### 5. Create `settings.json`

This is the most important step, this file is crucial for the project as it contains your Steam API key, allowing you to make requests to the Steam API.

No need to explain why you must create this file yourself, and why I haven't commited it.

The file must be created at the root of the project and have this structure:
```javascript
{
  "apiKey": "YOUR_API_KEY"
}
```

### 6. Don't forget to call the settings when running the project

When you run the project, don't forget to tell Meteor you want him to use the `settings.json` file.

So either do this:
```
meteor --settings settings.json
```

Or, as the command is already written in the file `package.json`, you can also do:
```
npm start
```
