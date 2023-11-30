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
        if (values[i]) content += sanitize_html(values[i]);
    });
    content = content.trim();
    if (!content) return null;

    template.innerHTML = content;
    return template;
}