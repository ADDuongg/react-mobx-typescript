import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import Master, { useStore } from './layout/master';
import SimpleSlider from './component/slider';
import banner1 from './assets/banner1.png';
import banner2 from './assets/banner2.png';
import banner3 from './assets/banner3.png';
import banner4 from './assets/banner4.png';
import banner5 from './assets/banner5.png';
import banner6 from './assets/banner6.png';
import Products from './component/componentHome/products';
import ModalCart from './modal/modalCart';

const App = observer(() => {
  const { productStore, cartStore } = useStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [more, setMore] = useState<boolean>(false)
  useEffect(() => {
    productStore.fetchProduct();
  }, [productStore]);

  const data = [
    {
      img: banner2,
      name: 'Headphones',
      price: '$ 249.00',
    },
    {
      img: banner3,
      name: 'Earbuds',
      price: '$ 249.00',
    },
    {
      img: banner4,
      name: 'Laptop',
      price: '$ 249.00',
    },
    {
      img: banner5,
      name: 'Smart watch',
      price: '$ 249.00',
    },
    {
      img: banner6,
      name: '14 Pro Max',
      price: '$ 24.00',
    },
  ];
  
  return (
    <div className="App">
      <Master>
        <div className='w-11/12 mx-auto p-5 h-auto text-black'>
          <SimpleSlider />
        </div>
        <div className='w-11/12 mx-auto mt-16 p-5 h-auto text-black'>
          <div className='font-bold text-5xl w-full text-center'>Top category</div>
          <div className='flex lg:flex-row flex-col justify-between w-full mt-10 gap-8 lg:h-[500px] h-auto'>
            <div className='lg:w-2/4 w-full h-full p-10 hover:opacity-50 transition-all duration-200' style={{ backgroundImage: `url(${banner1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
              <div className='flex flex-col items-start gap-5 h-full justify-between'>
                <div>
                  <div>Electronics / gaming</div>
                  <div className='text-4xl font-bold'>Play station 5</div>
                  <div className='text-red-600 font-bold text-3xl'>$599</div>
                </div>
                <div>
                  <button className='rounded-lg text-white flex justify-center items-center p-4 bg-red-600'><i className="fa-solid fa-arrow-right"></i></button>
                </div>
              </div>
            </div>
            <div className='lg:w-2/4 w-full grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-2  auto-rows-[400px]  gap-8'>
              {data?.map((item, index) => (
                <div
                  key={index}
                  className={`${index === 4 ? 'lg:col-span-2 col-span-1 row-span-1' : ' col-span-1 row-span-1'} w-full h-full p-5 hover:opacity-50 transition-all duration-200 bg-cover lg:bg-no-repeat bg-repeat-round`}
                  style={{ backgroundImage: `url(${item.img})`}}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className='h-full w-full'>
                    <div className={`h-full ${index === 4 ? 'flex justify-between' : 'flex flex-col justify-start items-center'}`}>
                      <div className={`font-bold ${index === 4 ? 'text-3xl' : ''}`}>{item.name}</div>
                      <div className={`font-bold ${index === 4 ? 'text-3xl text-red-600' : ''}`}>{item.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full p-20 mx-auto mt-16  h-auto text-black bg-[#f8f8f8]'>
          <div className='font-bold text-5xl text-center w-full mb-20'>Feature product</div>
          <Products isMore={false} setMore={setMore} more={more} isGrid={true} isLg={true}/>
        </div>

          {/* modal Cart */}
          {cartStore.isShow && <ModalCart/>}

      </Master>
    </div>
  );
});

export default App;
