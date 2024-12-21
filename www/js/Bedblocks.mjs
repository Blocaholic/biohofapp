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

  const yOffset =
    previewMaxValues.yMax > previousMaxValues.yMax
      ? previousMaxValues.yMax - previewMaxValues.yMax
      : 0;

  const maxValues = {
    xMax: Math.max(previousMaxValues.xMax, previewMaxValues.xMax),
    xMin: Math.min(previousMaxValues.xMin, previewMaxValues.xMin),
    yMax: Math.max(previousMaxValues.yMax, previewMaxValues.yMax),
    yMin: Math.min(previousMaxValues.yMin, previewMaxValues.yMin),
    padding: Math.max(previousMaxValues.padding, previewMaxValues.padding),
  };

  setSVGdimensions({svg, maxValues, yOffset});

  const previewSVG = previewBedblock.toSvg({
    yMax: maxValues.yMax,
    yOffset,
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
      .map(bedblock => new Bedblock(bedblock))
      .filter(bedblock => bedblock.belongsToSelectedFarm)
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

export function resetSVGviewBox() {
  const svg = $('settings__bedblocksSVG');
  const maxValues = svg.dataset;

  if (maxValues.padding === undefined) return;

  setSVGdimensions({svg, maxValues});
}

function setSVGdimensions({svg, maxValues, yOffset = 0}) {
  const {xMax, xMin, yMax, yMin, padding} = maxValues;

  Number(padding) === 0
    ? svg.setWidthAndHeightToZero()
    : svg.removeWidthAndHeight();

  svg.setAttribute(
    'viewBox',
    createViewBoxValue({xMax, xMin, yMax, yMin, padding, yOffset})
  );

  function createViewBoxValue({xMax, xMin, yMax, yMin, padding, yOffset}) {
    const viewBoxMinX = -(padding - xMin);
    const viewBoxMinY = -padding + yOffset;
    const viewBoxWidth = xMax - xMin + padding * 2;
    const viewBoxHeight = yMax - yMin + padding * 2;
    return `${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}`;
  }
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
    const fontSize = label.getAttribute('font-size');
    label.setAttribute('font-size', fontSize * resizeFactor);

    function getBedblockRotation(label) {
      if (!label) return 0;
      return Number(
        label.parentElement.parentElement
          .getAttribute('transform')
          .match(/rotate\((.+)\)/)[1]
          .split(' ')[0]
      );
    }
  }
}

function getMaxCoordinates(bedblocks) {
  const xMax = bedblocks.reduce((max, b) => Math.max(max, b.xMax), 0);
  const xMin = bedblocks.reduce((min, b) => Math.min(min, b.xMin), 0);
  const yMax = bedblocks.reduce((max, b) => Math.max(max, b.yMax), 0);
  const yMin = bedblocks.reduce((min, b) => Math.min(min, b.yMin), 0);
  const padding = bedblocks.reduce((max, b) => Math.max(max, b.padding), 0);

  return {xMax, xMin, yMax, yMin, padding};
}
