import {$} from './$.mjs';
import {fetchJson} from './Utils.mjs';
import * as Error from './Error.mjs';

const add = async event => {
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

  location.reload();
};

const createBedblockSVG = bedblock => {
  const {x, y, bedlength, bedwidth, orientation, name, gap, number, preview} =
    bedblock;

  const width = bedwidth * number + gap * (number - 1);
  const height = bedlength * 100;
  const padding = Math.min(height, width) / 20;

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute(
    'transform',
    `translate(${x} ${y}) rotate(${orientation} 0 ${height})`
  );
  g.setAttribute('id', preview ? 'addBedblock__preview' : '');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
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

  g.appendChild(rect);
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
    g.appendChild(bedRect);
  }
  svg.appendChild(text);
  g.appendChild(svg);
  g.appendChild(circle);
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
    bedblock.height = bedblock.bedlength * 100;

    const bedblockXmax = getXmax(bedblock);
    const bedblockXmin = getXmin(bedblock);
    const bedblockYmax = getYmax(bedblock);
    const bedblockYmin = getYmin(bedblock);
    const bedblockPadding = Math.min(bedblock.height, bedblock.width) / 20;

    if (bedblockXmax > xMax) xMax = bedblockXmax;
    if (bedblockXmin < xMin) xMin = bedblockXmin;
    if (bedblockYmax > yMax) yMax = bedblockYmax;
    if (bedblockYmin < yMin) yMin = bedblockYmin;
    if (bedblockPadding > paddingMax) paddingMax = bedblockPadding;
  });
  return {xMax, xMin, yMax, yMin, paddingMax};
};

