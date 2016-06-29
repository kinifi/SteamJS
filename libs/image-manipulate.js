var prompt = require('prompt'),
    fs = require('fs'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

var bar = require('./progressbar'),
    utils = require('./utils');

module.exports = {

  //resize the image
  ResizeImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, outputQuality, exportimagetype)
  {

    // open a file called "lenna.png"
    Jimp.read(srcPath).then(function (lenna) {
        lenna.resize(parseInt(newImgWidth), parseInt(newImgHeight))            // resize
             .quality(outputQuality)                 // set quality
             .write(dstPath + "/" + newImageName + "-resized" + "." + exportimagetype); // save
             bar.tick();
    }).catch(function (err) {
        console.error(err);
    });


  },


  //crop the image
  CropImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, imagequality, cropPosX, cropPosY, exportimagetype)
  {

    //check if quality was changed
    if(imagequality == null || imagequality == 'undefined' || imagequality == 0 || imagequality > 100)
    {
      //set the max output quality
      imagequality = 100;
    }

    //check if the user passed a supported image type to export to
    if(exportimagetype.toLowerCase() != 'jpg' || exportimagetype.toLowerCase() != 'png')
    {
      exportimagetype = 'jpg';
    }

    Jimp.read(srcPath).then(function (lenna) {
        lenna.crop(parseInt(cropPosX), parseInt(cropPosY), parseInt(newImgWidth), parseInt(newImgHeight))
          .quality(imagequality)
          .write(dstPath + "/" + newImageName + "-cropped" + "." + exportimagetype);
          bar.tick();
    }).catch(function (err) {
        console.error(err);
    });

  }

};
