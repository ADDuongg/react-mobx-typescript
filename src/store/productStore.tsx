import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

class ProductStore {
    products: ProductType[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchProduct = async () => {
        this.loading = true;
        try {
            const res = await axios.get('https://dummyjson.com/products');
            this.products = res.data.products;
        } catch (error) {
            console.error('Error: ' + error);
        } finally {
            this.loading = false;
        }
    }
}

const productStore = new ProductStore();
export default productStore;