const drawPreview = async () => {
  $('addBedblock__preview')?.remove();

  const previewBedblock = {
    name: $('addBedblock__name').value,
    bedlength: Number($('addBedblock__bedlength').value),
    bedwidth: Number($('addBedblock__bedwidth').value),
    farmid: localStorage.selectedFarm,
    gap: Number($('addBedblock__gap').value),
    height: Number($('addBedblock__bedlength').value) * 100,
    number: Number($('addBedblock__number').value),
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

  const previousBoundaries = $('settings__bedblocksSVG').dataset;
  const previewBoundaries = getMaxCoordinates([previewBedblock]);

  const xMax = Math.max(previousBoundaries.xMax, previewBoundaries.xMax);
  const xMin = Math.min(previousBoundaries.xMin, previewBoundaries.xMin);
  const yMax = Math.max(previousBoundaries.yMax, previewBoundaries.yMax);
  const yMin = Math.min(previousBoundaries.yMin, previewBoundaries.yMin);
  const paddingMax = Math.max(
    previousBoundaries.paddingMax,
    previewBoundaries.paddingMax
  );

  $('settings__bedblocksSVG').setAttribute(
    'viewBox',
    `${-(paddingMax - xMin)} -${paddingMax} ${xMax - xMin + paddingMax * 2} ${
      yMax - yMin + paddingMax * 2
    }`
  );

  const previewSVG = createBedblockSVG({
    ...previewBedblock,
    y: yMax - (previewBedblock.y + previewBedblock.bedlength * 100),
  });
  $('settings__bedblocksSVG').appendChild(previewSVG);

  const previewLabel = [
    ...$('addBedblock__preview').getElementsByClassName('svg__bedblockLabel'),
  ][0];

  while (
    previewLabel.parentElement.parentElement.firstChild.getBoundingClientRect()
      .width < previewLabel.getBoundingClientRect().width
  ) {
    previewLabel.setAttribute(
      'font-size',
      Math.round(previewLabel.getAttribute('font-size') * 0.95)
    );
  }

  const labelResizeFactor =
    Math.abs(getBedblockLabelRotation(previewLabel)) > 0 ? 0.6 : 0.9;
  if (previewLabel) {
    previewLabel.setAttribute(
      'font-size',
      previewLabel.getAttribute('font-size') * labelResizeFactor
    );
  }

  const previewOrigin = [
    ...$('addBedblock__preview').getElementsByClassName('svg_bedblockOrigin'),
  ][0];

  previewOrigin.setAttributeNS(null, 'r', paddingMax);
};

const drawAll = async () => {
  const bedblocks = await fetchJson('./api/bedblock', 'GET').then(bedblocks =>
    bedblocks.flat()
  );

  const {xMax, xMin, yMax, yMin, paddingMax} = getMaxCoordinates(bedblocks);

  $('settings__bedblocksSVG').setAttribute(
    'viewBox',
    `${-(paddingMax - xMin)} -${paddingMax} ${xMax - xMin + paddingMax * 2} ${
      yMax - yMin + paddingMax * 2
    }`
  );

  $('settings__bedblocksSVG').dataset.xMax = xMax;
  $('settings__bedblocksSVG').dataset.xMin = xMin;
  $('settings__bedblocksSVG').dataset.yMax = yMax;
  $('settings__bedblocksSVG').dataset.yMin = yMin;
  $('settings__bedblocksSVG').dataset.paddingMax = paddingMax;

  bedblocks
    .filter(bedblock => +bedblock.farmid === +localStorage.selectedFarm)
    .map(bedblock => ({
      ...bedblock,
      y: yMax - (bedblock.y + bedblock.bedlength * 100),
    }))
    .map(createBedblockSVG)
    .forEach(svg => $('settings__bedblocksSVG').appendChild(svg));

  [...document.getElementsByClassName('svg__bedblockLabel')].forEach(label => {
    while (
      label.parentElement.parentElement.firstChild.getBoundingClientRect()
        .width < label.getBoundingClientRect().width
    ) {
      label.setAttribute(
        'font-size',
        Math.round(label.getAttribute('font-size') * 0.95)
      );
    }
    const labelResizeFactor =
      Math.abs(getBedblockLabelRotation(label)) > 0 ? 0.6 : 0.9;
    label.setAttribute(
      'font-size',
      label.getAttribute('font-size') * labelResizeFactor
    );
  });

  [...document.getElementsByClassName('svg_bedblockOrigin')].forEach(origin =>
    origin.setAttributeNS(null, 'r', paddingMax)
  );

  const originCrossVertical = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'line'
  );
  originCrossVertical.setAttributeNS(null, 'stroke', 'black');
  originCrossVertical.setAttributeNS(null, 'stroke-width', paddingMax / 3);
  originCrossVertical.setAttributeNS(null, 'x1', -999999999999);
  originCrossVertical.setAttributeNS(null, 'y1', yMax);
  originCrossVertical.setAttributeNS(null, 'x2', 999999999999);
  originCrossVertical.setAttributeNS(null, 'y2', yMax);

  const originCrossHorizontal = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'line'
  );
  originCrossHorizontal.setAttributeNS(null, 'stroke', 'black');
  originCrossHorizontal.setAttributeNS(null, 'stroke-width', paddingMax / 3);
  originCrossHorizontal.setAttributeNS(null, 'x1', 0);
  originCrossHorizontal.setAttributeNS(null, 'y1', -999999999999);
  originCrossHorizontal.setAttributeNS(null, 'x2', 0);
  originCrossHorizontal.setAttributeNS(null, 'y2', 999999999999);

  $('settings__bedblocksSVG').appendChild(originCrossHorizontal);
  $('settings__bedblocksSVG').appendChild(originCrossVertical);
};

const getBedblockLabelRotation = element => {
  if (!element) return 0;
  return Number(
    element.parentElement.parentElement
      .getAttribute('transform')
      .match(/rotate\((.+)\)/)[1]
      .split(' ')[0]
  );
};

const resetSVGviewBox = () => {
  const {xMax, xMin, yMax, yMin, paddingMax} = $(
    'settings__bedblocksSVG'
  ).dataset;

  $('settings__bedblocksSVG').setAttribute(
    'viewBox',
    `${-(paddingMax - xMin)} -${paddingMax} ${xMax - xMin + paddingMax * 2} ${
      yMax - yMin + paddingMax * 2
    }`
  );
};

export {add, drawAll, drawPreview, resetSVGviewBox};
