var prompt = require('prompt'),
    fs = require('fs'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

var bar;

module.exports = {

  setup: function (name, length)
  {
    //set the bar length
    bar = new ProgressBar(name + ' [:bar]'.blue, { total: length, width: 50});
  },

  tick: function ()
  {
    //tick the progress bar
    bar.tick();
  },

  isComplete: function ()
  {
    if (bar.complete)
    {
      console.log('\ncompleted Resizing'.green);
    }
  }

};
