<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><%= title %></title>
  <%= style %>
  <script>
  <%= script.header %>
  </script>
  <!-- Libs -->
  <% _.each(script.includes, function(includeTag) { %> <%= includeTag %> <% }); %>
  <!-- QUnit -->
  <%= script.qunit %>
  <!-- QUnit Bridge -->
  <%= script.qunitBridge %>
  <!-- Tests -->
  <% _.each(script.tests, function(testTag) { %> <%= testTag %> <% }); %>
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <!-- Templates -->
  <% _.each(script.templates, function(template) { %> <%= template.replace(/.*<body[^>]*>((.|[\n\r])*)<\/body>.*/im, '$1') %> <% }); %>
</body>
</html>