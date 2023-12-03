import {html} from "../../html.js";

export default () => {

    return html`
        <h1>SETUP TOURNAMENT</h1>
        
        <form>
            <tournament-player-add></tournament-player-add>
        </form>
        <button>Add</button>
    `
}