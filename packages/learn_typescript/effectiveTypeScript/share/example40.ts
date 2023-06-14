interface FillLayout{}
interface LineLayout {}
interface PointLayout {}
interface FillPaint {}
interface LinePaint {}
interface PointPaint {}

interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}


interface FillLayer {
  type: 'fill',
  layout: FillLayout,
  paint: FillPaint
}

interface LineLayer {
  type: 'line',
  layout: LineLayout,
  paint: LinePaint
}

interface PointLayer {
  type: 'paint',
  layout: PointLayout,
  paint: PointPaint
}

type Layer2 = FillLayer | LineLayer | PointLayer;


function drawLayer(layer: Layer2) {
  if (layer.type === 'fill') {
    const {paint} = layer;  // Type is FillPaint
    const {layout} = layer; // Type is FillLayout
  } else if (layer.type === 'line') {
    const {paint} = layer;  // Type is LinePaint
    const {layout} = layer; // Type is LineLayout
  } else {
    const {paint} = layer;  // Type is PointPaint
    const {layout} = layer; // Type is PointLayout
  }
}




