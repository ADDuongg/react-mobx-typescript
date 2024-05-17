import React from 'react';
import logo from '../assets/logo.png'
import visa from '../assets/Visa-Logo.png'
import paypal from '../assets/paypal.png'
import mastercard from '../assets/card.png'
import express from '../assets/express.png'
const Footer = () => {
    return (
        <div className=' bg-[#F8F8F8] w-full h-96 flex flex-col justify-between'>
            <div className='w-11/12 px-5 mx-auto pr-20 h-full  pt-10 flex justify-between items-center'>
                <div className='flex w-[15%] flex-col h-full justify-start gap-5'>
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
            <div className='w-full h-20 bg-[#2C2B49] py-3'>
                <div className='w-11/12 h-full px-5 mx-auto flex justify-between text-white items-center'>
                    <div className='w-auto'>© 2024, Ecommerce By SpacingtechTM</div>
                    <div className='w-[50%] h-full flex justify-center'>
                            <img src={logo} alt="" className='w-[10%] h-full' />
                    </div>
                    <div className='flex justify-between h-full w-[20%] text-white'>
                        <img src={visa} alt="" />
                        <img src={paypal} alt="" />
                        <img src={mastercard} alt="" />
                        <img src={express} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
