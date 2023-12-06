import {html} from "../../html.js";
import {getData} from "../../store.js";

const get_player_line = (alias, index) => html`
    <div id="add_player_${index}">
        <tournament-player-add alias="${alias}"></tournament-player-add>
    </div>
`

export default () => {
    const players = getData('game.tournament.players');

    const elements = [];
    players.forEach((player, index) => {
        elements.push(get_player_line(player.alias, index));
    });

    elements.push(get_player_line('', elements.length));

    return html`
        <h1>SETUP TOURNAMENT</h1>
        
        <form>
            ${elements}
        </form>
    `
}