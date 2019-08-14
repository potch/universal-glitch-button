// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const fs = require('fs');
const { join } = require('path');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
const addonId = require('./extension/manifest.json').id;
const versions = require('./public/updates.json').addons[addonId].updates;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('web-ext-artifacts'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/extension', function(request, response) {
  let latest = versions.slice(-1)[0];
  console.log(latest);
  response.redirect(latest.update_link);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
