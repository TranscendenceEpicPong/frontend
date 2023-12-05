// Import our custom CSS
import './scss/main.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import NavLink from "./components/NavLink.js";
import MainMenu from './components/MainMenu.js'
import {loadPage} from "./router.js";
import LoginButton from "./components/LoginButton.js";
import {setData} from "./store.js";
import GameModeButton from "./components/GameModeButton.js";
import TournamentPlayerAdd from "./components/TournamentPlayerAdd.js";
import {registerComponent} from "./registerComponent.js";

registerComponent('nav-link', NavLink);

class LoginButtonComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const method = this.attributes.method.value;
        const template = LoginButton(this.attributes.method.value, this.textContent);
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        const child = templateContent.cloneNode(true);
        shadowRoot.appendChild(child);
        shadowRoot.firstElementChild.onclick = e => {
            console.log("button", e, method);
            e.preventDefault();
            if (method === 'offline')
            {
                setData({
                    auth: {
                        loggedIn: false
                    },
                    mode: {
                        online: false
                    }
                });
            }
        };
    }
}
customElements.define('login-button', LoginButtonComponent)

class TournamentPlayerAddComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const template = TournamentPlayerAdd();
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        const child = templateContent.cloneNode(true);
        shadowRoot.appendChild(child);
        console.log(child);
        shadowRoot.querySelector("button").onclick = e => {
            console.log("add", e);
            e.preventDefault();
            // const child = templateContent.cloneNode(true);
            // shadowRoot.appendChild(child);
            // console.log(child);
            setData({
                game: {
                    tournament:
                    {
                        players: {
                            alias: this.attributes.alias.value
                        }
                    }
                }
            })
        };
    }
}
customElements.define('tournament-player-add', TournamentPlayerAddComponent);

class GameModeButtonComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const mode = this.attributes.mode.value;
        const template = GameModeButton(this.attributes.mode.value, this.textContent);
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        const child = templateContent.cloneNode(true);
        shadowRoot.appendChild(child);
        shadowRoot.firstElementChild.onclick = e => {
            e.preventDefault();
            setData({
                game: { mode: mode },
            });
            loadPage(`/setup/${mode}`);
        };
    }
}
customElements.define('game-mode-button', GameModeButtonComponent)

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