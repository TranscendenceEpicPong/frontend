export function page() {
    document.querySelector('#test').innerText = `Bonjour = ${Math.random()}`
    const message = 'Bonjour';
    return `${message}`;
}
