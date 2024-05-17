import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../layout/master';
import { ProductType } from '../../store/productStore';
import { useNavigate } from 'react-router-dom';


const Products = observer(() => {
    const { productStore, WishListStore, cartStore } = useStore();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [img, handleSetImg] = useState<number>(0)
    const [quantity, setQuantity] = useState(1)
    const [more, setMore] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        productStore.fetchProduct();
    }, [productStore]);

    const calculateDiscountPrice = (price: number, discountPercentage: number): number => {
        return price - (price * discountPercentage) / 100;
    };

    const openModal = (product: ProductType) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setQuantity(parseInt(value))
    }
    console.log(quantity);
    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1)); // Ensure quantity does not go below 0
    };
    const handleAddCart = (item: ProductType, quantity: number): void => {
        cartStore.addToCart(item, quantity)
        closeModal()
    };
    
    
    return (
        <>
            <div className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 auto-rows-auto w-full ${more ? 'h-auto ': 'h-96 overflow-hidden'} gap-10`}>
                {toJS(productStore.products)?.map((item, index) => (
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
                                onClick={() => {navigate(`/product/${item.id}`)}}
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
                                onClick={() => WishListStore.addToWishList(item)}
                            >
                                <i className={`${WishListStore.isInWishList(item) ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full text-center font-bold cursor-pointer mt-5 flex items-center justify-center gap-3' onClick={() => setMore(prev => !prev)}>See more <i className={`text-red-600 font-bold fa-solid fa-chevron-${more ? 'up': 'down'}`}></i></div>

                {/* MODAL VIEW PRODUCT */}
            {selectedProduct && (
                <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
                    <div className='bg-white p-5 rounded-lg w-3/5 h-5/6 overflow-auto relative'>
                        <button onClick={closeModal} className='absolute right-5 top-5 font-bold hover:border p-2 w-10 h-10 hover:bg-gray-400 hover:text-white rounded-full'>X</button>

                        <div className="flex justify-between w-full h-full p-5">
                            <div className='w-2/4 flex flex-col justify-start'>
                                <div className='w-full h-4/6 border p-5'>
                                    <img src={selectedProduct.images[img]} alt="" className='w-full h-full' />
                                </div>
                                <div className="h-2/6 flex justify-between gap-3 w-full mt-5">
                                    {selectedProduct?.images?.map((item, index) => (
                                        <div onClick={() => handleSetImg(index)} key={index} className={`${img === index ? 'border-4' : 'border'} p-3 h-2/4 w-36 cursor-pointer`}>
                                            <img src={item} alt="" className='w-full h-full' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-2/4 px-10">
                                <div className='w-full h-2/6 flex flex-col justify-start'>
                                    <div className='font-bold text-3xl'>{selectedProduct.title}</div>
                                    {selectedProduct.discountPercentage &&
                                        <div className='text-red-600 flex font-bold mt-5 items-center'>
                                            ${calculateDiscountPrice(selectedProduct.price, selectedProduct.discountPercentage).toFixed(3)}
                                            <div className='text-gray-500 line-through ml-3 font-bold'>${selectedProduct.price}</div>
                                            <div className='ml-3 rounded-xl flex justify-center items-center text-sm p-2 bg-red-600 text-white'>-{selectedProduct.discountPercentage.toFixed(0)}%</div>
                                        </div>}
                                    <div className={`flex gap-x-10 mt-24`}>
                                        <span className='font-bold'>Availability:</span>
                                        <div className='flex gap-2'>
                                            <div className={`${selectedProduct.stock !== 0 ? 'border rounded-full flex justify-center items-center w-6 h-6' : ''}`}><i className={`fa-solid fa-circle ${selectedProduct.stock !== 0 ? 'text-green-500 ' : ''}`}></i></div> {selectedProduct.stock} in stock
                                        </div>

                                    </div>
                                    <div className={`flex gap-5 mt-7 flex-col`}>
                                        <span className='font-bold flex'>Colors:  <div className='text-gray-400 font-normal ml-2'> BurlyWood</div></span>
                                        <div className='flex gap-5'>
                                            <div onClick={() => handleSetImg(1)} className='rounded-full  h-8 w-8 bg-green-500 hover:border-4 cursor-pointer'></div>
                                            <div onClick={() => handleSetImg(2)} className='rounded-full h-8 w-8 bg-blue-500 hover:border-4 cursor-pointer'></div>
                                            <div onClick={() => handleSetImg(3)} className='rounded-full h-8 w-8 bg-yellow-500 hover:border-4 cursor-pointer'></div>
                                        </div>

                                    </div>
                                    <div className={`flex gap-5 mt-7`}>
                                        <div className='font-bold'>Quantity: </div>
                                        <div className='rounded w-28 h-10 border hover:border-red-500 cursor-pointer flex justify-between'>
                                            <button onClick={decreaseQuantity} className='font-bold 1/3 px-2 pb-2 text-3xl flex justify-center items-center'>-</button>
                                            <input value={quantity} onChange={handleChange} type="text" className='w-1/3 outline-none pl-3' />
                                            <button onClick={increaseQuantity} className='font-bold 1/3 px-2 pb-2 text-3xl flex justify-center items-center'>+</button>
                                        </div>

                                    </div>

                                    <div className={`flex gap-5 mt-7 justify-between`}>
                                        <button onClick={() => handleAddCart(selectedProduct, quantity)} className='text-white bg-red-600 p-4 rounded-xl flex-1 hover:bg-white hover:text-red-600 hover:border-red-600 border font-bold'>ADD TO CART</button>
                                        <button className='text-white bg-red-600 p-4 rounded-xl flex-1 hover:bg-white hover:text-red-600 hover:border-red-600 border font-bold'>BUY IT NOW</button>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
});

export default Products;
