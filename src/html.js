function sanitize_html(input)
{
    input = input.replace(/&/g, '&amp;');
    input = input.replace(/</g, '&lt;');
    input = input.replace(/>/g, '&gt;');
    input = input.replace(/"/g, '&quot;');
    input = input.replace(/'/g, '&#x27;');
    return input;
}

export function html(strings, ...values) {
    const template = document.createElement("template");
    let content = "";
    strings.forEach((s, i) => {
        content += s;
        const element = values[i];
        switch (typeof element) {
            case 'string':
                content += sanitize_html(element);
                break;
            case 'object':
                if (Object.prototype.toString.call(element) === '[object HTMLTemplateElement]')
                {
                    console.log('HTMLTemplateElement');
                    const childrenElements = Array.from(element.content.children);
                    childrenElements.forEach(el => {
                        content += el.outerHTML;
                    });
                }
        }
    });
    content = content.trim();
    if (!content) return null;

    template.innerHTML = content;
    return template;
}