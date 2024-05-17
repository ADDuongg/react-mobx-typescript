import { makeAutoObservable } from "mobx";
import { ProductType } from "./productStore";

class WishListStore {
    wishList: ProductType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addToWishList(item: ProductType): void {
        if (!this.isInWishList(item)) {
            this.wishList.push(item);
        } else {
            console.log("Sản phẩm đã có trong danh sách mong muốn!");
        }
    }
    
    removeFromWishList(item: ProductType): void {
        const index = this.wishList.findIndex(wishItem => wishItem.id === item.id);
        if (index !== -1) {
            this.wishList.splice(index, 1);
        }
    }

    isInWishList(item: ProductType): boolean {
        return this.wishList.some(wishItem => wishItem.id === item.id);
    }
}

export default new WishListStore();
