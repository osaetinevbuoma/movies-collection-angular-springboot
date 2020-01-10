# Movie Collection with Angular & Spring Boot

This mini project demonstrates using Angular 2+ with Spring Boot.

## Prerequisites

* Create an account with The Movie Database (TMDb). Click [here](http://www.themoviedb.org) to sign up for a free account. You will be provided with a unique API key. This key is required to download movie information from TMDb API.
* Install Node.js. To get Node.js, go to [nodejs.org](http://www.nodejs.org). Ensure the Node.js version is 10.9.0 or later.
* Install Angular CLI: `npm install -g @angular/cli`.

## Installation

* Clone the repository: `git clone https://github.com/osaetinevbuoma/movies-collection-angular-springboot.git`. Two folders will be downloaded in the project's root directory: `moviedb-app-client` and `moviedb_app_server`.
* Replace `YOUR_MOVIE_DB_API_KEY` in `moviedb-app-client/src/app/service/remote-movie/remote-movie.service.ts` with your TMDb API key.

## Start servers and view application

The `moviedb-app-client` and `moviedb_app_server` run on independent servers (Angular Live Development Server for the front-end and Tomcat for spring boot).

* In `moviedb_app_server`, `./gradlew bootRun` starts the Tomcat server.
* In `moviedb-app-client`, `ng serve` starts the Angular front-end. Visit `http://localhost:4200` in your browser to view the running application.
