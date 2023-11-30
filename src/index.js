function html(strings, ...values) {
    const template = document.createElement("template");
    let content = "";
    strings.forEach((s, i) => {
        content += s;
        if (values[i]) content += values[i];
        console.log(i, s, values[i])
    });
    content = content.trim();
    if (!content) return null;
    console.log(content);
    template.innerHTML = content;
    console.log(template);
    const result = template.content.children;
    console.log(result);

    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0]
    return result;
}

function menu() {
    return html`
        <h1>Main</h1>
        <div id="content">
        <a href="/">Home</a>
        <a href="/test">Test</a>
        <a href="/profile">Profile</a>
        <a href="/erreur">erreur</a>
        <p id="test"></p>
        <div id="router"></div>
    `
}

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = 'Hello World!!!';

    return element;
}

document.body.append(...menu());
document.body.append(component());


const router = document.querySelector('#router');
const routerjs = document.querySelector('#router-js');

function loadPage(link) {
    if (link.length === 1)
        link = 'home';
    routerjs.setAttribute('src', `${link}.js`);
    history.pushState({}, {}, link);
    import(`./${link}.js`)
        .then(response => {
            router.innerHTML = response.page()
        })
        .catch(error => {
            if (link === '404')
                alert('Une erreur est survenue');
            else
                loadPage('404');
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