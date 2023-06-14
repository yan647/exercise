interface ScatterProps {
  xs: number[],
  ys: number[],
  xRange: [number, number],
  yRange: [number, number],
  color: string,
  onClick: (x: number, y: number, index: number) => void;
}

const REQUIRES_UPDATE:{[k in keyof ScatterProps]:boolean} = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
}

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k]) {
      return true;
    }
  }
  return false;
}
