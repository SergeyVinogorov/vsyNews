/**
 *
 * Server related tasks
 */

// Dependencies
const http = require('http')
const https = require('https')

const url = require('url')
const { StringDecoder } = require('string_decoder')
const fs = require('fs')
const path = require('path')
const config = require('./config')
const _data = require('./data')
const handlers = require('./handlers')
const helpers = require('./helpers')

// Instantiate the server module object
const server = {}

// instantiate the http server
server.httpServer = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  server.unifiedServer(req, res)
})

// Instantiate the https server
server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
}
server.httpsServer = https.createServer(server.httpsServerOptions, (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  server.unifiedServer(req, res)
})

// All the server logic for both http and https server
server.unifiedServer = function (req, res) {
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true)
  // get the path
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  // get the query string as an object
  const queryStringObject = parsedUrl.query

  // get the hhtp method
  const method = req.method.toLowerCase()

  // get the headers as the object
  const { headers } = req

  // get the payload if any
  const decoder = new StringDecoder('utf-8')
  let buffer = ''

  req.on('data', (data) => {
    buffer += decoder.write(data)
  })
  req.on('end', () => {
    buffer += decoder.end()
    // choose the handler this request go to. if one is not found it is response 404
    const chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound

    // constract the data object to send to the handlers
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: helpers.parseJsonToObject(buffer)
    }
    // route the request to the handler specified in the route
    chosenHandler(data, (statusCode, payload) => {
      // use the status code call back by the handler or default to 200
      statusCode = typeof (statusCode) === 'number' ? statusCode : 200
      // use the payload for called back by the handler, or default to an empty object
      payload = typeof (payload) === 'object' ? payload : {}

      // convert payload to string
      const payloadString = JSON.stringify(payload)

      // return the responce
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)
      console.log('Returning this response: ', statusCode, payloadString)
    })
  })
}

// define a request router
server.router = {
  ping: handlers.ping,
  users: handlers.users,
  tokens: handlers.tokens,
  checks: handlers.checks
}

// Init script
server.init = function () {
  // Start the HTTP server
  server.httpServer.listen(config.httpPort, () => {
    console.log(`The server listening on port ${config.httpPort}`)
  })
  // Start the HTTPS server
  server.httpsServer.listen(config.httpsPort, () => {
    console.log(`The server listening on port ${config.httpsPort}`)
  })
}

// Export the  module
module.exports = server
