export async function loadPage(link) {
    const router = document.querySelector('#router');
    if (link.length === 1) {
        link = '/home';
    }
    console.log(link)
    history.pushState({}, {}, link);
    let page_module;
    try {
        page_module = await import(`./pages${link}.js`);
    } catch (e)
    {
        page_module = await import(`./pages/404.js`);
    }
    const { default: page } = page_module;
    console.log(page())
    router.innerHTML = "";
    router.append(page().content.cloneNode(true))
}