import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png'

import { useStore } from '../layout/master';
import { ProductType } from '../store/productStore';

import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { toJS } from 'mobx';
import cookie from 'cookiejs';
import userStore from '../store/userStore';
const Header = observer(() => {
    const { productStore, cartStore, WishListStore } = useStore();
    const [showBar, setShowBar] = useState<boolean>(false)
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [showCategory, setShowCategory] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const openModal = (product: ProductType) => {
        setSelectedProduct(product);
    };
    const searchRef = useRef<HTMLDivElement>(null)
    const checkUser = cookie.get('currentUser');
    if (typeof checkUser === 'string') {
        console.log(JSON.parse(checkUser));
    } else {
        console.log('currentUser không phải là chuỗi');
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(!showSearch)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearch])
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
    const calculateDiscountPrice = (price: number, discountPercentage: number): number => {
        return price - (price * discountPercentage) / 100;
    };
    const navigate = useNavigate()
    const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        productStore.SearchByTitle(title)
    }
    console.log(toJS(productStore.searchProducts.length));


    return (
        <div className='w-full h-auto'>
            <div className="w-full bg-[#f8f8f8] flex justify-between">
                <div className='w-11/12 mx-auto h-16 px-5 flex lg:justify-between justify-center'>
                    <div className='text-[#777777] my-auto w-1/3 lg:block hidden'>Need help? call us : (+92) 0123 456 789</div>
                    <div className='text-[#777777] my-auto  w-1/3 text-center'>Today's deal sale 50% off <Link to={'/shop'} className='text-red-600 font-bold ml-1 hover:opacity-70'> SHOP NOW!</Link></div>
                    <div className='text-[#777777] lg:flex hidden justify-end w-1/3 '>
                        {checkUser ? (<button onClick={() => { userStore.logout(); navigate('/login') }} className='flex text-[#777777] my-auto items-center gap-2 border-r border-r-[#777777] cursor-pointer pr-5 hover:text-red-600'>
                            <i className="fa-solid fa-right-from-bracket"></i> Log out
                        </button>) : (
                            <Link to={'/login'} className='flex text-[#777777] my-auto items-center gap-2 border-r border-r-[#777777] cursor-pointer pr-5 hover:text-red-600'>
                                <i className="fa-regular fa-user"></i> Sign in
                            </Link>
                        )}

                        <div onClick={() => navigate('/wishlist')} className='flex text-[#777777] items-center pl-5 gap-2 hover:text-red-600 cursor-pointer'>
                            <i className="fa-regular fa-heart"></i> Wishlist
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full ">
                <div className='w-11/12 mx-auto h-20 flex px-5 justify-between items-center'>
                    <div className='w-1/3 flex items-center space-x-5'>
                        <i onClick={() => setShowBar(!showBar)} className="fa-solid fa-bars text-3xl lg:hidden block cursor-pointer hover:opacity-75"></i>
                        <div className='h-full  my-auto w-full'><img src={logo} alt="" className='h-20 w-20 cursor-pointer' onClick={() => navigate('/')} /></div>
                    </div>
                    <div className='relative'>
                        <i onClick={() => { cartStore.toggleCartModal() }} className="fa-solid fa-cart-shopping text-3xl lg:hidden block cursor-pointer hover:opacity-75"></i>
                        <div className='absolute bg-red-600 text-white flex lg:hidden justify-center items-center rounded-full px-2 py-0 left-5 bottom-5'>
                            {cartStore.carts.length}
                        </div>
                    </div>
                    <div className='text-[#777777] lg:flex hidden w-1/3 my-auto justify-between'>
                        <div className='flex justify-between items-center cursor-pointer hover:text-red-600'>
                            <div onClick={() => navigate('/')} className='font-bold' >Home</div>
                        </div>
                        <div className='flex justify-between items-center cursor-pointer hover:text-red-600'>
                            <Link to={'/shop'} className='font-bold' >Shop</Link>
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
                                                <div onClick={() => navigate(`/product/${product.id}`)} className='cursor-pointer hover:text-red-600' key={idx}>{product.title}</div>
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

                    </div>
                    {/* modal bar */}
                    {showBar && (
                        <div className=' flex justify-start bg-gray-500 bg-opacity-80 fixed top-0 left-0 bottom-0 right-0 z-20 '>
                            <div className='w-96 h-full bg-[#ffffff] modal-bar'>
                                <div id='headerModal' className='flex w-full justify-end p-5'>
                                    <i onClick={() => setShowBar(!showBar)} className="fa-solid fa-x cursor-pointer hover:rounded-full p-3 hover:bg-gray-400"></i>
                                </div>
                                <div className='w-full py-5 h-full bg-[#f8f8f8]'>
                                    <div className='text-[#777777] flex my-auto gap-5 justify-center items-center w-full'>
                                        <div>
                                            <i className="fa-solid fa-headset text-3xl mr-3 text-red-600"></i>
                                        </div>
                                        <div className='font-bold hover:text-red-600 cursor-pointer'>
                                            (+92) 0123 456 789
                                        </div>
                                    </div>
                                    <div className=' flex w-full flex-col justify-start overflow-auto' style={{ height: 'calc(100vh - 100px)' }}>
                                        <div className='border-2 p-3 flex justify-between items-center cursor-pointer hover:text-red-600'>
                                            <Link to={'/'} className='font-bold text-xl' >Home</Link>
                                        </div>
                                        <div className='flex border-b-2 p-3 justify-between items-center cursor-pointer hover:text-red-600'>
                                            <Link to={'/shop'} className='font-bold text-xl' >Shop</Link>
                                        </div>
                                        <div onClick={() => setShowCategory(!showCategory)} className='border-b-2 p-3 h-auto flex flex-col justify-between items-center  cursor-pointer hover:text-red-600'>
                                            <div className='w-full flex justify-between items-center'>
                                                <div className='font-bold text-xl' >Collection</div>
                                                <i className="fa-solid fa-caret-down ml-3"></i>
                                            </div>
                                            {showCategory && (
                                                <div className={`w-full h-auto py-5`}>
                                                    <div className=' bg-white text-black border z-10 h-auto px-5 py-2 flex flex-col justify-between gap-5'>
                                                        {/* smartphone, laptops,fragrances,skincare,groceries,home-decoration */}
                                                        {Object.entries(groupedProducts).map(([category, products], index) => (
                                                            <div key={index} className='flex flex-col justify-between h-full gap-2'>
                                                                <div className='border-b border-b-gray-200 pb-1 font-bold'>{category}</div>
                                                                {products.map((product, idx) => (
                                                                    <div onClick={() => navigate(`/product/${product.id}`)} className='cursor-pointer hover:text-red-600' key={idx}>{product.title}</div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex border-b-2 p-3 justify-between items-center cursor-pointer hover:text-red-600'>
                                            <div className='font-bold text-xl' >Blog</div>


                                        </div>
                                        <div className='flex border-b-2 p-3 justify-between items-center cursor-pointer hover:text-red-600'>
                                            <div className='font-bold text-xl' >Pages</div>
                                            <i className="fa-solid fa-caret-down ml-3"></i>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='text-[#777777] lg:flex hidden my-auto justify-end items-center w-1/3'>
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
                        <div className='relative lg:flex hidden items-center flex-1 justify-end h-[70%] my-auto'>
                            <input onClick={() => setShowSearch(!showSearch)} onChange={(e) => handleSearchProduct(e)} type="text" className='focus:border-2 focus:border-red-600 outline-none rounded-lg w-10/12 h-full text-black pl-3' placeholder='Find our product' />
                            <i className=" fa-solid fa-magnifying-glass absolute right-2 text-xl text-black cursor-pointer hover:text-red-600"></i>

                            {showSearch && (
                                <div ref={searchRef} className={`flex flex-col justify-start gap-5 items-center absolute top-12 bg-white rounded-lg shadow-xl w-[31rem] text-black z-10 ${productStore.searchProducts.length === 0 ? 'p-0' : 'p-5'} overflow-auto max-h-80`}>

                                    {productStore.searchProducts?.map((item, index) => (
                                        <Link to={`/product/${item.id}`} key={index} id="divProductSearch" className={`flex justify-between w-full px-4 min-h-20  hover:opacity-90`}>
                                            <div className='w-1/4'>
                                                <img src={item.thumbnail} alt="" className='w-full h-full object-cover' />
                                            </div>
                                            <div className='w-3/4 ps-7 flex flex-col items-start justify-between'>
                                                <div className='font-bold'>{item.title}</div>
                                                <div className='w-full flex justify-start gap-x-5'>
                                                    {item.discountPercentage && (<div className='text-red-600 font-bold'>$ {calculateDiscountPrice(item.price, item.discountPercentage).toFixed(2)}</div>)}
                                                    <div className='text-gray-400 line-through font-bold'>$ {item.price}</div>
                                                </div>

                                            </div>
                                        </Link>
                                    ))}


                                </div>
                            )}
                        </div>

                        <div className='lg:flex hidden justify-center h-full bg-red-600 items-center font-bold px-7 gap-3 cursor-pointer' onClick={() => cartStore?.toggleCartModal()} > <i className="fa-solid fa-cart-shopping"></i>{cartStore.carts.length} items ${cartStore.totalPrice.toFixed(2)}</div>
                    </div>
                </div>
            </div>

        </div>
    );
})

export default Header;
