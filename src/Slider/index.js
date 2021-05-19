import React, {useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const Slider = ({ collection, start, end, dataSet, option, interval, charLimit, wrapClassName }) => {
  const [items, setItem] = useState([])
  const [sliderImages, setSliderImages] = useState([])
  let timeInterval = 0

  useEffect(() => {
    if (dataSet.length > 0) {
      let itemsVal = document.querySelectorAll(`${wrapClassName ? '.' + wrapClassName : ''} .slider-items li`)
      let SliderImage = document.querySelectorAll(`${wrapClassName ? '.' + wrapClassName : ''} .as-sliderImage img`)
      setItem(itemsVal)
      setSliderImages(SliderImage)
    }
  }, [dataSet])

  const TimerInterval = (val) => {
    if (timeInterval === interval) {
      timeInterval = 0
      nextSlide()
    } else timeInterval++
  }

  useEffect(() => {
    if (items.length > 0 && sliderImages.length > 0) {
      window.addEventListener('resize', setNoOfSlide())
      document.getElementsByClassName('nextSlide')[0].addEventListener('click', nextSlide)
      document.getElementsByClassName('prevSlide')[0].addEventListener('click', prevSlide)
      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('mouseover', hoverFunction)
      }
      setInterval(() => TimerInterval(), 1000)
    }
    return () => {
      window.removeEventListener('resize', setNoOfSlide())
      for (let i = 0; i < items.length; i++) {
        items[i].removeEventListener('mouseover', hoverFunction)
      }
      document.getElementsByClassName('nextSlide')[0].removeEventListener('click', nextSlide)
      document.getElementsByClassName('prevSlide')[0].removeEventListener('click', prevSlide)
    }
  }, [items, sliderImages])

  const setNoOfSlide = () => {
    if (window.innerWidth > 1200) { collection = option.responsive.lg }
    if (window.innerWidth > 992 && window.innerWidth < 1200) { collection = option.responsive.md }
    if (window.innerWidth > 576 && window.innerWidth < 992) { collection = option.responsive.sm }
    if (window.innerWidth < 576) { collection = 1 }

    start = 0
    end = collection
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active')
      }
      items[0].classList.add('active')
    }
    if (sliderImages.length > 0) {
      sliderImages[0].setAttribute('src', items[items.length - 1].dataset.url)
    }

    hideShowItems()
  }

  const nextSlide = () => {
    let activeClass = document.querySelectorAll(
      `${wrapClassName ? '.' + wrapClassName : ''} .item.active`
    )
    if (activeClass.length > 0) {
      let indexVal = parseInt(activeClass[0].dataset.index - 1)
      items[indexVal].classList.remove('active')
      if (indexVal === items.length - 1) {
        items[0].classList.add('active')
        sliderImages[0].setAttribute('src', items[0].dataset.url)
      } else {
        items[indexVal + 1].classList.add('active')
        sliderImages[0].setAttribute('src', items[indexVal + 1].dataset.url)
      }
      timeInterval = 0
      hideShowItems()
    }
  }

  const hoverFunction = (e) => {
    if (e.target && e.target.matches('li.item')) {
      sliderImages[0].setAttribute('src', e.target.dataset.url)
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active')
      }
      e.target.classList.add('active')
      timeInterval = 0
    }
  }

  const prevSlide = () => {
    let activeClass = document.querySelectorAll(
      `${wrapClassName ? '.' + wrapClassName : ''} .item.active`
    )
    if (activeClass.length > 0) {
      let indexVal = parseInt(activeClass[0].dataset.index) - 1
      items[indexVal].classList.remove('active')
      if (indexVal === 0) {
        items[items.length - 1].classList.add('active')
        sliderImages[0].setAttribute('src', items[items.length - 1].dataset.url)
      } else {
        items[indexVal - 1].classList.add('active')
        sliderImages[0].setAttribute('src', items[indexVal - 1].dataset.url)
      }
      timeInterval = 0
      hideShowItems()
    }
  }

  const hideShowItems = () => {
    let activeClass = document.querySelectorAll(
      `${wrapClassName ? '.' + wrapClassName : ''} .item.active`
    )
    if (activeClass.length > 0) {
      let indexVal = parseInt(activeClass[0].dataset.index) - 1
      if (indexVal >= end) {
        start++
        end++
      }
      if (indexVal === 0) {
        start = 0
        end = collection
      }
      if (indexVal < start) {
        start--
        end--
      }
      if (indexVal === items.length - 1) {
        start = items.length - collection
        end = items.length
      }
      for (let i = 0; i < items.length; i++) {
        if (i < end && i >= start) {
          items[i].classList.add('showitem')
        } else {
          items[i].classList.remove('showitem')
        }
      }
    }
  }

  return (<Fragment>
    <div className={wrapClassName + ' as-slider-container'}>
      <div className='as-slider'>
        <div className='as-sliderImage'>
          <img src='' />
        </div>
        <ul className='slider-items'>
          {dataSet.map((item, index) =>
            <li className='item' data-index={index + 1} data-url={item.imageUrl} key={index}>
              <div className='item-data'>
                <h4><a href={item.url}>{item.title}</a></h4>
                <p>{item.description.substring(0, charLimit)} {item.description.length > charLimit ? '...' : ''}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className='as-slider-navlink'>
        <button className='link prevSlide'>Prev</button>
        <button className='link nextSlide'>Next</button>
      </div>
    </div>
  </Fragment>
  )
}

Slider.propTypes = {
  collection: PropTypes.number,
  start: PropTypes.number,
  end: PropTypes.number,
  dataSet: PropTypes.array.isRequired,
  interval: PropTypes.number,
  charLimit: PropTypes.number,
  wrapClassName: PropTypes.string,
  option: PropTypes.object
}

Slider.defaultProps = {
  collection: 5,
  start: null,
  end: null,
  interval: 5,
  charLimit: 120,
  wrapClassName: '',
  option: {
    responsive: {
      lg: 6,
      md: 5,
      sm: 3
    },
    charLimit: 100
  }
}

export default Slider
