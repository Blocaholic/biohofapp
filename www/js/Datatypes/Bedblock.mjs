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
