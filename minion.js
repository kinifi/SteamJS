var prompt = require('prompt'),
    fs = require('fs'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

//get all the tools needed for steam
var image = require('./libs/image-manipulate'),
    tradingcards = require('./platforms/steam/tradingcards'),
    badges = require('./platforms/steam/badges'),
    emotions = require('./platforms/steam/emotions'),
    iosscreenshots = require('./platforms/ios/device-screenshots'),
    bar = require('./libs/progressbar');

//
// Start the prompt
//
prompt.start();

//display the selections here
console.log('Select One [Long Name] - [Short Name]: \n'.blue +
            'crop - c, \n'.blue +
            'resize - r \n'.blue +
            'steam-trading-card - stc \n'.blue +
            'steam-emotions - ste \n'.blue +
            'Steam-badges - stb \n'.blue +
            'ios-vertical - iosv \n'.blue +
            'ios-horizontal - iosh \n'.blue);

prompt.get(['Type'], function (err, result)
{

  if(result.Type == 'c' || result.Type == 'crop')
  {
    console.log('<- Crop Image ->'.blue);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    PromptCropImage();
  }
  else if(result.Type == 'r' || result.Type == 'resize')
  {
    console.log('<- Resize Image ->'.blue);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    PromptResizeImage();
  }
  else if(result.Type == 'ios-vertical' || result.Type == 'iosv')
  {
    console.log('<- iOS Vertical Resize Image ->'.blue);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    iosscreenshots.ResizeFullscreenPortrait();
  }
  else if(result.Type == 'ios-horizontal' || result.Type == 'iosh')
  {
    console.log('<- iOS Horizontal Resize Image ->'.blue);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    iosscreenshots.ResizeFullscreenLandscape();
  }
  else if(result.Type == 'steam-trading-card' || result.Type == 'stc')
  {
    console.log('<- Steam Trading Card Creation ->'.green);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    tradingcards.Create();
  }
  else if(result.Type == 'steam-badges' || result.Type == 'stb')
  {
    console.log('<- Steam Badges ->'.green);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    badges.Create();
  }
  else if(result.Type == 'steam-emotions' || result.Type == 'ste')
  {
    console.log('<- Steam Emotions ->'.green);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    emotions.Create();
  }
  else
  {
    console.log('Command Does Not Exist.');
    process.exit(0);
  }

});


function PromptResizeImage()
{
  var TypeSchema = {
      properties: {
        ImageName: {
          type: 'string',
          required: true
        },
        Width: {
          type: 'integer',
          required: true
        },
        Height: {
          type: 'integer',
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

      // create the ProgressBar
      bar.setup('Image Resize ', result.ImageSource.length);

      //iterate through the array of images and resize them all
      for (var i = 0; i < result.ImageSource.length; i++)
      {

        image.ResizeImage(result.ImageName.toString().replace(/ /g,'') + i,
                  result.Width.toString().replace(/ /g,''),
                  result.Height.toString().replace(/ /g,''),
                  result.Destination.toString().replace(/ /g,''),
                  result.ImageSource[i].toString().replace(/ /g,''));

      }

    });

}

function PromptCropImage()
{
  var TypeSchema = {
      properties: {
        ImageName: {
          type: 'string',
          required: true
        },
        Width: {
          type: 'integer',
          required: true
        },
        Height: {
          type: 'integer',
          required: true
        },
        CropXPosition: {
          type: 'integer',
          required: true
        },
        CropYPosition: {
          type: 'integer',
          required: true
        },
        Quality: {
          type: 'integer',
          required: true,
          quality: 100
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


  //
  // Get What Item The User Wants To Make
  //
  prompt.get(TypeSchema, function (err, result)
  {

    // create the ProgressBar
    bar.setup('Image Crop ', result.ImageSource.length);

    // iterate through the array of images and resize them all
    for (var i = 0; i < result.ImageSource.length; i++)
    {
      image.CropImage(result.ImageName.toString().replace(/ /g,'') + i,
                result.Width.toString().replace(/ /g,''),
                result.Height.toString().replace(/ /g,''),
                result.Destination.toString().replace(/ /g,''),
                result.ImageSource[i].toString().replace(/ /g,''),
                result.Quality,
                result.CropXPosition,
                result.CropYPosition);
    }
  });
}
