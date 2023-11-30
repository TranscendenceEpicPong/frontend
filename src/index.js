import NavLink from "./components/NavLink.js";
import MainMenu from './components/MainMenu.js'
import {loadPage} from "./router.js";

class NavLinkComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const link = this.attributes.href.value;
        const template = NavLink(this.attributes.href.value, this.textContent);
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        const child = templateContent.cloneNode(true);
        shadowRoot.appendChild(child);
        shadowRoot.firstElementChild.onclick = e => {
            console.log("click")
            e.preventDefault();
            loadPage(link);
        };
    }
}
customElements.define('nav-link', NavLinkComponent)

customElements.define(
    'main-menu',
    class extends HTMLElement {
        constructor() {
            super();
            let template = MainMenu();
            let templateContent = template.content;

            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    }
);

window.addEventListener('load', () => {
    const path = window.location.pathname
    history.pushState({}, {}, path);
    loadPage(path)
});

window.addEventListener('popstate', () => {
    const path = window.location.pathname
    history.pushState({}, {}, path);
    loadPage(path)
});