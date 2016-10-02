// Data for creating link boxes
var linkData = [
  {
    header: 'Reddit',
    links: [
      {title: 'front', link: 'https://www.reddit.com'},
      {title: 'r/webdev', link: 'https://www.reddit.com/r/webdev'},
      {title: 'r/civ', link: 'https://www.reddit.com/r/civ'}
    ]
  }
];

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

function $setClass(target, className) {
  target.className = className;
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


/* module for creating link boxes */
var linkBoxes = (function() {
  var linkRoot = $qs(document, '#links-root');
  var node = document.createTextNode("Hello world");
  var bootstrapClasses = 'col-xs-12 col-sm-12 col-md-4 col-lg-3';
  var asdf = $newElement(document, 'div')

  function setLinkList(links) {
    var linkBodyList = $newElement(document, 'ul');
    links.map(function(link) {
      var listObj = $newElement(document, 'li');
      var listLink = $newElement(document, 'a');
      listLink.href = link.link;
      listLink.textContent = link.title;
      $append(listObj, listLink);
      $append(linkBodyList, listObj);
    })
    return linkBodyList;
  }

  //setLinkBody for link box
  function setLinkBody(links) {
    var linkBodyDiv = $newElement(document, 'div');
    $addClass(linkBodyDiv, 'link-body');
    var linkBodyList = setLinkList(links);
    $append(linkBodyDiv, linkBodyList);
    return linkBodyDiv;
  }

  //sets header for link box
  function setLinkHeader(headerText) {
    var linkHeaderDiv = $newElement(document, 'div');
    $addClass(linkHeaderDiv, 'link-header');
    var linkHeaderText = $newElement(document, 'h2');
    linkHeaderText.textContent = headerText;
    $append(linkHeaderDiv, linkHeaderText);
    return linkHeaderDiv;
  };

  // sets link box
  function setLinkBoxes() {
    linkData.map( function(link) {
      var newLinkBox = $newElement(document, 'div');
      $setClass(newLinkBox, bootstrapClasses);
      $append(newLinkBox, setLinkHeader(link.header));
      $append(newLinkBox, setLinkBody(link.links));
      $append(linkRoot, newLinkBox);
    });
  };

  return {
    setLinkBoxes: setLinkBoxes
  };
})();

searchBox.init();
linkBoxes.setLinkBoxes();
