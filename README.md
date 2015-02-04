# Ardusensor frontend

## Features
* JavaScript supports ES6 using 6to5
* Stylesheets use SCSS
* Template language is doT

## Installation
```sh
npm install
```
You might need to use `sudo npm install`.

## Usage
### Run the Grunt build script in watch mode
```sh
grunt watch
```
### Run the proxy server
```sh
npm start
```
Proxy serves static assets and routes requests to `/api` from localhost to production.
