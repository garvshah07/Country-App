const addNoteBtn = document.querySelector(".addBtn");
const noteCantainer = document.querySelector(".note");
const card = document.querySelector(".card");

// input text field
const noteInput = document.createElement("input");
noteInput.type = "text";
noteInput.name = "inputNote";
noteInput.classList.add("textEdit");

noteCantainer.insertAdjacentElement("afterbegin", noteInput);

// array that store the notes
let notes = [];

// Function to load notes from localStorage
const loadNotes = () => {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);

    // Render existing notes on the page
    notes.forEach((note) => {
      cardContainer(note);
    });
  }
};

// Card Creation Function
const cardContainer = (note) => {
  const cardContent = `
    <div class="notesList" >
      <h3>${note}</h3>
      <button class="dltBtn" onclick="cutHandler(event)"> Delete </button>
    </div>
  `;

  card.insertAdjacentHTML("afterbegin", cardContent);
};

// Task add handler
const noteAddHandler = () => {
  if (noteInput.value === "") {
    return;
  } else {
    cardContainer(noteInput.value);
    notes.push(noteInput.value);

    // Save notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
  }
};

addNoteBtn.addEventListener("click", noteAddHandler);

// Task delete handler
const cutHandler = (event) => {
  const cardElement = event.target.parentElement;
  const deletedNote = cardElement.querySelector("h3").innerText;
  const noteIndex = notes.indexOf(deletedNote);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);

    // Save updated notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  cardElement.remove();
};

// Load notes on page refresh
loadNotes();
