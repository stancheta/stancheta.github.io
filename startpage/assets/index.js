// query strings bases
var searchStrings = {
  Google: 'https://www.google.com/search?q='
};

/* helpers */

// helper function for event listener
function $on(target, type, callback) {
  target.addEventListener(type, callback, false);
}

// helper function for query selector
function $qs(target, selectors) {
  return target.querySelector(selectors);
}

// helper function to append children
function $append(target, child) {
  target.appendChild(child);
}

// helper to create element nodes
function $newElement(target, element) {
  return target.createElement(element);
}

// helper to create new text nodes
function $newText(target, text) {
  return target.createTextNode(text);
}

// helper function to add classes
function $addClass(target, className) {
  target.classList.add(className);
}

/* module for searching */
var searchBox = (function() {
  var inputString = $qs(document, '.form-control');
  var searchVal = $qs(document, '#search-val');
  var searchButton = $qs(document, '#search-button');
  var ENTERKEY = 13;

  // handles search event by redirecting to search link
  function handleSearch() {
    window.location.href = searchStrings[searchVal.textContent] +
                            inputString.value.split(' ').join('+');
  }

  // set events for search bar
  function setSearchEventHandlers() {
    $on(document, 'keydown', function(event) {
      if (event.which === ENTERKEY) {
        handleSearch();
      }
    });
    $on(searchButton, 'click', handleSearch);
  }

  // initializes module
  function init() {
    setSearchEventHandlers();
  };

  return {
    init: init
  };
})();

searchBox.init();
