import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Master, { useStore } from '../layout/master';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../store/productStore';
import { toJS } from 'mobx';
import Products from '../component/componentHome/products';
import cartStore from '../store/cartStore';
import ModalCart from '../modal/modalCart';

const Shop = observer(() => {
    const { productStore } = useStore();
    const navigate = useNavigate();

    const [priceFilter, setPriceFilter] = useState<number>(0);
    const [grid, setGrid] = useState<boolean>(true)

    const groupByCategory = (products: ProductType[]): { category: string, count: number }[] => {
        const grouped = products.reduce((acc: Record<string, number>, product) => {
            if (!acc[product.category]) {
                acc[product.category] = 0;
            }
            acc[product.category]++;
            return acc;
        }, {} as Record<string, number>);

        return Object.keys(grouped).map(category => ({
            category,
            count: grouped[category]
        }));
    };

    const handleCheckStock = (products: ProductType[]): { inStock: number, outOfStock: number } => {
        const inStockCount = products.filter(item => item.stock > 0).length;
        const outOfStockCount = products.filter(item => item.stock === 0).length;
        return {
            inStock: inStockCount,
            outOfStock: outOfStockCount
        };
    };

    const findHighestPrice = (products: ProductType[]): number => {
        let highestPrice = 0;
        products.forEach(product => {
            if (product.price > highestPrice) {
                highestPrice = product.price;
            }
        });
        return highestPrice;
    };
    const groupByBranch = (products: ProductType[]): string[] => {
        const branches: string[] = [];
        products.forEach(product => {
            if (!branches.includes(product.brand)) {
                branches.push(product.brand);
            }
        });

        return branches;
    };
    const dataCategory = groupByCategory(productStore.products);
    const dataBranch = groupByBranch(productStore.products);
    const dataStock = handleCheckStock(productStore.products);
    const highestPrice = findHighestPrice(productStore.products);

    const handlePriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceFilter(parseInt(event.target.value));
        productStore.filterByPrice(parseInt(event.target.value))

    };
    const handleBrandFilter = (brandSelect: string) => {
        
        productStore.filterByBrand(brandSelect)

    };
    const handleCategoryFilter = (category: string) => {

        productStore.filterByCategory(category)

    };
    const handleInStockFilter = (check: number) => {
        productStore.filterByStock(Number(check))

    };
    console.log(priceFilter);
    const handleResetFilter = () => {
        productStore.resetFilter()
        setPriceFilter(0)
    }

    return (
        <Master>
            <div className='w-full bg-[#f8f8f8]'>
                <div className='w-11/12 mx-auto p-5 h-full flex gap-2 justify-start items-end'>
                    <div className='text-[#2c2b49] cursor-pointer' onClick={() => navigate('/')}>Home</div>
                    <div><i className="fa-solid fa-right-long"></i></div>
                    <div className='text-red-600'>Products</div>
                </div>
            </div>
            <div className='w-full pt-16 bg-[#f8f8f8]'>
                <div className='w-11/12 mx-auto p-5 h-full flex lg:flex-row flex-col gap-2 justify-between items-start'>
                    <div className='lg:w-1/4 w-full'>
                        <div className="w-full text-end text-xl underline cursor-pointer hover:opacity-55" onClick={handleResetFilter}>Reset</div>
                        {/* Category */}
                        <div className='w-full pb-5 border-b-2'>
                            <div className='font-bold text-xl mb-5'>Categories</div>
                            <div id="category" className='w-full h-52  overflow-y-auto px-5 space-y-7'>
                                {dataCategory?.map((item, index) => (
                                    <div key={index} className='w-full flex justify-between'>
                                        <div className='flex gap-5'>
                                            <input type="checkbox"  onChange={() => handleCategoryFilter(item.category)} className='outline-none rounded-md' />
                                            <div key={index} className='text-xl'>{item.category}</div>
                                        </div>
                                        <div className='font-bold'>({item.count})</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* stock */}
                        <div className='w-full mt-10 pb-5 border-b-2'>
                            <div className='font-bold text-xl mb-5'>Availability</div>
                            <div id="category" className='w-full h-auto px-5 space-y-7'>
                                <div className='text-xl '>
                                    <div className='w-full flex justify-between'>
                                        <div className="w-2/4 flex justify-start space-x-5">
                                            <input type="checkbox" onChange={() => handleInStockFilter(1)} className='outline-none rounded-lg' />
                                            <div>In stock</div>
                                        </div>
                                        <div className="w-2/4 text-end font-bold">({dataStock.inStock})</div>
                                    </div>
                                    <div className='w-full flex justify-between'>
                                        <div className="w-2/4 flex justify-start space-x-5">
                                            <input type="checkbox" onChange={() => handleInStockFilter(0)} className='outline-none rounded-lg' />
                                            <div>Out of stock</div>
                                        </div>
                                        <div className="w-2/4 text-end font-bold">({dataStock.outOfStock})</div>
                                    </div>
                                </div>
                                <div className='text-xl'></div>
                            </div>
                        </div>
                        {/* price */}
                        <div className='w-full mt-10 pb-5 border-b-2'>
                            <div className='font-bold text-xl mb-5'>Price</div>
                            <div className='w-full flex justify-between'>
                                <div className='text-lg'>The highest price is {highestPrice}</div>
                                <div onClick={()=> handleResetFilter()} className='underline text-lg cursor-pointer'>Reset</div>
                            </div>
                            <div className='mt-5'>
                                <input type="range" className='w-full' min="0" max={highestPrice} value={priceFilter} onInput={(event: React.ChangeEvent<HTMLInputElement>) => handlePriceFilterChange(event)} />

                                <div className='w-full flex justify-between'>
                                    <div>From $0</div>
                                    <div>To ${priceFilter}</div>
                                </div>
                            </div>
                        </div>
                        {/* brand */}
                        <div className='w-full mt-10 pb-5 border-b-2'>
                            <div className='font-bold text-xl mb-5'>Branch</div>
                            <div id="category" className='w-full h-52  overflow-y-auto px-5 space-y-7'>
                                {dataBranch?.map((item, index) => (
                                    <div key={index} className='w-full flex justify-between'>
                                        <div className='flex gap-5'>
                                            <input type="checkbox" onChange={() => handleBrandFilter(item)} className='outline-none rounded-md' />
                                            <div key={index} className='text-xl'>{item}</div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-3/4 w-full lg:pl-10 pl-0'>
                        <div className='font-bold text-xl mb-5'>Products ({dataStock.inStock})</div>
                        <div className="my-5 w-full">
                            <img src="https://electon7-store.myshopify.com/cdn/shop/files/Untitled-1.jpg?v=1672209531&width=1920\" alt="" />
                        </div>
                        <div className="my-5 w-full flex justify-between">
                            <div className='w-2/4 flex gap-x-4'>
                                <i onClick={() => setGrid(prev => !prev)} className={`fa-solid fa-border-all text-2xl cursor-pointer ${grid ? 'text-red-600': ''}`}></i>
                                <i onClick={() => setGrid(prev => !prev)} className={`fa-solid fa-list text-2xl cursor-pointer ${!grid ? 'text-red-600': ''}`}></i>
                            </div>
                        </div>
                        <div>
                            <Products isMore={true} setMore={() => { }} more={true} isGrid={grid} isLg={true} />

                        </div>
                    </div>

                </div>
            </div>
            {cartStore.isShow && <ModalCart/>}
        </Master>
    );
});

export default Shop;
