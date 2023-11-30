function sanitize_html(input)
{
    input = input.replace(/&/g, '&amp;');
    input = input.replace(/</g, '&lt;');
    input = input.replace(/>/g, '&gt;');
    input = input.replace(/"/g, '&quot;');
    input = input.replace(/'/g, '&#x27;');
    return input;
}

function html(strings, ...values) {
    const template = document.createElement("template");
    let content = "";
    strings.forEach((s, i) => {
        content += s;
        if (values[i]) content += sanitize_html(values[i]);
        console.log(i, s, values[i])
    });
    content = content.trim();
    if (!content) return null;
    console.log(content);
    template.innerHTML = content;

    return template;
}

function menu() {
    return html`
        <h1>Main</h1>
        <div id="content">
        <a href="/">Home</a>
        <a href="/test">Test</a>
        <a href="/profile">Profile</a>
        <a href="/erreur">erreur</a>
    `
}

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'Hello World!!!';

    return element;
}

customElements.define(
    'main-menu',
    class extends HTMLElement {
        constructor() {
            super();
            let template = menu();
            let templateContent = template.content;

            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    }
)

// document.body.append(...menu());
document.body.append(component());


const router = document.querySelector('#router');
const routerjs = document.querySelector('#router-js');

function loadPage(link) {
    if (link.length === 1) {
        link = '/home';
    }
    console.log(link)
    routerjs.setAttribute('src', `${link}.js`);
    history.pushState({}, {}, link);
    import(`.${link}.js`)
        .then(response => {
            console.log(response)
            router.innerHTML = response.page()
        })
        .catch(error => {
            console.log(error)
            if (link === '/404')
                alert('Une erreur est survenue');
            else
                loadPage('/404');
        })
}

const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
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