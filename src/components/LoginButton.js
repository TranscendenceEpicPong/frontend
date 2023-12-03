import {html} from "../html.js";

export default (method, text) => {
    return html`
        <button method="${method || '#'}">${text}</button>
    `;
}