import {html} from "../html.js";

export default (link, text) => {
    return html`
        <a href="${link || '#'}">${text}</a>
    `;
}