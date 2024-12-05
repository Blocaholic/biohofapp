export function drawLine({color = 'black', width = '0.4%', x1, x2, y1, y2}) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  line.setAttributeNS(null, 'stroke', color);
  line.setAttributeNS(null, 'stroke-width', width);
  line.setAttributeNS(null, 'x1', x1);
  line.setAttributeNS(null, 'x2', x2);
  line.setAttributeNS(null, 'y1', y1);
  line.setAttributeNS(null, 'y2', y2);

  return line;
}

export function drawCross({color = 'black', x = 0, y = 0}) {
  const vertical = drawLine({
    color,
    x1: '-100%',
    x2: '100%',
    y1: y,
    y2: y,
  });

  const horizontal = drawLine({
    color,
    x1: x,
    x2: x,
    y1: '-100%',
    y2: '100%',
  });

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  g.append(vertical, horizontal);

  return g;
}
