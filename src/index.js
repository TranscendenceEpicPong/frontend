// Import our custom CSS
import './scss/main.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import NavLink from "./components/NavLink.js";
import MainMenu from './components/MainMenu.js'
import {loadPage} from "./router.js";
import LoginButton from "./components/LoginButton.js";
import GameModeButton from "./components/GameModeButton.js";
import TournamentPlayerAdd from "./components/TournamentPlayerAdd.js";
import {registerComponent} from "./registerComponent.js";
import GameWindow from "./components/GameWindow.js";

registerComponent('nav-link', NavLink);
registerComponent('game-window', GameWindow);
registerComponent('login-button', LoginButton);
registerComponent('tournament-player-add', TournamentPlayerAdd);
registerComponent('game-mode-button', GameModeButton);
registerComponent('main-menu', MainMenu);

window.addEventListener('load', () => {
    const path = window.location.pathname
    history.pushState({}, {}, path);
    loadPage(path)
});

window.addEventListener('popstate', (e) => {
    e.preventDefault()
    const path = window.location.pathname
    history.pushState({}, {}, path);
    loadPage(path)
});