var COLORS = [
  '#fa777e',//red
  '#94a6e3',//blue
  '#7cd680',//green
  '#88d8d2',//teal
  '#f1925b',//orange
  '#bb85e1',//purple
  '#ded237',//yellow
];

var current = 0;

module.exports = {
  get: function () {
    console.log(COLORS[current]);
    return COLORS[current++];
  }
}
