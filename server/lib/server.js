/**
 *
 * Server related tasks
 */

//Dependencies
var http = require('http')
var https = require('https')

var url = require('url')
var config = require('./config')
var StringDecoder = require('string_decoder').StringDecoder
var fs = require('fs')
var _data = require('./data')
var handlers = require('./handlers')
var helpers = require('./helpers')
var path = require('path')


// Instantiate the server module object
var server = {}




//instantiate the http server
server.httpServer =http.createServer(function(req, res){
    server.unifiedServer(req,res)
})



// Instantiate the https server
server.httpsServerOptions = {
    'key': fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
}
server.httpsServer =https.createServer(server.httpsServerOptions,function(req, res){
    server.unifiedServer(req,res)
})



// All the server logic for both http and https server
server.unifiedServer = function (req,res) {
    //get the url and parse it
    var parsedUrl = url.parse(req.url, true)
    //get the path
    var path = parsedUrl.pathname
    var trimmedPath = path.replace(/^\/+|\/+$/g, '')

    //get the query string as an object
    var queryStringObject = parsedUrl.query

    //get the hhtp method
    var method = req.method.toLowerCase()

    //get the headers as the object
    var headers = req.headers

    //get the payload if any
    var decoder = new StringDecoder('utf-8')
    var buffer = ''

    req.on('data', function (data) {
        buffer += decoder.write(data)
    })
    req.on('end', function () {
        buffer += decoder.end()
        //choose the handler this request go to. if one is not found it is response 404
        var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound

        //constract the data object to send to the handlers
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        }
        //route the request to the handler specified in the route
        chosenHandler(data, function (statusCode, payload) {
            //use the status code call back by the handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200
            //use the payload for called back by the handler, or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {}

            //convert payload to string
            var payloadString = JSON.stringify(payload)

            //return the responce
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode)
            res.end(payloadString)
            console.log('Returning this response: ', statusCode, payloadString)
        })
    })
}


//define a request router
server.router = {
    "ping": handlers.ping,
    "users": handlers.users,
    "tokens": handlers.tokens,
    "checks": handlers.checks
}

// Init script
server.init = function(){
    // Start the HTTP server
    server.httpServer.listen(config.httpPort,function () {
        console.log('The server listening on port '+config.httpPort)
    })
    // Start the HTTPS server
    server.httpsServer.listen(config.httpsPort,function () {
        console.log('The server listening on port '+config.httpsPort)
    })
}

// Export the  module
module.exports = server