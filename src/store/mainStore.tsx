import cartStore from "./cartStore";
import productStore from "./productStore";
import WishListStore from "./wishList";


class MainStore {
    productStore: typeof productStore
    WishListStore: typeof WishListStore
    cartStore: typeof cartStore
    constructor() {
        this.productStore = productStore;
        this.WishListStore = WishListStore
        this.cartStore = cartStore
    }
}

const mainStore = new MainStore();
export default mainStore;
