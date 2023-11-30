import {html} from "../html.js";
import {loadPage} from "../router.js";

export default (link, text) => {
    const navlink = html`
        <a href="${link || '#'}">${text}</a>
    `;
    // navlink.content.firstChild.addEventListener('click', e => {
    //     console.log("click")
    //     e.preventDefault();
    //     loadPage(link);
    // });
    return navlink;
}