import React, {useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const SliderSm = ({ collection, start, end, dataSet, interval, charLimit, wrapClassName }) => {
  const [items, setItem] = useState([])
  const [dots, setDots] = useState([])
  const [index, setIndexval] = useState(1)
  let timeInterval = 0

  useEffect(() => {
    if (dataSet.length > 0) {
      let itemsVal = document.querySelectorAll(`${wrapClassName ? '.' + wrapClassName : ''}.as-slider-sm .sliderSm-items li`)
      let dotsVal = document.querySelectorAll(`${wrapClassName ? '.' + wrapClassName : ''} .dots-position li`)
      setItem(itemsVal)
      setDots(dotsVal)
    }
  }, [dataSet])

  const TimerInterval = (val) => {
    if (timeInterval === interval) {
      timeInterval = 0
      nextSlide()
    } else timeInterval++
  }

  useEffect(() => {
    if (items.length > 0 && dots.length > 0) {
      window.addEventListener('resize', setNoOfSlide())
      document.getElementsByClassName('nextSlideSm')[0].addEventListener('click', nextSlide)
      document.getElementsByClassName('prevSlideSm')[0].addEventListener('click', prevSlide)
      for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', ClickFunction)
      }
      setInterval(() => TimerInterval(), 1000)
    }
    return () => {
      window.removeEventListener('resize', setNoOfSlide())
      document.getElementsByClassName('nextSlideSm')[0].removeEventListener('click', nextSlide)
      document.getElementsByClassName('prevSlideSm')[0].removeEventListener('click', prevSlide)
      for (let i = 0; i < dots.length; i++) {
        dots[i].removeEventListener('click', ClickFunction)
      }
    }
  }, [items, dots])

  const setNoOfSlide = () => {
    start = 0
    end = collection
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active')
        dots[i].classList.remove('active')
      }
      items[0].classList.add('active')
      dots[0].classList.add('active')
    }
    hideShowItems()
  }

  const nextSlide = () => {
    let activeClass = document.querySelectorAll(
      `${wrapClassName ? '.' + wrapClassName : ''}.as-slider-sm .item.active`
    )
    if (activeClass.length > 0) {
      let indexVal = parseInt(activeClass[0].dataset.index)
      items[indexVal].classList.remove('active')
      dots[indexVal].classList.remove('active')

      if (indexVal === items.length - 1) {
        items[0].classList.add('active')
        dots[0].classList.add('active')
        setIndexval(1)
      } else {
        items[indexVal + 1].classList.add('active')
        dots[indexVal + 1].classList.add('active')
        setIndexval(indexVal + 2)
      }
      timeInterval = 0
      hideShowItems()
    }
  }

  const prevSlide = () => {
    let activeClass = document.querySelectorAll(
      `${wrapClassName ? '.' + wrapClassName : ''}.as-slider-sm .item.active`
    )
    if (activeClass.length > 0) {
      let indexVal = parseInt(activeClass[0].dataset.index)
      items[indexVal].classList.remove('active')
      dots[indexVal].classList.remove('active')
      if (indexVal === 0) {
        items[items.length - 1].classList.add('active')
        dots[items.length - 1].classList.add('active')
        setIndexval(items.length)
      } else {
        items[indexVal - 1].classList.add('active')
        dots[indexVal - 1].classList.add('active')
        setIndexval(indexVal)
      }
      timeInterval = 0
      hideShowItems()
    }
  }

  const ClickFunction = (e) => {
    if (e && e.target && e.target.matches('li')) {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active')
        dots[i].classList.remove('active')
      }
      items[e.target.dataset.index].classList.add('active')
      dots[e.target.dataset.index].classList.add('active')
      e.target.classList.add('active')
      timeInterval = 0
      setIndexval(parseInt(e.target.dataset.index) + 1)
    }
  }

  const hideShowItems = () => {
    let activeClass = document.querySelectorAll(
      `${wrapClassName ? '.' + wrapClassName : ''}.as-slider-sm .item.active`
    )
    if (activeClass.length > 0) {
      let indexVal = parseInt(activeClass[0].dataset.index)
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
      if (indexVal === dots.length - 1) {
        start = dots.length - collection
        end = dots.length
      }
      for (let i = 0; i < dots.length; i++) {
        if (i < end && i >= start) {
          dots[i].classList.add('showitem')
        } else {
          dots[i].classList.remove('showitem')
        }
      }
    }
  }

  return (
    <div className={wrapClassName + ' as-slider-sm'}>
      <ul className='sliderSm-items'>
        {dataSet.map((item, index) => (
          <li className='item' data-index={index} key={index}>
            <img src={item.imageUrl} alt={'img' + index} />
            <div className='item-data'>
              <small>{item.date}</small>
              <h4>
                <a href={item.url}>{item.title}</a>
              </h4>
              <p>
                {item.description.substring(0, charLimit)}{' '}
                {item.description.length > charLimit ? '...' : ''}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className='dots-box'>
        <ul className='dots-position'>
          {dataSet.map((item, index) => (
            <li data-index={index} key={index} />
          ))}
        </ul>
      </div>
      <div className='as-slider-navlink-sm'>
        <small>{index + '/' + dataSet.length} </small>
        <button className='link prevSlideSm'>&larr;</button>
        <button className='link nextSlideSm'>&rarr;</button>
      </div>
    </div>
  )
}

SliderSm.propTypes = {
  collection: PropTypes.number,
  start: PropTypes.number,
  end: PropTypes.number,
  dataSet: PropTypes.array.isRequired,
  interval: PropTypes.number,
  charLimit: PropTypes.number,
  wrapClassName: PropTypes.string
}

SliderSm.defaultProps = {
  collection: 5,
  start: null,
  end: null,
  interval: 5,
  charLimit: 120,
  wrapClassName: ''
}

export default SliderSm
