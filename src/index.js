document.querySelector('#test').innerText = `${Math.random()}`

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