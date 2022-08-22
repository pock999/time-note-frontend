"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktime_note_frontend"] = self["webpackChunktime_note_frontend"] || []).push([["src_views_Login_index_jsx"],{

/***/ "./src/views/Login/index.jsx":
/*!***********************************!*\
  !*** ./src/views/Login/index.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Login)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n/* harmony import */ var atomize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! atomize */ \"./node_modules/atomize/index.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components */ \"./src/components/index.js\");\n/* harmony import */ var _utils_SwalHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/SwalHelper */ \"./src/utils/SwalHelper.js\");\n/* harmony import */ var _store_reducers_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/reducers/auth */ \"./src/store/reducers/auth/index.js\");\nvar _templateObject;\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n// react\n\n\n // redux\n\n // common tools(npm)\n\n // styled-components\n\n // atomize\n\n // custom components\n\n // custom utils\n\n // store\n\n // styled-component\n\nvar Wrapper = (0,styled_components__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('div')(_templateObject || (_templateObject = _taggedTemplateLiteral([\"\\n  width: 100vw;\\n  height: 100vh;\\n\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: center;\\n  align-items: center;\\n\\n  background-image: url(\\\"../assets/home-calendar-side.png\\\");\\n  background-repeat: no-repeat;\\n  background-size: cover;\\n\\n  opacity: 0.6;\\n\"])));\nvar initFormState = {\n  name: '',\n  email: '',\n  password: '',\n  repeatPassword: ''\n};\nfunction Login() {\n  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useHistory)();\n  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(initFormState),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      state = _React$useState2[0],\n      setState = _React$useState2[1]; // Tabs\n\n\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(0),\n      _React$useState4 = _slicedToArray(_React$useState3, 2),\n      focusTab = _React$useState4[0],\n      setFocusTab = _React$useState4[1];\n\n  var handleChange = function handleChange(target, evt) {\n    setState(function (pre) {\n      return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pre), target === 'email' ? {\n        email: evt.target.value\n      } : {}), target === 'password' ? {\n        password: evt.target.value\n      } : {}), target === 'name' ? {\n        name: evt.target.value\n      } : {}), target === 'repeatPassword' ? {\n        repeatPassword: evt.target.value\n      } : {});\n    });\n  };\n\n  var loginSubmit = /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt) {\n      var resultAction;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              evt.preventDefault(); // TODO: yup\n\n              _context.next = 3;\n              return dispatch((0,_store_reducers_auth__WEBPACK_IMPORTED_MODULE_6__.loginAction)(_objectSpread({}, lodash__WEBPACK_IMPORTED_MODULE_2___default().pick(state, ['email', 'password']))));\n\n            case 3:\n              resultAction = _context.sent;\n\n              try {\n                (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_9__.unwrapResult)(resultAction);\n                history.push('/notes');\n              } catch (e) {\n                _utils_SwalHelper__WEBPACK_IMPORTED_MODULE_5__[\"default\"].fail(e.message);\n              }\n\n            case 5:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function loginSubmit(_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  var registerSubmit = /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(evt) {\n      var resultAction;\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              evt.preventDefault();\n              _context2.prev = 1;\n\n              if (!(state.password !== state.repeatPassword)) {\n                _context2.next = 4;\n                break;\n              }\n\n              throw new Error('密碼需與密碼確認一致');\n\n            case 4:\n              if (!(state.password.length < 8)) {\n                _context2.next = 6;\n                break;\n              }\n\n              throw new Error('密碼長度需大於8個字元');\n\n            case 6:\n              _context2.next = 8;\n              return dispatch((0,_store_reducers_auth__WEBPACK_IMPORTED_MODULE_6__.registerAction)(_objectSpread({}, lodash__WEBPACK_IMPORTED_MODULE_2___default().pick(state, ['email', 'password', 'name']))));\n\n            case 8:\n              resultAction = _context2.sent;\n              (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_9__.unwrapResult)(resultAction);\n              _utils_SwalHelper__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success('註冊成功');\n              setFocusTab(function (pre) {\n                setState(initFormState);\n                return 0;\n              });\n              _context2.next = 17;\n              break;\n\n            case 14:\n              _context2.prev = 14;\n              _context2.t0 = _context2[\"catch\"](1);\n              _utils_SwalHelper__WEBPACK_IMPORTED_MODULE_5__[\"default\"].fail(_context2.t0.message);\n\n            case 17:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2, null, [[1, 14]]);\n    }));\n\n    return function registerSubmit(_x2) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Wrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_4__.Card, {\n    minW: {\n      xs: '100%',\n      md: '500px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Row, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Col, {\n    size: \"5\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Text, {\n    tag: \"h1\",\n    textSize: \"heading\",\n    m: \"1rem\"\n  }, focusTab === 0 ? '登入' : '註冊'))), focusTab === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"form\", {\n    onSubmit: function onSubmit(evt) {\n      return loginSubmit(evt);\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_4__.AccountInput, {\n    value: state.email,\n    onChange: function onChange(evt) {\n      return handleChange('email', evt);\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_4__.PasswordInput, {\n    value: state.password,\n    onChange: function onChange(evt) {\n      return handleChange('password', evt);\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Row, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Col, {\n    size: \"12\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Div, {\n    m: \"1rem\",\n    d: \"flex\",\n    flexDir: \"row\",\n    justify: \"flex-end\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Button, {\n    bg: \"warning700\",\n    hoverBg: \"warning800\",\n    rounded: \"circle\",\n    p: {\n      r: '1.5rem',\n      l: '1.5rem'\n    },\n    m: {\n      r: '.5rem'\n    },\n    shadow: \"3\",\n    hoverShadow: \"4\",\n    type: \"button\",\n    onClick: function onClick() {\n      return setFocusTab(1);\n    }\n  }, \"\\u5207\\u63DB\\u8A3B\\u518A\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Button, {\n    bg: \"warning700\",\n    hoverBg: \"warning800\",\n    rounded: \"circle\",\n    p: {\n      r: '1.5rem',\n      l: '1.5rem'\n    },\n    shadow: \"3\",\n    hoverShadow: \"4\",\n    type: \"submit\"\n  }, \"\\u767B\\u5165\"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"form\", {\n    onSubmit: function onSubmit(evt) {\n      return registerSubmit(evt);\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Input, {\n    placeholder: \"\\u540D\\u5B57\",\n    m: \".5rem\",\n    value: state.name,\n    onChange: function onChange(evt) {\n      return handleChange('name', evt);\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_4__.AccountInput, {\n    value: state.email,\n    onChange: function onChange(evt) {\n      return handleChange('email', evt);\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_4__.PasswordInput, {\n    value: state.password,\n    onChange: function onChange(evt) {\n      return handleChange('password', evt);\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_4__.PasswordInput, {\n    placeholder: \"\\u5BC6\\u78BC\\u78BA\\u8A8D\",\n    value: state.repeatPassword,\n    onChange: function onChange(evt) {\n      return handleChange('repeatPassword', evt);\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Row, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Col, {\n    size: \"12\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Div, {\n    m: \"1rem\",\n    d: \"flex\",\n    flexDir: \"row\",\n    justify: \"flex-end\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Button, {\n    bg: \"warning700\",\n    hoverBg: \"warning800\",\n    rounded: \"circle\",\n    p: {\n      r: '1.5rem',\n      l: '1.5rem'\n    },\n    m: {\n      r: '.5rem'\n    },\n    shadow: \"3\",\n    hoverShadow: \"4\",\n    type: \"button\",\n    onClick: function onClick() {\n      return setFocusTab(0);\n    }\n  }, \"\\u5207\\u63DB\\u767B\\u5165\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(atomize__WEBPACK_IMPORTED_MODULE_3__.Button, {\n    bg: \"warning700\",\n    hoverBg: \"warning800\",\n    rounded: \"circle\",\n    p: {\n      r: '1.5rem',\n      l: '1.5rem'\n    },\n    shadow: \"3\",\n    hoverShadow: \"4\",\n    type: \"submit\"\n  }, \"\\u8A3B\\u518A\")))))));\n}\n\n//# sourceURL=webpack://time-note-frontend/./src/views/Login/index.jsx?");

/***/ })

}]);