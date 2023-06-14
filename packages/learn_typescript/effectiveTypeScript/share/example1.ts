interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
// type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}




function calculateArea1(shape: Shape) {
  if ('height' in shape) {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;
  }
}





interface Square {
  kind: 'square';
  width: number;
}
interface Rectangle2 {
  kind: 'rectangle';
  height: number;
  width: number;
}
type Shape2 = Square | Rectangle;

function calculateArea2(shape: Shape) {
  if (shape.kind === 'rectangle') {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;
  }
}
