import "./style/style.css";
import "./material/main.js";
import { animate, glide } from "motion";
import Swal from "sweetalert2";

const baseUrl = "https://notes-api.dicoding.dev/v2";

const showLoadingSpinner = () => {
  const spinner = document
    .querySelector("i-p")
    .shadowRoot.querySelector("#loadingSpinner");
  if (spinner) {
    spinner.style.display = "block";
  }
};

const hideLoadingSpinner = () => {
  const spinner = document
    .querySelector("i-p")
    .shadowRoot.querySelector("#loadingSpinner");
  if (spinner) {
    spinner.style.display = "none";
  }
};

const getNote = () => {
  showLoadingSpinner();
  fetch(`${baseUrl}/notes`)
    .then((response) => response.json())
    .then((responseJson) => {
      hideLoadingSpinner();
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderNotes(responseJson.data);
        const inputNoteElement = document.querySelector("i-p");
        const event = new CustomEvent("notes-updated", {
          detail: responseJson.data,
        });
        inputNoteElement.dispatchEvent(event);
      }
    })
    .catch((error) => {
      hideLoadingSpinner();
      showResponseMessage(error);
    });
};

const addNote = (note) => {
  showLoadingSpinner();
  fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "123%%",
    },
    body: JSON.stringify({ title: note.title, body: note.body }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      hideLoadingSpinner();
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Notes has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        getNote();
      }
    })
    .catch((error) => {
      hideLoadingSpinner();
      showResponseMessage(error);
    });
};

const removeNote = (noteId) => {
  showLoadingSpinner();
  fetch(`${baseUrl}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "X-Auth-Token": "123%%",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      hideLoadingSpinner(); // Sembunyikan spinner
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        Swal.fire({
          title: "Deleted!",
          text: "Your note has been deleted.",
          icon: "success",
        });
        getNote();
      }
    })
    .catch((error) => {
      hideLoadingSpinner(); // Sembunyikan spinner bahkan jika terjadi error
      showResponseMessage(error);
    });
};

const renderNotes = (notes) => {
  const noteItems = document.querySelector("#notesContainer");
  if (noteItems) {
    noteItems.innerHTML = "";

    notes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.classList.add("ntin");
      noteElement.innerHTML = `
        <h4>${note.title}</h4>
        <p>${note.body}</p>
        <button class="button-delete" data-id="${note.id}">Delete</button>
      `;
      noteItems.appendChild(noteElement);

      noteElement
        .querySelector(".button-delete")
        .addEventListener("click", (event) => {
          const noteId = event.target.dataset.id;
          removeNote(noteId);
        });
    });
  } else {
    console.error("Element #notesContainer not found.");
  }
};

const showResponseMessage = (message) => {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
};

document.addEventListener("DOMContentLoaded", () => {
  getNote();

  const inputNoteElement = document.querySelector("i-p");

  inputNoteElement.addEventListener("note-added", (event) => {
    addNote(event.detail);
  });

  inputNoteElement.addEventListener("note-deleted", (event) => {
    removeNote(event.detail);
  });
});

animate("#itemNotes", { y: 0 }, { easing: glide({ velocity: -50 }) });
