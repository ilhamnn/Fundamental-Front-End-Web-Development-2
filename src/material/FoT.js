class FoT extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>  
            .end {
                padding: 20px;
                color: white;
                background: linear-gradient(to right, #7fffd4, #a5d8c7);
                text-align: center;
                font-weight: bold;
                position: relative;
                bottom: 0;
                width: 100%;
                box-sizing: border-box;
            }
              </style>
              <footer>
                    <div class="end">
                        <h3>Ini Footer</h3>
                    </div>
              </footer>
            `;
  }
}

customElements.define("fo-ot", FoT);
