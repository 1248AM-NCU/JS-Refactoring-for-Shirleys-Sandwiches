// The sandwich selected in the cart (defaults to the first sandwich)
let selectedSandwich = null;

// The array of sandwiches the user is ordering. 
//  This will be updated after we fetch.
let cart = [];

// The array of ingredients the user can add to a sandwich
//  This will be updated after we fetch.
let ingredients = [];

async function main() {
    // Fetches an array of ingredients, and an array of sandwiches in the users
    //  cart, at the same time
    let [fetchedIngredients, fetchedCart] = await getAll(`http://localhost:3001/ingredients`, `http://localhost:3001/cart`)

    // Save what we fetched to global variables;
    ingredients = fetchedIngredients
    cart = fetchedCart

    // Select the first sandwich on page load
    selectSandwich(cart[0])

    // Display the ingredients we fetched
    renderIngredientList();

    // Display the sandwiches we fetched
    renderSandwichList();

    // Attach event listener to the 'Add Sandwich' button
    let addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', () => {
        addSandwich()
    })

    // Attach event listener to the 'Name' input
    let nameInput = document.querySelector('.name-input');
    nameInput.addEventListener('input', (e) => {
        selectedSandwich.name = e.target.value
        saveSelectedSandwich()
    })

    // Attach event listeners to the radio inputs for selecting a type of bread
    let breadRadios = document.querySelectorAll('.bread-radio')
    breadRadios.forEach(radioInput => {
        radioInput.addEventListener('click', () => {
            selectedSandwich.bread = radioInput.value
            saveSelectedSandwich()
            renderSandwichList()
        })
    })
}

main()