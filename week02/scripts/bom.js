const input   = document.querySelector('#favchap');
const button  = document.querySelector('#add-btn');
const list    = document.querySelector('#chapter-list');
const counter = document.querySelector('#entry-count');
const warning = document.querySelector('#warning');

const MAX_ENTRIES = 10;


const BOM_BOOKS = [
  '1 Nephi', '2 Nephi', 'Jacob', 'Enos', 'Jarom', 'Omni',
  'Words of Mormon', 'Mosiah', 'Alma', 'Helaman',
  '3 Nephi', '4 Nephi', 'Mormon', 'Ether', 'Moroni'
];

function formatEntry(raw) {
  let value = raw.replace(/\s+/g, ' ').trim();
  value = value.replace(/([a-zA-Z])(\d)/, '$1 $2');
  value = value.replace(/\b([a-zA-Z]+)/g, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return value;
}

function extractBook(entry) {
  const numbered = entry.match(/^(\d+\s+[A-Z][a-z]+)/);
  if (numbered) return numbered[1];
  const plain = entry.match(/^([A-Z][a-zA-Z\s]*?)(?:\s+\d+)?$/);
  return plain ? plain[1].trim() : '';
}

function showWarning(msg) {
  warning.textContent = msg;
  warning.hidden = false;
  clearTimeout(warning._timer);
  warning._timer = setTimeout(() => { warning.hidden = true; }, 3000);
}

function clearWarning() {
  warning.hidden = true;
}

function updateCounter() {
  const count = list.querySelectorAll('li').length;
  counter.textContent = count + ' / ' + MAX_ENTRIES + ' chapters';
  counter.className = count >= MAX_ENTRIES ? 'full' : '';
}

button.addEventListener('click', function () {

  if (input.value.trim() === '') {
    showWarning('Please enter a book and chapter.');
    input.focus();
    return;
  }

  const entry = formatEntry(input.value);

  const book = extractBook(entry);
  if (!BOM_BOOKS.includes(book)) {
    showWarning('"' + book + '" is not a Book of Mormon book. Try "Alma 5" or "Mosiah 3".');
    input.focus();
    return;
  }

  if (!/\d/.test(entry)) {
    showWarning('Please include a chapter number, e.g. "Alma 5".');
    input.focus();
    return;
  }

  if (list.querySelectorAll('li').length >= MAX_ENTRIES) {
    showWarning('You have reached the Top 10 limit. Remove a chapter first.');
    input.focus();
    return;
  }

  const existing = Array.from(list.querySelectorAll('li'))
    .map(function(li) { return li.dataset.entry; });
  if (existing.includes(entry.toLowerCase())) {
    showWarning('"' + entry + '" is already in your list.');
    input.focus();
    return;
  }

  clearWarning();

  const li = document.createElement('li');
  li.dataset.entry = entry.toLowerCase();

  const span = document.createElement('span');
  span.textContent = entry;
  li.append(span);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.classList.add('delete-btn');
  deleteButton.setAttribute('aria-label', 'Remove ' + entry);

  deleteButton.addEventListener('click', function () {
    list.removeChild(li);
    updateCounter();
    input.focus();
  });

  li.append(deleteButton);
  list.append(li);

  updateCounter();

  input.value = '';
  input.focus();
});

input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    button.click();
  }
});