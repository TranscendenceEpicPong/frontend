import NavLink from "./components/NavLink.js";
import MainMenu from './components/MainMenu.js'
import {loadPage} from "./router.js";

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'Hello World!!!';

    return element;
}


class NavLinkComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const link = this.attributes.href.value;
        const template = NavLink(this.attributes.href.value, this.textContent);
        const templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        const child = templateContent.cloneNode(true);
        shadowRoot.appendChild(child);
        shadowRoot.firstElementChild.onclick = e => {
            console.log("click")
            e.preventDefault();
            loadPage(link);
        };
    }
}
customElements.define('nav-link', NavLinkComponent)

customElements.define(
    'main-menu',
    class extends HTMLElement {
        constructor() {
            super();
            let template = MainMenu();
            let templateContent = template.content;

            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    }
)

// document.body.append(...menu());
document.body.append(component());


// const router = document.querySelector('#router');
// // const routerjs = document.querySelector('#router-js');
//
// async function loadPage(link) {
//     if (link.length === 1) {
//         link = '/home';
//     }
//     console.log(link)
//     // routerjs.setAttribute('src', `${link}.js`);
//     history.pushState({}, {}, link);
//     // link = '/home';
//     let page_module = await import(`./pages/404.js`);
//     try {
//         page_module = await import(`./pages${link}.js`);
//     } catch (e)
//     {
//         console.error(e)
//     }
//     const { default: page } = page_module;
//     console.log(page())
//     router.append(page().content.cloneNode(true))
// }

const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("click");
        const href = link.getAttribute('href');
        loadPage(href);
    })
})

window.addEventListener('load', () => {
    const path = window.location.pathname
    history.pushState({}, {}, path);
    loadPage(path)
});

window.addEventListener('popstate', () => {
    const path = window.location.pathname
    history.pushState({}, {}, path);
    loadPage(path)
});