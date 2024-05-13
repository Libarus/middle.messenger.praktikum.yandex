export function render(query: string, block: any) {

    const root = document.querySelector(query);
    if (root == null) throw new Error(`HTML элемент [селектор: ${query}] не найден.`);

    // Можно завязаться на реализации вашего класса Block
    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();
 
    return root;
  }