import { a as reactExports, b as React, r as reactDomExports, c as getAugmentedNamespace, R as React$1 } from "./react-620c45c2.js";
import { u as useProgress, H as Html, C as Canvas, O as OrbitControls, P as Preload, a as useGLTF, b as useTexture, F as Float, D as Decal, V as Vector2, c as useFrame, d as Points, e as PointMaterial, m as motion, p as propTypesExports, f as client } from "./vendor-5bb0299e.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
const Fragment = jsxRuntimeExports.Fragment;
const jsx = jsxRuntimeExports.jsx;
const jsxs = jsxRuntimeExports.jsxs;
/**
 * @remix-run/router v1.7.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$4() {
  _extends$4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$4.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index2) {
  return {
    usr: location.state,
    key: location.key,
    idx: index2
  };
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$4({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index2 = getIndex();
  if (index2 == null) {
    index2 = 0;
    globalHistory.replaceState(_extends$4({}, globalHistory.state, {
      idx: index2
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index2;
    index2 = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex() + 1;
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex();
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$4({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? invariant(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  return reactExports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
var DataRouterHook$1;
(function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
})(DataRouterHook$1 || (DataRouterHook$1 = {}));
var DataRouterStateHook$1;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
})(DataRouterStateHook$1 || (DataRouterStateHook$1 = {}));
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant(false) : void 0;
  return ctx;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends$3({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = false
  } = _ref5;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
var AwaitRenderStatus;
(function(AwaitRenderStatus2) {
  AwaitRenderStatus2[AwaitRenderStatus2["pending"] = 0] = "pending";
  AwaitRenderStatus2[AwaitRenderStatus2["success"] = 1] = "success";
  AwaitRenderStatus2[AwaitRenderStatus2["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));
new Promise(() => {
});
/**
 * React Router DOM v6.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
const _excluded$1 = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"];
const START_TRANSITION = "startTransition";
const startTransitionImpl = React[START_TRANSITION];
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref;
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = reactExports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link = /* @__PURE__ */ reactExports.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset
  } = _ref4, rest = _objectWithoutPropertiesLoose$1(_ref4, _excluded$1);
  let {
    basename
  } = reactExports.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ reactExports.createElement("a", _extends$2({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return reactExports.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
const CanvasLoader = () => {
  const { progress } = useProgress();
  return /* @__PURE__ */ jsxs(
    Html,
    {
      as: "div",
      center: true,
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      },
      children: [
        /* @__PURE__ */ jsx("span", { className: "canvas-loader" }),
        /* @__PURE__ */ jsxs(
          "p",
          {
            style: {
              fontSize: 14,
              color: "#F1F1F1",
              fontWeight: 800,
              marginTop: 40
            },
            children: [
              progress.toFixed(2),
              "%"
            ]
          }
        )
      ]
    }
  );
};
const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  return /* @__PURE__ */ jsx("primitive", { object: earth.scene, scale: 2.5, "position-y": 0, "rotation-y": 0 });
};
const EarthCanvas = () => {
  return /* @__PURE__ */ jsx(
    Canvas,
    {
      shadows: true,
      frameloop: "demand",
      dpr: [1, 2],
      gl: { preserveDrawingBuffer: true },
      camera: {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6]
      },
      children: /* @__PURE__ */ jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsx(CanvasLoader, {}), children: [
        /* @__PURE__ */ jsx(
          OrbitControls,
          {
            autoRotate: true,
            enableZoom: false,
            maxPolarAngle: Math.PI / 2,
            minPolarAngle: Math.PI / 2
          }
        ),
        /* @__PURE__ */ jsx(Earth, {}),
        /* @__PURE__ */ jsx(Preload, { all: true })
      ] })
    }
  );
};
const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  return /* @__PURE__ */ jsxs(Float, { speed: 1.75, rotationIntensity: 1, floatIntensity: 2, children: [
    /* @__PURE__ */ jsx("ambientLight", { intensity: 0.25 }),
    /* @__PURE__ */ jsx("directionalLight", { position: [0, 0, 0.05] }),
    /* @__PURE__ */ jsxs("mesh", { castShadow: true, receiveShadow: true, scale: 2.75, children: [
      /* @__PURE__ */ jsx("icosahedronGeometry", { args: [1, 1] }),
      /* @__PURE__ */ jsx(
        "meshStandardMaterial",
        {
          color: "#fff8eb",
          polygonOffset: true,
          polygonOffsetFactor: -5,
          flatShading: true
        }
      ),
      /* @__PURE__ */ jsx(
        Decal,
        {
          position: [0, 0, 1],
          rotation: [2 * Math.PI, 0, 6.25],
          scale: 1,
          map: decal,
          flatShading: true
        }
      )
    ] })
  ] });
};
const BallCanvas = ({ icon }) => {
  return /* @__PURE__ */ jsxs(
    Canvas,
    {
      frameloop: "demand",
      dpr: [1, 2],
      gl: { preserveDrawingBuffer: true },
      children: [
        /* @__PURE__ */ jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsx(CanvasLoader, {}), children: [
          /* @__PURE__ */ jsx(OrbitControls, { enableZoom: false }),
          /* @__PURE__ */ jsx(Ball, { imgUrl: icon })
        ] }),
        /* @__PURE__ */ jsx(Preload, { all: true })
      ]
    }
  );
};
const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return /* @__PURE__ */ jsxs("mesh", { children: [
    /* @__PURE__ */ jsx("hemisphereLight", { intensity: 0.15, groundColor: "black" }),
    /* @__PURE__ */ jsx(
      "spotLight",
      {
        position: [-20, 50, 10],
        angle: 0.12,
        penumbra: 1,
        intensity: 1,
        castShadow: true,
        "shadow-mapSize": 1024
      }
    ),
    /* @__PURE__ */ jsx("pointLight", { intensity: 1 }),
    /* @__PURE__ */ jsx(
      "primitive",
      {
        object: computer.scene,
        scale: isMobile ? 0.7 : 0.75,
        position: isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5],
        rotation: [-0.01, -0.2, -0.1]
      }
    )
  ] });
};
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    Canvas,
    {
      frameloop: "demand",
      shadows: true,
      dpr: [1, 2],
      camera: { position: [20, 3, 5], fov: 25 },
      gl: { preserveDrawingBuffer: true },
      children: [
        /* @__PURE__ */ jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsx(CanvasLoader, {}), children: [
          /* @__PURE__ */ jsx(
            OrbitControls,
            {
              enableZoom: false,
              maxPolarAngle: Math.PI / 2,
              minPolarAngle: Math.PI / 2
            }
          ),
          /* @__PURE__ */ jsx(Computers, { isMobile })
        ] }),
        /* @__PURE__ */ jsx(Preload, { all: true })
      ]
    }
  );
};
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
new Vector2();
new Vector2();
var Grad = function Grad2(x, y, z) {
  var _this = this;
  _classCallCheck$1(this, Grad2);
  _defineProperty(this, "dot2", function(x2, y2) {
    return _this.x * x2 + _this.y * y2;
  });
  _defineProperty(this, "dot3", function(x2, y2, z2) {
    return _this.x * x2 + _this.y * y2 + _this.z * z2;
  });
  this.x = x;
  this.y = y;
  this.z = z;
};
var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
var perm = new Array(512);
var gradP = new Array(512);
var seed = function seed2(_seed) {
  if (_seed > 0 && _seed < 1) {
    _seed *= 65536;
  }
  _seed = Math.floor(_seed);
  if (_seed < 256) {
    _seed |= _seed << 8;
  }
  for (var i = 0; i < 256; i++) {
    var v;
    if (i & 1) {
      v = p[i] ^ _seed & 255;
    } else {
      v = p[i] ^ _seed >> 8 & 255;
    }
    perm[i] = perm[i + 256] = v;
    gradP[i] = gradP[i + 256] = grad3[v % 12];
  }
};
seed(0);
function normalizeSeed(seed3) {
  if (typeof seed3 === "number") {
    seed3 = Math.abs(seed3);
  } else if (typeof seed3 === "string") {
    var string = seed3;
    seed3 = 0;
    for (var i = 0; i < string.length; i++) {
      seed3 = (seed3 + (i + 1) * (string.charCodeAt(i) % 96)) % 2147483647;
    }
  }
  if (seed3 === 0) {
    seed3 = 311;
  }
  return seed3;
}
function lcgRandom(seed3) {
  var state = normalizeSeed(seed3);
  return function() {
    var result = state * 48271 % 2147483647;
    state = result;
    return result / 2147483647;
  };
}
var Generator = function Generator2(_seed) {
  var _this = this;
  _classCallCheck$1(this, Generator2);
  _defineProperty(this, "seed", 0);
  _defineProperty(this, "init", function(seed3) {
    _this.seed = seed3;
    _this.value = lcgRandom(seed3);
  });
  _defineProperty(this, "value", lcgRandom(this.seed));
  this.init(_seed);
};
var defaultGen = new Generator(Math.random());
var defaultSphere = {
  radius: 1,
  center: [0, 0, 0]
};
function inSphere(buffer, sphere) {
  var rng = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultGen;
  var _defaultSphere$sphere2 = _objectSpread2(_objectSpread2({}, defaultSphere), sphere), radius = _defaultSphere$sphere2.radius, center = _defaultSphere$sphere2.center;
  for (var i = 0; i < buffer.length; i += 3) {
    var u = Math.pow(rng.value(), 1 / 3);
    var x = rng.value() * 2 - 1;
    var y = rng.value() * 2 - 1;
    var z = rng.value() * 2 - 1;
    var mag = Math.sqrt(x * x + y * y + z * z);
    x = u * x / mag;
    y = u * y / mag;
    z = u * z / mag;
    buffer[i] = x * radius + center[0];
    buffer[i + 1] = y * radius + center[1];
    buffer[i + 2] = z * radius + center[2];
  }
  return buffer;
}
const Stars = (props) => {
  const ref = reactExports.useRef();
  const [sphere] = reactExports.useState(() => inSphere(new Float32Array(5e3), { radius: 1.2 }));
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return /* @__PURE__ */ jsx("group", { rotation: [0, 0, Math.PI / 4], children: /* @__PURE__ */ jsx(Points, { ref, positions: sphere, stride: 3, frustumCulled: true, ...props, children: /* @__PURE__ */ jsx(
    PointMaterial,
    {
      transparent: true,
      color: "#f272c8",
      size: 2e-3,
      sizeAttenuation: true,
      depthWrite: false
    }
  ) }) });
};
const StarsCanvas = () => {
  return /* @__PURE__ */ jsx("div", { className: "w-full h-auto absolute inset-0 z-[-1]", children: /* @__PURE__ */ jsxs(Canvas, { camera: { position: [0, 0, 1] }, children: [
    /* @__PURE__ */ jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsx(Stars, {}) }),
    /* @__PURE__ */ jsx(Preload, { all: true })
  ] }) });
};
const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",
  heroHeadText: "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
  heroSubText: "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
  sectionHeadText: "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText: "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider"
};
const Hero = () => {
  return /* @__PURE__ */ jsxs("section", { className: `relative w-full h-screen mx-auto`, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center mt-5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-[#915EFF]" }),
            /* @__PURE__ */ jsx("div", { className: "w-1 sm:h-80 h-40 violet-gradient" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h1", { className: `${styles.heroHeadText} text-white`, children: [
              "Hi, I'm ",
              /* @__PURE__ */ jsx("span", { className: "text-[#915EFF]", children: "Sooraj" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: `${styles.heroSubText} mt-2 text-white-100`, children: [
              "I design websites, user ",
              /* @__PURE__ */ jsx("br", { className: "sm:block hidden" }),
              "interfaces and web applications using MERN/MEAN"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(ComputersCanvas, {}),
    /* @__PURE__ */ jsx("div", { className: "absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center", children: /* @__PURE__ */ jsx("a", { href: "#about", children: /* @__PURE__ */ jsx("div", { className: "w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: {
          y: [0, 24, 0]
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        },
        className: "w-3 h-3 rounded-full bg-secondary mb-1"
      }
    ) }) }) })
  ] });
};
const logo = "/Personal-Portfolio/assets/logo-b7f35bcb.svg";
const backend = "/Personal-Portfolio/assets/backend-565fc01f.png";
const creator = "/Personal-Portfolio/assets/creator-dbbffaec.png";
const web = "/Personal-Portfolio/assets/web-0d05165f.png";
const github = "/Personal-Portfolio/assets/github-3b4e1609.png";
const menu = "/Personal-Portfolio/assets/menu-b5599218.svg";
const close = "/Personal-Portfolio/assets/close-54702a70.svg";
const css = "/Personal-Portfolio/assets/css-79a7f026.png";
const figma = "/Personal-Portfolio/assets/figma-184a11e6.png";
const git = "data:image/png;base64,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";
const html = "/Personal-Portfolio/assets/html-92b76a73.png";
const javascript = "data:image/png;base64,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";
const mongodb = "/Personal-Portfolio/assets/mongodb-54000b2b.png";
const nodejs = "/Personal-Portfolio/assets/nodejs-d83eb6dd.png";
const reactjs = "/Personal-Portfolio/assets/reactjs-966214a8.png";
const redux = "/Personal-Portfolio/assets/redux-171787ca.png";
const tailwind = "/Personal-Portfolio/assets/tailwind-6ece120d.png";
const typescript = "data:image/png;base64,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";
const cake = "/Personal-Portfolio/assets/cake-fdabac79.png";
const hotelbooking = "/Personal-Portfolio/assets/hotel booking-935bd450.png";
const tripguide = "/Personal-Portfolio/assets/tripguide-892dd3b1.png";
const education = "/Personal-Portfolio/assets/education-a19f0769.png";
const brototype = "/Personal-Portfolio/assets/brototype-8587e3a6.jpg";
const Avodha = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBhUSBxIVFhUXGB4XGRgWGBsWHhsaHRcXIh0gHRkfHTQgGhsoHRshIjUhJSorLy4wGx83ODMtNyguLisBCgoKDg0OGhAQGi0lHh8rLystKy0rLS0tLS0vLS0rLSsrKy0tLS0rKy0tLS0rLS0tLS0tLS0rLS0tNysrLTcrK//AABEIANYA6wMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYHCAIDBAH/xABCEAABAwIEAgcEBwUHBQAAAAABAAIDBBEFBhIhBzETIkFRYXGBFDKRoQgVI1JikrJCU3JzghYXQ7HB0dIzNDWTov/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgQD/8QAHhEBAQACAgMBAQAAAAAAAAAAAAECEQMhEjFBUSL/2gAMAwEAAhEDEQA/AMQoiLuZEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEUrhWWqzGKJ82GU0kkbPec0C23O1zdxt2C6bEUiKQwbA6nHZyzB4XyuaLkNtsPEk2CCPRdlRA6lncypaWvaS1zXCxBHMELrQEUphuXKzFaF82G00kkbPec0bC3O293W8LqLTYIpDCMDqsafbCaeSXvLG3A83ch8VKVmQcUo4S+ooZdI56dL/k1xPyU3BW0XLonAkFpu33hY3HmOxc6WmfWVLY6Rhe9x0ta0XJJ7AFVdSK2jhnixH/ZP/PH/wA10VXD3FaSMuloZbD7ul/ya4lTyn6Kyi5SRmKQtlaWuGxDgQQfEHcLso6WSuqmxUbC97zZrWi5J8FUdKKRxvAqnAKkR4xC6JxGoB1jceBBsVGk2G6D6il6/K9bh2FNqa6mkZC+1nut28ri9237LgKISXYIuUUbppQ2EFznEAAC5JPIAd6kcby7V4AW/XMD4tYu3VYg9+4JF/DmmxGIiICIiAiIgIiIO2lp31lU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";
const navLinks = [
  {
    id: "about",
    title: "About"
  },
  {
    id: "work",
    title: "Work"
  },
  {
    id: "contact",
    title: "Contact"
  }
];
const services = [
  {
    title: "Web Designer",
    icon: web
  },
  {
    title: "Front-end Developer/React Developer",
    icon: web
  },
  {
    title: "Backend-end Developer/Nodejs Developer",
    icon: backend
  },
  {
    title: "Content Creator",
    icon: creator
  }
];
const technologies = [
  {
    name: "HTML 5",
    icon: html
  },
  {
    name: "CSS 3",
    icon: css
  },
  {
    name: "JavaScript",
    icon: javascript
  },
  {
    name: "TypeScript",
    icon: typescript
  },
  {
    name: "React JS",
    icon: reactjs
  },
  {
    name: "Redux Toolkit",
    icon: redux
  },
  {
    name: "Tailwind CSS",
    icon: tailwind
  },
  {
    name: "Node JS",
    icon: nodejs
  },
  {
    name: "MongoDB",
    icon: mongodb
  },
  {
    name: "git",
    icon: git
  },
  {
    name: "figma",
    icon: figma
  }
];
const experiences = [
  {
    title: "Bachelor’s Degree in Computer Science",
    company_name: "University Of Calicut",
    icon: education,
    iconBg: "#383E56",
    date: "July 2016 - April 2019",
    points: [
      "BSc in Computer Science is a 3-year undergraduate program.",
      "Curriculum covers computer systems, software development, and coding.",
      "Emphasizes practical coding skills and problem-solving abilities.",
      "Offers elective courses and specializations in areas like cybersecurity and data science.",
      "Provides a solid foundation for advanced studies and research in computer science.",
      "In my education, I learned Java, C, and SQL DBMS as part of the curriculum.",
      "Fosters critical thinking and innovation in the dynamic field of technology.",
      "The project focused on creating a platform that connects merchants and shop owners to publish advertisements and offers.",
      "The project was developed using the .NET framework."
    ]
  },
  {
    title: "Master's degrees in computer science",
    company_name: "University Of Calicut",
    icon: education,
    iconBg: "#E6DEDD",
    date: "August 2019 - September 2021",
    points: [
      "Duration: Master's in Computer Science is typically a 2-year program.",
      "Core Subjects: The curriculum covers advanced topics in data structures and algorithms focusing on problem-solving and optimization techniques.",
      "Programming Languages: Students gain expertise in programming languages such as C, Java, and JavaScript, essential for web development and software engineering",
      "Web Development: The program includes web development concepts, enabling students to create interactive and dynamic web applications.",
      "Specialization:artificial intelligence,cybersecurity, and database management, depending on their interests and career goals.",
      "Project:Using Python Django is a platform for conducting online computer lab exams. It enables secure and efficient testing procedures while utilizing Django's robust web development framework."
    ]
  },
  {
    title: "Certified Ethical Hacker",
    company_name: "Avodha",
    icon: Avodha,
    iconBg: "#383E56",
    date: "Jan 2022 - Jun 2022",
    points: [
      "Covers penetration testing and web application security.",
      "Equips learners with skills to identify and assess vulnerabilities in computer systems.",
      "Provides practical knowledge to safeguard against cyber attacks.",
      "Enhances overall security of digital assets and web applications.",
      "Promotes responsible hacking practices for a secure digital environment."
    ]
  },
  {
    title: "Full stack Developer",
    company_name: "Brototype",
    icon: brototype,
    iconBg: "#E6DEDD",
    date: "October 2022 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Additional skills include State management using Redux",
      "Efficient data querying with GraphQL",
      "API fetching for data integration.",
      "User authentication for secure access.",
      "Following the MVC architecture for structured development.",
      "Database management with MongoDB and SQL.",
      "Deploying web applications on AWS for hosting.",
      "Using Git for version control and team collaboration."
    ]
  }
];
const testimonials = [
  {
    testimonial: "A web application which gives can able do  an online election",
    name: "MERN Stack tech",
    designation: "",
    company: "",
    image: ""
  },
  {
    testimonial: "A web application to do the project and user mangement",
    name: "MERN Stack tech",
    designation: "",
    company: "",
    image: ""
  },
  {
    testimonial: "Socail media that can be used for the movie casting ",
    name: "MERN Stack tech",
    designation: "",
    company: "",
    image: ""
  }
];
const projects = [
  {
    name: "E-Commerce",
    description: "Web-based platform for selling and buying home made cakes, and manage users by the admin.Proper authentication used in both admin and the user side also use paypal online payment and follow mvc arcitecture hosted on aws",
    tags: [
      {
        name: "Nodejs",
        color: "pink-text-gradient"
      },
      {
        name: "view-engine",
        color: "blue-text-gradient"
      },
      {
        name: "mongodb",
        color: "green-text-gradient"
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient"
      },
      {
        name: "AWS hosted",
        color: "blue-text-gradient"
      }
    ],
    image: cake,
    source_code_link: "https://github.com/sooraja98/E-commerce-for-selling-cake"
  },
  {
    name: "Hotel booking",
    description: "A hotel booking web application is a platform that allows users to search, browse, and book hotel accommodations online. It typically provides a user-friendly interface for travelers to explore various hotels, view their room types, prices, and availability. The application facilitates the entire booking process, ",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient"
      },
      {
        name: "restapi",
        color: "green-text-gradient"
      },
      {
        name: "tail wind",
        color: "pink-text-gradient"
      },
      {
        name: "Nodejs",
        color: "pink-text-gradient"
      },
      {
        name: "mongodb",
        color: "blue-text-gradient"
      }
    ],
    image: hotelbooking,
    source_code_link: "https://github.com/sooraja98/hotel-booking"
  },
  {
    name: "ALL other projects",
    description: "All other project which are made by using the react,nodejs related technologies,and the code is provides there the projects include liks usermangement,screen short capturing,text extracting from a image,and some landing pages using html and css",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient"
      },
      {
        name: "css",
        color: "green-text-gradient"
      },
      {
        name: "mongodb",
        color: "pink-text-gradient"
      },
      {
        name: "bootstrap",
        color: "green-text-gradient"
      },
      {
        name: "nodejs",
        color: "pink-text-gradient"
      },
      {
        name: "tailwind",
        color: "blue-text-gradient"
      },
      {
        name: "redux",
        color: "green-text-gradient"
      },
      {
        name: "redux",
        color: "green-text-gradient"
      }
    ],
    image: tripguide,
    source_code_link: "https://github.com/sooraja98"
  }
];
const Navbar = () => {
  const [active, setActive] = reactExports.useState("");
  const [toggle, setToggle] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: `${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between items-center max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2",
            onClick: () => {
              setActive("");
              window.scrollTo(0, 0);
            },
            children: [
              /* @__PURE__ */ jsx("img", { src: logo, alt: "logo", className: "w-9 h-9 object-contain" }),
              /* @__PURE__ */ jsxs("p", { className: "text-white text-[18px] font-bold cursor-pointer flex ", children: [
                "SOORAJ A  ",
                /* @__PURE__ */ jsx("span", { className: "sm:block hidden", children: " | Web Developer" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("ul", { className: "list-none hidden sm:flex flex-row gap-10", children: navLinks.map((nav) => /* @__PURE__ */ jsx(
          "li",
          {
            className: `${active === nav.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`,
            onClick: () => setActive(nav.title),
            children: /* @__PURE__ */ jsx("a", { href: `#${nav.id}`, children: nav.title })
          },
          nav.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "sm:hidden flex flex-1 justify-end items-center", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: toggle ? close : menu,
              alt: "menu",
              className: "w-[28px] h-[28px] object-contain",
              onClick: () => setToggle(!toggle)
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`,
              children: /* @__PURE__ */ jsx("ul", { className: "list-none flex justify-end items-start flex-1 flex-col gap-4", children: navLinks.map((nav) => /* @__PURE__ */ jsx(
                "li",
                {
                  className: `font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-secondary"}`,
                  onClick: () => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  },
                  children: /* @__PURE__ */ jsx("a", { href: `#${nav.id}`, children: nav.title })
                },
                nav.id
              )) })
            }
          )
        ] })
      ] })
    }
  );
};
var tilt = {};
Object.defineProperty(tilt, "__esModule", {
  value: true
});
var _extends$1 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _react$2 = reactExports;
var _react2 = _interopRequireDefault$2(_react$2);
var _reactDom = reactDomExports;
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var Tilt = function(_Component) {
  _inherits(Tilt2, _Component);
  function Tilt2(props) {
    _classCallCheck(this, Tilt2);
    var _this = _possibleConstructorReturn(this, (Tilt2.__proto__ || Object.getPrototypeOf(Tilt2)).call(this, props));
    _this.state = {
      style: {}
    };
    var defaultSettings = {
      reverse: false,
      max: 35,
      perspective: 1e3,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      scale: "1.1",
      speed: "1000",
      transition: true,
      axis: null,
      reset: true
    };
    _this.width = null;
    _this.height = null;
    _this.left = null;
    _this.top = null;
    _this.transitionTimeout = null;
    _this.updateCall = null;
    _this.element = null;
    _this.settings = Object.assign({}, defaultSettings, _this.props.options);
    _this.reverse = _this.settings.reverse ? -1 : 1;
    _this.onMouseEnter = _this.onMouseEnter.bind(_this, _this.props.onMouseEnter);
    _this.onMouseMove = _this.onMouseMove.bind(_this, _this.props.onMouseMove);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this, _this.props.onMouseLeave);
    return _this;
  }
  _createClass(Tilt2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.element = (0, _reactDom.findDOMNode)(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.transitionTimeout);
      cancelAnimationFrame(this.updateCall);
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter() {
      var cb = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      };
      var e = arguments[1];
      this.updateElementPosition();
      this.setState(Object.assign({}, this.state, {
        style: _extends$1({}, this.state.style, {
          willChange: "transform"
        })
      }));
      this.setTransition();
      return cb(e);
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this2 = this;
      window.requestAnimationFrame(function() {
        _this2.setState(Object.assign({}, _this2.state, {
          style: _extends$1({}, _this2.state.style, {
            transform: "perspective(" + _this2.settings.perspective + "px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
          })
        }));
      });
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove() {
      var cb = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      };
      var e = arguments[1];
      e.persist();
      if (this.updateCall !== null) {
        window.cancelAnimationFrame(this.updateCall);
      }
      this.event = e;
      this.updateCall = requestAnimationFrame(this.update.bind(this, e));
      return cb(e);
    }
  }, {
    key: "setTransition",
    value: function setTransition() {
      var _this3 = this;
      clearTimeout(this.transitionTimeout);
      this.setState(Object.assign({}, this.state, {
        style: _extends$1({}, this.state.style, {
          transition: this.settings.speed + "ms " + this.settings.easing
        })
      }));
      this.transitionTimeout = setTimeout(function() {
        _this3.setState(Object.assign({}, _this3.state, {
          style: _extends$1({}, _this3.state.style, {
            transition: ""
          })
        }));
      }, this.settings.speed);
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      var cb = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      };
      var e = arguments[1];
      this.setTransition();
      if (this.settings.reset) {
        this.reset();
      }
      return cb(e);
    }
  }, {
    key: "getValues",
    value: function getValues(e) {
      var x = (e.nativeEvent.clientX - this.left) / this.width;
      var y = (e.nativeEvent.clientY - this.top) / this.height;
      var _x = Math.min(Math.max(x, 0), 1);
      var _y = Math.min(Math.max(y, 0), 1);
      var tiltX = (this.reverse * (this.settings.max / 2 - _x * this.settings.max)).toFixed(2);
      var tiltY = (this.reverse * (_y * this.settings.max - this.settings.max / 2)).toFixed(2);
      var percentageX = _x * 100;
      var percentageY = _y * 100;
      return {
        tiltX,
        tiltY,
        percentageX,
        percentageY
      };
    }
  }, {
    key: "updateElementPosition",
    value: function updateElementPosition() {
      var rect = this.element.getBoundingClientRect();
      this.width = this.element.offsetWidth;
      this.height = this.element.offsetHeight;
      this.left = rect.left;
      this.top = rect.top;
    }
  }, {
    key: "update",
    value: function update(e) {
      var values = this.getValues(e);
      this.setState(Object.assign({}, this.state, {
        style: _extends$1({}, this.state.style, {
          transform: "perspective(" + this.settings.perspective + "px) rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")"
        })
      }));
      this.updateCall = null;
    }
  }, {
    key: "render",
    value: function render() {
      var style = Object.assign({}, this.props.style, this.state.style);
      return _react2.default.createElement(
        "div",
        {
          style,
          className: this.props.className,
          onMouseEnter: this.onMouseEnter,
          onMouseMove: this.onMouseMove,
          onMouseLeave: this.onMouseLeave
        },
        this.props.children
      );
    }
  }]);
  return Tilt2;
}(_react$2.Component);
var _default$2 = tilt.default = Tilt;
const textVariant = (delay) => {
  return {
    hidden: {
      y: -50,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay
      }
    }
  };
};
const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut"
      }
    }
  };
};
const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut"
      }
    }
  };
};
const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren: delayChildren || 0
      }
    }
  };
};
const StarWrapper = (Component, idName) => function HOC() {
  return /* @__PURE__ */ jsxs(
    motion.section,
    {
      variants: staggerContainer(),
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true, amount: 0.25 },
      className: `${styles.padding} max-w-7xl mx-auto relative z-0`,
      children: [
        /* @__PURE__ */ jsx("span", { className: "hash-span", id: idName, children: " " }),
        /* @__PURE__ */ jsx(Component, {})
      ]
    }
  );
};
const ServiceCard = ({ index: index2, title, icon }) => /* @__PURE__ */ jsx(_default$2, { className: "xs:w-[250px] w-full", children: /* @__PURE__ */ jsx(
  motion.div,
  {
    variants: fadeIn("right", "spring", index2 * 0.5, 0.75),
    className: "w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card",
    children: /* @__PURE__ */ jsxs(
      "div",
      {
        options: {
          max: 45,
          scale: 1,
          speed: 450
        },
        className: "bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: icon,
              alt: "web-development",
              className: "w-16 h-16 object-contain"
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "text-white text-[20px] font-bold text-center", children: title })
        ]
      }
    )
  }
) });
const About = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(motion.div, { variants: textVariant(), children: [
      /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "Introduction" }),
      /* @__PURE__ */ jsx("h2", { className: styles.sectionHeadText, children: "Overview." })
    ] }),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        variants: fadeIn("", "", 0.1, 1),
        className: "mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]",
        children: "I'm a skilled software developer with experience in java,c,python and JavaScript, and expertise in frameworks like React, Node.js, and Angular. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-20 flex flex-wrap gap-10", children: services.map((service, index2) => /* @__PURE__ */ jsx(ServiceCard, { index: index2, ...service }, service.title)) })
  ] });
};
const About$1 = StarWrapper(About, "about");
const Tech = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-row flex-wrap justify-center gap-10", children: technologies.map((technology) => /* @__PURE__ */ jsx("div", { className: "w-28 h-28", children: /* @__PURE__ */ jsx(BallCanvas, { icon: technology.icon }) }, technology.name)) });
};
const Tech$1 = StarWrapper(Tech, "");
var VerticalTimeline$1 = {};
var classnames = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(module) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames() {
      var classes = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg)
          continue;
        var argType = typeof arg;
        if (argType === "string" || argType === "number") {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames.apply(null, arg);
            if (inner) {
              classes.push(inner);
            }
          }
        } else if (argType === "object") {
          if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
            classes.push(arg.toString());
            continue;
          }
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
          }
        }
      }
      return classes.join(" ");
    }
    if (module.exports) {
      classNames.default = classNames;
      module.exports = classNames;
    } else {
      window.classNames = classNames;
    }
  })();
})(classnames);
var classnamesExports = classnames.exports;
VerticalTimeline$1.__esModule = true;
VerticalTimeline$1.default = void 0;
var _react$1 = _interopRequireDefault$1(reactExports);
var _propTypes$1 = _interopRequireDefault$1(propTypesExports);
var _classnames$1 = _interopRequireDefault$1(classnamesExports);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const VerticalTimeline = ({
  animate = true,
  className = "",
  layout = "2-columns",
  lineColor = "#FFF",
  children
}) => {
  if (typeof window === "object") {
    document.documentElement.style.setProperty("--line-color", lineColor);
  }
  return /* @__PURE__ */ _react$1.default.createElement("div", {
    className: (0, _classnames$1.default)(className, "vertical-timeline", {
      "vertical-timeline--animate": animate,
      "vertical-timeline--two-columns": layout === "2-columns",
      "vertical-timeline--one-column-left": layout === "1-column" || layout === "1-column-left",
      "vertical-timeline--one-column-right": layout === "1-column-right"
    })
  }, children);
};
VerticalTimeline.propTypes = {
  children: _propTypes$1.default.oneOfType([_propTypes$1.default.arrayOf(_propTypes$1.default.node), _propTypes$1.default.node]).isRequired,
  className: _propTypes$1.default.string,
  animate: _propTypes$1.default.bool,
  layout: _propTypes$1.default.oneOf(["1-column-left", "1-column", "2-columns", "1-column-right"]),
  lineColor: _propTypes$1.default.string
};
var _default$1 = VerticalTimeline;
VerticalTimeline$1.default = _default$1;
var VerticalTimelineElement$1 = {};
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
    o2.__proto__ = p3;
    return o2;
  };
  return _setPrototypeOf(o, p2);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var observerMap = /* @__PURE__ */ new Map();
