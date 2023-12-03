import {html} from "../../html.js";
import {getData} from "../../store.js";

const get_player_line = (alias, index) => html`
    <div id="add_player_${index}">
        <tournament-player-add alias="${alias}"></tournament-player-add>
    </div>
`

export default () => {
    const players = getData('game.tournament.players');
    let content = "";
    if (!players)
    {
        content = get_player_line('', 0);
    }
    else
    {
        players.forEach((alias, index) => {
            content += get_player_line(alias, index);
        })
    }

    return html`
        <h1>SETUP TOURNAMENT</h1>
        
        <form>
            ${content}
        </form>
    `
}