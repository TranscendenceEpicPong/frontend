import {html} from "../html.js";

export default () => {
    return {
        template: html`
            <div id="content">
            <nav-link href="/">Home</nav-link>
            <nav-link href="/test">Test</nav-link>
            <nav-link href="/profile">Profile</nav-link>
            <nav-link href="/erreur">erreur</nav-link>
        `
    }
}