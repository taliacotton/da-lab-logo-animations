let testImage;
let baseImage;
let cw = 800;
let ch = 800;
let pixelSize = 47;

const bg = parent.document.getElementById("blackwhite").getAttribute("data-value");

let rotatedImg;

let rotation = 0;
let expansion = 1;
let expansionCount = 0;
let expanding = true;

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
  frameRate(55);
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
  scale(expansion);
  imageMode(CENTER);
  image(testImage, 0, 0);
  pop();
  
  rotatedImg = get();
  
  background(bg);

  rotatedImg.loadPixels();
  // image(rotatedImg, 0, 0);
  
  for (let x = 10; x < cw; x+=pixelSize) {
    for (let y = 5; y < ch; y+=pixelSize) {
      const col = getQuick(testImage, x, y);
      let pixelColor = getQuick(rotatedImg, x, y);
      const r = col[0];
      const g = col[1];
      
      // only draw it if a color exists there (i hope to save time)
      // if (r <= 1 || r >= 253) {
      // if (r > 5 ) {
        let fillColor = findClosestColor(pixelColor, palette);
      if (fillColor[0] < 255 || fillColor[1] < 255 ) {
        
        // if (fillColor[0] <)
        fill(fillColor);
        drawPixel(x, y, pixelSize);
      } else {
        fill('black');
      }
    }
  }
  
  rotation = 0;
  
  if (frameCount%100 < 50){
    expansion = 1.01;
  } else {
    expansion = 0.99;
  }

  
  if (frameCount%100 == 0){
    rotation = random(-11,10);
  } else {
    rotation = 0;
  }
  
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
