import {html} from "../html.js";
import {setData} from "../store.js";
import {loadPage} from "../router.js";

export default (props) => {
    const {mode, textContent} = props;
    return {
        template: html`
            <button>${textContent}</button>
        `,
        handlers: [
            {
                selector: "button",
                event: "click",
                method: () => {
                    setData({
                        game: { mode: mode },
                    });
                    loadPage(`/setup/${mode}`);
                }
            }
        ]
    };
}