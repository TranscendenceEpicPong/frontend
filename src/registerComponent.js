export function registerComponent(name, Component) {
    customElements.define(name, class extends HTMLElement {
        constructor() {
            super();
        }

        getAllAttributes() {
            const attributes = {};
            Object.values(this.attributes).forEach(
                attr => attributes[attr.name] = attr.value
            )
            return attributes;
        }

        connectedCallback() {
            const attributes = {
                ...this.getAllAttributes(),
                textContent: this.textContent
            };
            const component = Component(attributes);
            const template = component.template.content;

            const shadowRoot = this.attachShadow({ mode: "open" });
            const child = template.cloneNode(true);
            shadowRoot.appendChild(child);

            component.handlers.forEach(handler => {
                const element = shadowRoot.querySelector(handler.selector);
                const options = Object.assign(
                    {}, // new object
                    { // default options
                        preventDefault: true,
                    },
                    handler.options, // handler's options
                );
                if (!element)
                {
                    console.error(`No element found in ${name} for selector ${handler.selector}`);
                    return
                }
                element.addEventListener(handler.event, e => {
                    if (options.preventDefault)
                        e.preventDefault()
                    handler.method(e)
                });
            });
        }
    })
}