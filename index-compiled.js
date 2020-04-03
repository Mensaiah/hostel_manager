"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_express2.default.json({ extended: false }));

app.get("/", function (req, res) {
  res.send("App Working");
});
var PORT = process.env.PORT || 7000;

app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
