import {html} from "../html.js";
import {getData, setData} from "../store.js";

export default (props) => {
    const {alias} = props;
    console.log("TournamentPlayerAdd: ", alias);
    return {
        template: html`
            <div>
                <input type="text" value="${alias || ''}"/>
                <button>Add</button>
            </div>
        `,
        handlers: [
            {
                selector: "button",
                event: "click",
                method: e => {
                    const new_alias = e.target.previousElementSibling.value;
                    setData({
                        game: {
                            tournament:
                                {
                                    players: [{
                                        alias: new_alias
                                    }]
                                }
                        }
                    });
                },
            }
        ],

    }
}