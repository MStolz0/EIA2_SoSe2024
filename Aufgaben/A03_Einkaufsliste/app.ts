// Define interface for shopping list item
interface ShoppingListItem {
    name: string;
    comments: string;
}

// Define the ShoppingList class
class ShoppingList {
    private items: ShoppingListItem[];

    constructor() {
        this.items = [];
    }

    // Method to add an item to the list
    addItem(name: string, comments: string = ''): void {
        const newItem: ShoppingListItem = { name, comments };
        this.items.push(newItem);
        console.log(`Added item: ${name}`);
        this.render();
    }

    // Method to remove an item from the list
    removeItem(index: number): void {
        if (index >= 0 && index < this.items.length) {
            const removedItem = this.items.splice(index, 1)[0];
            console.log(`Removed item: ${removedItem.name}`);
            this.render();
        } else {
            console.error('Invalid index to remove item');
        }
    }

    // Method to render the shopping list
    render(): void {
        const shoppingListElement = document.getElementById('shoppingList');
        if (shoppingListElement) {
            shoppingListElement.innerHTML = '';

            this.items.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('item');
                li.innerHTML = `
                    <div class="item-name">${item.name}</div>
                    <div class="item-comments">${item.comments}</div>
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
    const itemInput = document.getElementById('itemInput') as HTMLInputElement;
    const commentInput = document.getElementById('commentInput') as HTMLTextAreaElement;

    if (itemInput.value.trim() !== '') {
        shoppingList.addItem(itemInput.value.trim(), commentInput.value.trim());
        itemInput.value = '';
        commentInput.value = '';
    } else {
        console.warn('No item name entered');
    }
}

// Function to remove item
function removeItem(index: number) {
    shoppingList.removeItem(index);
    console.log(`Removed item at index: ${index}`);
}