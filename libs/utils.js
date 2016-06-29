// a set of utility methods

var prompt = require('prompt'),
    fs = require('fs'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

module.exports = {

  getFilesizeInBytes: function (filename) {
     var stats = fs.statSync(filename)
     var fileSizeInBytes = stats["size"]
     return fileSizeInBytes;
  },

  getFilesizeInKilobytes: function (filename) {
     var stats = fs.statSync(filename)
     var fileSizeInBytes = stats["size"]
     return fileSizeInBytes / 1024;
  },

  getFilesizeInMegabytes: function (filename) {
     var stats = fs.statSync(filename)
     var fileSizeInBytes = stats["size"]
     return fileSizeInBytes / 1000000.0;
  },

  //checks is a path is a directory or not
  isDirectory: function (path)
  {
    if(fs.lstatSync(path).isDirectory() == true)
    {
      return true;
    }
    else {
      return false;
    }
  },

  //checks is a path is a file or not
  isFile: function (path)
  {
    if(fs.lstatSync(path).isFile() == true)
    {
      return true;
    }
    else {
      return false;
    }
  },

  //makes a directory from a given path
  makeDirectory: function (path)
  {
    try {
        fs.mkdirSync(path);
    } catch(e)
    {
      if ( e.code != 'EEXIST' )
      {
        throw e.red;
      }
    }
  },


  sayHelloInSpanish: function() {
    return "Hola";
  }

};
