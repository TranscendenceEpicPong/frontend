import {html} from "../html.js";

export default (mode, text) => {
    return html`
        <button mode="${mode || '#'}">${text}</button>
    `;
}