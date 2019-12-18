import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
// import './styles.css'

let start, end, collection = 4;

export default class AsSlider extends Component {
  static propTypes = {
	dataSet: PropTypes.array.isRequired,
	option:PropTypes.object,
	interval:PropTypes.number
  }

  state = {items:[], SliderImage:[], timer:0}

  componentDidMount(){
	let items = document.querySelectorAll(`.${this.props.wrapClassName} .slider-items li`);
	let SliderImage = document.querySelectorAll(`.${this.props.wrapClassName} .as-sliderImage img`);
    this.setState({items:items, SliderImage:SliderImage })
    window.addEventListener('resize', this.setNoOfSlide);
    document.getElementsByClassName("nextSlide")[0].addEventListener("click", this.nextSlide);
    document.getElementsByClassName("prevSlide")[0].addEventListener("click", this.prevSlide);
    setTimeout(()=>{
      this.setNoOfSlide();
      for (let i=0;i<this.state.items.length;i++){
        this.state.items[i].addEventListener("mouseover", this.hoverFunction);
      }
    },100)
    setInterval(()=>{this.TimerInterval()},1000)
  }

  TimerInterval=()=>{
    let time = this.state.timer++;
    if(this.state.timer === (this.props.interval || 5))
    {
      this.setState({timer:0})
      this.nextSlide();
    }
  }

  setNoOfSlide=()=>{
    let size = this.props.option || {responsive:{}};
    if(window.innerWidth > 1200)
			collection = size.responsive.lg || 5;
		if(window.innerWidth > 992 && window.innerWidth < 1200)
			collection = size.responsive.md || 4;
		if(window.innerWidth > 576 && window.innerWidth < 992)
			collection = size.responsive.sm || 2;
		if(window.innerWidth < 576)
			collection = 1;
		start = 0;
    end = collection;    
    for (let i=0;i<this.state.items.length;i++){
			this.state.items[i].classList.remove("active")
		}
		this.state.items[0].classList.add("active");
		this.state.SliderImage[0].setAttribute("src", this.state.items[this.state.items.length -1].dataset.url)
		this.hideShowItems()
	}

  nextSlide=()=>{
		let activeClass = document.querySelectorAll('.item.active');		
		let indexVal = parseInt(activeClass[0].dataset.index)-1;	
		this.state.items[indexVal].classList.remove("active");
		if(indexVal === this.state.items.length -1)
		{
			this.state.items[0].classList.add("active")
			this.state.SliderImage[0].setAttribute("src", this.state.items[0].dataset.url)
		}
		else
		{
			this.state.items[indexVal+1].classList.add("active");
			this.state.SliderImage[0].setAttribute("src", this.state.items[indexVal+1].dataset.url)
		}
		this.setState({timer:0})
		this.hideShowItems()
  }
  
  prevSlide=()=>{
		let activeClass = document.querySelectorAll('.item.active');
		let indexVal = parseInt(activeClass[0].dataset.index)-1	
		this.state.items[indexVal].classList.remove("active")
		if(indexVal === 0)
		{
			this.state.items[this.state.items.length -1].classList.add("active")
			this.state.SliderImage[0].setAttribute("src", this.state.items[this.state.items.length -1].dataset.url)
		}
		else
		{
			this.state.items[indexVal-1].classList.add("active");
			this.state.SliderImage[0].setAttribute("src", this.state.items[indexVal-1].dataset.url)
		}
		this.setState({timer:0})
		this.hideShowItems()
  }
  
  hoverFunction=(e)=>{
		if (e.target && e.target.matches("li.item")) {
			this.state.SliderImage[0].setAttribute("src", e.target.dataset.url)
			for (let i=0;i<this.state.items.length;i++){
				this.state.items[i].classList.remove("active")
			}
			e.target.classList.add("active")
			this.setState({timer:0})
		}		
  }
  
  hideShowItems=()=>{		
		let activeClass = document.querySelectorAll('.item.active');
		let indexVal = parseInt(activeClass[0].dataset.index)-1;		
		if(indexVal >= end)
		{ start++; end++ ; }
		if(indexVal === 0){
			start = 0;
			end = collection;
		}		
		if(indexVal < start){
			start--; end--;
		}		
		if(indexVal === this.state.items.length-1){
			start = this.state.items.length-collection;
			end = this.state.items.length;			
		}    
		for (let i=0;i<this.state.items.length;i++){
			if(i < end && i >= start){
				this.state.items[i].classList.add("showitem")
			}
			else{
				this.state.items[i].classList.remove("showitem")
			}		
		}		
	}  

  render() {
    const { dataSet, wrapClassName } = this.props
    //console.log(this.props)
    return (
      <Fragment>
        <div className={wrapClassName+" as-slider-container"}>
          <div className="as-slider">
            <div className="as-sliderImage">
              <img src="" />
            </div>
            <ul className="slider-items">
              {dataSet.map((item,index)=>
                <li className="item" data-index={index+1} data-url={item.imageUrl} key={index}>
                  <div className="item-data">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="as-slider-navlink">
            <button className="link prevSlide">Prev</button>
            <button className="link nextSlide">Next</button>
          </div>
        </div>
      </Fragment>
    )
  }
}