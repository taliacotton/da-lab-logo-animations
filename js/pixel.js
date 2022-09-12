// Draw the shape
function drawPixel(x, y, size){
    let dip = 0.34*size;
    let drop = 0.06*size;
    push();
      translate(x,y);
      beginShape();
        vertex(0, 0);
        bezierVertex(dip, drop, size-dip, drop, size, 0);
        bezierVertex(size-drop, dip, size-drop, size-dip, size, size);
        bezierVertex(size-dip, size-drop, dip, size-drop, 0, size);
        bezierVertex(drop, size-dip, drop, dip, 0, 0);
      endShape();
    pop();
  }
  