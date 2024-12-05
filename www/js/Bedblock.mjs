import {$, $$} from './$.mjs';
import {fetchJson} from './Utils.mjs';
import * as Error from './Error.mjs';
import * as Sections from './Sections.mjs';
import * as Svg from './Svg.mjs';

export async function add(event) {
  event.preventDefault();

  const bedblock = {
    name: $('addBedblock__name').value,
    farmid: localStorage.selectedFarm,
    bedwidth: $('addBedblock__bedwidth').value,
    bedlength: $('addBedblock__bedlength').value,
    number: $('addBedblock__number').value,
    gap: $('addBedblock__gap').value,
    y: $('addBedblock__y').value,
    x: $('addBedblock__x').value,
    orientation: $('addBedblock__orientation').value,
    start: $('addBedblock__start').value,
    end: $('addBedblock__end').value,
  };

  const result = await fetchJson('./api/bedblock', 'POST', bedblock);
  if (result.message) return Error.show(result.message);

  Sections.show('settings');
  location.reload();
}

const createBedblockSVG = bedblock => {
  const {
    x,
    y,
    bedlength,
    bedwidth,
    orientation,
    name,
    gap,
    number,
    preview,
    width = bedwidth * number + gap * (number - 1),
    height = bedlength,
    padding = Math.min(height, width) / 20,
  } = bedblock;

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute(
    'transform',
    `translate(${x} ${y}) rotate(${orientation} 0 ${height})`
  );
  g.setAttribute('id', preview ? 'addBedblock__preview' : '');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttributeNS(null, 'paint-order', 'stroke fill');
  rect.setAttributeNS(null, 'fill', '#d0b8a9');
  rect.setAttributeNS(null, 'stroke-width', preview ? padding : '0');
  rect.setAttributeNS(null, 'stroke', preview ? 'red' : '');
  rect.setAttributeNS(null, 'width', width);
  rect.setAttributeNS(null, 'height', height);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttributeNS(null, 'width', width);
  svg.setAttributeNS(null, 'height', height);

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

  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttributeNS(null, 'fill', 'red');
  circle.setAttributeNS(null, 'r', padding);
  circle.setAttributeNS(null, 'cy', height);
  circle.setAttributeNS(null, 'cx', '0');
  circle.setAttributeNS(null, 'class', 'svg_bedblockOrigin');

  g.append(rect);
  for (let i = 0; i < number; i++) {
    const bedRect = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    );
    bedRect.setAttributeNS(null, 'fill', '#aa8974');
    bedRect.setAttributeNS(null, 'stroke-width', '0');
    bedRect.setAttributeNS(null, 'width', bedwidth);
    bedRect.setAttributeNS(null, 'height', height);
    bedRect.setAttributeNS(null, 'x', i * (bedwidth + gap));
    g.append(bedRect);
  }
  svg.append(text);
  g.append(svg, circle);
  return g;
};

