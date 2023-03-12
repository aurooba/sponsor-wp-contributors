"use strict";

exports.__esModule = true;
exports.headHandlerForBrowser = headHandlerForBrowser;
var _react = _interopRequireWildcard(require("react"));
var _gatsby = require("gatsby");
var _reachRouter = require("@gatsbyjs/reach-router");
var _reactDomUtils = require("../react-dom-utils");
var _fireCallbackInEffect = require("./components/fire-callback-in-effect");
var _utils = require("./utils");
var _apiRunnerBrowser = require("../api-runner-browser");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const hiddenRoot = document.createElement(`div`);
const keysOfHtmlAndBodyAttributes = {
  html: [],
  body: []
};
const onHeadRendered = () => {
  const {
    validHeadNodes,
    htmlAndBodyAttributes
  } = (0, _utils.getValidHeadNodesAndAttributes)(hiddenRoot);
  keysOfHtmlAndBodyAttributes.html = Object.keys(htmlAndBodyAttributes.html);
  keysOfHtmlAndBodyAttributes.body = Object.keys(htmlAndBodyAttributes.body);
  (0, _utils.applyHtmlAndBodyAttributes)(htmlAndBodyAttributes);

  /**
   * The rest of the code block below is a diffing mechanism to ensure that
   * the head elements aren't duplicted on every re-render.
   */
  const existingHeadElements = document.querySelectorAll(`[data-gatsby-head]`);
  if (existingHeadElements.length === 0) {
    document.head.append(...validHeadNodes);
    return;
  }
  const newHeadNodes = [];
  (0, _utils.diffNodes)({
    oldNodes: existingHeadElements,
    newNodes: validHeadNodes,
    onStale: node => node.parentNode.removeChild(node),
    onNew: node => newHeadNodes.push(node)
  });
  document.head.append(...newHeadNodes);
};
if (process.env.BUILD_STAGE === `develop`) {
  // sigh ... <html> and <body> elements are not valid descedents of <div> (our hidden element)
  // react-dom in dev mode will warn about this. There doesn't seem to be a way to render arbitrary
  // user Head without hitting this issue (our hidden element could be just "new Document()", but
  // this can only have 1 child, and we don't control what is being rendered so that's not an option)
  // instead we continue to render to <div>, and just silence warnings for <html> and <body> elements
  // https://github.com/facebook/react/blob/e2424f33b3ad727321fc12e75c5e94838e84c2b5/packages/react-dom-bindings/src/client/validateDOMNesting.js#L498-L520
  const originalConsoleError = console.error.bind(console);
  console.error = (...args) => {
    var _args$;
    if (Array.isArray(args) && args.length >= 2 && (_args$ = args[0]) !== null && _args$ !== void 0 && _args$.includes(`validateDOMNesting(...): %s cannot appear as`) && (args[1] === `<html>` || args[1] === `<body>`)) {
      return undefined;
    }
    return originalConsoleError(...args);
  };

  /* We set up observer to be able to regenerate <head> after react-refresh
     updates our hidden element.
  */
  const observer = new MutationObserver(onHeadRendered);
  observer.observe(hiddenRoot, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });
}
function headHandlerForBrowser({
  pageComponent,
  staticQueryResults,
  pageComponentProps
}) {
  (0, _react.useEffect)(() => {
    if (pageComponent !== null && pageComponent !== void 0 && pageComponent.Head) {
      (0, _utils.headExportValidator)(pageComponent.Head);
      const {
        render
      } = (0, _reactDomUtils.reactDOMUtils)();
      const HeadElement = /*#__PURE__*/_react.default.createElement(pageComponent.Head, (0, _utils.filterHeadProps)(pageComponentProps));
      const WrapHeadElement = (0, _apiRunnerBrowser.apiRunner)(`wrapRootElement`, {
        element: HeadElement
      }, HeadElement, ({
        result
      }) => {
        return {
          element: result
        };
      }).pop();
      render(
      /*#__PURE__*/
      // just a hack to call the callback after react has done first render
      // Note: In dev, we call onHeadRendered twice( in FireCallbackInEffect and after mutualution observer dectects initail render into hiddenRoot) this is for hot reloading
      // In Prod we only call onHeadRendered in FireCallbackInEffect to render to head
      _react.default.createElement(_fireCallbackInEffect.FireCallbackInEffect, {
        callback: onHeadRendered
      }, /*#__PURE__*/_react.default.createElement(_gatsby.StaticQueryContext.Provider, {
        value: staticQueryResults
      }, /*#__PURE__*/_react.default.createElement(_reachRouter.LocationProvider, null, WrapHeadElement))), hiddenRoot);
    }
    return () => {
      (0, _utils.removePrevHeadElements)();
      (0, _utils.removeHtmlAndBodyAttributes)(keysOfHtmlAndBodyAttributes);
    };
  });
}
//# sourceMappingURL=head-export-handler-for-browser.js.map