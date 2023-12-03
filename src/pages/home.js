import {html} from "../html.js";

export default () => {
    return html`
        <h1>Welcome !!!</h1>
<!--        <nav-link></nav-link>-->
        <login-button method="offline">Offline</login-button>
        <login-button method="login">Login</login-button>
        <login-button method="42-sso">Login with 42</login-button>
        <login-button method="register">Register</login-button>
    `
}