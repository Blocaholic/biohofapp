import * as Utils from '../Utils.mjs';

export function Bedblock({
  name,
  bedlength,
  bedwidth,
  farmid,
  gap,
  number,
  orientation,
  x,
  y,
  preview = false,
}) {
  if (name === undefined) throw new Error('Bedblocks must have a name');
  if (bedlength === undefined)
    throw new Error('Bedblocks must have a bedlength');
  if (bedwidth === undefined) throw new Error('Bedblocks must have a bedwith');
  if (farmid === undefined)
    throw new Error('Bedblocks must belong to a farmid');
  if (gap === undefined) throw new Error('Bedblocks must have a gap');
  if (number === undefined)
    throw new Error('Bedblocks must have a number (number of beds)');
  if (orientation === undefined)
    throw new Error('Bedblocks must have an orientation');
  if (x === undefined) throw new Error('Bedblocks must have an value of x');
  if (y === undefined) throw new Error('Bedblocks must have an value of y');
  this.name = String(name);
  this.bedlength = Number(bedlength);
  this.bedwidth = Number(bedwidth);
  this.farmid = Number(farmid);
  this.gap = Number(gap);
  this.number = Number(number);
  this.orientation = Number(orientation);
  this.x = Number(x);
  this.y = Number(y);
  this.preview = Boolean(preview);
  this.width = this.number * (this.bedwidth + this.gap) - this.gap;
  this.height = this.bedlength;
  this.padding = Math.min(this.height, this.width) / 20;
  Utils.deepFreeze(this);
}

Bedblock.prototype.toSvg = function ({yMax, yOffset = 0}) {
  const bedblock = toSvgCoordinates(this, yMax, yOffset);

  const bedblockWrapper = createBedblockWrapper(bedblock);
  const bedblockBackground = createBedblockBackground(bedblock);
  bedblockWrapper.append(bedblockBackground);
  const labelWrapper = createLabelWrapper(bedblock);
  const label = createLabel(bedblock);
  labelWrapper.append(label);
  const bedblockOrigin = createBedblockOrigin(bedblock);

  for (let i = 0; i < bedblock.number; i++) {
    const bed = createBed(bedblock, i);
    bedblockWrapper.append(bed);
  }

  bedblockWrapper.append(labelWrapper, bedblockOrigin);

  return bedblockWrapper;

  function toSvgCoordinates(bedblock, yMax, yOffset) {
    return new Bedblock({
      ...bedblock,
      y: yMax - (bedblock.y + bedblock.bedlength) + yOffset,
    });
  }

  function createBedblockWrapper(bedblock) {
    const {x, y, orientation, height, preview} = bedblock;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute(
      'transform',
      `translate(${x} ${y}) rotate(${orientation} 0 ${height})`
    );
    g.setAttribute('id', preview ? 'addBedblock__preview' : '');
    return g;
  }

  function createBedblockBackground(bedblock) {
    const {preview, padding, width, height} = bedblock;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttributeNS(null, 'paint-order', 'stroke fill');
    rect.setAttributeNS(null, 'fill', '#d0b8a9');
    rect.setAttributeNS(null, 'stroke-width', preview ? padding : '0');
    rect.setAttributeNS(null, 'stroke', preview ? 'red' : '');
    rect.setAttributeNS(null, 'width', width);
    rect.setAttributeNS(null, 'height', height);
    return rect;
  }

  function createLabelWrapper(bedblock) {
    const {width, height} = bedblock;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);
    return svg;
  }

  function createLabel(bedblock) {
    const {orientation, width, height, name} = bedblock;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttributeNS(null, 'x', '50%');
    text.setAttributeNS(null, 'y', '50%');
    text.setAttributeNS(null, 'class', 'svg__bedblockLabel');
    text.setAttributeNS(null, 'font-size', Math.min(height, width) / 2);
    text.setAttributeNS(
      null,
      'transform',
      `rotate(${-orientation} ${width / 2} ${height / 2})`
    );
    text.textContent = name;
    return text;
  }

  function createBedblockOrigin(bedblock) {
    const {padding, height} = bedblock;
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttributeNS(null, 'r', padding);
    circle.setAttributeNS(null, 'fill', 'red');
    circle.setAttributeNS(null, 'cy', height);
    circle.setAttributeNS(null, 'cx', '0');
    circle.setAttributeNS(null, 'class', 'svg_bedblockOrigin');
    return circle;
  }

  function createBed(bedblock, bedNumber) {
    const {bedwidth, height, gap} = bedblock;
    const bed = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bed.setAttributeNS(null, 'fill', '#aa8974');
    bed.setAttributeNS(null, 'stroke-width', '0');
    bed.setAttributeNS(null, 'width', bedwidth);
    bed.setAttributeNS(null, 'height', height);
    bed.setAttributeNS(null, 'x', bedNumber * (bedwidth + gap));
    return bed;
  }
};
