var google = require('googleapis');
var googleAuth = require('google-auth-library');
var plus = google.plus('v1');

var express = require('express');
var app = express();

 app.use(express.static('static'));

var http = require('http');
var fs = require('fs');

const PORT=8080; 