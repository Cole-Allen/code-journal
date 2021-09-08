/* global data */
/* exported data */
function createEntry(entry) {
  var $li = document.createElement('li');
  var $imgCon = document.createElement('div');
  var $textCon = document.createElement('div');
  var $img = document.createElement('img');
  var $textH = document.createElement('h2');
  var $textP = document.createElement('p');

  $li.setAttribute('class', 'entry row column-full');
  $imgCon.setAttribute('class', 'img-container column-half');
  $textCon.setAttribute('class', 'img-container column-half');

  $img.setAttribute('src', entry.imageURL);

  $textH.textContent = entry.title;
  $textP.textContent = entry.text;

  $li.appendChild($imgCon);
  $li.appendChild($textCon);
  $imgCon.appendChild($img);
  $textCon.appendChild($textH);
  $textCon.appendChild($textP);

  return $li;
}

window.addEventListener('DOMContentLoaded', function (event) {

});
