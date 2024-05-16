export function render(selector: string, block: any) {
    const root = document.querySelector(selector);
    if (root == null) {
        throw new Error(`HTML элемент [селектор: ${selector}] не найден.`);
    }

    // Можно завязаться на реализации вашего класса Block
    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();

    return root;
}
