class NaV extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>  
    header {
        background-color: aquamarine;
        padding: 10px;
    }

    .bg1 {
        text-align: center;
    }
        </style>
        <header>
          <div class="bg1">
            <h1>Ini notepad</h1>
          </div>
        </header>
      `;
  }
}

customElements.define("na-vi", NaV);
