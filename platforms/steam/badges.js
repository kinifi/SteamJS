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
          Destination: {
            type: 'string',
            required: true
          },
          ImageSource: {
            type: 'array',
            required: true
          }
        }
      };


      prompt.get(TypeSchema, function (err, result)
      {

        console.log(err)
        //setup the progress bar
        //Multipied by 2 for the cropping and resizing processes
        bar.setup('Steam Badges', result.ImageSource.length);

        // // ResizeImage (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, outputQuality, exportimagetype)
        //Make the actual badge images
        // 80x80px PNGs with a transparent background.
        for (var i = 0; i < result.ImageSource.length; i++)
        {

          image.ResizeImage(result.ImageName + "-s-"  + i,
                            80,
                            80,
                            result.Destination.toString(),
                            result.ImageSource[i].toString(),
                            100,
                            "png"
                            );
        }

        bar.isComplete();

      });

  }

};
