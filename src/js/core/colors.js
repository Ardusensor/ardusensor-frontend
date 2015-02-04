var COLORS = [
  '#94a6e3',//blue
  '#fa777e',//red
  '#7cd680',//green
  '#88d8d2',//teal
  '#f1925b',//orange
  '#bb85e1',//purple
  '#ded237',//yellow
];

var current = 0;

module.exports = {
  get: function () {
    return COLORS[current++ % COLORS.length];
  }
}
