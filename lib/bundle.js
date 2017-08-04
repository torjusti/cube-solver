(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cube-solver", [], factory);
	else if(typeof exports === 'object')
		exports["cube-solver"] = factory();
	else
		root["cube-solver"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var factorials = [];

var factorial = exports.factorial = function factorial(n) {
  if (n === 0 || n == 1) {
    return 1;
  }

  if (factorials[n] > 0) {
    return factorials[n];
  }

  factorials[n] = factorial(n - 1) * n;

  return factorials[n];
};

var binomials = [];

var choose = exports.choose = function choose(n, k) {
  if (k > n) {
    return 0;
  }

  while (n >= binomials.length) {
    var s = binomials.length,
        nextRow = [];

    nextRow[0] = 1;

    for (var i = 1, prev = s - 1; i < s; i += 1) {
      nextRow[i] = binomials[prev][i - 1] + binomials[prev][i];
    }

    nextRow[s] = 1;

    binomials.push(nextRow);
  }

  return binomials[n][k];
};

var cartesian = exports.cartesian = function cartesian(arg) {
  var result = [],
      max = arg.length - 1;

  var helper = function helper(arr, i) {
    for (var j = 0; j < arg[i].length; j += 1) {
      var copy = arr.slice(0);

      copy.push(arg[i][j]);

      if (i === max) {
        result.push(copy);
      } else {
        helper(copy, i + 1);
      }
    }
  };

  helper([], 0);

  return result;
};

var getRandomInt = exports.getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPermutationFromIndex = exports.getIndexFromPermutation = exports.getParity = exports.getOrientationFromIndex = exports.getIndexFromOrientation = undefined;

var _tools = __webpack_require__(0);

var rotateLeft = function rotateLeft(pieces, left, right) {
  var original = pieces[left];

  for (var i = left; i < right; i += 1) {
    pieces[i] = pieces[i + 1];
  }

  pieces[right] = original;
};

var rotateRight = function rotateRight(pieces, left, right) {
  var original = pieces[right];

  for (var i = right; i > left; i -= 1) {
    pieces[i] = pieces[i - 1];
  }

  pieces[left] = original;
};

var getIndexFromOrientation = exports.getIndexFromOrientation = function getIndexFromOrientation(pieces, flipCount) {
  var sum = 0;

  for (var i = 0; i < pieces.length - 1; i += 1) {
    sum = flipCount * sum + pieces[i];
  }

  return sum;
};

var getOrientationFromIndex = exports.getOrientationFromIndex = function getOrientationFromIndex(index, numPieces, numFlips) {
  var orientation = [];

  var parity = 0;

  for (var i = numPieces - 2; i >= 0; i -= 1) {
    var ori = index % numFlips;
    index = Math.floor(index / numFlips);
    orientation[i] = ori;
    parity += ori;
  }

  orientation[numPieces - 1] = (numFlips - parity % numFlips) % numFlips;

  return orientation;
};

var getParity = exports.getParity = function getParity(pieces) {
  var sum = 0;

  for (var i = pieces.length - 1; i > 0; i -= 1) {
    for (var j = i - 1; j >= 0; j -= 1) {
      if (pieces[j] > pieces[i]) {
        sum += 1;
      }
    }
  }

  return sum % 2;
};

var getIndexFromPermutation = exports.getIndexFromPermutation = function getIndexFromPermutation(pieces, affected) {
  var reversed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var position = 0,
      k = 1,
      offset = pieces.length - 1;

  var edges = [];

  if (reversed) {
    for (var n = pieces.length - 1; n >= 0; n -= 1) {
      if (affected.indexOf(pieces[n]) >= 0) {
        offset = Math.min(offset, pieces[n]);
        position += (0, _tools.choose)(pieces.length - 1 - n, k);
        edges.unshift(pieces[n]);
        k += 1;
      }
    }
  } else {
    for (var _n = 0; _n < pieces.length; _n += 1) {
      if (affected.indexOf(pieces[_n]) >= 0) {
        offset = Math.min(offset, pieces[_n]);
        position += (0, _tools.choose)(_n, k);
        edges.push(pieces[_n]);
        k += 1;
      }
    }
  }

  var permutation = 0;

  for (var i = edges.length - 1; i > 0; i -= 1) {
    var s = 0;

    while (edges[i] != affected[i]) {
      rotateLeft(edges, 0, i);
      s += 1;
    }

    permutation = (i + 1) * permutation + s;
  }

  return (0, _tools.factorial)(affected.length) * position + permutation;
};

var getPermutationFromIndex = exports.getPermutationFromIndex = function getPermutationFromIndex(index, affected, size) {
  var reversed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var base = (0, _tools.factorial)(affected.length);

  var position = Math.floor(index / base);
  var permutation = index % base;

  var pieces = [];

  for (var i = 0; i < size; i += 1) {
    pieces.push(-1);
  }

  for (var _i = 1; _i < affected.length; _i += 1) {
    var s = permutation % (_i + 1);
    permutation = Math.floor(permutation / (_i + 1));

    while (s > 0) {
      rotateRight(affected, 0, _i);
      s -= 1;
    }
  }

  var k = affected.length - 1;

  if (reversed) {
    for (var n = 0; n < size; n += 1) {
      var binomial = (0, _tools.choose)(size - 1 - n, k + 1);

      if (position - binomial >= 0) {
        pieces[n] = affected[affected.length - 1 - k];
        position -= binomial;
        k -= 1;
      }
    }
  } else {
    for (var _n2 = size - 1; _n2 >= 0; _n2 -= 1) {
      var _binomial = (0, _tools.choose)(_n2, k + 1);

      if (position - _binomial >= 0) {
        pieces[_n2] = affected[k];
        position -= _binomial;
        k -= 1;
      }
    }
  }

  return pieces;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _coordinates = __webpack_require__(1);

var _cube = __webpack_require__(3);

var _tools = __webpack_require__(0);

var _algorithms = __webpack_require__(4);

var _MoveTable = __webpack_require__(5);

var _MoveTable2 = _interopRequireDefault(_MoveTable);

var _Search2 = __webpack_require__(6);

var _Search3 = _interopRequireDefault(_Search2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var phaseTwoMoves = [1, 10, 4, 13, 6, 7, 8, 15, 16, 17];

var parity = void 0,
    URFToDLF = void 0,
    slice = void 0,
    merge = void 0;

var phaseOneTables = function phaseOneTables() {
  parity = new _MoveTable2.default({
    name: 'parity',

    size: 2,

    table: [[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]]
  });

  URFToDLF = (0, _MoveTable.createCornerPermutationTable)({
    name: 'URFToDLF',
    affected: [0, 1, 2, 3, 4, 5]
  });

  slice = (0, _MoveTable.createEdgePermutationTable)({
    name: 'slice',
    affected: [8, 9, 10, 11],
    reversed: true
  });

  phaseTwo.initialize();

  return {
    moveTables: [new _MoveTable2.default({
      name: 'slicePosition',
      size: 495,
      table: slice.table,
      doMove: function doMove(table, index, move) {
        return Math.floor(table[index * 24][move] / 24);
      }
    }), (0, _MoveTable.createCornerOrientationTable)({
      name: 'twist',
      affected: [0, 1, 2, 3, 4, 5, 6, 7]
    }), (0, _MoveTable.createEdgeOrientationTable)({
      name: 'flip',
      affected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }), slice, parity, URFToDLF, (0, _MoveTable.createEdgePermutationTable)({
      name: 'URToUL',
      affected: [0, 1, 2]
    }), (0, _MoveTable.createEdgePermutationTable)({
      name: 'UBToDF',
      affected: [3, 4, 5]
    })],

    pruningTables: [['slicePosition', 'flip'], ['slicePosition', 'twist']]
  };
};

var phaseTwoTables = function phaseTwoTables() {
  var getMergeCoord = function getMergeCoord(x, y) {
    var a = (0, _coordinates.getPermutationFromIndex)(x, [0, 1, 2], 12);
    var b = (0, _coordinates.getPermutationFromIndex)(y, [3, 4, 5], 12);

    for (var i = 0; i < 8; i += 1) {
      if (a[i] !== -1) {
        if (b[i] !== -1) {
          return -1;
        } else {
          b[i] = a[i];
        }
      }
    }

    return (0, _coordinates.getIndexFromPermutation)(b, [0, 1, 2, 3, 4, 5]);
  };

  merge = [];

  for (var i = 0; i < 336; i += 1) {
    merge.push([]);

    for (var j = 0; j < 336; j += 1) {
      merge[i][j] = getMergeCoord(i, j);
    }
  }

  return {
    moveTables: [new _MoveTable2.default({
      name: 'slicePermutation',
      size: 24,
      table: slice.table
    }), parity, URFToDLF, (0, _MoveTable.createEdgePermutationTable)({
      name: 'URToDF',
      size: 20160,
      moves: phaseTwoMoves,
      affected: [0, 1, 2, 3, 4, 5]
    })],

    pruningTables: [['slicePermutation', 'parity', 'URFToDLF'], ['slicePermutation', 'parity', 'URToDF']]
  };
};

var PhaseOneSearch = function (_Search) {
  _inherits(PhaseOneSearch, _Search);

  function PhaseOneSearch() {
    _classCallCheck(this, PhaseOneSearch);

    var _this = _possibleConstructorReturn(this, (PhaseOneSearch.__proto__ || Object.getPrototypeOf(PhaseOneSearch)).apply(this, arguments));

    _this.maxDepth = 22;
    _this.solution = null;
    return _this;
  }

  _createClass(PhaseOneSearch, [{
    key: 'handleSolution',
    value: function handleSolution(solution, indexes) {
      var lastMove = solution.slice(-1)[0];

      if (lastMove % 2 == 0 && Math.floor(lastMove / 3) === 6 && Math.floor(lastMove / 3) === 15) {
        return;
      }

      var phaseTwoSolution = phaseTwo.solve({
        indexes: [indexes[3], indexes[4], indexes[5], merge[indexes[6]][indexes[7]]],

        maxDepth: this.maxDepth - solution.length,

        lastMove: lastMove,

        format: false
      });

      if (phaseTwoSolution) {
        this.solution = solution.concat(phaseTwoSolution.solution);

        if (this.maxDepth <= this.settings.maxDepth) {
          return {
            solution: this.solution,
            indexes: indexes
          };
        }

        this.maxDepth = this.solution.length - 1;
      }
    }
  }]);

  return PhaseOneSearch;
}(_Search3.default);

var phaseOne = new PhaseOneSearch(phaseOneTables);

var phaseTwo = new _Search3.default(phaseTwoTables, phaseTwoMoves);

var kociemba = function kociemba(scramble) {
  var maxDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 22;

  if (Array.isArray(scramble)) {
    return (0, _algorithms.formatAlgorithm)(phaseOne.solve({
      indexes: scramble,
      format: false,
      maxDepth: maxDepth
    }).solution);
  }

  return (0, _algorithms.formatAlgorithm)(phaseOne.solve({
    scramble: scramble,
    format: false,
    maxDepth: maxDepth
  }).solution);
};

exports.default = kociemba;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var edgeMoves = [[1, 8, 5, 9], [0, 11, 4, 8], [1, 2, 3, 0], [3, 10, 7, 11], [2, 9, 6, 10], [5, 4, 7, 6]];

var cornerPermutationMoves = [[1, 5, 2, 3, 0, 4, 6, 7], [4, 1, 2, 0, 7, 5, 6, 3], [3, 0, 1, 2, 4, 5, 6, 7], [0, 1, 3, 7, 4, 5, 2, 6], [0, 2, 6, 3, 4, 1, 5, 7], [0, 1, 2, 3, 5, 6, 7, 4]];

var cornerOrientationMoves = [[1, 2, 0, 0, 2, 1, 0, 0], [2, 0, 0, 1, 1, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 2, 0, 0, 2, 1], [0, 1, 2, 0, 0, 2, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]];

var rotateParts = function rotateParts(edges, elems) {
  var updatedPieces = edges.slice(0);

  updatedPieces[elems[0]] = edges[elems[elems.length - 1]];

  for (var i = 1; i < elems.length; i += 1) {
    updatedPieces[elems[i]] = edges[elems[i - 1]];
  }

  return updatedPieces;
};

var edgePermutationMove = exports.edgePermutationMove = function edgePermutationMove(pieces, moveIndex) {
  var move = edgeMoves[Math.floor(moveIndex / 3)];
  var pow = moveIndex % 3;

  for (var i = 0; i <= pow; i += 1) {
    pieces = rotateParts(pieces, move);
  }

  return pieces;
};

var edgeOrientationMove = exports.edgeOrientationMove = function edgeOrientationMove(pieces, moveIndex) {
  var moveNumber = Math.floor(moveIndex / 3);
  var move = edgeMoves[moveNumber];
  var pow = moveIndex % 3;

  var updatedPieces = edgePermutationMove(pieces, moveIndex);

  if ((moveNumber === 0 || moveNumber === 3) && pow % 2 === 0) {
    for (var i = 0; i < 4; i += 1) {
      updatedPieces[move[i]] = (updatedPieces[move[i]] + 1) % 2;
    }
  }

  return updatedPieces;
};

var cornerPermutationMove = exports.cornerPermutationMove = function cornerPermutationMove(pieces, moveIndex) {
  var move = cornerPermutationMoves[Math.floor(moveIndex / 3)];
  var pow = moveIndex % 3;

  for (var i = 0; i <= pow; i += 1) {
    var round = pieces.slice(0);

    for (var j = 0; j < 8; j += 1) {
      pieces[j] = round[move[j]];
    }
  }

  return pieces;
};

var cornerOrientationMove = exports.cornerOrientationMove = function cornerOrientationMove(pieces, moveIndex) {
  var move = Math.floor(moveIndex / 3);
  var pow = moveIndex % 3;

  for (var i = 0; i <= pow; i += 1) {
    var round = pieces.slice(0);

    for (var j = 0; j < 8; j += 1) {
      var from = cornerPermutationMoves[move][j];
      pieces[j] = (round[from] + cornerOrientationMoves[move][j]) % 3;
    }
  }

  return pieces;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var powers = {
  '': 0,
  '2': 1,
  '\'': 2
};

var parseAlgorithm = exports.parseAlgorithm = function parseAlgorithm(algorithm) {
  var result = [];

  var moves = algorithm.match(/[FRUBLD][2']?/g);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = moves[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var move = _step.value;

      var moveNum = 'FRUBLD'.indexOf(move.charAt(0));
      var pow = powers[move.charAt(1)];
      result.push(moveNum * 3 + pow);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

var formatAlgorithm = exports.formatAlgorithm = function formatAlgorithm(moves) {
  var sequence = '';

  moves.forEach(function (move) {
    sequence += ' ';
    sequence += 'FRUBLD'.charAt(Math.floor(move / 3));

    switch (move % 3) {
      case 1:
        sequence += '2';
        break;

      case 2:
        sequence += '\'';
        break;

      default:
    }
  });

  return sequence;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCornerOrientationTable = exports.createEdgeOrientationTable = exports.createEdgePermutationTable = exports.createCornerPermutationTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _coordinates = __webpack_require__(1);

var _cube = __webpack_require__(3);

var _tools = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createMoveHandler = function createMoveHandler(getVector, doMove, getIndex) {
  return function (index, move) {
    var vector = getVector(index);
    vector = doMove(vector, move);
    return getIndex(vector);
  };
};

var allMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

var MoveTable = function () {
  function MoveTable(settings) {
    var _this = this;

    _classCallCheck(this, MoveTable);

    // required if using the generic solver
    this.name = settings.name;
    this.size = settings.size; // hack: some tables override this

    this.defaultIndex = settings.defaultIndex || 0;
    this.solvedIndexes = settings.solvedIndexes || [this.defaultIndex];

    this.doMove = function (index, move) {
      if (settings.doMove) {
        return settings.doMove(_this.table, index, move);
      }

      return _this.table[index][move];
    };

    if (settings.table) {
      this.table = settings.table;
      return;
    }

    var cubieMove = createMoveHandler(settings.getVector, settings.cubieMove, settings.getIndex);

    this.createMoveTable(settings.size, cubieMove, settings.moves);
  }

  _createClass(MoveTable, [{
    key: 'createMoveTable',
    value: function createMoveTable(size, cubieMove) {
      var moves = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : allMoves;

      this.table = [];

      for (var i = 0; i < size; i += 1) {
        this.table.push([]);
      }

      for (var _i = 0; _i < size; _i += 1) {
        for (var j = 0; j < moves.length; j += 1) {
          var move = moves[j];

          if (!this.table[_i][move]) {
            var result = cubieMove(_i, move);
            var inverse = move - 2 * (move % 3) + 2;
            this.table[_i][move] = result;
            this.table[result][inverse] = _i;
          }
        }
      }
    }
  }]);

  return MoveTable;
}();

var createCornerPermutationTable = exports.createCornerPermutationTable = function createCornerPermutationTable(settings) {
  return new MoveTable({
    name: settings.name,
    moves: settings.moves,
    defaultIndex: (0, _coordinates.getIndexFromPermutation)([0, 1, 2, 3, 4, 5, 6, 7], settings.affected, settings.reversed),
    size: settings.size || (0, _tools.factorial)(8) / (0, _tools.factorial)(8 - settings.affected.length),
    getVector: function getVector(index) {
      return (0, _coordinates.getPermutationFromIndex)(index, settings.affected.slice(), 8, settings.reversed);
    },
    cubieMove: _cube.cornerPermutationMove,
    getIndex: function getIndex(pieces) {
      return (0, _coordinates.getIndexFromPermutation)(pieces, settings.affected, settings.reversed);
    }
  });
};

var createEdgePermutationTable = exports.createEdgePermutationTable = function createEdgePermutationTable(settings) {
  return new MoveTable({
    name: settings.name,
    moves: settings.moves,
    defaultIndex: (0, _coordinates.getIndexFromPermutation)([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], settings.affected, settings.reversed),
    size: settings.size || (0, _tools.factorial)(12) / (0, _tools.factorial)(12 - settings.affected.length),
    getVector: function getVector(index) {
      return (0, _coordinates.getPermutationFromIndex)(index, settings.affected.slice(), 12, settings.reversed);
    },
    cubieMove: _cube.edgePermutationMove,
    getIndex: function getIndex(pieces) {
      return (0, _coordinates.getIndexFromPermutation)(pieces, settings.affected, settings.reversed);
    }
  });
};

var getCorrectOrientations = function getCorrectOrientations(affected, numPieces, numStates) {
  var indexes = [];

  var size = Math.pow(numStates, numPieces - 1);

  var target = Math.pow(numStates, numPieces - affected.length - 1);

  var _loop = function _loop(i) {
    var orientation = (0, _coordinates.getOrientationFromIndex)(i, numPieces, numStates);

    if (affected.every(function (piece) {
      return orientation[piece] === 0;
    })) {
      indexes.push(i);
    }
  };

  for (var i = 0; i < size && indexes.length < target; i += 1) {
    _loop(i);
  }

  return indexes;
};

var createEdgeOrientationTable = exports.createEdgeOrientationTable = function createEdgeOrientationTable(settings) {
  return new MoveTable({
    name: settings.name,
    size: 2048,
    solvedIndexes: getCorrectOrientations(settings.affected, 12, 2),
    getVector: function getVector(index) {
      return (0, _coordinates.getOrientationFromIndex)(index, 12, 2);
    },
    cubieMove: _cube.edgeOrientationMove,
    getIndex: function getIndex(pieces) {
      return (0, _coordinates.getIndexFromOrientation)(pieces, 2);
    }
  });
};

var createCornerOrientationTable = exports.createCornerOrientationTable = function createCornerOrientationTable(settings) {
  return new MoveTable({
    name: settings.name,
    size: 2187,
    solvedIndexes: getCorrectOrientations(settings.affected, 8, 3),
    getVector: function getVector(index) {
      return (0, _coordinates.getOrientationFromIndex)(index, 8, 3);
    },
    cubieMove: _cube.cornerOrientationMove,
    getIndex: function getIndex(pieces) {
      return (0, _coordinates.getIndexFromOrientation)(pieces, 3);
    }
  });
};

exports.default = MoveTable;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _algorithms = __webpack_require__(4);

var _PruningTable = __webpack_require__(8);

var _PruningTable2 = _interopRequireDefault(_PruningTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

var Search = function () {
  function Search(createTables) {
    var moves = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : allMoves;

    _classCallCheck(this, Search);

    this.createTables = createTables;
    this.moves = moves;
  }

  _createClass(Search, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      this.initialized = true;

      var _createTables = this.createTables(),
          moveTables = _createTables.moveTables,
          pruningTables = _createTables.pruningTables;

      this.moveTables = moveTables;

      this.pruningTables = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var moveTableNames = _step.value;

          var moveTableIndexes = moveTableNames.map(function (name) {
            return _this.moveTables.map(function (table) {
              return table.name;
            }).indexOf(name);
          });

          moveTableIndexes.sort(function (a, b) {
            return _this.moveTables[a].size - _this.moveTables[b].size;
          });

          var moveTables = [];

          moveTableIndexes.forEach(function (i) {
            return moveTables.push(_this.moveTables[i]);
          });

          var pruningTable = new _PruningTable2.default(moveTables, _this.moves);

          _this.pruningTables.push({
            pruningTable: pruningTable,
            moveTableIndexes: moveTableIndexes
          });
        };

        for (var _iterator = pruningTables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'handleSolution',
    value: function handleSolution(solution, indexes) {
      return {
        solution: solution,
        indexes: indexes
      };
    }
  }, {
    key: 'search',
    value: function search(indexes, depth, lastMove, solution) {
      var minimumDistance = 0;

      for (var i = 0; i < this.pruningTables.length; i += 1) {
        var index = indexes[this.pruningTables[i].moveTableIndexes[0]],
            power = 1;

        for (var j = 1; j < this.pruningTables[i].moveTableIndexes.length; j += 1) {
          power *= this.moveTables[this.pruningTables[i].moveTableIndexes[j - 1]].size;
          index += indexes[this.pruningTables[i].moveTableIndexes[j]] * power;
        }

        var distance = this.pruningTables[i].pruningTable.getPruningValue(index);

        if (distance > depth) {
          return false;
        }

        // The true minimum distance to the solved indexes is
        // given by the pruning table with the largest distance.
        if (distance > minimumDistance) {
          minimumDistance = distance;
        }
      }

      if (minimumDistance === 0) {
        return this.handleSolution(solution, indexes);
      }

      if (depth > 0) {
        for (var _i = 0; _i < this.moves.length; _i += 1) {
          var move = this.moves[_i];

          if (Math.floor(move / 3) !== Math.floor(lastMove / 3) && Math.floor(move / 3) !== Math.floor(lastMove / 3) - 3) {
            var updatedIndexes = [];

            for (var _j = 0; _j < indexes.length; _j += 1) {
              updatedIndexes.push(this.moveTables[_j].doMove(indexes[_j], move));
            }

            var result = this.search(updatedIndexes, depth - 1, move, solution.concat([move]));

            if (result) {
              return result;
            }
          }
        }
      }

      return false;
    }
  }, {
    key: 'solve',
    value: function solve(settings) {
      var _this2 = this;

      if (!this.initialized) {
        this.initialize();
      }

      this.settings = Object.assign({
        maxDepth: 22, // For the Kociemba solver
        lastMove: null,
        format: true
      }, settings);

      var indexes = this.settings.indexes || [];

      if (this.settings.scramble) {
        var moves = (0, _algorithms.parseAlgorithm)(this.settings.scramble);

        for (var i = 0; i < this.moveTables.length; i += 1) {
          indexes.push(this.moveTables[i].defaultIndex);
        }

        moves.forEach(function (move) {
          for (var _i2 = 0; _i2 < indexes.length; _i2 += 1) {
            indexes[_i2] = _this2.moveTables[_i2].doMove(indexes[_i2], move);
          }
        });
      }

      for (var depth = 0; depth <= this.settings.maxDepth; depth += 1) {
        var solution = this.search(indexes, depth, this.settings.lastMove, []);

        if (solution) {
          return this.settings.format ? (0, _algorithms.formatAlgorithm)(solution.solution) : solution;
        }
      }

      return;
    }
  }]);

  return Search;
}();

exports.default = Search;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _kociemba = __webpack_require__(2);

var _kociemba2 = _interopRequireDefault(_kociemba);

var _scramble = __webpack_require__(9);

var _scramble2 = _interopRequireDefault(_scramble);

var _solvers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  solve: _kociemba2.default,
  getRandomScramble: _scramble2.default,
  crossSolver: _solvers.crossSolver,
  firstBlockSolver: _solvers.firstBlockSolver,
  EOLineSolver: _solvers.EOLineSolver
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tools = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PruningTable = function () {
  function PruningTable(moveTables) {
    var moves = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : allMoves;

    _classCallCheck(this, PruningTable);

    this.computePruningTable(moveTables, moves);
  }

  _createClass(PruningTable, [{
    key: 'setPruningValue',
    value: function setPruningValue(index, value) {
      this.table[index >> 3] ^= (0xf ^ value) << ((index & 7) << 2);
    }
  }, {
    key: 'getPruningValue',
    value: function getPruningValue(index) {
      return this.table[index >> 3] >> ((index & 7) << 2) & 0xf;
    }
  }, {
    key: 'computePruningTable',
    value: function computePruningTable(moveTables, moves) {
      var size = moveTables.reduce(function (acc, obj) {
        return acc * obj.size;
      }, 1);

      this.table = [];

      for (var i = 0; i < size + 7 >> 3; i += 1) {
        this.table.push(-1);
      }

      var depth = 0,
          done = 0;

      var powers = [1];

      for (var _i = 1; _i < moveTables.length; _i += 1) {
        powers.push(moveTables[_i - 1].size * powers[_i - 1]);
      }

      var permutations = (0, _tools.cartesian)(moveTables.map(function (data) {
        return data.solvedIndexes;
      }));

      for (var _i2 = 0; _i2 < permutations.length; _i2 += 1) {
        var index = 0;

        for (var j = 0; j < permutations[_i2].length; j += 1) {
          index += powers[j] * permutations[_i2][j];
        }

        this.setPruningValue(index, 0);

        done += 1;
      }

      while (done !== size) {
        var inverse = done > size / 2;
        var find = inverse ? 0xf : depth;
        var check = inverse ? depth : 0xf;

        depth += 1;

        var value = 0;

        for (var _index = 0; _index < size; _index += 1) {
          if (this.getPruningValue(_index) !== find) {
            continue;
          }

          for (var moveIndex = 0; moveIndex < moves.length; moveIndex += 1) {
            var move = moves[moveIndex];

            var currentIndex = _index,
                position = 0;

            for (var _i3 = powers.length - 1; _i3 >= 0; _i3 -= 1) {
              position += powers[_i3] * moveTables[_i3].doMove(Math.floor(currentIndex / powers[_i3]), move);
              currentIndex = currentIndex % powers[_i3];
            }

            if (this.getPruningValue(position) !== check) {
              continue;
            }

            done += 1;

            if (inverse) {
              this.setPruningValue(_index, depth);
              break;
            }

            this.setPruningValue(position, depth);
          }
        }
      }
    }
  }]);

  return PruningTable;
}();

exports.default = PruningTable;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _coordinates = __webpack_require__(1);

var _tools = __webpack_require__(0);

var _kociemba = __webpack_require__(2);

var _kociemba2 = _interopRequireDefault(_kociemba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRandomScramble = function getRandomScramble() {
  var eo = void 0,
      ep = void 0,
      co = void 0,
      cp = void 0;

  do {
    eo = (0, _coordinates.getOrientationFromIndex)((0, _tools.getRandomInt)(0, 2048), 12, 2);
    co = (0, _coordinates.getOrientationFromIndex)((0, _tools.getRandomInt)(0, 2187), 8, 3);
    ep = (0, _coordinates.getPermutationFromIndex)((0, _tools.getRandomInt)(0, 479001600), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12);
    cp = (0, _coordinates.getPermutationFromIndex)((0, _tools.getRandomInt)(0, 40320), [0, 1, 2, 3, 4, 5, 6, 7], 8);
  } while ((0, _coordinates.getParity)(ep) !== (0, _coordinates.getParity)(cp));

  var indexes = [Math.floor((0, _coordinates.getIndexFromPermutation)(ep, [8, 9, 10, 11], true) / 24), (0, _coordinates.getIndexFromOrientation)(co, 3), (0, _coordinates.getIndexFromOrientation)(eo, 2), (0, _coordinates.getIndexFromPermutation)(ep, [8, 9, 10, 11], true), (0, _coordinates.getParity)(cp), (0, _coordinates.getIndexFromPermutation)(cp, [0, 1, 2, 3, 4, 5]), (0, _coordinates.getIndexFromPermutation)(ep, [0, 1, 2]), (0, _coordinates.getIndexFromPermutation)(ep, [3, 4, 5])];

  return (0, _kociemba2.default)(indexes);
};

exports.default = getRandomScramble;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EOLineSolver = exports.firstBlockSolver = exports.crossSolver = undefined;

var _MoveTable = __webpack_require__(5);

var _MoveTable2 = _interopRequireDefault(_MoveTable);

var _Search = __webpack_require__(6);

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CrossSearch = new _Search2.default(function () {
  return {
    moveTables: [(0, _MoveTable.createEdgePermutationTable)({
      name: 'EdgePermutation',
      affected: [4, 5, 6, 7]
    }), (0, _MoveTable.createEdgeOrientationTable)({
      name: 'EdgeOrientation',
      affected: [4, 5, 6, 7]
    })],

    pruningTables: [['EdgePermutation'], ['EdgeOrientation']]
  };
});

var crossSolver = exports.crossSolver = function crossSolver(scramble) {
  return CrossSearch.solve({ scramble: scramble });
};

var FirstBlockSearch = new _Search2.default(function () {
  return {
    moveTables: [(0, _MoveTable.createEdgeOrientationTable)({
      name: 'EdgeOrientation',
      affected: [6, 9, 10]
    }), (0, _MoveTable.createCornerOrientationTable)({
      name: 'CornerOrientation',
      affected: [5, 6]
    }), (0, _MoveTable.createEdgePermutationTable)({
      name: 'EdgePermutation',
      affected: [6, 9, 10]
    }), (0, _MoveTable.createCornerPermutationTable)({
      name: 'CornerPermutation',
      affected: [5, 6]
    })],

    pruningTables: [['EdgeOrientation', 'CornerPermutation'], ['CornerOrientation', 'CornerPermutation'], ['EdgePermutation', 'CornerPermutation']]
  };
});

var firstBlockSolver = exports.firstBlockSolver = function firstBlockSolver(scramble) {
  return FirstBlockSearch.solve({ scramble: scramble });
};

var EOLineSearch = new _Search2.default(function () {
  return {
    moveTables: [(0, _MoveTable.createEdgeOrientationTable)({
      name: 'EdgeOrientation',
      affected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }), (0, _MoveTable.createEdgePermutationTable)({
      name: 'EdgePermutation',
      affected: [5, 7]
    })],

    pruningTables: [['EdgeOrientation'], ['EdgePermutation']]
  };
});

var EOLineSolver = exports.EOLineSolver = function EOLineSolver(scramble) {
  return EOLineSearch.solve({ scramble: scramble });
};

/***/ })
/******/ ]);
});