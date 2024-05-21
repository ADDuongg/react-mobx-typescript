import { makeAutoObservable } from "mobx";
import { ProductType } from "./productStore";

class CartStore {
    carts: { product: ProductType, quantity: number }[] = [];
    isShow: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get totalItems() {
        return this.carts.reduce((sum, item) => sum + item.quantity, 0);
    }

    get totalPrice() {
        return this.carts.reduce((sum, item) => {
            const price = item.product.price * (1 - item.product.discountPercentage / 100);
            return sum + price * item.quantity;
        }, 0);
    }

    getTotalForProduct(productId: number) {
        const item = this.carts.find(item => item.product.id === productId);
        if (item) {
            const price = item.product.price * (1 - item.product.discountPercentage / 100);
            return price * item.quantity;
        }
        return 0;
    }

    closeCartModal() {
        this.isShow = false;
    }

    toggleCartModal() {
        this.isShow = !this.isShow;
    }

    addToCart(product: ProductType, quantity: number) {
        if (quantity <= 0) return;
        const existingItem = this.carts.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.carts.push({ product, quantity });
        }
        this.isShow = !this.isShow;
    }

    removeFromCart(productId: number) {
        this.carts = this.carts.filter(item => item.product.id !== productId);
    }

    updateQuantity(productId: number, quantity: number) {
        if (quantity < 0) return;
        const item = this.carts.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }

    clearCart() {
        this.carts = [];
    }

    increaseQuantity(productId: number): void {
        const item = this.carts.find(item => item.product.id === productId);
        if (item) {
            item.quantity += 1;
        }
    }

    decreaseQuantity(productId: number): void {
        const item = this.carts.find(item => item.product.id === productId);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
        }
    }
}

const cartStore = new CartStore();
export default cartStore;
