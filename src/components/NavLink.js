import {html} from "../html.js";
import {loadPage} from "../router.js";

// Might enforce this later, now it's not really useful
// const Parameters = {
//     href: "string",
//     textContent: "string",
// }

export default (attributes) => {
    // We can use the function body to do some computations
    const test = "Hello World !";

    // We can destructure attributes to get needed attributes
    const {href, textContent} = attributes;

    const click = (event) => {
        alert(test);
        // We can use the parameters passed to the component
        loadPage(href);
    };

    return {
        template: html`
            <a href="${href || '#'}">${textContent}</a>
        `,
        handlers: [
            {
                selector: "a",
                event: "click",
                method: click,
                options: { // [OPTIONAL] change default options
                    preventDefault: true, // default
                },
                // And we could add more, like additional parameters
                // ...
            }
        ],

    }
}