// Data for creating link boxes
var linkData = [
  {
    header: 'Dev',
    links: [
      {title: 'github', link: 'https://www.github.com'},
      {title: 'codepen', link: 'https://www.codepen.io'},
      {title: 'freecodecamp', link: 'https://www.freecodecamp.com'},
      {title: 'stackoverflow', link: 'http://stackoverflow.com/'}
    ]
  },
  {
    header: 'Admin',
    links: [
      {title: 'google domains', link: 'https://domains.google'},
      {title: 'namecheap', link: 'https://www.namecheap.com/'},
      {title: 'digitalocean', link: 'https://www.digitalocean.com/'},
      {title: 'heroku', link: 'https://dashboard.heroku.com/apps'}
    ]
  },
  {
    header: 'Reddit',
    links: [
      {title: 'front', link: 'https://www.reddit.com'},
      {title: 'r/webdev', link: 'https://www.reddit.com/r/webdev'},
      {title: 'r/civ', link: 'https://www.reddit.com/r/civ'},
      {title: 'r/television', link: 'https://www.reddit.com/r/television'}
    ]
  },
  {
    header: 'Social Media',
    links: [
      {title: 'facebook', link: 'https://www.facebook.com'},
      {title: 'linkedin', link: 'https://www.linkedin.com'},
      {title: 'meetup', link: 'https://www.meetup.com'},
      {title: 'discord', link: 'https://discordapp.com/'}
    ]
  }
];

// query strings bases
var searchStrings = {
  Google: 'https://www.google.com/search?q=',
  Youtube: 'https://www.youtube.com/results?search_query=',
  Amazon: 'https://smile.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=',
  IMDB: 'http://www.imdb.com/find?ref_=nv_sr_fn&q='
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

// helper function for query selector
function $qsa(target, selectors) {
  return target.querySelectorAll(selectors);
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

// helper function to set a class
function $setClass(target, className) {
  target.className = className;
}

/* module for searching */
var searchBox = (function() {
  var inputString = $qs(document, '.form-control');
  var searchVal = $qs(document, '#search-val');
  var searchButton = $qs(document, '#search-button');
  var dropdown = $qs(document, '#search-dropdown');
  var ENTERKEY = 13;

  // handles search event by redirecting to search link
  function handleSearch() {
    var newWindowLoc;
    var query = inputString.value;

    if (/^r \w/.test(query)) {
      newWindowLoc = 'https://www.reddit.com/r/' + query.split(' ')[1];
    } else if (/^:def \w/.test(query)) {
      newWindowLoc = 'http://www.dictionary.com/browse/' + query.split(' ')[1];
    } else {
      newWindowLoc = searchStrings[searchVal.textContent] +
                      query.split(' ').join('+');
    }

    window.location.href = newWindowLoc;
  }

  // sets the list elements for the dropdown
  function setDropdownItems() {
    for (key in searchStrings) {
      if (!searchStrings.hasOwnProperty(key)) {
        continue;
      }
      var dItem = $newElement(document, 'li');
      dItem.textContent = key;
      $on(dItem, 'click', function() {
        dropdownEventHandler(this.textContent);
        inputString.focus();
      });
      $append(dropdown, dItem);
    }
  }

  // sets event handlers for dropdown menu
  function dropdownEventHandler(value) {
    searchVal.textContent = value;
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
    setDropdownItems();
    setSearchEventHandlers();
  }

  return {
    init: init
  };
})();


/* module for creating link boxes */
var linkBoxes = (function() {
  var linkRoot = $qs(document, '#links-root');
  var bootstrapClasses = 'col-xs-12 col-sm-12 col-md-4 col-lg-3';

  // sets singular link
  function setLink(title, link) {
    var newLink = $newElement(document, 'a');
    newLink.textContent = title;
    newLink.href = link;
    return newLink;
  }

  // sets list of links
  function setLinkList(links) {
    var linkBodyList = $newElement(document, 'ul');
    links.map(function(l) {
      var listObj = $newElement(document, 'li');
      $append(listObj, setLink(l.title, l.link));
      $append(linkBodyList, listObj);
    })
    return linkBodyList;
  }

  //sets body for link box
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
  }

  // sets link box
  function setLinkBoxes() {
    linkData.map( function(link) {
      var newLinkBox = $newElement(document, 'div');
      $setClass(newLinkBox, bootstrapClasses);
      $append(newLinkBox, setLinkHeader(link.header));
      $append(newLinkBox, setLinkBody(link.links));
      $append(linkRoot, newLinkBox);
    });
  }

  return {
    setLinkBoxes: setLinkBoxes
  };
})();

searchBox.init();
linkBoxes.setLinkBoxes();
