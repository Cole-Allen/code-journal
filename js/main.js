/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photoURL');
var $photo = document.querySelector('#img');
var $form = document.querySelector('#entry-form');
var $entriesCon = document.querySelector('.entries-container');

var $navAnchor = document.querySelector('.navbar');
var $dataViewList = document.querySelectorAll('.data-view');
var $newEntryButton = document.querySelector('.newButton');

var $deleteButton = document.querySelector('#delete-button');
var $cancelDeleteButton = document.querySelector('.modal-cancel');
var $confirmDeleteButton = document.querySelector('.modal-confirm');

var $sortbySelect = document.querySelector('#sort-by');

switchViews(data.view);

if (data.view === 'entry-form' && data.editing) {
  editEntriesPage(data.editing);
}

$sortbySelect.addEventListener('change', function (event) {
  if (event.target.value === 'oldest') {
    createEntriesOldest(event);
  } else if (event.target.value === 'newest') {
    createEntries(event);
  }

});

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
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID.toString() === event.target.parentNode.parentNode.parentNode.getAttribute('data-entry-id')) {
        data.editing = data.entries[i];
      }
    }
    if (data.editing) {
      editEntriesPage(data.editing);
    }

  }
});

$deleteButton.addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('.modal').classList.remove('hidden');
});

$cancelDeleteButton.addEventListener('click', function (event) {
  document.querySelector('.modal').classList.add('hidden');
});

$confirmDeleteButton.addEventListener('click', function (event) {
  deleteEntry(data.editing);
  document.querySelector('.modal').classList.add('hidden');
});

function createEntryData(event) {
  var entry = {};
  entry.title = document.forms[0].title.value;
  entry.photoURL = document.forms[0].photoURL.value;
  entry.notes = document.forms[0].notes.value;
  entry.entryID = data.nextEntryId;
  var date = new Date();
  entry.date = [date.getMonth(), date.getDate(), date.getFullYear(), date.getHours(), date.getMinutes()];
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
  var $dateT = document.createElement('h6');

  $li.setAttribute('class', 'entry row column-full');
  $imgCon.setAttribute('class', 'img-container column-half');
  $titleCon.setAttribute('class', 'entry-title-container row');
  $editIcon.setAttribute('class', 'fas fa-pen icon');
  $textCon.setAttribute('class', 'text-container column-half');
  $dateT.setAttribute('class', 'date');

  $img.setAttribute('src', entry.photoURL);

  $textH.textContent = entry.title;
  $textP.textContent = entry.notes;

  $li.setAttribute('data-entry-id', entry.entryID);

  $li.appendChild($imgCon);
  $li.appendChild($textCon);
  $imgCon.appendChild($img);
  $titleCon.appendChild($textH);

  $titleCon.appendChild($editIcon);
  if (entry.date) {
    $dateT.textContent = entry.date[3] + ':' + entry.date[4] + '     ' + entry.date[0] + '/' + entry.date[1] + '/' + entry.date[2];
    $titleCon.appendChild($dateT);
  }

  $textCon.appendChild($titleCon);
  $textCon.appendChild($textP);

  return $li;
}

function createEntries(event) {
  removeDisplayEntries(event);
  for (var i = 0; i < data.entries.length; i++) {
    var entryLi = createEntry(data.entries[i]);
    $entriesCon.appendChild(entryLi);
  }
}

function createEntriesOldest(event) {
  removeDisplayEntries(event);
  for (var i = data.entries.length - 1; i > -1; i--) {

    $entriesCon.appendChild(createEntry(data.entries[i]));
  }
}

function deleteEntry(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === entry.entryID) {
      data.entries.splice(i, 1);
    }
  }
  $form.reset();
  refreshEditForm(event);
  switchViews('entries');

  refreshEntries(event);
}

function refreshEntries(event) {
  removeDisplayEntries(event);
  createEntries(event);
}

function removeDisplayEntries(event) {
  while ($entriesCon.firstChild) {
    $entriesCon.removeChild($entriesCon.firstChild);
  }
}

function editEntriesPage(entry) {
  $form.querySelector('h1').textContent = 'Edit Entry';
  $form.querySelector('#img').setAttribute('src', entry.photoURL);
  $form.querySelector('.delete-button').classList.remove('hidden');
  $form.querySelector('.button-container').classList.remove('save');
  $form.querySelector('.button-container').classList.add('save-delete');
  document.forms[0].title.setAttribute('value', entry.title);
  document.forms[0].photoURL.setAttribute('value', entry.photoURL);
  document.forms[0].notes.textContent = entry.notes;

}

function refreshEditForm(event) {

  $form.querySelector('h1').textContent = 'New Entry';
  $form.querySelector('#img').setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.querySelector('.delete-button').classList.add('hidden');
  $form.querySelector('.button-container').classList.add('save');
  $form.querySelector('.button-container').classList.remove('save-delete');
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
