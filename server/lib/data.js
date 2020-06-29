/*
* Storing data and editing data
*
 */

//dependencies
var fs = require('fs')
var path = require('path')
var helpers = require('./helpers')

//container for module
var lib = {}


//base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/')

//write data to a file
lib.create = function(dir,file,data,callback){
    //write data to file
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx', function(err, fileDescriptor){
        if(!err && fileDescriptor){
            //convert data to string
            var stringData = JSON.stringify(data)

            //write to file and close it
            fs.writeFile(fileDescriptor, stringData, function (err) {
                if(!err){
                    fs.close(fileDescriptor, function (err) {
                        if (!err){
                            callback(false)
                        }else{
                            callback('error closing new file')
                        }
                    })
                }else{
                    callback('error writung new file')
                }
            })
        }else {
            callback('Could not create new file it may already exist')
        }
    })
}

//Read data from a file
lib.read = function(dir,file, callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function (err, data) {
        if (!err && data){
            var parsedData = helpers.parseJsonToObject(data)
            callback(false, parsedData)
        }else{
            callback(err,data)
        }

    })
}
//Read data from a file
lib.update = function(dir,file, data, callback){
    //open the file for the writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+', function (err, fileDescriptor) {
        if (!err && fileDescriptor){
            //convert data to string
            var stringData = JSON.stringify(data)
            //truncate the file
            fs.ftruncate(fileDescriptor,function (err) {
                if (!err){
                    //write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err){
                            fs.close(fileDescriptor, function (err) {
                                if (!err){
                                    callback(false)
                                }else{
                                    callback('Error closing the file')
                                }
                            })
                        }else{
                            callback('Error writing to existing file')
                        }
                    })
                }else{
                    callback('Error truncating file')
                }
            })
        }else{
            callback('Could not open the file for update it may not exist yet')
        }
    })
}

//Delete file
lib.delete = function(dir, file, callback){
    //Unlink
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', function (err) {
        if (!err){
            callback(false)
        }else{
            callback('Error deleting file')
        }
    })
}

// List all the items in a directory
lib.list = function(dir, callback){
    fs.readdir(lib.baseDir+'dir'+'/', function (err, data) {
        if (!err && data && data.length > 0){
            var trimmedFileNames = [];
            data.forEach(function (fileName) {
                trimmedFileNames.push(fileName.replace('.json', ''))
            })
            callback(false, trimmedFileNames)
        }else{
            callback(err, data)
        }
    })
}

//export the module
module.exports = lib