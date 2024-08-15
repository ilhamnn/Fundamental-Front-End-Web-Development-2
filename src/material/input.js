class InP extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .bg1 {
          text-align: center;
        }

        .in {
          align-items: center;
          margin: 20px auto;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 50%;
          position: relative;
          text-align: center;
          background-color: #ffffff;
        }

        .in:hover {
          transform: translateY(-5px);
          box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.08);
        }

        .in h3 {
          margin-bottom: 10px;
        }

        .in input,
        .in textarea,
        .in button {
          margin-bottom: 10px;
          display: block;
          width: calc(100% - 20px);
          margin-left: auto;
          margin-right: auto;
        }

        .in button {
          margin-top: 10px;
          width: 240px;
          height: 40px;
          border-radius: 10px;
          background-color: #7fffd4;
          cursor: pointer;
          border: none;
          font-size: 16px;
        }

        #title {
          height: 30px;
          border-radius: 10px;
          border: 1px solid rgb(125, 125, 125);
          padding: 5px;
        }

        #Note {
          height: 190px;
          width: 98%;
          border-radius: 10px;
          padding: 10px;
          box-sizing: border-box;
          resize: none;
          overflow-y: auto;
          line-height: 1.5;
          border: 1px solid rgb(125, 125, 125);
        }

        .Show {
          margin: 10px;
          padding-top: 10px;
          text-align: center;
        }

        .notes-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .ntin {
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          white-space: pre-wrap;
          position: relative;
        }

        .ntin h4 {
          margin: 0 0 10px 0;
          font-size: 1.2em;
        }

        .ntin p {
          margin: 0;
          font-size: 0.9em;
        }

        .button-delete {
          background-color: #ff6961;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          cursor: pointer;
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 12px;
        }

        .button-delete:hover {
          background-color: #ff5c5c;
        }

        /* Styles untuk loading spinner */
        .loading-spinner {
          display: none; /* Awalnya disembunyikan */
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media screen and (max-width: 482px) {
          .in button {
            margin-top: 10px;
            width: 100%;
            height: 40px;
            border-radius: 10px;
            background-color: #7fffd4;
          }
        }
      </style>
      <main>
        <div class="in">
          <h3>Masukkan aja Notenya</h3>
          <input type="text" id="title" placeholder="Title">
          <textarea id="Note" placeholder="Note"></textarea>
          <button id="addNoteButton">Add</button>
        </div>
        <div id="loadingSpinner" class="loading-spinner"></div>
        <div class="Show">
          <h3>Notenya</h3>
          <div id="notesContainer" class="notes-container"></div>
        </div>
      </main>
    `;

    const renderNotes = (notes) => {
      const notesContainer = this.shadowRoot.getElementById("notesContainer");
      notesContainer.innerHTML = "";
      notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("ntin");
        noteElement.innerHTML = `
          <h4>${note.title}</h4>
          <p>${note.body}</p>
          <button class="button-delete" data-id="${note.id}">Delete</button>
        `;
        notesContainer.appendChild(noteElement);

        noteElement
          .querySelector(".button-delete")
          .addEventListener("click", (event) => {
            const noteId = event.target.dataset.id;
            this.dispatchEvent(
              new CustomEvent("note-deleted", {
                detail: noteId,
              })
            );
          });
      });
    };

    const addNote = () => {
      const titleInput = this.shadowRoot.getElementById("title");
      const noteInput = this.shadowRoot.getElementById("Note");
      const newNote = {
        title: titleInput.value,
        body: noteInput.value,
      };

      const event = new CustomEvent("note-added", {
        detail: newNote,
      });
      this.dispatchEvent(event);
    };

    this.shadowRoot
      .getElementById("addNoteButton")
      .addEventListener("click", addNote);

    // Tangkap event 'notes-updated' untuk merender catatan baru
    this.addEventListener("notes-updated", (event) => {
      renderNotes(event.detail);
    });
  }
}

customElements.define("i-p", InP);
