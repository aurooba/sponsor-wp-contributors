"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.applyHtmlAndBodyAttributesSSR = applyHtmlAndBodyAttributesSSR;
exports.getValidHeadNodesAndAttributesSSR = getValidHeadNodesAndAttributesSSR;
exports.headHandlerForSSR = headHandlerForSSR;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _apiRunnerSsr = require("../api-runner-ssr");
const React = require(`react`);
const {
  grabMatchParams
} = require(`../find-path`);
const {
  StaticQueryContext
} = require(`gatsby`);
const {
  headExportValidator,
  filterHeadProps,
  isElementType,
  isValidNodeName,
  warnForInvalidTag
} = require(`./utils`);
const {
  ServerLocation,
  Router
} = require(`@gatsbyjs/reach-router`);
const {
  renderToString
} = require(`react-dom/server`);
const {
  parse
} = require(`node-html-parser`);
function applyHtmlAndBodyAttributesSSR(htmlAndBodyAttributes, {
  setHtmlAttributes,
  setBodyAttributes
}) {
  if (!htmlAndBodyAttributes) return;
  const {
    html,
    body
  } = htmlAndBodyAttributes;
  setHtmlAttributes(html);
  setBodyAttributes(body);
}
function getValidHeadNodesAndAttributesSSR(rootNode, htmlAndBodyAttributes = {
  html: {},
  body: {}
}) {
  const seenIds = new Map();
  const validHeadNodes = [];

  // Filter out non-element nodes before looping since we don't care about them
  for (const node of rootNode.childNodes) {
    var _node$attributes;
    const {
      rawTagName
    } = node;
    const id = (_node$attributes = node.attributes) === null || _node$attributes === void 0 ? void 0 : _node$attributes.id;
    if (!isElementType(node)) continue;
    if (isValidNodeName(rawTagName)) {
      if (rawTagName === `html` || rawTagName === `body`) {
        htmlAndBodyAttributes[rawTagName] = {
          ...htmlAndBodyAttributes[rawTagName],
          ...node.attributes
        };
      } else {
        let element;
        const attributes = {
          ...node.attributes,
          "data-gatsby-head": true
        };
        if (rawTagName === `script` || rawTagName === `style`) {
          element = /*#__PURE__*/React.createElement(node.rawTagName, (0, _extends2.default)({}, attributes, {
            dangerouslySetInnerHTML: {
              __html: node.text
            }
          }));
        } else {
          element = node.textContent.length > 0 ? /*#__PURE__*/React.createElement(node.rawTagName, attributes, node.textContent) : /*#__PURE__*/React.createElement(node.rawTagName, attributes);
        }
        if (id) {
          if (!seenIds.has(id)) {
            validHeadNodes.push(element);
            seenIds.set(id, validHeadNodes.length - 1);
          } else {
            const indexOfPreviouslyInsertedNode = seenIds.get(id);
            validHeadNodes[indexOfPreviouslyInsertedNode] = element;
          }
        } else {
          validHeadNodes.push(element);
        }
      }
    } else {
      warnForInvalidTag(rawTagName);
    }
    if (node.childNodes.length) {
      validHeadNodes.push(...getValidHeadNodesAndAttributesSSR(node, htmlAndBodyAttributes).validHeadNodes);
    }
  }
  return {
    validHeadNodes,
    htmlAndBodyAttributes
  };
}
function headHandlerForSSR({
  pageComponent,
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
  staticQueryContext,
  pageData,
  pagePath
}) {
  if (pageComponent !== null && pageComponent !== void 0 && pageComponent.Head) {
    headExportValidator(pageComponent.Head);
    function HeadRouteHandler(props) {
      var _pageData$result, _pageData$result$page;
      const _props = {
        ...props,
        ...pageData.result,
        params: {
          ...grabMatchParams(props.location.pathname),
          ...(((_pageData$result = pageData.result) === null || _pageData$result === void 0 ? void 0 : (_pageData$result$page = _pageData$result.pageContext) === null || _pageData$result$page === void 0 ? void 0 : _pageData$result$page.__params) || {})
        }
      };
      const HeadElement = /*#__PURE__*/React.createElement(pageComponent.Head, filterHeadProps(_props));
      const headWithWrapRootElement = (0, _apiRunnerSsr.apiRunner)(`wrapRootElement`, {
        element: HeadElement
      }, HeadElement, ({
        result
      }) => {
        return {
          element: result
        };
      }).pop();
      return headWithWrapRootElement;
    }
    const routerElement = /*#__PURE__*/React.createElement(StaticQueryContext.Provider, {
      value: staticQueryContext
    }, /*#__PURE__*/React.createElement(ServerLocation, {
      url: `${__BASE_PATH__}${pagePath}`
    }, /*#__PURE__*/React.createElement(Router, {
      baseuri: __BASE_PATH__,
      component: ({
        children
      }) => /*#__PURE__*/React.createElement(React.Fragment, null, children)
    }, /*#__PURE__*/React.createElement(HeadRouteHandler, {
      path: "/*"
    }))));
    const rawString = renderToString(routerElement);
    const rootNode = parse(rawString);
    const {
      validHeadNodes,
      htmlAndBodyAttributes
    } = getValidHeadNodesAndAttributesSSR(rootNode);
    applyHtmlAndBodyAttributesSSR(htmlAndBodyAttributes, {
      setHtmlAttributes,
      setBodyAttributes
    });
    setHeadComponents(validHeadNodes);
  }
}
//# sourceMappingURL=head-export-handler-for-ssr.js.map