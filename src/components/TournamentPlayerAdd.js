import {html} from "../html.js";

export default (alias) => {
    return html`
        <input type="text" value="${alias || ''}"/>
    `;
}