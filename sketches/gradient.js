let testImage, gradientImage;
let cw = 800;
let ch = 800;
let pixelSize = 47;

let moveX = 0.1;
let moveY = 0.2;
let movingUp = true;
let movingRight = true;

const bg = parent.document.getElementById("blackwhite").getAttribute("data-value");

let canvasSnapshot;

function preload() {
  if (bg == 'white'){
    testImage = loadImage("../img/henkaku-logo-straight.png");
  } else {
    testImage = loadImage("../img/henkaku-logo-straight-black.png");
  }
  gradientImage = loadImage("../img/gradient-full.png");
}

function setup() {
  createCanvas(cw, ch);
  testImage.loadPixels();
  gradientImage.loadPixels();
  frameRate(55);
  angleMode(DEGREES);
}

function draw() {
  background(bg);
  
  noStroke();
  fill(bg);

  gradientImage.loadPixels();

  // tile the gradient image (this is imperfect)
  image(gradientImage, moveX, moveY);
  image(gradientImage, moveX+800, moveY+800);
  image(gradientImage, moveX, moveY+800);
  image(gradientImage, moveX, moveY-800);
  image(gradientImage, moveX-800, moveY-800);
  image(gradientImage, moveX-800, moveY);
  image(gradientImage, moveX+800, moveY);

  canvasSnapshot = get();
  
  background(bg);

  canvasSnapshot.loadPixels();
  
  for (let x = 10; x < cw; x+=pixelSize) {
    for (let y = 5; y < ch; y+=pixelSize) {
      const col = getQuick(testImage, x, y);
      let pixelColor = getQuick(canvasSnapshot, x, y);
      const r = col[0];
      const g = col[1];
      
      // only draw it if a color exists there 
      if (bg == 'black') {
        if (r > 0 || g > 0) {
            fill(pixelColor);
            drawPixel(x, y, pixelSize);
          }
      } else {
        if (r < 255 || g < 255) {
            fill(pixelColor);
            drawPixel(x, y, pixelSize);
          }
      }
        
      // }
    }
  }
  

  if (frameCount % 400 == 0){
    movingUp = true;
  } else if (frameCount % 200 == 0){
    movingUp = false;
  } 

  if (frameCount % 600 == 0) {
    movingRight = false;
  } else if (frameCount % 300 == 0)  {
    movingRight = true;
  } 

  if (movingUp){moveY+=5}else{moveY-=5 }
  if (movingRight){moveX+=1}else{moveX-=1}

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

