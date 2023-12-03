import {html} from "../html.js";
import {getData} from "../store.js";

export default (alias) => {
    return html`
        <div>
            <input type="text" value="${alias || ''}"/>
            <button>Add</button>
        </div>
    `;
}