const getMaxCoordinates = bedblocks => {
  const rotateCoordinates = (coords, degrees) => {
    const {x, y} = coords;

    const sinDegrees = angleDegrees => Math.sin((angleDegrees * Math.PI) / 180);
    const cosDegrees = angleDegrees => Math.cos((angleDegrees * Math.PI) / 180);

    const newX = x * cosDegrees(-degrees) - y * sinDegrees(-degrees);
    const newY = x * sinDegrees(-degrees) + y * cosDegrees(-degrees);

    return {x: Math.round(newX), y: Math.round(newY)};
  };

  const getXmax = bedblock => {
    if (bedblock.orientation < 0)
      return (
        rotateCoordinates(
          {
            x: bedblock.width,
            y: 0,
          },
          bedblock.orientation
        ).x + bedblock.x
      );
    if (bedblock.orientation === 0) return bedblock.x + bedblock.width;
    if (bedblock.orientation > 0)
      return (
        rotateCoordinates(
          {
            x: bedblock.width,
            y: bedblock.height,
          },
          bedblock.orientation
        ).x + bedblock.x
      );
  };
  const getYmax = bedblock => {
    if (bedblock.orientation < 0)
      return (
        rotateCoordinates(
          {
            x: bedblock.width,
            y: bedblock.height,
          },
          bedblock.orientation
        ).y + bedblock.y
      );
    if (bedblock.orientation === 0) return bedblock.y + bedblock.height;
    if (bedblock.orientation > 0)
      return (
        rotateCoordinates(
          {
            x: 0,
            y: bedblock.height,
          },
          bedblock.orientation
        ).y + bedblock.y
      );
  };
  const getXmin = bedblock => {
    if (bedblock.orientation < 0)
      return (
        rotateCoordinates(
          {
            x: 0,
            y: bedblock.height,
          },
          bedblock.orientation
        ).x + bedblock.x
      );
    if (bedblock.orientation === 0) return bedblock.x;
    if (bedblock.orientation > 0) return bedblock.x;
  };
  const getYmin = bedblock => {
    if (bedblock.orientation < 0) return bedblock.y;
    if (bedblock.orientation === 0) return bedblock.y;
    if (bedblock.orientation > 0)
      return (
        rotateCoordinates(
          {
            x: bedblock.width,
            y: 0,
          },
          bedblock.orientation
        ).y + bedblock.y
      );
  };

  let xMax = 0;
  let xMin = 0;
  let yMax = 0;
  let yMin = 0;
  let paddingMax = 0;

  bedblocks.forEach(bedblock => {
    bedblock.width =
      bedblock.number * (bedblock.bedwidth + bedblock.gap) - bedblock.gap;
    bedblock.height = bedblock.bedlength;

    const bedblockXmax = getXmax(bedblock);
    const bedblockXmin = getXmin(bedblock);
    const bedblockYmax = getYmax(bedblock);
    const bedblockYmin = getYmin(bedblock);
    const bedblockPadding = Math.min(bedblock.height, bedblock.width) / 10;

    if (bedblockXmax > xMax) xMax = bedblockXmax;
    if (bedblockXmin < xMin) xMin = bedblockXmin;
    if (bedblockYmax > yMax) yMax = bedblockYmax;
    if (bedblockYmin < yMin) yMin = bedblockYmin;
    if (bedblockPadding > paddingMax) paddingMax = bedblockPadding;
  });
  return {xMax, xMin, yMax, yMin, paddingMax};
};

export async function drawPreview() {
  $('addBedblock__preview')?.remove();

  const previewBedblock = {
    name: $('addBedblock__name').value,
    bedlength: Number($('addBedblock__bedlength').value),
    bedwidth: Number($('addBedblock__bedwidth').value),
    farmid: localStorage.selectedFarm,
    gap: Number($('addBedblock__gap').value),
    height: Number($('addBedblock__bedlength').value),
    number: Math.max(Number($('addBedblock__number').value), 1),
    orientation: Number($('addBedblock__orientation').value),
    width:
      Number($('addBedblock__number').value) *
        (Number($('addBedblock__bedwidth').value) +
          Number($('addBedblock__gap').value)) -
      Number($('addBedblock__gap').value),
    x: Number($('addBedblock__x').value),
    y: Number($('addBedblock__y').value),
    preview: true,
  };

  const svg = $('settings__bedblocksSVG');

  const previousMaxValues = svg.dataset;
  const previewMaxValues = getMaxCoordinates([previewBedblock]);

  const yMaxOffset =
    previewMaxValues.yMax > previousMaxValues.yMax
      ? previousMaxValues.yMax - previewMaxValues.yMax
      : 0;

  const maxValues = {
    xMax: Math.max(previousMaxValues.xMax, previewMaxValues.xMax),
    xMin: Math.min(previousMaxValues.xMin, previewMaxValues.xMin),
    yMax: Math.max(previousMaxValues.yMax, previewMaxValues.yMax),
    yMin: Math.min(previousMaxValues.yMin, previewMaxValues.yMin),
    paddingMax: Math.max(
      previousMaxValues.paddingMax,
      previewMaxValues.paddingMax
    ),
  };

  setSVGdimensions({svg, maxValues, yMaxOffset});

  const previewSVG = createBedblockSVG(
    toSvgCoordinates(previewBedblock, maxValues.yMax, yMaxOffset)
  );

  svg.insertBefore(previewSVG, svg.lastElementChild);

  const previewLabel = [
    ...$('addBedblock__preview').getElementsByClassName('svg__bedblockLabel'),
  ][0];
  fitIntoBedblock(previewLabel);

  const previewOrigin = [
    ...$('addBedblock__preview').getElementsByClassName('svg_bedblockOrigin'),
  ][0];
  previewOrigin.setSvgCircleRadius(maxValues.paddingMax);
}

