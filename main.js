function formatIndex(indexStr) {
  var index = parseInt(indexStr, 10);
  if (index < 0) {
    return 6 + index;
  } else if (index > 5) {
    return index - 6;
  } else {
    return index;
  }
}

function setCurrentClass(element, offsets) {
  var oldClass = element.classList[1];
  var currentIndex = oldClass.split('-')[1];
  var index = formatIndex(offsets + parseInt(currentIndex, 10));

  element.classList.remove(oldClass);
  element.classList.add('position-' + index);
}

function setClass(offsets) {
  var card0 = document.getElementById('0');
  var card1 = document.getElementById('1');
  var card2 = document.getElementById('2');
  var card3 = document.getElementById('3');
  var card4 = document.getElementById('4');
  var card5 = document.getElementById('5');

  setCurrentClass(card0, offsets);
  setCurrentClass(card1, offsets);
  setCurrentClass(card2, offsets);
  setCurrentClass(card3, offsets);
  setCurrentClass(card4, offsets);
  setCurrentClass(card5, offsets);
}
function cardListion(element, id) {
  var currentIndex = element.classList[1].split('-')[1];
  if (currentIndex != 2) {
    setClass(2 - currentIndex);
  }
}

window.onload = function () {
  var homePage = document.getElementById('homePage');
  var card0 = document.getElementById('0');
  var card1 = document.getElementById('1');
  var card2 = document.getElementById('2');
  var card3 = document.getElementById('3');
  var card4 = document.getElementById('4');
  var card5 = document.getElementById('5');

  homePage.style = window.screen.height - 100 + 'px';

  card0.onclick = function() {
    cardListion(card0, 0);    
  };
  card1.onclick = function() {
    cardListion(card1, 1);    
  };
  card2.onclick = function() {
    cardListion(card2, 2);    
  };
  card3.onclick = function() {
    cardListion(card3, 3);    
  };
  card4.onclick = function() {
    cardListion(card4, 4);    
  };
  card5.onclick = function() {
    cardListion(card5, 5);    
  };
};
