# AizeJack - The Simple Backjack Game

## About AizeJack
This Project is Simple Blackjack Game, created with Reactjs 16 and Nextjs 9for front-end and express and NoSql database for restful-api and back-end.

## Game play and Rules
- There are only player as a participant and server as a dealer
- Score it isn’t going over 21
- Card ranking
 - J Q K as a 10
 - Ace (A) as a 1 or 11
   - Ex. [7,A] = 18
   - Ex. [K,A] = Blackjack
   - Ex. [6,4,A] = 21
- Every request need a user ID parameter to specify who is playing
- Start with user enter user's name
- Bets coins and then call cards from dealer
- hit more card or stand to end user's turn

## Structure
```
$ AizeJack - Nondejs V10.16.0
.
├── client
│   ├── components
│   ├── modules
│   ├── pages
│   ├── static
│   ├── utility
│   ├── .babelrc
│   ├── .env
│   ├── index.js
│   ├── routes.js
│   └── server.js
└── server
    └── src
        └── server
            ├── app
            │   └── dealer
            │       ├── controller.js
            │       ├── model.js
            │       └── routes.js
            ├── config
            ├── emun
            └── utility
```
## Front-end
- Reactjs for main core
- Nextjs for SEO and page management
- ReactHook to manage state
- Redux to store data from calling api and dispatch to component
- Decoration and Cosmetic with reactstrap and styled-component
- .env contain configuration constanst

## Back-end
- Express for server and Restful-Api
- Mongodb as NoSql database

## Getting Started

First, run the development server:

```bash
npm i
# or
yarn i

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Need
- Mongodb NoSql database server [can free try here](https://www.mongodb.com/try)
