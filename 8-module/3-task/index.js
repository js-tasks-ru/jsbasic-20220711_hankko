export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product) {
      const items = this.cartItems.find((item) => item.product.id === product.id);
      if (items) {
        this.cartItems.map((item) => {
          if (item.product.id === items.product.id) {
            item.count += 1;
            this.cartItem = item;
          }
        });
      } else {
        this.cartItem = {
          product: product,
          count: 1
        };
        this.cartItems.push(this.cartItem);
      }
    } else {
      return;
    }
    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    this.cartItems.map((item => {
      if (item.product.id === productId) {
        item.count += amount;
        this.cartItem = item;
        if (item.count === 0) {
          this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
        }
      }
    }));
    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalItems, items) => totalItems + items.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (totalItems, items) => totalItems + items.count * items.product.price, 0);
  }
  
  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

