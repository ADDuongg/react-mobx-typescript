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
    inStock: boolean;
}

class ProductStore {
    products: ProductType[] = []; // Store the original products
    filteredProducts: ProductType[] = [];
    searchProducts: ProductType[] = []; // Store the filtered products
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchProduct = async () => {
        this.loading = true;
        try {
            const res = await axios.get('https://dummyjson.com/products');
            this.products = res.data.products;
            this.filteredProducts = [...this.products]; // Initialize filtered products with original data
        } catch (error) {
            console.error('Error: ' + error);
        } finally {
            this.loading = false;
        }
    }
    SearchByTitle = (title: string) => {
        let titleSearch = title.trim().toLocaleLowerCase()
        this.searchProducts = this.products.filter(product => product.title.trim().toLocaleLowerCase().includes(titleSearch))
    }
    filterByPrice = (maxPrice: number) => {
        this.filteredProducts = this.products.filter(product => product.price <= maxPrice);
    }
    filterByBrand = (brand: string) => {
        this.filteredProducts = this.products.filter(product => product.brand === brand);
    }
    filterByCategory = (category: string) => {
        this.filteredProducts = this.products.filter(product => product.category === category);
    }
    filterByStock = (inStock: number) => {
        if(inStock === 1){
            this.filteredProducts = this.products.filter(product => product.stock > 0);
        }else{
            this.filteredProducts = this.products.filter(product => product.stock <= 0);
        }
    }
    resetFilter = () => {
        this.filteredProducts = this.products
    }
}

const productStore = new ProductStore();
export default productStore;
