const $ = id => document.getElementById(id);
const $$ = query => [...document.querySelectorAll(query)];

const $show = element =>
  typeof element === 'object'
    ? (element.style.display = '')
    : ($(element).style.display = '');

const $hide = element =>
  typeof element === 'object'
    ? (element.style.display = 'none')
    : ($(element).style.display = 'none');

export {$, $$, $show, $hide};

// add methods to prototype of Element

(() => {
  if ('addToDataset' in Element.prototype)
    return console.log('"Element.prototype.addToDataset" already exists');

  Element.prototype.addToDataset = function (dataObject) {
    for (const property in dataObject) {
      this.dataset[property] = dataObject[property];
    }
  };
})();

(() => {
  if ('setWidthAndHeightToZero' in Element.prototype)
    return console.log(
      '"Element.prototype.setWidthAndHeightToZero" already exists'
    );

  Element.prototype.setWidthAndHeightToZero = function () {
    this.setAttribute('width', 0);
    this.setAttribute('height', 0);
  };
})();

(() => {
  if ('removeWidthAndHeight' in Element.prototype)
    return console.log(
      '"Element.prototype.removeWidthAndHeight" already exists'
    );

  Element.prototype.removeWidthAndHeight = function () {
    this.removeAttribute('width');
    this.removeAttribute('height');
  };
})();

(() => {
  if ('setSvgCircleRadius' in Element.prototype)
    return console.log('"Element.prototype.setSvgCircleRadius" already exists');

  Element.prototype.setSvgCircleRadius = function (radius) {
    this.setAttributeNS(null, 'r', radius);
  };
})();
