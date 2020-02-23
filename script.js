var video;
var images = [];
var counter = 0;
var total = 40;
var slits = 15;
var twisty = true;

function setup() {
  createCanvas(displayWidth, displayHeight);
  pixelDensity(1);
  video = createCapture(VIDEO, ready);
  video.hide();
  button = createButton("Twisty");
  button.position(0, 0);
  button.mousePressed(toggle);
}

var isReady = false;

function toggle() {
  clear();
  twisty = !twisty;
}

function ready() {
  isReady = true;
}
var i = 0;
function draw() {
  video.loadPixels();
  if (isReady) {
    images[counter] = video.get();
    counter++;

    if (counter === total) {
      counter = 0;
    }
    var w = 100;
    var h = 80;
    var x = 0;
    var y = 0;
    for (var i = 0; i < images.length; i++) {
      var index = (i + frameCount) % images.length;
      if (twisty) {
        copy(images[index],
          0,i * slits,video.width,slits,
          0,i * slits,video.width,slits
        );
        
      } else {
        image(images[index], x, y, w, h);
        x = x + w;
        if (i!==0 && i % 8 === 0) {
          x = 0;
          y = y + h;
        }
      }
    }
  }
}
