"use strict";

exports.__esModule = true;
exports.reactDOMUtils = reactDOMUtils;
const map = new WeakMap();
function reactDOMUtils() {
  const reactDomClient = require(`react-dom/client`);
  const render = (Component, el) => {
    let root = map.get(el);
    if (!root) {
      map.set(el, root = reactDomClient.createRoot(el));
    }
    root.render(Component);
  };
  const hydrate = (Component, el) => reactDomClient.hydrateRoot(el, Component);
  return {
    render,
    hydrate
  };
}
//# sourceMappingURL=react-dom-utils.js.map