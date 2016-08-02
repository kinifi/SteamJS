# Minion
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

Making a game on Steam is hard. This tool helps you with some of the requirements needed for publishing your game on Steam.

#### Steam Game Creation Tools: 
- Steam Trading Cards
    - Large Images (Images displayed when a card is clicked)
    - Small Images (Images that display on the card)
- Steam Emotions
  - Large Images
  - Small Images
- Steam Badges
  - Resizes an image to the appropriate badge size
- Resize Images in Batches
- Crop Images in Batches

####Installation
1. Download the latest Node JS
2. Download SteamJS from Github or git clone https://github.com/kinifi/SteamJS.git
3. In the Cloned directory install the dependencies - npm install
3. From Command Prompt type: node minion.js
4. Minion will prompt you with options. Type in what you want and follow the instructions

####Important Note
This tool assumes the image you are giving it is the same aspect ratio as the image its outputting. Stretching of the image can occur if not done correctly.

####Known Bugs
- Spaces in ImageNames. Take them out for now
