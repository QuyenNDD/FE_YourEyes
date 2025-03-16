import React from 'react';
import { SliderController } from '..';

const Sliderr = () =>{
  SliderController({intervalTime : 3000, maxSlides : 4});
    return (
        <section className='slider'>
          <div className='containerr'>
            <div className='slider-content'>
              <div className='slider-content-left'>
                <div className='slider-content-left-top-container'>
                  <div className="slider-content-left-top">
                    <a href=""><img src="slide3.png" alt="" /></a>
                    <a href=""><img src="slide2.png" alt="" /></a>
                    <a href=""><img src="slide1.png" alt="" /></a>
                    <a href=""><img src="slider4.webp" alt="" /></a>
                    <a href=""><img src="slider5.webp" alt="" /></a>
                  </div>
                  <div className='slider-btn'>
                    <i className='btn-left'><i class="fa-solid fa-circle-chevron-left"></i></i>
                    <i className='btn-right'><i class="fa-solid fa-circle-chevron-right"></i></i>
                  </div>
                </div>
                <div className='slider-content-left-botton'>
                  <li className='active'></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
};
export default Sliderr;