var RootIds = /* @__PURE__ */ new WeakMap();
var rootId = 0;
var unsupportedValue = void 0;
function defaultFallbackInView(inView) {
  unsupportedValue = inView;
}
function getRootId(root) {
  if (!root)
    return "0";
  if (RootIds.has(root))
    return RootIds.get(root);
  rootId += 1;
  RootIds.set(root, rootId.toString());
  return RootIds.get(root);
}
function optionsToId(options) {
  return Object.keys(options).sort().filter(function(key) {
    return options[key] !== void 0;
  }).map(function(key) {
    return key + "_" + (key === "root" ? getRootId(options.root) : options[key]);
  }).toString();
}
function createObserver(options) {
  var id = optionsToId(options);
  var instance = observerMap.get(id);
  if (!instance) {
    var elements = /* @__PURE__ */ new Map();
    var thresholds;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var _elements$get;
        var inView = entry.isIntersecting && thresholds.some(function(threshold) {
          return entry.intersectionRatio >= threshold;
        });
        if (options.trackVisibility && typeof entry.isVisible === "undefined") {
          entry.isVisible = inView;
        }
        (_elements$get = elements.get(entry.target)) == null ? void 0 : _elements$get.forEach(function(callback) {
          callback(inView, entry);
        });
      });
    }, options);
    thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
    instance = {
      id,
      observer,
      elements
    };
    observerMap.set(id, instance);
  }
  return instance;
}
function observe(element, callback, options, fallbackInView) {
  if (options === void 0) {
    options = {};
  }
  if (fallbackInView === void 0) {
    fallbackInView = unsupportedValue;
  }
  if (typeof window.IntersectionObserver === "undefined" && fallbackInView !== void 0) {
    var bounds = element.getBoundingClientRect();
    callback(fallbackInView, {
      isIntersecting: fallbackInView,
      target: element,
      intersectionRatio: typeof options.threshold === "number" ? options.threshold : 0,
      time: 0,
      boundingClientRect: bounds,
      intersectionRect: bounds,
      rootBounds: bounds
    });
    return function() {
    };
  }
  var _createObserver = createObserver(options), id = _createObserver.id, observer = _createObserver.observer, elements = _createObserver.elements;
  var callbacks = elements.get(element) || [];
  if (!elements.has(element)) {
    elements.set(element, callbacks);
  }
  callbacks.push(callback);
  observer.observe(element);
  return function unobserve() {
    callbacks.splice(callbacks.indexOf(callback), 1);
    if (callbacks.length === 0) {
      elements["delete"](element);
      observer.unobserve(element);
    }
    if (elements.size === 0) {
      observer.disconnect();
      observerMap["delete"](id);
    }
  };
}
var _excluded = ["children", "as", "triggerOnce", "threshold", "root", "rootMargin", "onChange", "skip", "trackVisibility", "delay", "initialInView", "fallbackInView"];
function isPlainChildren(props) {
  return typeof props.children !== "function";
}
var InView = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(InView2, _React$Component);
  function InView2(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.node = null;
    _this._unobserveCb = null;
    _this.handleNode = function(node) {
      if (_this.node) {
        _this.unobserve();
        if (!node && !_this.props.triggerOnce && !_this.props.skip) {
          _this.setState({
            inView: !!_this.props.initialInView,
            entry: void 0
          });
        }
      }
      _this.node = node ? node : null;
      _this.observeNode();
    };
    _this.handleChange = function(inView, entry) {
      if (inView && _this.props.triggerOnce) {
        _this.unobserve();
      }
      if (!isPlainChildren(_this.props)) {
        _this.setState({
          inView,
          entry
        });
      }
      if (_this.props.onChange) {
        _this.props.onChange(inView, entry);
      }
    };
    _this.state = {
      inView: !!props.initialInView,
      entry: void 0
    };
    return _this;
  }
  var _proto = InView2.prototype;
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold || prevProps.skip !== this.props.skip || prevProps.trackVisibility !== this.props.trackVisibility || prevProps.delay !== this.props.delay) {
      this.unobserve();
      this.observeNode();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unobserve();
    this.node = null;
  };
  _proto.observeNode = function observeNode() {
    if (!this.node || this.props.skip)
      return;
    var _this$props = this.props, threshold = _this$props.threshold, root = _this$props.root, rootMargin = _this$props.rootMargin, trackVisibility = _this$props.trackVisibility, delay = _this$props.delay, fallbackInView = _this$props.fallbackInView;
    this._unobserveCb = observe(this.node, this.handleChange, {
      threshold,
      root,
      rootMargin,
      // @ts-ignore
      trackVisibility,
      // @ts-ignore
      delay
    }, fallbackInView);
  };
  _proto.unobserve = function unobserve() {
    if (this._unobserveCb) {
      this._unobserveCb();
      this._unobserveCb = null;
    }
  };
  _proto.render = function render() {
    if (!isPlainChildren(this.props)) {
      var _this$state = this.state, inView = _this$state.inView, entry = _this$state.entry;
      return this.props.children({
        inView,
        entry,
        ref: this.handleNode
      });
    }
    var _this$props2 = this.props, children = _this$props2.children, as = _this$props2.as, props = _objectWithoutPropertiesLoose(_this$props2, _excluded);
    return /* @__PURE__ */ reactExports.createElement(as || "div", _extends({
      ref: this.handleNode
    }, props), children);
  };
  return InView2;
}(reactExports.Component);
InView.displayName = "InView";
InView.defaultProps = {
  threshold: 0,
  triggerOnce: false,
  initialInView: false
};
function useInView(_temp) {
  var _ref = _temp === void 0 ? {} : _temp, threshold = _ref.threshold, delay = _ref.delay, trackVisibility = _ref.trackVisibility, rootMargin = _ref.rootMargin, root = _ref.root, triggerOnce = _ref.triggerOnce, skip = _ref.skip, initialInView = _ref.initialInView, fallbackInView = _ref.fallbackInView;
  var unobserve = reactExports.useRef();
  var _React$useState = reactExports.useState({
    inView: !!initialInView
  }), state = _React$useState[0], setState = _React$useState[1];
  var setRef = reactExports.useCallback(
    function(node) {
      if (unobserve.current !== void 0) {
        unobserve.current();
        unobserve.current = void 0;
      }
      if (skip)
        return;
      if (node) {
        unobserve.current = observe(node, function(inView, entry) {
          setState({
            inView,
            entry
          });
          if (entry.isIntersecting && triggerOnce && unobserve.current) {
            unobserve.current();
            unobserve.current = void 0;
          }
        }, {
          root,
          rootMargin,
          threshold,
          // @ts-ignore
          trackVisibility,
          // @ts-ignore
          delay
        }, fallbackInView);
      }
    },
    // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // If the threshold is an array, convert it to a string so it won't change between renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Array.isArray(threshold) ? threshold.toString() : threshold,
      root,
      rootMargin,
      triggerOnce,
      skip,
      trackVisibility,
      fallbackInView,
      delay
    ]
  );
  reactExports.useEffect(function() {
    if (!unobserve.current && state.entry && !triggerOnce && !skip) {
      setState({
        inView: !!initialInView
      });
    }
  });
  var result = [setRef, state.inView, state.entry];
  result.ref = result[0];
  result.inView = result[1];
  result.entry = result[2];
  return result;
}
const reactIntersectionObserver_m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InView,
  default: InView,
  defaultFallbackInView,
  observe,
  useInView
}, Symbol.toStringTag, { value: "Module" }));
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(reactIntersectionObserver_m);
VerticalTimelineElement$1.__esModule = true;
VerticalTimelineElement$1.default = void 0;
var _react = _interopRequireDefault(reactExports);
var _propTypes = _interopRequireDefault(propTypesExports);
var _classnames = _interopRequireDefault(classnamesExports);
var _reactIntersectionObserver = require$$3;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const VerticalTimelineElement = ({
  children = "",
  className = "",
  contentArrowStyle = null,
  contentStyle = null,
  date = "",
  dateClassName = "",
  icon = null,
  iconClassName = "",
  iconOnClick = null,
  onTimelineElementClick = null,
  iconStyle = null,
  id = "",
  position = "",
  style = null,
  textClassName = "",
  intersectionObserverProps = {
    rootMargin: "0px 0px -40px 0px",
    triggerOnce: true
  },
  visible = false
}) => /* @__PURE__ */ _react.default.createElement(_reactIntersectionObserver.InView, intersectionObserverProps, ({
  inView,
  ref
}) => /* @__PURE__ */ _react.default.createElement("div", {
  ref,
  id,
  className: (0, _classnames.default)(className, "vertical-timeline-element", {
    "vertical-timeline-element--left": position === "left",
    "vertical-timeline-element--right": position === "right",
    "vertical-timeline-element--no-children": children === ""
  }),
  style
}, /* @__PURE__ */ _react.default.createElement(_react.default.Fragment, null, /* @__PURE__ */ _react.default.createElement("span", {
  // eslint-disable-line jsx-a11y/no-static-element-interactions
  style: iconStyle,
  onClick: iconOnClick,
  className: (0, _classnames.default)(iconClassName, "vertical-timeline-element-icon", {
    "bounce-in": inView || visible,
    "is-hidden": !(inView || visible)
  })
}, icon), /* @__PURE__ */ _react.default.createElement("div", {
  style: contentStyle,
  onClick: onTimelineElementClick,
  className: (0, _classnames.default)(textClassName, "vertical-timeline-element-content", {
    "bounce-in": inView || visible,
    "is-hidden": !(inView || visible)
  })
}, /* @__PURE__ */ _react.default.createElement("div", {
  style: contentArrowStyle,
  className: "vertical-timeline-element-content-arrow"
}), children, /* @__PURE__ */ _react.default.createElement("span", {
  className: (0, _classnames.default)(dateClassName, "vertical-timeline-element-date")
}, date)))));
VerticalTimelineElement.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  className: _propTypes.default.string,
  contentArrowStyle: _propTypes.default.shape({}),
  contentStyle: _propTypes.default.shape({}),
  date: _propTypes.default.node,
  dateClassName: _propTypes.default.string,
  icon: _propTypes.default.element,
  iconClassName: _propTypes.default.string,
  iconStyle: _propTypes.default.shape({}),
  iconOnClick: _propTypes.default.func,
  onTimelineElementClick: _propTypes.default.func,
  id: _propTypes.default.string,
  position: _propTypes.default.string,
  style: _propTypes.default.shape({}),
  textClassName: _propTypes.default.string,
  visible: _propTypes.default.bool,
  intersectionObserverProps: _propTypes.default.shape({
    root: _propTypes.default.object,
    rootMargin: _propTypes.default.string,
    threshold: _propTypes.default.number,
    triggerOnce: _propTypes.default.bool
  })
};
var _default = VerticalTimelineElement;
VerticalTimelineElement$1.default = _default;
var distEs6 = {
  VerticalTimeline: VerticalTimeline$1.default,
  // eslint-disable-line global-require
  VerticalTimelineElement: VerticalTimelineElement$1.default
  // eslint-disable-line global-require
};
const style_min = "";
const ExperienceCard = ({ experience }) => {
  return /* @__PURE__ */ jsxs(
    distEs6.VerticalTimelineElement,
    {
      contentStyle: {
        background: "#1d1836",
        color: "#fff"
      },
      contentArrowStyle: { borderRight: "7px solid  #232631" },
      date: experience.date,
      iconStyle: { background: experience.iconBg },
      icon: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full h-full", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: experience.icon,
          alt: experience.company_name,
          className: "w-[60%] h-[60%] object-contain"
        }
      ) }),
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white text-[24px] font-bold", children: experience.title }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-secondary text-[16px] font-semibold",
              style: { margin: 0 },
              children: experience.company_name
            }
          )
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "mt-5 list-disc ml-5 space-y-2", children: experience.points.map((point, index2) => /* @__PURE__ */ jsx(
          "li",
          {
            className: "text-white-100 text-[14px] pl-1 tracking-wider",
            children: point
          },
          `experience-point-${index2}`
        )) })
      ]
    }
  );
};
const Experience = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(motion.div, { variants: textVariant(), children: [
      /* @__PURE__ */ jsx("p", { className: `${styles.sectionSubText} text-center`, children: "What I have done so far" }),
      /* @__PURE__ */ jsx("h2", { className: `${styles.sectionHeadText} text-center`, children: "My Career Path." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 flex flex-col", children: /* @__PURE__ */ jsx(distEs6.VerticalTimeline, { children: experiences.map((experience, index2) => /* @__PURE__ */ jsx(
      ExperienceCard,
      {
        experience
      },
      `experience-${index2}`
    )) }) })
  ] });
};
const Experience$1 = StarWrapper(Experience, "work");
const ProjectCard = ({
  index: index2,
  name,
  description,
  tags,
  image,
  source_code_link
}) => {
  return /* @__PURE__ */ jsx(motion.div, { variants: fadeIn("up", "spring", index2 * 0.5, 0.75), children: /* @__PURE__ */ jsxs(
    _default$2,
    {
      options: {
        max: 45,
        scale: 1,
        speed: 450
      },
      className: "bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[230px]", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: image,
              alt: "project_image",
              className: "w-full h-full object-cover rounded-2xl"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex justify-end m-3 card-img_hover", children: /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => window.open(source_code_link, "_blank"),
              className: "black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: github,
                  alt: "source code",
                  className: "w-1/2 h-1/2 object-contain"
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-[24px]", children: name }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-secondary text-[14px]", children: description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: tags.map((tag) => /* @__PURE__ */ jsxs(
          "p",
          {
            className: `text-[14px] ${tag.color}`,
            children: [
              "#",
              tag.name
            ]
          },
          `${name}-${tag.name}`
        )) })
      ]
    }
  ) });
};
const Works = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(motion.div, { variants: textVariant(), children: [
      /* @__PURE__ */ jsx("p", { className: `${styles.sectionSubText} `, children: "My work" }),
      /* @__PURE__ */ jsx("h2", { className: `${styles.sectionHeadText}`, children: "Projects." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full flex", children: /* @__PURE__ */ jsx(
      motion.p,
      {
        variants: fadeIn("", "", 0.1, 1),
        className: "mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]",
        children: "Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively."
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 flex flex-wrap gap-7", children: projects.map((project, index2) => /* @__PURE__ */ jsx(ProjectCard, { index: index2, ...project }, `project-${index2}`)) })
  ] });
};
const Works$1 = StarWrapper(Works, "");
const FeedbackCard = ({
  index: index2,
  testimonial,
  name,
  designation,
  company,
  image
}) => /* @__PURE__ */ jsxs(
  motion.div,
  {
    variants: fadeIn("", "spring", index2 * 0.5, 0.75),
    className: "bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full",
    children: [
      /* @__PURE__ */ jsx("p", { className: "text-white font-black text-[48px]", children: '"' }),
      /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-white tracking-wider text-[18px]", children: testimonial }),
        /* @__PURE__ */ jsx("div", { className: "mt-7 flex justify-between items-center gap-1", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-white font-medium text-[16px]", children: [
            /* @__PURE__ */ jsx("span", { className: "blue-text-gradient", children: "@" }),
            " ",
            name
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-secondary text-[12px]", children: [
            designation,
            "  ",
            company
          ] })
        ] }) })
      ] })
    ]
  }
);
const Feedbacks = () => {
  return /* @__PURE__ */ jsxs("div", { className: `mt-12 bg-black-100 rounded-[20px]`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`,
        children: /* @__PURE__ */ jsxs(motion.div, { variants: textVariant(), children: [
          /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "Working projects" }),
          /* @__PURE__ */ jsx("h2", { className: styles.sectionHeadText, children: "Projects." })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`, children: testimonials.map((testimonial, index2) => /* @__PURE__ */ jsx(FeedbackCard, { index: index2, ...testimonial }, testimonial.name)) })
  ] });
};
const Feedbacks$1 = StarWrapper(Feedbacks, "");
const store = {
  _origin: "https://api.emailjs.com"
};
const init = (publicKey, origin = "https://api.emailjs.com") => {
  store._userID = publicKey;
  store._origin = origin;
};
const validateParams = (publicKey, serviceID, templateID) => {
  if (!publicKey) {
    throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
  }
  if (!serviceID) {
    throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
  }
  if (!templateID) {
    throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
  }
  return true;
};
class EmailJSResponseStatus {
  constructor(httpResponse) {
    this.status = httpResponse ? httpResponse.status : 0;
    this.text = httpResponse ? httpResponse.responseText : "Network Error";
  }
}
const sendPost = (url, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", ({ target }) => {
      const responseStatus = new EmailJSResponseStatus(target);
      if (responseStatus.status === 200 || responseStatus.text === "OK") {
        resolve(responseStatus);
      } else {
        reject(responseStatus);
      }
    });
    xhr.addEventListener("error", ({ target }) => {
      reject(new EmailJSResponseStatus(target));
    });
    xhr.open("POST", store._origin + url, true);
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send(data);
  });
};
const send = (serviceID, templateID, templatePrams, publicKey) => {
  const uID = publicKey || store._userID;
  validateParams(uID, serviceID, templateID);
  const params = {
    lib_version: "3.11.0",
    user_id: uID,
    service_id: serviceID,
    template_id: templateID,
    template_params: templatePrams
  };
  return sendPost("/api/v1.0/email/send", JSON.stringify(params), {
    "Content-type": "application/json"
  });
};
const findHTMLForm = (form) => {
  let currentForm;
  if (typeof form === "string") {
    currentForm = document.querySelector(form);
  } else {
    currentForm = form;
  }
  if (!currentForm || currentForm.nodeName !== "FORM") {
    throw "The 3rd parameter is expected to be the HTML form element or the style selector of form";
  }
  return currentForm;
};
const sendForm = (serviceID, templateID, form, publicKey) => {
  const uID = publicKey || store._userID;
  const currentForm = findHTMLForm(form);
  validateParams(uID, serviceID, templateID);
  const formData = new FormData(currentForm);
  formData.append("lib_version", "3.11.0");
  formData.append("service_id", serviceID);
  formData.append("template_id", templateID);
  formData.append("user_id", uID);
  return sendPost("/api/v1.0/email/send-form", formData);
};
const emailjs = {
  init,
  send,
  sendForm
};
const Contact = () => {
  const formRef = reactExports.useRef();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      "service_ns1zjwb",
      "template_nmmw909",
      {
        from_name: form.name,
        to_name: "Sooraj A",
        from_email: form.email,
        to_email: "asooraj47@gmail.com",
        message: form.message
      },
      "n1DY2YgiMRa2MTi5y"
    ).then(
      () => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({
          name: "",
          email: "",
          message: ""
        });
      },
      (error) => {
        setLoading(false);
        console.error(error);
        alert("Ahh, something went wrong. Please try again.");
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`,
      children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: slideIn("left", "tween", 0.2, 1),
            className: "flex-[0.75] bg-black-100 p-8 rounded-2xl",
            children: [
              /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "Get in touch" }),
              /* @__PURE__ */ jsx("h3", { className: styles.sectionHeadText, children: "Contact." }),
              /* @__PURE__ */ jsxs(
                "form",
                {
                  ref: formRef,
                  onSubmit: handleSubmit,
                  className: "mt-12 flex flex-col gap-8",
                  children: [
                    /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-4", children: "Your Name" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          name: "name",
                          value: form.name,
                          onChange: handleChange,
                          placeholder: "What's your good name?",
                          className: "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-4", children: "Your email" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "email",
                          name: "email",
                          value: form.email,
                          onChange: handleChange,
                          placeholder: "What's your web address?",
                          className: "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-4", children: "Your Message" }),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          rows: 7,
                          name: "message",
                          value: form.message,
                          onChange: handleChange,
                          placeholder: "What you want to say?",
                          className: "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary",
                        children: loading ? "Sending..." : "Send"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            variants: slideIn("right", "tween", 0.2, 1),
            className: "xl:flex-1 xl:h-auto md:h-[550px] h-[350px]",
            children: /* @__PURE__ */ jsx(EarthCanvas, {})
          }
        )
      ]
    }
  );
};
const Contact$1 = StarWrapper(Contact, "contact");
const App = () => {
  return /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsxs("div", { className: "relative z-0 bg-primary", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-hero-pattern bg-cover bg-no-repeat bg-center", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx(Hero, {})
    ] }),
    /* @__PURE__ */ jsx(About$1, {}),
    /* @__PURE__ */ jsx(Experience$1, {}),
    /* @__PURE__ */ jsx(Tech$1, {}),
    /* @__PURE__ */ jsx(Works$1, {}),
    /* @__PURE__ */ jsx(Feedbacks$1, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-0", children: [
      /* @__PURE__ */ jsx(Contact$1, {}),
      /* @__PURE__ */ jsx(StarsCanvas, {})
    ] })
  ] }) });
};
const index = "";
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(React$1.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })
);