export async function drawAll() {
  const bedblocks = await fetchJson('./api/bedblock', 'GET').then(bedblocks =>
    bedblocks.flat().filter(bedblockBelongsToSelectedFarm)
  );

  const svg = $('settings__bedblocksSVG');
  const maxValues = getMaxCoordinates(bedblocks);

  setSVGdimensions({svg, maxValues});
  svg.addToDataset(maxValues);

  bedblocks
    .map(bedblock => toSvgCoordinates(bedblock, maxValues.yMax))
    .map(createBedblockSVG)
    .forEach(bedblockSvg => svg.append(bedblockSvg));

  $$('.svg__bedblockLabel').forEach(fitIntoBedblock);

  $$('.svg_bedblockOrigin').forEach(circle =>
    circle.setSvgCircleRadius(maxValues.paddingMax)
  );

  const originCross = Svg.drawCross({y: maxValues.yMax});
  svg.append(originCross);
}

const getBedblockRotation = label => {
  if (!label) return 0;
  return Number(
    label.parentElement.parentElement
      .getAttribute('transform')
      .match(/rotate\((.+)\)/)[1]
      .split(' ')[0]
  );
};

export function resetSVGviewBox() {
  const svg = $('settings__bedblocksSVG');
  const maxValues = svg.dataset;

  if (maxValues.paddingMax === undefined) return;

  setSVGdimensions({svg, maxValues});
}

function setSVGdimensions({svg, maxValues, yMaxOffset = 0}) {
  const {xMax, xMin, yMax, yMin, paddingMax} = maxValues;

  Number(paddingMax) === 0
    ? svg.setWidthAndHeightToZero()
    : svg.removeWidthAndHeight();

  svg.setAttribute(
    'viewBox',
    createViewBoxValue({xMax, xMin, yMax, yMin, padding: paddingMax})
      .split(' ')
      .map((element, index) => (index === 1 ? +element + yMaxOffset : element))
      .join(' ')
  );
}

function createViewBoxValue({xMax, xMin, yMax, yMin, padding}) {
  const viewBoxMinX = -(padding - xMin);
  const viewBoxMinY = -padding;
  const viewBoxWidth = xMax - xMin + padding * 2;
  const viewBoxHeight = yMax - yMin + padding * 2;
  return `${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}`;
}

function fitIntoBedblock(label) {
  while (isWiderThanBedblock(label)) {
    reduceFontSizeByFivePercent(label);
  }
  setPaddingAround(label);
  return;

  function isWiderThanBedblock(label) {
    const bedblockBackground = label.parentElement.parentElement.firstChild;
    const bedblockWidth = bedblockBackground.getBoundingClientRect().width;
    return bedblockWidth < label.getBoundingClientRect().width;
  }

  function reduceFontSizeByFivePercent(label) {
    const previousFontSize = label.getAttribute('font-size');
    const shrinkedFontSize = Math.round(previousFontSize * 0.95);
    label.setAttribute('font-size', shrinkedFontSize);
  }

  function setPaddingAround(label) {
    const resizeFactor = getBedblockRotation(label) === 0 ? 0.9 : 0.6;
    const fittedFontSize = label.getAttribute('font-size');
    label.setAttribute('font-size', fittedFontSize * resizeFactor);
  }
}

function toSvgCoordinates(bedblock, yMax, yOffset = 0) {
  return {...bedblock, y: yMax - (bedblock.y + bedblock.bedlength) + yOffset};
}

function bedblockBelongsToSelectedFarm(bedblock) {
  return bedblock.farmid === Number(localStorage.selectedFarm);
}
