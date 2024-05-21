import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../layout/master';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';

const ModalCart = observer(() => {
    const { cartStore } = useStore();
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (productId: number, value: number) => {
        if (!isNaN(value) && value > 0) {
            cartStore.updateQuantity(productId, value);
        }
    };

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-gray-500 bg-opacity-65 flex justify-end'>
            <div className='h-full w-[28rem] bg-white p-8 flex flex-col'>
                <div className='flex justify-between w-full pb-2 border-b'>
                    <div className='font-bold text-xl'>My shopping cart</div>
                    <button onClick={() => cartStore.closeCartModal()} className='font-bold hover:border p-2 w-10 h-10 hover:bg-gray-400 hover:text-white rounded-full'>X</button>
                </div>

                <div className='mt-10'>Congratulations, you've got free shipping!</div>

                <div className='w-full h-3 flex items-center mt-3 relative'>
                    <div className='w-full bg-red-600 rounded-3xl h-full'></div>
                    <div className='animate-move flex justify-center items-center bg-red-600 w-1/12 h-8 rounded-full absolute right-2'>
                        <i className="text-white fa-solid fa-truck-fast"></i>
                    </div>
                </div>

                {cartStore.carts.length === 0 ? (
                    <div className='mt-32 flex w-full flex-col items-center gap-5'>
                        <i className="fa-solid fa-cart-shopping text-xl"></i>
                        <div className='font-bold text-xl'>Your cart is empty</div>
                        <Link onClick={() => {cartStore.toggleCartModal()}} to={'/shop'} className='rounded-xl bg-red-600 text-white px-20 py-5' >
                            CONTINUE SHOPPING
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className='w-full h-96 overflow-y-auto mt-10 border-b-2'>
                            {toJS(cartStore?.carts?.map((item, index) => (
                                <div key={index} className='w-full h-3/5 border-b-2 flex justify-between py-2'>
                                    <div className='w-[24%] h-2/5 border'>
                                        <img src={item.product.thumbnail} className='h-full w-full' alt="" />
                                    </div>
                                    <div className='w-[80%] h-full flex flex-col justify-start pl-7'>
                                        <div className='font-bold text-lg'>{item.product.title}</div>
                                        <div className='text-lg font-bold text-red-600'>${item.product.price.toFixed(2)}</div>
                                        <div className='text-lg font-bold flex'>Brand: <span className='font-normal ml-2'>{item.product.brand}</span></div>
                                        <div className='flex justify-start w-full items-center h-10 mt-7'>
                                            <div className='rounded w-28 h-10 border hover:border-red-500 cursor-pointer flex justify-between items-center'>
                                                <button onClick={() => cartStore.decreaseQuantity(item.product.id)} className='font-bold w-1/3 px-2 pb-2 text-3xl flex justify-center items-center'>-</button>
                                                <input value={item.quantity} onChange={(e) => handleChange(item.product.id, parseInt(e.target.value))} type="text" className='w-1/3 outline-none pl-3' />
                                                <button onClick={() => cartStore.increaseQuantity(item.product.id)} className='font-bold w-1/3 px-2 pb-2 text-3xl flex justify-center items-center'>+</button>
                                            </div>
                                            <i onClick={() => cartStore.removeFromCart(item.product.id)} className="fa-regular fa-trash-can ml-5 cursor-pointer hover:opacity-80"></i>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>

                        <div className='w-full my-2 flex justify-between'>
                            <div className='font-bold text-xl'>Subtotal: </div>
                            <div className='font-bold'>${cartStore.totalPrice.toFixed(2)} USD</div>
                        </div>
                        <div className='flex justify-between w-full items-center mt-3'>
                            <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className='cursor-pointer mt-1 h-full' />
                            <div className='flex gap-1'>I have read and agree with the <div className='underline' style={{ textUnderlineOffset: '8px' }}> terms & condition</div></div>
                        </div>
                        <div className='w-full flex justify-between gap-8 mt-10'>
                            <Link onClick={() => { cartStore.toggleCartModal() }} to={'/cart'} className='rounded-lg bg-red-600 text-center  text-white py-4 w-2/4 hover:bg-[#2c2b49]'>VIEW CART</Link>
                            <button
                                disabled={isCheckOut || !agreedToTerms}
                                className={`rounded-lg py-4 w-2/4 text-white ${isCheckOut || !agreedToTerms ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#2c2b49] hover:bg-red-600'}`}
                                onClick={() => setIsCheckOut(true)}
                            >
                                CHECK OUT
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});

export default ModalCart;
