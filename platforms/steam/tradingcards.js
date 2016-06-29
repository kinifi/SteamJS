// Steam Trading Card Creator
// Documentation: https://partner.steamgames.com/documentation/tradingcards
// This will take a series of pictures and perform the following:
// 1. Resize to 1920x1080px
// 2. Duplicate Images from #1
// 3. Crop the Duplicated images from the center to 206x184px
// 4. Outputs them all to a folder for uploading to Steam backend

var prompt = require('prompt'),
    fs = require('fs'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

var image = require('../../libs/image-manipulate'),
    bar = require('../../libs/progressbar'),
    utils = require('../../libs/utils');


module.exports = {

  Create: function() {

    var TypeSchema = {
        properties: {
          ImageName: {
            type: 'string',
            required: true
          },
          CropXPosition: {
            message: 'The X position in the picture to start cropping from',
            type: 'integer',
            required: true
          },
          CropYPosition: {
            message: 'The Y position in the picture to start cropping from',
            type: 'integer',
            required: true
          },
          ExportType: {
            message: 'jpg or png. No DOT required',
            type: 'string',
            required: true
          },
          LargeImageQuality: {
            type: 'integer',
            required: true,
            quality: 100
          },
          SmallImageQuality: {
            type: 'integer',
            required: true,
            quality: 100
          },
          Destination: {
            type: 'string',
            required: true
          },
          ImageSource: {
            message: 'Control+C to stop adding pictures',
            type: 'array',
            required: true
          }
        }
      };

      prompt.get(TypeSchema, function (err, result)
      {
        //setup the progress bar
        //Multipied by 2 for the cropping and resizing processes
        bar.setup('Steam Trading Cards ', result.ImageSource.length * 2);

        // Make the Large Images for the trading cards when they are clicked
        //iterate through the array of images and resize them all
        for (var i = 0; i < result.ImageSource.length; i++)
        {

          // ResizeImage (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, outputQuality, exportimagetype)
          image.ResizeImage(result.ImageName + "-l-card-"  + i,
                    1920,
                    1080,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''),
                    result.LargeImageQuality,
                    result.ExportType
                    );
        }

        //Make the actual badge images
        // CropImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, imagequality, cropPosX, cropPosY)
        for (var i = 0; i < result.ImageSource.length; i++)
        {

          image.CropImage(result.ImageName + "-s-card-"  + i,
                          206,
                          184,
                          result.Destination.toString().replace(/ /g,''),
                          result.ImageSource[i].toString().replace(/ /g,''),
                          result.SmallImageQuality,
                          result.CropXPosition,
                          result.CropYPosition,
                          result.ExportType);
        }

        bar.isComplete();

      });

  }

};
