// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const fs = require('fs');
const { join } = require('path');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('web-ext-artifacts'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



app.get('/extension', function(request, response) {
  let manifest = require('./extension/manifest.json');
  let version = manifest.version;
  let name = manifest.name.toLowerCase().replace(/[^0-9a-z_-]+/g, '_');
  let fileName = `${name}-${version}-an+fx.xpi`;
  response.redirect('/' + fileName);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
