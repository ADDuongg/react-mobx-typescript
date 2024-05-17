import React, { useEffect } from 'react';
import logo from '../assets/logo.png'

import { useStore } from '../layout/master';
import { ProductType } from '../store/productStore';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
const Header = observer(() => {
    const { productStore, cartStore } = useStore();
    useEffect(() => {
        productStore.fetchProduct();
    }, [productStore]);

    const groupByCategory = (products: ProductType[]): Record<string, ProductType[]> => {
        return products.reduce((acc: Record<string, ProductType[]>, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {} as Record<string, ProductType[]>);
    };

    const groupedProducts = groupByCategory(productStore.products);

    console.log(cartStore?.isShow);
    const navigate = useNavigate()

    return (
        <div className='w-full h-auto'>
            <div className="w-full bg-[#f8f8f8] flex justify-between">
                <div className='w-11/12 mx-auto h-16 px-5 flex justify-between'>
                    <div className='text-[#777777] my-auto w-1/3'>Need help? call us : (+92) 0123 456 789</div>
                    <div className='text-[#777777] my-auto  w-1/3 text-center'>Today's deal sale 50% off <span className='text-red-600 font-bold ml-1'> SHOP NOW!</span></div>
                    <div className='text-[#777777] flex justify-end w-1/3'>
                        <div className='flex text-[#777777] my-auto items-center gap-2 border-r border-r-[#777777] cursor-pointer pr-5 hover:text-red-600'>
                            <i className="fa-regular fa-user"></i> Sign in
                        </div>

                        <div onClick={() => navigate('/wishlist')} className='flex text-[#777777] items-center pl-5 gap-2 hover:text-red-600 cursor-pointer'>
                            <i  className="fa-regular fa-heart"></i> Wishlist
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full ">
                <div className='w-11/12 mx-auto h-20 flex px-5 justify-between'>
                    <div className='h-full  my-auto w-1/3'><img src={logo} alt="" className='h-20 w-20 cursor-pointer' onClick={() => navigate('/')} /></div>
                    <div className='text-[#777777] flex w-1/3 my-auto justify-between'>
                        <div className='flex justify-between items-center cursor-pointer hover:text-red-600'>
                            <div className='font-bold' >Home</div>


                        </div>
                        <div className='flex justify-between items-center cursor-pointer hover:text-red-600'>
                            <div className='font-bold' >Shop</div>


                        </div>
                        <div className='relative flex justify-between items-center group cursor-pointer hover:text-red-600'>
                            <div className='font-bold' >Collection</div>
                            <i className="fa-solid fa-caret-down ml-3"></i>
                            <div className='absolute w-[65rem]  top-3 p-5 -left-64  z-10 h-56 hidden group-hover:block'>
                                <div className=' bg-white text-black border z-10 h-auto px-5 py-2 flex gap-5'>
                                    {/* smartphone, laptops,fragrances,skincare,groceries,home-decoration */}
                                    {Object.entries(groupedProducts).map(([category, products], index) => (
                                        <div key={index} className='flex flex-col justify-between h-full gap-2'>
                                            <div className='border-b border-b-gray-200 pb-1 font-bold'>{category}</div>
                                            {products.map((product, idx) => (
                                                <div className='cursor-pointer hover:text-red-600' key={idx}>{product.title}</div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center cursor-pointer hover:text-red-600'>
                            <div className='font-bold' >Blog</div>


                        </div>
                        <div className='flex justify-between items-center cursor-pointer hover:text-red-600'>
                            <div className='font-bold' >Pages</div>
                            <i className="fa-solid fa-caret-down ml-3"></i>

                        </div>
                        {/* {menu?.map((item, index) => (
                            <div key={index} className='flex justify-between items-center cursor-pointer hover:text-red-600'>
                                <div className='font-bold' >{item}</div>
                                {(index % 2 === 0 && index != 0) && <i className="fa-solid fa-caret-down ml-3"></i>}
                                
                            </div>
                        ))} */}
                    </div>
                    <div className='text-[#777777] flex  my-auto justify-end items-center w-1/3'>
                        <div>
                            <i className="fa-solid fa-headset text-3xl mr-3 text-red-600"></i>
                        </div>
                        <div className='font-bold hover:text-red-600 cursor-pointer'>
                            (+92) 0123 456 789
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#2c2b49] text-white h-16 ">
                <div className='w-11/12 mx-auto h-full px-5 flex justify-between gap-5'>
                    <div className='w-2/4 h-full flex justify-start gap-10'>
                        <div className='flex justify-between h-full bg-red-600 items-center font-bold px-7 gap-10'>TOP CATEGORIES <i className="fa-solid fa-bars cursor-pointer"></i></div>
                        <div className='flex justify-between h-full gap-8 '>
                            <div className='flex items-center justify-between gap-x-3'><i className="fa-solid fa-gift "></i> GIFT VOUCHER</div>
                            <div className='flex items-center justify-between gap-x-3'><i className="fa-solid fa-truck-fast"></i>FREE SHIP</div>
                            {/*  <Carousel total={2}/> */}
                        </div>
                    </div>
                    <div className='w-2/4 h-full flex justify-end gap-10'>
                        <div className='relative flex items-center flex-1 justify-end h-[70%] my-auto'>
                            <input type="text" className='focus:border-2 focus:border-red-600 outline-none rounded-lg w-10/12 h-full text-black pl-3' placeholder='Find our product' />
                            <i className=" fa-solid fa-magnifying-glass absolute right-2 text-xl text-black cursor-pointer hover:text-red-600"></i>
                        </div>
                        <div className='flex justify-center h-full bg-red-600 items-center font-bold px-7 gap-3 cursor-pointer' onClick={() => cartStore?.toggleCartModal()} > <i className="fa-solid fa-cart-shopping"></i>{cartStore.carts.length} items ${cartStore.totalPrice.toFixed(2)}</div>
                    </div>
                </div>
            </div>
                        
        </div>
    );
})

export default Header;
