# Friends-backend

### Welcome onboard 👋
You will find here some information about the friends backend server, which provides APIs to the [front-end app](https://github.com/sbelalouibertot/friends-frontend). I encourage you to take a look at this repository first.


## The "friends" project (reminder)

The goal of this project is to share with you some of my code skills. As most of my professional works are confidential and sources can't be public, I decided to create a small side project called "Friends".

Friends is a web app, used to communicate with other (fake) people.
First step is to choose a user between 3 different profiles and log in. 
Then each user is able to select an activity (e.g going to the restaurant, watching a movie...) and publish it to the friends feed. 
Everyone will see the updates and will be able to to add a "like" reaction to posts of users. Then, a notification appears on the connection of the "liked" user. 


## Details

I choosed to use the express library to create easily APIs and expose it to a NodeJS server. 
All of them are documentated using the "express-jsdoc-swagger" library standart, which make them accessible from a swagger.
You can access it locally, after launching the server, at url http://localhost:3001/api-docs.

![Capture d’écran 2021-04-15 à 20 13 26](https://user-images.githubusercontent.com/79903008/114918161-0d5c5480-9e27-11eb-92c0-cae7533a08de.png)


I splited the APIs into 2 categories : 
- users, where you can load specific information of a profile
- feed, where you can interact with other people

Data is stored in local json files - I choosed not to use a database to make it easily launchable locally for external users, and get closer to a NoSQL behaviour. 

## Prerequisites
- NodeJS (v12+ should be fine)

## Let's get started 🚀
### `npm install`
### `node server.js`
