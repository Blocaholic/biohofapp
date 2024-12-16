import {$, $$} from './$.mjs';
import {fetchJson} from './Utils.mjs';
import * as Error from './Error.mjs';
import * as Sections from './Sections.mjs';
import * as Svg from './Svg.mjs';
import {Bedblock} from './Datatypes/Bedblock.mjs';

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

const getMaxCoordinates = bedblocks => {
  const max = {xMax: 0, xMin: 0, yMax: 0, yMin: 0, paddingMax: 0};

  bedblocks.forEach(bedblock => {
    max.xMax = Math.max(max.xMax, getXmax(bedblock));
    max.xMin = Math.min(max.xMin, getXmin(bedblock));
    max.yMax = Math.max(max.yMax, getYmax(bedblock));
    max.yMin = Math.min(max.yMin, getYmin(bedblock));
    max.paddingMax = Math.max(max.paddingMax, bedblock.padding);
  });

  return max;

  function getXmax(bedblock) {
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
  }

  function getYmax(bedblock) {
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
  }

  function getXmin(bedblock) {
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
  }

  function getYmin(bedblock) {
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
  }

  function rotateCoordinates(coords, degrees) {
    const {x, y} = coords;

    const sinDegrees = angleDegrees => Math.sin((angleDegrees * Math.PI) / 180);
    const cosDegrees = angleDegrees => Math.cos((angleDegrees * Math.PI) / 180);

    const newX = x * cosDegrees(-degrees) - y * sinDegrees(-degrees);
    const newY = x * sinDegrees(-degrees) + y * cosDegrees(-degrees);

    return {x: Math.round(newX), y: Math.round(newY)};
  }
};

export async function drawPreview() {
  $('addBedblock__preview')?.remove();

  const previewBedblock = new Bedblock({
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
  });

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

  const previewSVG = previewBedblock.toSvg({
    yMax: maxValues.yMax,
    yOffset: yMaxOffset,
  });

  svg.insertBefore(previewSVG, svg.lastElementChild);

  const previewLabel = [
    ...$('addBedblock__preview').getElementsByClassName('svg__bedblockLabel'),
  ][0];
  fitIntoBedblock(previewLabel);
}

export async function drawAll() {
  const bedblocks = await fetchJson('./api/bedblock', 'GET').then(bedblocks =>
    bedblocks
      .flat()
      .filter(bedblockBelongsToSelectedFarm)
      .map(bedblock => new Bedblock(bedblock))
  );

  const svg = $('settings__bedblocksSVG');
  const maxValues = getMaxCoordinates(bedblocks);

  setSVGdimensions({svg, maxValues});
  svg.addToDataset(maxValues);

  bedblocks
    .map(bedblock => bedblock.toSvg({yMax: maxValues.yMax}))
    .forEach(bedblockSvg => svg.append(bedblockSvg));

  $$('.svg__bedblockLabel').forEach(fitIntoBedblock);

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

function bedblockBelongsToSelectedFarm(bedblock) {
  return bedblock.farmid === Number(localStorage.selectedFarm);
}
