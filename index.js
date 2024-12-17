//STEP 1

const CART_ITEMS_CONTAINER = document.getElementById("cart-items-container");
const TOTAL_COST_TEXT = document.getElementById("total-cost");

console.log(CART_ITEMS_CONTAINER);
console.log(TOTAL_COST_TEXT);

// STEP 2 Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// STEP 3 A cart item constructor inheriting properties from the product class
class CartItem extends Product {
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;
  }

  // STEP 4   A method to calculate the cost of each item in the cart
  caculateCartItem() {
    return this.price * this.quantity;
  }
}

// STEP 5 A class to store all the shopping cart items
class ShoppingCart {
  constructor(userShoppingCart) {
    this.userShoppingCart = userShoppingCart;
  }

  // STEP 6  A method to display all the items in the user shopping cart, using the map method
  // ${item.id} because each element has an ID and with that, by that, we will be able to attend to each increase btn dynamically
  displayShoppingCartItems() {
    let userProducts = this.userShoppingCart.map((item) => {
      return `<div class="flex justify-between border-b">
          <div>
            <h1 class="text-2xl font-semibold text-gray-400">${item.name}</h1>
            <button
             id = ${item.id}
              class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer my-2 delete--btn"
            >
              <i class="bi bi-trash"></i>
            </button>
            <h4>${item.caculateCartItem()}</h4>
          </div>

          <div>
            <h3 class="text-2xl font-semibold text-right">${item.price}</h3>
            <div class="flex gap-4 items-center">
              <button
              id = ${item.id} 
                class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer increase--btn"
              >
                <i class="bi bi-plus"></i>
              </button>
              <p>${item.quantity}</p>
              <button
              id = ${item.id}
                class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer decrease--btn"
              >
                <i class="bi bi-dash"></i>
              </button>
            </div>
          </div>
        </div>`;
    });

    // Replacing the innerHTML of cart_items_ container with .join()
    CART_ITEMS_CONTAINER.innerHTML = userProducts.join("");
    // We made use of queryselector all because we have multiple items with the increase button
    // Targetting all buttons with class of increase-btn
    const INCREASE_BTN = document.querySelectorAll(".increase--btn");
    const DECREASE_BTN = document.querySelectorAll(".decrease--btn");
    //targetting all the buttons with the class of delete--btn
    const DELETE_BTN = document.querySelectorAll(".delete--btn");
    console.log(INCREASE_BTN);
    console.log(DECREASE_BTN);
    console.log(DELETE_BTN);

    // you can't add event listener to an item with multple diffrent increase btn, so we make use of forEach()
    // Targetting multiple elements with the same class name  can be achieved individually using forEach()
    INCREASE_BTN.forEach((value) => {
      // getting the value of the id attribute value for each of the button
      let id_of_product = value.getAttribute("id");

      //Adding a click event for each of the increase-btn
      value.addEventListener("click", () =>
        this.increaseCartQuantity(id_of_product)
      );
    });
    DECREASE_BTN.forEach((value) => {
      let id_of_product = value.getAttribute("id");
      value.addEventListener("click", () =>
        this.decreaseCartQuantity(id_of_product)
      );
    });

    DELETE_BTN.forEach((value) => {
      let id_of_product = value.getAttribute("id");
      value.addEventListener("click", () => this.deleteCartItem(id_of_product));
    });
  }

  // Rather than putting all codes in the increaseBtnforEach()
  //linking the id_of_product with increaseCarQuantity
  // A method to increase the quantity of an item
  increaseCartQuantity(id_of_product) {
    // use the for array method to go through all the product the user has in his cart
    this.userShoppingCart.forEach((item) => {
      // check if any product in the user shopping cart matches the id attribute of the product that is clicked
      if (item.id === id_of_product) {
        // increase the quantity of the product by 1
        item.quantity = item.quantity + 1;
      }
    });
    // then replace the products again with the updated quantity
    this.displayShoppingCartItems();
    this.calculateTotalCostOfItemsInCart();
  }
  // A method to reduce the quantity of an item
  decreaseCartQuantity(id_of_product) {
    // use the for array method to go through all the product the user has in his cart
    this.userShoppingCart.forEach((item) => {
      // check if any product in the user shopping cart matches the id attribute of the product that is clicked
      if (item.id === id_of_product && item.quantity > 1) {
        // increase the quantity of the product by 1
        item.quantity = item.quantity - 1;
      }
    });
    // then replace the products again with the updated quantity
    this.displayShoppingCartItems();
    this.calculateTotalCostOfItemsInCart();
  }
  //A method to delete item in cart
  deleteCartItem(id_of_product) {
    let itemLeftInCart = this.userShoppingCart.filter(
      (item) => item.id !== id_of_product
    );
    this.userShoppingCart = itemLeftInCart;
    this.displayShoppingCartItems();
    // After an item has been deleted, the previous items should be calculated
    this.calculateTotalCostOfItemsInCart();
  }
  // A mthod to calculate the total cost of products in the cart
  calculateTotalCostOfItemsInCart() {
    let total = 0;
    this.userShoppingCart.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    TOTAL_COST_TEXT.innerText = total;
  }
}

const cart = new ShoppingCart([
  new CartItem("1", "Iphone", 2000, 1),
  new CartItem("2", "Smasung", 4000, 1),
  new CartItem("3", "Techno", 5000, 1),
  new CartItem("4", "Itel", 10000, 1),
  new CartItem("5", "Gionee", 2000, 1),
]);
// This enables the items to display in the web, you must always call the function with a bracket
cart.displayShoppingCartItems();
cart.calculateTotalCostOfItemsInCart();
