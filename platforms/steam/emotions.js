//STRONG NOTE:
// JUST SCALING IMAGES ISN'T ENOUGH. THIS WILL SCALE THE IMAGE. YOU SHOULD GO INTO PHOTOSHOP AND TOUCH THEM UP
// See Valve docs on Emotions for details

var prompt = require('prompt'),
    fs = require('fs'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

var image = require('../../libs/image-manipulate'),
    bar = require('../../libs/progressbar'),
    utils = require('../../libs/utils');

module.exports = {

  //create emotions.
  Create: function()
  {
    //prompt user for the required items needed
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
            message: 'Control+C to stop adding pictures',
            type: 'array',
            required: true
          }
        }
      };

      prompt.get(TypeSchema, function (err, result)
      {

        // console.log(result.Destination + "/" + result.ImageName + "-smallBadge" + ".png");

        //setup the progress bar
        //Multipied by 2 for the cropping and resizing processes
        bar.setup('Steam Emotions ', result.ImageSource.length * 2);

        for (var i = 0; i < result.ImageSource.length; i++)
        {

          // ResizeImage (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, outputQuality, exportimagetype)
          image.ResizeImage("Large-Badge-"  + i,
                    54,
                    54,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''),
                    100,
                    'png'
                    );

          image.ResizeImage("Large-Card-Images-"  + i,
                    18,
                    18,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''),
                    100,
                    'png'
                    );

        }

        console.log('JUST SCALING IMAGES ISNT ENOUGH. THIS WILL SCALE THE IMAGE. YOU SHOULD GO INTO PHOTOSHOP AND TOUCH THEM UP'.red);
        console.log('See Valve Docs on Badges for more details'.red);
        console.log('Badge Creation Completed'.blue);

        bar.isComplete();

      });

  }

};
