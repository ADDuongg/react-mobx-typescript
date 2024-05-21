import cartStore from "./cartStore";
import productStore from "./productStore";
import UserStore from "./userStore";
import WishListStore from "./wishList";


class MainStore {
    productStore: typeof productStore
    WishListStore: typeof WishListStore
    cartStore: typeof cartStore
    userStore: typeof UserStore
    constructor() {
        this.productStore = productStore;
        this.WishListStore = WishListStore
        this.cartStore = cartStore
        this.userStore = UserStore
    }
}

const mainStore = new MainStore();
export default mainStore;
