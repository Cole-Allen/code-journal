/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photoURL');
var $photo = document.querySelector('#img');
var $form = document.querySelector('#entry-form');

$photoUrl.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {};

  entry.title = document.forms[0].title.value;
  entry.photoURL = document.forms[0].photoURL.value;
  entry.notes = document.forms[0].notes.value;
  entry.entryID = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(entry);
  $form.reset();
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
});

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
