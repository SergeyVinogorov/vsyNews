/*
* Primary file for api
*
 */

//Dependencies
var server = require('./lib/server')

//Declare the app
var app = {}

//Init function
app.init = function () {
    //Stert the server
    server.init()
}

//Execute
app.init()

//Export the app
module.exports = app