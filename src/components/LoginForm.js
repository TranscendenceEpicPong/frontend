import {html} from "../html.js";

export default () => {
    return {
        template: html`
            <form>
                <input type="text" name="username" />
                <input type="password" name="password" />
                <input type="submit" value="Login" />
            </form>
        `,
        handlers: [
            {
                selector: "form",
                event: "submit",
                method: (e) => {
                    const form = e.target;
                    const data = new FormData(form);

                    console.log(`Username: ${data.get('username')}`)
                    console.log(`Password: ${data.get('password')}`)
                    console.log(Object.fromEntries(data))

                    const reqBody = Object.fromEntries(data);
                    console.log(reqBody)
                }
            }
        ],

    }
}