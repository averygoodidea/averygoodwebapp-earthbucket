"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gatsby = require("gatsby");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header(_ref) {
  var siteTitle = _ref.siteTitle;
  return /*#__PURE__*/_react["default"].createElement("header", {
    style: {
      background: "rebeccapurple",
      marginBottom: "1.45rem"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      margin: "0 auto",
      maxWidth: 960,
      padding: "1.45rem 1.0875rem"
    }
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/_react["default"].createElement(_gatsby.Link, {
    to: "/",
    style: {
      color: "white",
      textDecoration: "none"
    }
  }, siteTitle))));
};

Header.propTypes = {
  siteTitle: _propTypes["default"].string
};
Header.defaultProps = {
  siteTitle: ""
};
var _default = Header;
exports["default"] = _default;

//# sourceMappingURL=header.js.map