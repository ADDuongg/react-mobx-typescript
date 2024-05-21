import React, { useEffect, useState } from 'react';
import Master, { useStore } from '../layout/master';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toJS } from 'mobx';
import { ProductType } from '../store/productStore';
import { observer } from 'mobx-react-lite';
import ModalCart from '../modal/modalCart';
import cartStore from '../store/cartStore';

const DetailProduct = observer(() => {
    const { productStore, WishListStore, userStore } = useStore();
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [img, handleSetImg] = useState<number>(0)
    const [color, setColor] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<string>('description');
    const productId = params.id ? parseInt(params.id, 10) : null;
    let detailProduct = toJS(productStore.products)?.find((item) => item.id === productId)
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 1);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const saleEndDate = new Date();
        saleEndDate.setDate(saleEndDate.getDate() + 1); // Set sale end date to current time + 1 day

        const intervalId = setInterval(() => {
            const now = new Date();
            const difference = saleEndDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(intervalId);
                setCountdown({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setCountdown({
                    days,
                    hours,
                    minutes,
                    seconds
                });
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);



    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setQuantity(parseInt(value, 10));
    }
    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    };
    const calculateDiscountPrice = (price: number, discountPercentage: number): number => {
        return price - (price * discountPercentage) / 100;
    };
    const handleBuy = () => {
        const isLogin = userStore.currentUser.username
        if(!isLogin){
            alert('Bạn phải đăng nhập mới có thể mua hàng')
        }
        else{navigate('/checkout')
        }
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

            <div className='w-full mt-16'>
                <div className='w-11/12 mx-auto p-5 h-full flex gap-2 justify-start items-end'>
                    <div className='w-full h-auto  mt-10 '>
                        <div className='w-full lg:h-[45rem] h-auto flex lg:flex-row flex-col justify-between py-2'>
                            <div className='lg:w-[50%] w-full h-full p-5'>
                                <img src={detailProduct?.images[img]} className='h-5/6 w-full' alt="" />
                                <div className="h-1/6 flex justify-between gap-3 w-full mt-5">
                                    {detailProduct?.images?.map((item, index) => (
                                        <div onClick={() => handleSetImg(index)} key={index} className={`${img === index ? 'border-4' : 'border'} p-3 h-full w-36 cursor-pointer`}>
                                            <img src={item} alt="" className='w-full h-full' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {detailProduct && (
                                <div className='lg:w-[50%] w-full h-full flex flex-col gap-5 justify-start pl-14'>
                                    <div className='font-bold text-5xl'>{detailProduct?.title}</div>
                                    <div className='text-red-600 font-bold flex'>
                                        <span>${calculateDiscountPrice(detailProduct?.price, detailProduct?.discountPercentage).toFixed(2)}</span>
                                        <span className='line-through text-gray-500 ml-3'>${detailProduct.price.toFixed(2)}</span>
                                        <div className='ml-3 rounded-xl flex justify-center items-center text-sm p-2 bg-red-600 text-white'>-{detailProduct.discountPercentage.toFixed(0)}%</div>
                                    </div>
                                    <div className='text-lg font-bold flex'>Brand: <span className='font-normal ml-2'>{detailProduct?.brand}</span></div>

                                    <div className='flex justify-start w-full items-center h-10 mt-7'>
                                        <div className='rounded w-28 h-10 border hover:border-red-500 cursor-pointer flex justify-between items-center'>
                                            <button onClick={() => decreaseQuantity()} className='font-bold w-1/3 px-2 pb-2 text-3xl flex justify-center items-center'>-</button>
                                            <input value={quantity} onChange={handleChange} type="text" className='w-1/3 outline-none pl-3' />
                                            <button onClick={() => increaseQuantity()} className='font-bold w-1/3 px-2 pb-2 text-3xl flex justify-center items-center'>+</button>
                                        </div>

                                    </div>


                                    <div id='sale' className='w-full flex justify-start gap-x-5'>
                                        <div id='day' className='rounded-xl bg-red-600 p-3 w-16 flex flex-col justify-center items-center text-white'>
                                            <div className='font-bold'>{countdown.days}</div>
                                            <div>Day</div>
                                        </div>
                                        <div id='hour' className='rounded-xl bg-red-600 p-3 w-16 flex flex-col justify-center items-center text-white'>
                                            <div className='font-bold'>{countdown.hours}</div>
                                            <div>Hrs</div>
                                        </div>
                                        <div id='minutes' className='rounded-xl bg-red-600 p-3 w-16 flex flex-col justify-center items-center text-white'>
                                            <div className='font-bold'>{countdown.minutes}</div>
                                            <div>Min</div>
                                        </div>
                                        <div id='second' className='rounded-xl bg-red-600 p-3 w-16 flex flex-col justify-center items-center text-white'>
                                            <div className='font-bold'>{countdown.seconds}</div>
                                            <div>Sec</div>
                                        </div>
                                    </div>

                                    <div className={`flex gap-x-10 mt-7`}>
                                        <span className='font-bold'>Availability:</span>
                                        <div className='flex gap-2'>
                                            <div className={`${detailProduct?.stock !== 0 ? 'border rounded-full flex justify-center items-center w-6 h-6' : ''}`}><i className={`fa-solid fa-circle ${detailProduct.stock !== 0 ? 'text-green-500 ' : ''}`}></i></div> {detailProduct.stock} in stock
                                        </div>

                                    </div>

                                    <div className={`flex gap-5 mt-7 flex-col`}>
                                        <span className='font-bold flex'>Colors:  <div className='text-gray-400 font-normal ml-2'>{color}</div></span>
                                        <div className='flex gap-5'>
                                            <div onClick={() => { handleSetImg(1); setColor('green') }} className='rounded-full  h-8 w-8 bg-green-500 hover:border-4 cursor-pointer'></div>
                                            <div onClick={() => { handleSetImg(2); setColor('blue') }} className='rounded-full h-8 w-8 bg-blue-500 hover:border-4 cursor-pointer'></div>
                                            <div onClick={() => { handleSetImg(3); setColor('yellow') }} className='rounded-full h-8 w-8 bg-yellow-500 hover:border-4 cursor-pointer'></div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full gap-5'>
                                        <div className='w-full flex justify-between gap-x-5'>
                                            <button onClick={() => { detailProduct && cartStore.addToCart(detailProduct, quantity) }} className='w-2/4 bg-red-600 p-4 text-white rounded-xl hover:bg-[#2c2b49]'>ADD TO CART</button>

                                            <button onClick={handleBuy} className='w-2/4 bg-red-600 p-4 text-white rounded-xl hover:bg-[#2c2b49]'>BUY IT NOW</button>
                                        </div>
                                        <button
                                            onClick={!WishListStore.isInWishList(detailProduct) ? () => detailProduct && WishListStore.addToWishList(detailProduct) : () => detailProduct && WishListStore.removeFromWishList(detailProduct)}
                                            className='w-full p-4 text-white rounded-xl bg-[#2c2b49]'
                                        >
                                            {WishListStore?.isInWishList(detailProduct) ? 'REMOVE WISHLIST' : 'ADD WISHLIST'}
                                        </button>


                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <div className='w-full my-10'>
                <div className='w-11/12 mx-auto p-5 h-full flex flex-col gap-7 justify-start '>
                    <div className="w-full flex justify-center items-center gap-7">
                        {/* Tab headers */}
                        <div onClick={() => setSelectedTab('description')} className={`font-bold cursor-pointer ${selectedTab === 'description' ? 'text-red-600' : ''}`}>DESCRIPTION</div>
                        <div onClick={() => setSelectedTab('additionalInfo')} className={`font-bold cursor-pointer ${selectedTab === 'additionalInfo' ? 'text-red-600' : ''}`}>ADDITIONAL INFORMATION</div>
                        <div onClick={() => setSelectedTab('review')} className={`font-bold cursor-pointer ${selectedTab === 'review' ? 'text-red-600' : ''}`}>REVIEWS</div>
                    </div>
                    <div id='divInfoProduct' className={`${selectedTab === 'description' ? 'block' : 'hidden'}`}>
                        <div id='divDescription' className='w-full flex flex-col gap-5'>
                            <div className='font-bold'>More Detail</div>
                            <ul className='list-disc space-y-3'>
                                <li>Lorem ipsum is simply dummy text of the printing and typesetting industry</li>
                                <li>Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</li>
                                <li>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</li>
                                <li>It was popularised in the 1960s with the release of letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like aldus pagemaker including versions of lorem ipsum</li>
                                <li>Contrary to popular belief, lorem ipsum is not simply random text. It has roots in a piece of classical latin literature from 45 bc, making it over 2000 years old</li>
                            </ul>
                            <div className='font-bold'>Key specification</div>
                            <ul className='list-disc space-y-3'>
                                <li>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</li>
                                <li>The point of using lorem ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'content here, content here', making it look like readable english. Many desktop publishing packages and web page editors now use lorem ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy</li>
                                <li>Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)</li>
                                <li>There are many variations of passages of lorem ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</li>
                                <li>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text</li>
                            </ul>
                        </div>
                        <div id='addtionalInfo'></div>
                        <div id='review'></div>
                    </div>
                    <div id='addtionalInfo' className={`${selectedTab === 'additionalInfo' ? 'block' : 'hidden'}`}>
                        <div id='divDescription' className='w-full flex flex-col gap-5'>
                            <div className='font-bold'>Addtional Infomation</div>
                            <div className='w-full flex flex-col border'>
                                <div className='flex border h-16'>
                                    <div className='w-[40%] font-bold border flex justify-start items-center pl-5'>Vendor</div>
                                    <div className='w-[60%] border flex justify-start items-center pl-5'>Electron</div>
                                </div>
                                <div className='flex border h-20'>
                                    <div className='w-[40%] font-bold border flex justify-start items-center pl-5'>Description</div>
                                    <div className='w-[60%] border flex justify-start items-center pl-5'>{detailProduct?.description}</div>
                                </div>
                                <div className='flex border h-20'>
                                    <div className='w-[40%] font-bold border flex justify-start items-center pl-5'>Brand</div>
                                    <div className='w-[60%] border flex justify-start items-center pl-5'>{detailProduct?.brand}</div>
                                </div>
                                <div className='flex border h-20'>
                                    <div className='w-[40%] font-bold border flex justify-start items-center pl-5'>Category</div>
                                    <div className='w-[60%] border flex justify-start items-center pl-5'>{detailProduct?.category}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id='review' className={`${selectedTab === 'review' ? 'block' : 'hidden'}`}>
                        <div id='divDescription' className='w-full flex flex-col gap-5'>
                            <div className='font-bold'>Review</div>

                        </div>

                    </div>
                </div>
            </div>
            {cartStore.isShow && <ModalCart />}
        </Master>
    );
})

export default DetailProduct;
