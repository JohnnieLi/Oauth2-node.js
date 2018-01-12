
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var plus = google.plus('v1');

var express = require('express');
var app = express();

 app.use(express.static('static'));

var http = require('http');
var fs = require('fs');

const PORT=8080; 


var auth = new googleAuth();

var clientId = "414646750345-q77prfo2b7s87ki0di3i1jv5t3uh91ok.apps.googleusercontent.com";
var clientSecret = "ZMG7_0rLTXRhUlA_vKeN6p6e";
var redirectUrl = "http://localhost:8080/oauthcallback";
var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

var SCOPES = [
  'openid',
  'profile',
  'email'
]


 var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });


app.get('/url', (req, res) => res.send(authUrl))

app.get('/oauthcallback', (req, res) => {

var code = req.query.code;
console.log(code);
//res.send('Hello World!')
})

app.get('/tokens', (req, res) =>{
  var code = req.query.code;
 // console.log(req);
  //console.log(code);
oauth2Client.getToken(code, function(err, tokens){
   if(!err){
     console.log(tokens);
     oauth2Client.credentials = tokens;

     plus.people.get({
      userId: 'me',
      auth: oauth2Client
    }, function (err, response) {
      if(err){
        console.log(err);
        res.send(err);
        return;
      }
      console.log(response);
      res.send(response)
    });     
   }
})
})





app.listen(PORT, () => console.log('Example app listening on port 8080!'))





// // If modifying these scopes, delete your previously saved credentials
// // at ~/.credentials/gmail-nodejs-quickstart.json
// var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//     process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'client_id.json';

// // Load client secrets from a local file.
// fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Gmail API.
//   authorize(JSON.parse(content), listLabels);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  *
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   var clientSecret = credentials.web.client_secret;
//   var clientId = credentials.web.client_id;
//   var redirectUrl = "localhost:8888";
//   //var redirectUrl = credentials.web.redirect_uris[0];
//   var auth = new googleAuth();
//   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, function(err, token) {
//     if (err) {
//       getNewToken(oauth2Client, callback);
//     } else {
//       oauth2Client.credentials = JSON.parse(token);
//       callback(oauth2Client);
//     }
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  *
//  * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback to call with the authorized
//  *     client.
//  */
// function getNewToken(oauth2Client, callback) {
//   var authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES
//   });
//   console.log('Authorize this app by visiting this url: ', authUrl);
//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.question('Enter the code from that page here: ', function(code) {
//     rl.close();
//     oauth2Client.getToken(code, function(err, token) {
//       if (err) {
//         console.log('Error while trying to retrieve access token', err);
//         return;
//       }
//       oauth2Client.credentials = token;
//       storeToken(token);
//       callback(oauth2Client);
//     });
//   });
// }

// /**
//  * Store token to disk be used in later program executions.
//  *
//  * @param {Object} token The token to store to disk.
//  */
// function storeToken(token) {
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code != 'EEXIST') {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//   console.log('Token stored to ' + TOKEN_PATH);
// }

// /**
//  * Lists the labels in the user's account.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listLabels(auth) {
//   var gmail = google.gmail('v1');
//   gmail.users.labels.list({
//     auth: auth,
//     userId: 'me',
//   }, function(err, response) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     }
//     var labels = response.labels;
//     if (labels.length == 0) {
//       console.log('No labels found.');
//     } else {
//       console.log('Labels:');
//       for (var i = 0; i < labels.length; i++) {
//         var label = labels[i];
//         console.log('- %s', label.name);
//       }
//     }
//   });
//}