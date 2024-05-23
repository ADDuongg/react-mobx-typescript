import React from 'react';
import logo from '../assets/logo.png';
import { useStore } from '../layout/master';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { observer } from 'mobx-react-lite';
const Checkout = observer(() => {
        const { userStore, cartStore } = useStore();
        const shippingCost = 19.22;

        const calculateDiscountPrice = (price: number, discountPercentage: number) => {
            return price - (price * discountPercentage) / 100;
        };
        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            cartStore.clearCart()
            Swal.fire(
                'Order Placed!',
                'Your order has been placed successfully.',
                'success'
            );
        };
        return (
            <div className='w-full h-full flex flex-col justify-between'>
                <div className='w-full border-b-2 lg:px-56 px-10 flex h-[20%] justify-between items-center'>
                    <Link to={'/'} className='h-full w-28'>
                        <img src={logo} className='w-full h-full' alt="" />
                    </Link>
                    <Link to={'/cart'}>
                        <i className="fa-solid fa-bag-shopping text-green-400 text-3xl"></i>
                    </Link>
                </div>
                <div className='w-full h-[80%] lg:pl-56 pl-10 flex lg:flex-row flex-col justify-between gap-x-10'>
                    <form id="divLeft" className='lg:w-2/4 w-full mt-20 space-y-5' onSubmit={handleSubmit}>
                        <div className='text-gray-500 text-lg'>
                            Account
                        </div>
                        <div className='text-xl pb-6 border-b'>
                            {userStore.currentUser.email}
                        </div>
                        <div className='font-bold text-2xl'>Delivery</div>
                        <div className='space-y-3'>
                            <select name="" className='w-full focus:outline-none h-16 rounded-lg mt-5 px-5 border' id="" required>
                                <option value="">Select Country</option>
                                <option value="">VietNam</option>
                                <option value="">USA</option>
                                <option value="">Angola</option>
                                <option value="">Australia</option>
                                <option value="">Brazil</option>
                            </select>
                            <div className='flex justify-between gap-10 h-auto'>
                                <input type="text" className='w-2/4 focus:outline-none h-16 rounded-lg mt-5 px-5 border' value={userStore.currentUser.firstname} />
                                <input type="text" className='w-2/4 focus:outline-none h-16 rounded-lg mt-5 px-5 border' value={userStore.currentUser.lastname} />
                            </div>
                            <input required type="text" className='w-full focus:outline-none h-16 rounded-lg mt-5 px-5 border' placeholder='Address' />
                            <input type="text" className='w-full focus:outline-none h-16 rounded-lg mt-5 px-5 border' placeholder='Apartment, suite, etc. (optional)' />
                            <div className='flex justify-between gap-x-5'>
                                <input required type="text" className='w-1/3 focus:outline-none h-16 rounded-lg mt-5 px-5 border' placeholder='City' />
                                <select required className='w-1/3 focus:outline-none h-16 rounded-lg mt-5 px-5 border'>
                                    <option value="">Select Country</option>
                                    <option value="">VietNam</option>
                                    <option value="">USA</option>
                                    <option value="">Angola</option>
                                    <option value="">Australia</option>
                                    <option value="">Brazil</option>
                                </select>
                                <input required type="text" className='w-1/3 focus:outline-none h-16 rounded-lg mt-5 px-5 border' placeholder='ZIP code' />
                            </div>
                        </div>
                        <div className='font-bold text-xl'>Shipping method</div>
                        <div className='w-full px-5 rounded-lg border-green-400 border h-auto py-7 flex justify-between bg-[#f3f8f3] items-center'>
                            <div>Standard</div>
                            <div className='font-bold'>${shippingCost.toFixed(2)}</div>
                        </div>
                        <div className='font-bold text-xl'>Payment</div>
                        <div className='text-gray-500 text-lg'>All transactions are secure and encrypted.</div>
                        <div className='bg-[#f6f6f6] w-full flex flex-col items-center justify-evenly py-10'>
                            <i className="fa-solid fa-truck-fast text-4xl"></i>
                            <div>This order will be paid after shipping.</div>
                        </div>
                        <button type='submit' className='bg-[#f6f6f6] w-full flex  items-center justify-center py-5 cursor-pointer hover:opacity-70'>
                            <div>ORDER</div>
                        </button>

                        <div className='py-10 border-t'>
                            All rights reserved electon7-store
                        </div>
                    </form>
                    <div id="divRight" className='lg:w-2/4 w-full bg-[#fafafa] 2xl:pl-24 xl:pl-10 pl-5 pt-10 2xl:pr-48 xl:pr-10 pr-5 space-y-20'>
                        <div className='max-h-80 overflow-auto w-full space-y-16'>
                            <div className='w-full flex justify-between items-center flex-col gap-y-7 py-10'>
                                {
                                    cartStore.carts?.map((item, index) => (
                                        <div key={index} className='flex justify-between items-center w-full'>
                                            <div className='w-full'>
                                                <div className='flex items-center gap-5'>
                                                    <div className='border rounded-lg relative'>
                                                        <img src={item.product.thumbnail} alt="" className='h-20 w-20 rounded-lg' />
                                                        <div className='rounded-full bg-red-600 text-white absolute -right-2 bottom-16 px-2 z-10'>
                                                            {item.quantity}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='font-bold'>{item.product.title}</div>
                                                        <div className='text-gray-500'>{item.product.brand}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {item.product.discountPercentage ? (
                                                    <div className='flex gap-1'>$ <span>{calculateDiscountPrice(item.product.price, item.product.discountPercentage).toFixed(2)}</span></div>
                                                ) : (
                                                    `$ ${item.product.price}`
                                                )}
                                            </div>
                                        </div>
                                    ))

                                }
                            </div>
                        </div>
                        <div className='w-full flex-col flex gap-y-5'>
                            <div className='w-full flex justify-between'>
                                <div>Subtotal</div>
                                <div className='font-bold flex gap-x-1'>$ <span>{cartStore.totalPrice.toFixed(2)}</span></div>
                            </div>
                            <div className='w-full flex justify-between'>
                                <div>Shipping</div>
                                <div className='font-bold'>${shippingCost.toFixed(2)}</div>
                            </div>
                            <div className='w-full flex justify-between mb-10'>
                                <div className='font-bold text-2xl'>Total</div>
                                <div className='font-bold text-2xl flex gap-x-1'>$ <span>{(cartStore.totalPrice + shippingCost).toFixed(2)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
)

export default Checkout;
