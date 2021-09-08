/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photoURL');
var $photo = document.querySelector('#img');
var $form = document.querySelector('#entry-form');
var $entriesCon = document.querySelector('.entries-container');

var $navAnchor = document.querySelector('.navbar');
var $dataViewList = document.querySelectorAll('.data-view');
var $newEntryButton = document.querySelector('.newButton');

for (var i = 0; i < $dataViewList.length; i++) {
  $dataViewList[i].classList.add('hidden');
  if ($dataViewList[i].getAttribute('data-view') === data.view) {
    $dataViewList[i].classList.remove('hidden');
  }
}

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
  for (var i = 0; i < $dataViewList.length; i++) {
    $dataViewList[i].classList.add('hidden');
    if ($dataViewList[i].getAttribute('data-view') === 'entries') {
      $dataViewList[i].classList.remove('hidden');
      data.view = 'entries';
    }
  }
  refreshEntries(event);
});

window.addEventListener('DOMContentLoaded', createEntries);

$navAnchor.addEventListener('click', switchViews);
$newEntryButton.addEventListener('click', switchViews);

function createEntry(entry) {
  var $li = document.createElement('li');
  var $imgCon = document.createElement('div');
  var $textCon = document.createElement('div');
  var $img = document.createElement('img');
  var $textH = document.createElement('h2');
  var $textP = document.createElement('p');

  $li.setAttribute('class', 'entry row column-full');
  $imgCon.setAttribute('class', 'img-container column-half');
  $textCon.setAttribute('class', 'text-container column-half');

  $img.setAttribute('src', entry.photoURL);

  $textH.textContent = entry.title;
  $textP.textContent = entry.notes;

  $li.appendChild($imgCon);
  $li.appendChild($textCon);
  $imgCon.appendChild($img);
  $textCon.appendChild($textH);
  $textCon.appendChild($textP);

  return $li;
}

function createEntries(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entryLi = createEntry(data.entries[i]);
    $entriesCon.appendChild(entryLi);
  }
}

function refreshEntries(event) {
  while ($entriesCon.firstChild) {
    $entriesCon.removeChild($entriesCon.firstChild);
  }
  createEntries(event);
}

function switchViews(event) {
  for (var i = 0; i < $dataViewList.length; i++) {
    $dataViewList[i].classList.add('hidden');
    if (event.target.getAttribute('data-view') === $dataViewList[i].getAttribute('data-view')) {
      $dataViewList[i].classList.remove('hidden');
      data.view = $dataViewList[i].getAttribute('data-view');
    }
  }
}
