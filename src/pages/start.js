import {html} from "../html.js";

export default () => {
    return html`
        <h1>START</h1>
        <game-mode-button mode="solo">Solo</game-mode-button>
        <game-mode-button mode="duel">2 players</game-mode-button>
        <game-mode-button mode="tournament">Tournament</game-mode-button>
    `
}