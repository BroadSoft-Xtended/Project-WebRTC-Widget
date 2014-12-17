path = require('path');

var module, moduleStart, testStart, testCases = [], current_test_assertions = [], report = [];
var grunt = require("grunt");

module.exports = {
	log: function(msg) {
		if(!module) {
			console.error("module is not defined");
			return;
		}
		var fileName = 'TEST-' + module + '.xml';
		var filePath = path.join('test/test-reports', fileName);
		grunt.file.write(filePath, msg);
	},
    start: function(pageUrl) {
	  testStart = new Date();
    },
    complete: function(state) {
    },
    moduleStart: function(name) {
	  moduleStart = new Date();
	  module = name;
	  testCases = [];
	  report = [];
	  report.push('<?xml version="1.0" encoding="UTF-8"?>');
	  report.push('<testsuites name="testsuites">');
	  grunt['verbose'].writeln('<?xml version="1.0" encoding="UTF-8"?>');
	  grunt['verbose'].writeln('<testsuites name="testsuites">');
    },
	moduleDone: function(name, failed, passed, total) {
	  context = { name: name, failed: failed, passed: passed, total: total }
	  var xml = '\t<testsuite name="' + context.name + '" errors="0" failures="' + context.failed + '" tests="' + context.total + '" time="' + (new Date() - moduleStart) / 1000 + '"';
	  if (testCases.length) {
	    xml += '>\n';
	    for (var i = 0, l = testCases.length; i < l; i++) {
	      xml += testCases[i];
	    }
	    xml += '\t</testsuite>';
	  } else {
	    xml += '/>\n';
	  }
  	  grunt['verbose'].writeln(xml);
	  report.push(xml);
      report.push('</testsuites>');
  	  grunt['verbose'].writeln('</testsuites>');
	  this.log(report.join('\n'));
	},
    testStart: function(name) {

    },
    testDone: function(name) {
	  result = { name: name}
	  var xml = '\t\t<testcase classname="' + module + '" name="' + result.name + '" time="' + (new Date() - testStart) / 1000 + '"';
	  if (current_test_assertions.length) {
	    xml += '>\n';
	    for (var i = 0; i < current_test_assertions.length; i++) {
	      xml += "\t\t\t" + current_test_assertions[i];
	    }
	    xml += '\t\t</testcase>\n';
	  } else {
	    xml += '/>\n';
	  }
	  current_test_assertions = [];
	  testCases.push(xml);

    },
    assertionPassed: function(message) {
    },
    assertionFailed: function(actual, expected, message, source) {
	  details = { message: message, expected: expected, actual: actual, source: source }
	  var message = details.message || "";
	  if (details.expected) {
	    if (message) {
	      message += ", ";
	    }
	    message = "expected: " + details.expected + ", but was: " + details.actual;
	  }
	  var xml = '<failure type="failed" message="' + message + '"/>\n'
	 
	  current_test_assertions.push(xml);
    }
}
