// Define the ShoppingList class
class ShoppingList {
    items;
    constructor() {
        this.items = [];
        this.render();
    }
    // Method to add an item to the list
    addItem(name, quantity, comments = '') {
        const newItem = { name, quantity, comments };
        this.items.push(newItem);
        console.log(`Added item: ${name}`);
        this.render();
    }
    // Method to remove an item from the list
    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            const removedItem = this.items.splice(index, 1)[0];
            console.log(`Removed item: ${removedItem.name}`);
            this.render();
        }
        else {
            console.error('Invalid index to remove item');
        }
    }
    // Method to render the shopping list
    render() {
        const shoppingListElement = document.getElementById('shoppingList');
        if (shoppingListElement) {
            shoppingListElement.innerHTML = '';
            // Render items
            this.items.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('item');
                li.innerHTML = `
                    <div class="item-name">${item.name}</div>
                    <div class="item-comments">${item.comments}</div>
                    <div>Menge: ${item.quantity}</div>
                    <button class="remove-button" onclick="removeItem(${index})">Remove</button>
                `;
                shoppingListElement.appendChild(li);
            });
        }
    }
}
// Initialize ShoppingList instance
const shoppingList = new ShoppingList();
// Function to add item
function addItem() {
    const itemInput = document.getElementById('itemInput');
    const quantityInput = document.getElementById('quantityInput');
    const commentInput = document.getElementById('commentInput');
    const quantity = parseInt(quantityInput.value) || 1;
    if (itemInput.value.trim() !== '') {
        shoppingList.addItem(itemInput.value.trim(), quantity, commentInput.value.trim());
        itemInput.value = '';
        quantityInput.value = '1';
        commentInput.value = '';
    }
    else {
        console.warn('No item name entered');
    }
}
// Function to remove item
function removeItem(index) {
    shoppingList.removeItem(index);
    console.log(`Removed item at index: ${index}`);
}
//# sourceMappingURL=app.js.map