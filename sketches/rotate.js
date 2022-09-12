let testImage;
let baseImage;
let cw = 800;
let ch = 800;
let pixelSize = 47;

let bg = parent.document.getElementById("blackwhite").getAttribute("data-value");

let rotatedImg;
let rotation = 0;

function preload() {
  if (bg == 'white'){
    testImage = loadImage("../img/henkaku-logo-straight.png");
  } else {
    testImage = loadImage("../img/henkaku-logo-straight-black.png");
  }
}


function setup() {
  createCanvas(cw, ch);
  testImage.loadPixels();
  frameRate(15);
  angleMode(DEGREES);
}

function draw() {
  background(bg);
  
  noStroke();
  fill(bg);
  
  
  testImage.loadPixels();
  baseImage = testImage;
  baseImage.loadPixels();
  
  push()
  translate(width / 2, height / 2);
  rotate(rotation);
  imageMode(CENTER);
  image(testImage, 0, 0);
  pop();
  
  rotatedImg = get();
  
  background(bg);
  
  for (let x = 10; x < cw; x+=pixelSize) {
    for (let y = 5; y < ch; y+=pixelSize) {
      const col = getQuick(testImage, x, y);
      let pixelColor = getQuick(baseImage, x, y);
      const r = col[0];
      
      // only draw it if a color exists there (i hope to save time)
      if (r > 0) {
        let fillColor = findClosestColor(pixelColor, palette);
        fill(fillColor);
        drawPixel(x, y, pixelSize);
      }
    }
  }
  
  rotation+=0.01;
  
  testImage = rotatedImg;

}

// find the RGBA values of the pixel at x, y in the img.pixels array
function getQuick(img, x, y) {
  const i = (y * img.width + x) * 4;
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3],
  ];
}
