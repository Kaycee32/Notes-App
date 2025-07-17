// Get DOM elements
const form = document.getElementById("note-form");
const input = document.getElementById("note-input");
const notesList = document.getElementById("notes");
const clearBtn = document.getElementById("clear-all");
const errorDiv = document.getElementById("error");

let notes = loadNotes();

// Display notes on page load
displayNotes();

// Load notes from localStorage
function loadNotes() {
  const stored = localStorage.getItem("notes");
  return stored ? JSON.parse(stored) : [];
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Display all notes
function displayNotes() {
  notesList.innerHTML = "";

  if (notes.length === 0) {
    notesList.innerHTML = "<li>No notes available</li>";
    return;
  }

  for (let i = 0; i < notes.length; i++) {
    const li = document.createElement("li");
    li.textContent = notes[i].text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      notes.splice(i, 1);
      saveNotes();
      displayNotes();
    };

    li.appendChild(delBtn);
    notesList.appendChild(li);
  }
}

// Add a note
function addNote(text) {
  notes.push({ text });
  saveNotes();
  displayNotes();
}

// Submit event for form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const noteText = input.value.trim();

  if (!noteText) {
    errorDiv.textContent = "Note cannot be empty!";
    return;
  }

  errorDiv.textContent = "";
  addNote(noteText);
  input.value = "";
});

// Clear all notes
clearBtn.addEventListener("click", function () {
  notes = [];
  localStorage.removeItem("notes");
  displayNotes();
});
