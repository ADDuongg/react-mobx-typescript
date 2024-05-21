import React, { useState } from 'react';
import Master, { useStore } from '../layout/master';
import { toJS } from 'mobx';
import { Link, useNavigate } from 'react-router-dom';
import { ProductType } from '../store/productStore';
import { observer } from 'mobx-react-lite';
import cartStore from '../store/cartStore';
import ModalCart from '../modal/modalCart';

const Wishlist = observer(() => {
    const { productStore, WishListStore } = useStore();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const navigate = useNavigate()
    const calculateDiscountPrice = (price: number, discountPercentage: number): number => {
        return price - (price * discountPercentage) / 100;
    };
    const openModal = (product: ProductType) => {
        setSelectedProduct(product);
    };
    return (
        <Master>
            <div className='w-11/12 mx-auto p-5'>
                {WishListStore.wishList.length === 0 && (<div className=' text-2xl'>Your wishlist is empty <Link to={'/shop'} className='underline cursor-pointer'>return to store</Link></div>)}
                <div className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 auto-rows-auto w-full h-96  gap-10`}>
                    {toJS(WishListStore?.wishList)?.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between gap-5 h-[25rem] bg-white rounded-lg overflow-hidden relative group hover:opacity-80"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="w-full h-3/4">
                                <img
                                    src={index === hoveredIndex ? item.images[1] : item.thumbnail}
                                    alt=""
                                    className="h-full w-full transition-opacity duration-300 hover:opacity-95 cursor-pointer"
                                    onClick={() => { navigate(`/product/${item.id}`) }}
                                />
                            </div>
                            <div className="flex h-1/4 flex-col items-center">
                                <div>{item.title}</div>
                                {item.discountPercentage ? (
                                    <div className='flex gap-x-5'>
                                        <span style={{ textDecoration: 'line-through' }}><p >${item.price}</p></span>{' '}
                                        <span className='text-red-600'>${calculateDiscountPrice(item.price, item.discountPercentage).toFixed(2)}</span>
                                    </div>
                                ) : (
                                    item.price
                                )}
                            </div>

                            {item.discountPercentage && (
                                <div className='bg-[#2c2b49] text-white absolute right-0 top-0 px-3 py-1 '>
                                    -{item.discountPercentage}
                                </div>
                            )}

                            <div
                                id="optionProduct"
                                className=" flex flex-col gap-3 h-2/5 w-20 absolute top-7 -left-10 group-hover:left-7 transition-all duration-700"
                            >
                                <div className="bg-white w-10 h-10 border-2 flex justify-center items-center p-3 rounded-lg cursor-pointer hover:text-yellow-500">
                                    <i className="fa-solid fa-cart-plus"></i>
                                </div>
                                <div
                                    className="bg-white w-10 h-10 border-2 flex justify-center items-center p-3 rounded-lg cursor-pointer hover:text-blue-500"
                                    onClick={() => openModal(item)}
                                >
                                    <i className="fa-regular fa-eye"></i>
                                </div>
                                <div
                                    id="optionProduct"
                                    className="bg-white w-10 h-10 border-2 flex justify-center items-center p-3 rounded-lg cursor-pointer hover:text-red-600"
                                    onClick={() => WishListStore.toggleWishList(item)}
                                >
                                    <i className={`${WishListStore.isInWishList(item) ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartStore.isShow && <ModalCart/>}
            </div>
        </Master>
    );
})

export default Wishlist;
