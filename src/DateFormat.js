module.exports = DateFormat;
var C = {
  dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  mthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};
C.zeroPad = function(number) {
  return ("0" + number).substr(-2, 2);
};
C.dateMarkers = {
  d: ['getDate', function(v) {
    return C.zeroPad(v);
  }],
  m: ['getMonth', function(v) {
    return C.zeroPad(v + 1);
  }],
  n: ['getMonth', function(v) {
    return C.mthNames[v];
  }],
  w: ['getDay', function(v) {
    return C.dayNames[v];
  }],
  y: ['getFullYear', function(v) {
    return v;
  }],
  H: ['getHours', function(v) {
    return C.zeroPad(v);
  }],
  M: ['getMinutes', function(v) {
    return C.zeroPad(v);
  }],
  S: ['getSeconds', function(v) {
    return C.zeroPad(v);
  }],
  i: ['toISOString']
};

DateFormat.C = C;

function DateFormat(fstr) {
  this.formatString = fstr;
}

DateFormat.prototype = {
  format: function(date) {
    var dateTxt = this.formatString.replace(/%(.)/g, function(m, p) {
      var dateMarker = C.dateMarkers[p];
      var method = dateMarker[0];
      var rv = date[method]();

      if (dateMarker[1] !== null) {
        rv = dateMarker[1](rv);
      }

      return rv;

    });

    return dateTxt;
  }
};