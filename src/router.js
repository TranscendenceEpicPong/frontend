import {getData, setData} from "./store.js";

export async function loadPage(link) {
    const router = document.querySelector('#router');
    if (link === '/') {
        const loggedIn = getData('auth.loggedIn');
        console.log(typeof loggedIn);
        if (loggedIn !== null)
            link = '/start';
    }
    setData({
        route: {path: link}
    }, {
        reload: false
    });
    console.log(link)
    // history.pushState({}, {}, link);
    let page_module;
    try {
        page_module = await import(`./pages${link === '/' ? '/home' : link}.js`);
    } catch (e)
    {
        page_module = await import(`./pages/404.js`);
    }
    const { default: page } = page_module;
    console.log(page())
    router.innerHTML = "";
    router.append(page().content.cloneNode(true))
}