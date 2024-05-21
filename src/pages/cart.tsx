import React from 'react';
import Master, { useStore } from '../layout/master';
import { Link, useNavigate } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import ModalCart from '../modal/modalCart';

const Cart = observer(() => {
    const navigate = useNavigate();
    const { cartStore, userStore } = useStore();

    const handleChange = (productId: number, value: number) => {
        if (!isNaN(value) && value > 0) {
            cartStore.updateQuantity(productId, value);
        }
    };
    const handleSubmit = () => {
        cartStore.carts.length === 0 ? alert('Bạn chưa có sản phầm nào trong giỏ hàng') : alert('Thanh toán thành công')
    }
    const handleCheckout = () => {
        if (cartStore.carts.length === 0) {
            alert('Bạn chưa có sản phầm trong giỏ hàng')
            return
        }
        if (!userStore.currentUser.email) {
            alert('Bạn phải đăng nhập mới có thể mua hàng')
            return
        }

        navigate('/checkout')

    }
    return (
        <Master>
            <div className='w-full bg-[#f8f8f8]'>
                <div className='w-11/12 mx-auto p-5 h-full flex gap-2 justify-start items-end'>
                    <div className='text-[#2c2b49] cursor-pointer' onClick={() => navigate('/')}>Home</div>
                    <div><i className="fa-solid fa-right-long"></i></div>
                    <div className='text-red-600'>Your Shopping Cart</div>
                </div>
            </div>

            <div className='w-full mt-16'>
                <div className='w-11/12 mx-auto p-5 h-full flex gap-2 justify-start items-end'>
                    <div className='w-full h-auto lg:p-20 p-10'>
                        <div className="flex lg:flex-row flex-col justify-between w-full gap-10">
                            <div className='lg:w-[60%] w-full h-full flex flex-col items-center'>
                                <div className='font-bold text-xl'>CONGRATULATIONS, YOU'VE GOT FREE SHIPPING!</div>
                                <div className='w-full h-3 flex items-center mt-5 relative'>
                                    <div className='w-full bg-red-600 rounded-3xl h-full'></div>
                                    <div className='animate-move flex justify-center items-center bg-red-600 w-10 h-8 rounded-full absolute right-2'>
                                        <i className="text-white fa-solid fa-truck-fast"></i>
                                    </div>
                                </div>

                                <div className="w-full flex justify-between mt-20 pb-5 border-b">
                                    <div className='font-bold text-xl'>Product</div>
                                    <div className='font-bold text-xl'>Quantity</div>
                                    <div className='font-bold text-xl'>Total</div>
                                </div>
                                {toJS(cartStore?.carts?.map((item, index) => (
                                    <div key={index} className='w-full h-3/5 border-b flex justify-between py-8'>
                                        <div className='w-[47%] h-2/5 flex justify-start'>
                                            <img src={item.product.thumbnail} className='h-2/4 w-2/4' alt="" />
                                            <div className='pl-5'>
                                                <div className='font-bold text-lg'>{item.product.title}</div>
                                                <div className='text-lg font-bold text-red-600'>${item.product.price.toFixed(2)}</div>
                                                <div className='text-lg font-bold flex'>Brand: <span className='font-normal ml-2'>{item.product.brand}</span></div>
                                            </div>
                                        </div>
                                        <div className='w-[53%] h-full flex justify-between'>
                                            <div className='w-2/4'>
                                                <div className='flex justify-start w-full items-center h-10 mt-5'>
                                                    <div className='rounded w-28 h-10 border hover:border-red-500 cursor-pointer flex justify-between items-center'>
                                                        <button onClick={() => cartStore.decreaseQuantity(item.product.id)} className='font-bold w-1/3 px-2 pb-2 text-3xl flex justify-center items-center'>-</button>
                                                        <input value={item.quantity} onChange={(e) => handleChange(item.product.id, parseInt(e.target.value))} type="text" className='w-1/3 outline-none pl-3' />
                                                        <button onClick={() => cartStore.increaseQuantity(item.product.id)} className='font-bold w-1/3 px-2 pb-2 text-3xl flex justify-center items-center'>+</button>
                                                    </div>
                                                    <i onClick={() => cartStore.removeFromCart(item.product.id)} className="fa-regular fa-trash-can ml-5 cursor-pointer hover:opacity-80"></i>
                                                </div>
                                            </div>
                                            <div className='w-2/4 flex justify-end items-center'>
                                                <div className='font-bold text-xl'>
                                                    ${cartStore.getTotalForProduct(item.product.id).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )))}

                                <div className='mt-10 w-full flex lg:flex-row flex-col justify-between gap-5'>
                                    <div className='flex justify-between lg:w-2/4 w-full h-14 items-center rounded-xl border overflow-hidden'>
                                        <div className='w-auto h-full flex items-center pl-5'>
                                            <i className="fa-solid fa-gift"></i>
                                        </div>
                                        <input type="text" placeholder='Discount code' className='h-full flex-1 pl-5 focus:outline-none' />
                                        <button className='bg-red-600 hover:opacity-90 text-white flex justify-center items-center w-auto px-8 h-full'>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div className='lg:w-2/4 w-full flex justify-end'>
                                        <Link to={'/shop'} className='lg:w-2/4 w-full bg-red-600  text-white text-center  rounded-lg hover:opacity-90  font-bold flex items-center justify-center h-14'>
                                            RETURN TO STORE
                                        </Link>
                                    </div>
                                </div>
                                <div className='w-full text-start text-xl font-bold mt-10'>
                                    Order special instructions
                                </div>
                                <div className='w-full mt-3'>
                                    <textarea name="" className='w-full border focus:outline-none p-5 rounded-lg text-lg' placeholder='Order speacial instructions' rows={10} id=""></textarea>
                                </div>
                            </div>
                            <form className='lg:w-[40%] w-full h-full bg-[#f8f8f8] p-10 space-y-10' onSubmit={handleSubmit}>
                                <div className='font-bold text-xl'>Get shipping estimates</div>
                                <div>
                                    <label htmlFor="">Country</label>
                                    <select name="" className='w-full focus:outline-none h-16 rounded-lg mt-5 px-5' id="" required>
                                        <option value="">Select Country</option>
                                        <option value="">VietNam</option>
                                        <option value="">USA</option>
                                        <option value="">Angola</option>
                                        <option value="">Australia</option>
                                        <option value="">Brazil</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">State</label>
                                    <select name="" className='w-full focus:outline-none h-16 rounded-lg mt-5 px-5' id="" required>
                                        <option value="">Select State</option>
                                        <option value="">VietNam</option>
                                        <option value="">USA</option>
                                        <option value="">Angola</option>
                                        <option value="">Australia</option>
                                        <option value="">Brazil</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Postal/Zip Code</label>
                                    <input required name="" className='w-full focus:outline-none h-16 rounded-lg mt-5 pl-5' placeholder='Postal/Zip Code' id=""></input>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <div className='font-bold text-xl'>Subtotal</div>
                                    <div className='font-bold text-red-600'>${cartStore.totalPrice} USD</div>
                                </div>
                                <button type='submit' onClick={handleCheckout} className='w-full bg-red-600 text-white rounded-lg px-20 py-5 hover:opacity-90'>CHECK OUT</button>
                            </form>
                        </div>
                    </div>
                </div>
                {cartStore.isShow && <ModalCart />}
            </div>
        </Master>
    );
});

export default Cart;
