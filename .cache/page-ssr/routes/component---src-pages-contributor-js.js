"use strict";
exports.id = "component---src-pages-contributor-js";
exports.ids = ["component---src-pages-contributor-js"];
exports.modules = {

/***/ "./src/components/contributors.js":
/*!****************************************!*\
  !*** ./src/components/contributors.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Contributor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// function to capitalize first letter of a string, but if the string is wordpress then it should be WordPress
const capitalizeFirstLetter = string => {
  if (string === "wordpress") {
    return "WordPress";
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
function Contributor({
  contributor
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "contributor"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, contributor.url ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: contributor.url
  }, contributor.name) : contributor.name), console.log(contributor), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, contributor.links.map((data, index) => {
    console.log(data.item);
    const link = data.item[2].url;
    const handle = data.item[1].handle;
    const type = capitalizeFirstLetter(data.item[0].type);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: `content_item_${index}`
    }, type, ": ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      href: link
    }, "@", handle));
  })));
}

/***/ }),

/***/ "./src/pages/contributor.js?export=default":
/*!*************************************************!*\
  !*** ./src/pages/contributor.js?export=default ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_contributors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/contributors.js */ "./src/components/contributors.js");
/* harmony import */ var _contributors_allienimmons_yaml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contributors/allienimmons.yaml */ "./src/contributors/allienimmons.yaml");



console.log(_contributors_allienimmons_yaml__WEBPACK_IMPORTED_MODULE_2__);
// const YAMLbuildtime = () => {
// 	return <Contributor contributor={allie} />;
// };
// export default YAMLbuildtime;
const listContributor = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_contributors_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  contributor: _contributors_allienimmons_yaml__WEBPACK_IMPORTED_MODULE_2__
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (listContributor);

/***/ }),

/***/ "./src/contributors/allienimmons.yaml":
/*!********************************************!*\
  !*** ./src/contributors/allienimmons.yaml ***!
  \********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"Allie Nimmons","url":"https://allienimmons.com","links":[{"item":[{"type":"Twitter"},{"handle":"allie_nimmons"},{"url":"https://twitter.com/allie_nimmons"}]},{"item":[{"type":"wordpress"},{"handle":"allienimmons"},{"url":"https://profiles.wordpress.org/allienimmons"}]}],"sponsor":[{"type":"Buy Me a Coffee"},{"url":"https://www.buymeacoffee.com/rK7duH0"}]}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-contributor-js.js.map