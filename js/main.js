/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photoURL');
var $photo = document.querySelector('#img');
var $form = document.querySelector('#entry-form');
var $entriesCon = document.querySelector('.entries-container');

var $navAnchor = document.querySelector('.navbar');
var $dataViewList = document.querySelectorAll('.data-view');
var $newEntryButton = document.querySelector('.newButton');

switchViews(data.view);

if (data.view === 'entry-form' && data.editing) {
  editEntriesPage(data.editing);
}

$photoUrl.addEventListener('input', function (event) {
  $photo.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing) {
    data.entries[data.entries.length - data.editing.entryID] = editEntry(data.editing);
    switchViews('entries');
    refreshEntries(event);
    data.editing = null;
    refreshEditForm(event);
    $form.reset();
  } else {
    var entry = createEntryData(event);
    data.entries.unshift(entry);
    $form.reset();
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
    switchViews('entries');
    refreshEntries(event);
    refreshEditForm(event);
  }
});

window.addEventListener('DOMContentLoaded', createEntries);

$navAnchor.addEventListener('click', function (event) {
  if (event.target.getAttribute('class').includes('tab')) {
    data.editing = null;
    refreshEditForm(event);
    switchViews(event.target.getAttribute('data-view'));
  }

});

$newEntryButton.addEventListener('click', function (event) {
  data.editing = null;
  refreshEditForm(event);
  switchViews(event.target.getAttribute('data-view'));
});

$entriesCon.addEventListener('click', function (event) {
  if (event.target.getAttribute('class') === 'fas fa-pen icon') {
    switchViews('entry-form');
    data.editing = data.entries[data.entries.length - event.target.parentNode.parentNode.parentNode.getAttribute('data-entry-id')];
    editEntriesPage(data.editing);
  }
});

function createEntryData(event) {
  var entry = {};
  entry.title = document.forms[0].title.value;
  entry.photoURL = document.forms[0].photoURL.value;
  entry.notes = document.forms[0].notes.value;
  entry.entryID = data.nextEntryId;
  data.nextEntryId++;
  return entry;
}

function editEntry(entry) {
  entry.title = document.forms[0].title.value;
  entry.photoURL = document.forms[0].photoURL.value;
  entry.notes = document.forms[0].notes.value;
  return entry;
}

function createEntry(entry) {
  var $li = document.createElement('li');
  var $imgCon = document.createElement('div');
  var $textCon = document.createElement('div');
  var $img = document.createElement('img');
  var $titleCon = document.createElement('div');
  var $textH = document.createElement('h2');
  var $editIcon = document.createElement('i');
  var $textP = document.createElement('p');

  $li.setAttribute('class', 'entry row column-full');
  $imgCon.setAttribute('class', 'img-container column-half');
  $titleCon.setAttribute('class', 'entry-title-container row');
  $editIcon.setAttribute('class', 'fas fa-pen icon');
  $textCon.setAttribute('class', 'text-container column-half');

  $img.setAttribute('src', entry.photoURL);

  $textH.textContent = entry.title;
  $textP.textContent = entry.notes;

  $li.setAttribute('data-entry-id', entry.entryID);

  $li.appendChild($imgCon);
  $li.appendChild($textCon);
  $imgCon.appendChild($img);
  $titleCon.appendChild($textH);
  $titleCon.appendChild($editIcon);
  $textCon.appendChild($titleCon);
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

function editEntriesPage(entry) {
  $form.querySelector('h1').textContent = 'Edit Entry';
  $form.querySelector('#img').setAttribute('src', entry.photoURL);
  document.forms[0].title.setAttribute('value', entry.title);
  document.forms[0].photoURL.setAttribute('value', entry.photoURL);
  document.forms[0].notes.textContent = entry.notes;
}

function refreshEditForm(event) {

  $form.querySelector('h1').textContent = 'New Entry';
  $form.querySelector('#img').setAttribute('src', 'images/placeholder-image-square.jpg');
  document.forms[0].title.removeAttribute('value');
  document.forms[0].photoURL.removeAttribute('value');
  document.forms[0].notes.textContent = '';
}

function switchViews(target) {
  window.scrollTo(0, 0);
  for (var i = 0; i < $dataViewList.length; i++) {
    $dataViewList[i].classList.add('hidden');
    var viewListAtt = $dataViewList[i].getAttribute('data-view');
    if (target === viewListAtt) {
      $dataViewList[i].classList.remove('hidden');
      data.view = $dataViewList[i].getAttribute('data-view');
    }
  }
}
