<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><%= title %></title>
  <link href="js/includes/custom.css" rel="stylesheet" />
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
  <div id="qunit-fixture">
    <!-- Templates -->
    <% _.each(script.templates, function(template) { %> <%= template.match(/.*<body[^>]*>((.|[\n\r])*)<\/body>.*/im)[1] %> <% }); %>
  </div>
</body>
</html>