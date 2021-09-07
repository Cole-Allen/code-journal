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
