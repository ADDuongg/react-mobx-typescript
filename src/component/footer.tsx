import React from 'react';
import logo from '../assets/logo.png'
import visa from '../assets/Visa-Logo.png'
import paypal from '../assets/paypal.png'
import mastercard from '../assets/card.png'
import express from '../assets/express.png'
const Footer = () => {
    return (
        <div className=' bg-[#F8F8F8] w-full lg:h-96 h-auto flex flex-col justify-between'>
            <div className='w-11/12 px-5 mb-8 mx-auto pr-20 md:h-full h-auto gap-8 pt-10 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 grid-rows-1'>
                <div className='flex w-full flex-col h-full justify-start gap-5 col-span-2'>
                    <div className='font-bold'>Contact us</div>
                    <div className='space-y-5'>
                        <div className='flex justify-start gap-x-3 items-center'>
                            <i className="text-red-600 fa-solid fa-location-dot"></i>
                            <div>1093 Marigold lane, coral way, miami, florida, 33169</div>
                        </div>
                        <div className='flex justify-start gap-x-3 items-center'>
                            <i className="text-red-600 fa-solid fa-phone"></i>
                            <div>610-403-403</div>
                        </div>
                        <div className='flex justify-start gap-x-3 items-center'>
                            <i className="text-red-600 fa-solid fa-envelope"></i>
                            <div>
                                demo@demo.com
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col h-full justify-start gap-5'>
                    <div className='font-bold'>Information</div>
                    <div className='flex flex-col items-start gap-3 justify-center'>
                        <div>About us</div>
                        <div>Delivery information</div>
                        <div>Privacy policy</div>
                        <div>Terms & condition</div>
                        <div>Brands</div>
                    </div>
                </div>
                <div className='flex flex-col h-full justify-start gap-5'>
                    <div className='font-bold'>My account</div>
                    <div className='flex flex-col items-start gap-3 justify-center'>
                        <div>Login & register</div>
                        <div>Order history</div>
                        <div>Wishlist</div>
                        <div>Newsletter</div>
                        <div>Specials</div>
                    </div>
                </div>
                <div className='flex flex-col h-full justify-start gap-5'>
                    <div className='font-bold'>Customer care</div>
                    <div className='flex flex-col items-start gap-3 justify-center'>
                        <div>Contact us</div>
                        <div>Return policy</div>
                        <div>Sitemap</div>
                        <div>Gift certificates</div>
                        <div>Affiliate</div>
                    </div>
                </div>
                <div className='flex flex-col h-full justify-start gap-5'>
                    <div className='font-bold'>Electon legal</div>
                    <div className='flex flex-col items-start gap-3 justify-center'>
                        <div>Return policy</div>
                        <div>Payment policy</div>
                        <div>Adversting</div>
                        <div>Contact store</div>
                        <div>Help & support</div>
                    </div>
                </div>
            </div>
            <div className='w-full lg:h-20 h-auto bg-[#2C2B49] py-3'>
                <div className='w-11/12 lg:h-full h-auto px-5 mx-auto text-white grid lg:grid-cols-3 grid-cols-2 grid-rows-1 items-center justify-start'>
                    <div className='w-full lg:col-span-1 col-span-2'>© 2024, Ecommerce By SpacingtechTM</div>
                    <div className='w-full lg:h-full h-2/4 flex lg:justify-center justify-start'>
                        <img src={logo} alt="" className='lg:w-[10%] w-[20%] lg:h-full ' />
                    </div>
                    <div className='flex justify-between lg:h-full h-2/4 w-full text-white'>
                        <img className='w-[25%] lg:h-full ' src={visa} alt="" />
                        <img className='w-[25%] lg:h-full ' src={paypal} alt="" />
                        <img className='w-[25%] lg:h-full ' src={mastercard} alt="" />
                        <img className='w-[25%] lg:h-full ' src={express} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
