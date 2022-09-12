let testImage, gradientImage;
let cw = 800;
let ch = 800;
let pixelSize = 47;

let moveX = 0.1;
let moveY = 0.2;
let movingUp = true;
let movingRight = true;

let noiseScale=0.02;

const bg = parent.document.getElementById("blackwhite").getAttribute("data-value");

let pixels = [];

let t = 0;

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

  for (let x = 10; x < cw; x+=pixelSize) {
    for (let y = 5; y < ch; y+=pixelSize) {
      let pixelColor = getQuick(testImage, x, y);
    //   console.log()
      const r = pixelColor[0];
      const g = pixelColor[1];
      const b = pixelColor[2];
      
      // only draw it if a color exists there (i hope to save time)
      // if (r < 255 || g < 255 || b < 255) {
        
      if (bg == 'black') {
        if (r > 0 || g > 0 || b > 0) {
          fill(pixelColor);
          pixels.push([x, y, pixelColor, random(-2,2)])
        }
      } else {
        if (r < 255 || g < 255 || b < 255) {
          fill(pixelColor);
          pixels.push([x, y, pixelColor, random(-2,2)])
        }
      }
      
      
    }
  }

}

function draw() {
  background(bg);
  
  noStroke();
  fill(bg);

  for (let i=0;i<pixels.length;i++){
    let pixel = pixels[i];
    let x = pixel[0];
    let y= pixel[1];
    fill(pixel[2])
    push();
    translate(x, y);

    if (pixel[3] > 0){
      translate(0, pixelSize);
    } 

    rotate(pixel[3]);

    let offsetY = map(x, 245, 527, 0, 8);
    offsetY *= pixel[3]/6;

    // blendMode(OVERLAY);
    if (pixel[3] > 0){
      drawPixel(0, -pixelSize + offsetY, pixelSize);
    } else {
      drawPixel(0, 0 + offsetY, pixelSize);
    }

    pop();
    pixel[3] = 180 * noise(0.001 * x + t, 0.001*y) - 90;
  }


t+=0.01;


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

