import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

let start, end, collection = 5;

export default class SliderSm extends Component {
	static propTypes = {
		dataSet: PropTypes.array.isRequired,
		interval: PropTypes.number,
		charLimit: PropTypes.number,
	}

	state = { items: [], dots: [], timer: 0, index: 1 }

	componentDidMount() {
		let items = document.querySelectorAll(`${this.props.wrapClassName ? '.' + this.props.wrapClassName : ''}.as-slider-sm .sliderSm-items li`);
		let dots = document.querySelectorAll(`${this.props.wrapClassName ? '.' + this.props.wrapClassName : ''} .dots-position li`);
		this.setState({ items: items, dots: dots })
		window.addEventListener('resize', this.setNoOfSlide);

		document.getElementsByClassName("nextSlideSm")[0].addEventListener("click", this.nextSlide);
		document.getElementsByClassName("prevSlideSm")[0].addEventListener("click", this.prevSlide);

		setTimeout(() => {
			this.setNoOfSlide();
			for (let i = 0; i < this.state.dots.length; i++) {
				this.state.dots[i].addEventListener("click", this.ClickFunction);
			}
		}, 100)
		setInterval(() => { this.TimerInterval() }, 1000)
	}

	TimerInterval = () => {
		let time = this.state.timer++;
		if (this.state.timer === (this.props.interval || 5)) {
			this.setState({ timer: 0 })
			this.nextSlide();
		}
	}

	setNoOfSlide = () => {
		start = 0;
		end = collection;
		for (let i = 0; i < this.state.items.length; i++) {
			this.state.items[i].classList.remove("active");
			this.state.dots[i].classList.remove("active")
		}
		this.state.items[0].classList.add("active");
		this.state.dots[0].classList.add("active")

		for (let i = 0; i < this.state.items.length; i++) {
			this.state.items[i].classList.remove("active");
			this.state.dots[i].classList.remove("active");
		}

		this.state.items[0].classList.add("active");
		this.state.dots[0].classList.add("active")
		this.hideShowItems()
	}

	nextSlide = () => {
		let activeClass = document.querySelectorAll(`${this.props.wrapClassName ? '.' + this.props.wrapClassName : ''}.as-slider-sm .item.active`);
		let indexVal = parseInt(activeClass[0].dataset.index);
		this.state.items[indexVal].classList.remove("active");
		this.state.dots[indexVal].classList.remove("active")

		if (indexVal === this.state.items.length - 1) {
			this.state.items[0].classList.add("active")
			this.state.dots[0].classList.add("active")
			this.setState({ index: 1 })
		}
		else {
			this.state.items[indexVal + 1].classList.add("active");
			this.state.dots[indexVal + 1].classList.add("active")
			this.setState({ index: indexVal + 2 })
		}
		this.setState({ timer: 0 })
		this.hideShowItems()
	}

	prevSlide = () => {
		let activeClass = document.querySelectorAll(`${this.props.wrapClassName ? '.' + this.props.wrapClassName : ''}.as-slider-sm .item.active`);
		let indexVal = parseInt(activeClass[0].dataset.index);
		this.state.items[indexVal].classList.remove("active");
		this.state.dots[indexVal].classList.remove("active")
		if (indexVal === 0) {
			this.state.items[this.state.items.length - 1].classList.add("active")
			this.state.dots[this.state.items.length - 1].classList.add("active")
			this.setState({ index: this.state.items.length })
		}
		else {
			this.state.items[indexVal - 1].classList.add("active");
			this.state.dots[indexVal - 1].classList.add("active")
			this.setState({ index: indexVal })
		}
		this.setState({ timer: 0, })
		this.hideShowItems()
	}

	ClickFunction = (e) => {
		if (e.target && e.target.matches("li")) {
			for (let i = 0; i < this.state.items.length; i++) {
				this.state.items[i].classList.remove("active")
				this.state.dots[i].classList.remove("active")
			}
			this.state.items[e.target.dataset.index].classList.add("active")
			this.state.dots[e.target.dataset.index].classList.add("active")
			e.target.classList.add("active")
			this.setState({ timer: 0, index: parseInt(e.target.dataset.index) + 1 })
		}
	}

	hideShowItems = () => {
		let activeClass = document.querySelectorAll(`${this.props.wrapClassName ? '.' + this.props.wrapClassName : ''}.as-slider-sm .item.active`);
		let indexVal = parseInt(activeClass[0].dataset.index);
		if (indexVal >= end) { start++; end++; }
		if (indexVal === 0) {
			start = 0;
			end = collection;
		}
		if (indexVal < start) {
			start--; end--;
		}
		if (indexVal === this.state.dots.length - 1) {
			start = this.state.dots.length - collection;
			end = this.state.dots.length;
		}
		for (let i = 0; i < this.state.dots.length; i++) {
			if (i < end && i >= start) {
				this.state.dots[i].classList.add("showitem")
			}
			else {
				this.state.dots[i].classList.remove("showitem")
			}
		}
	}


	render() {
		const { dataSet, wrapClassName, charLimit } = this.props
		const limit = charLimit || 120;
		return (
			<div className={wrapClassName + " as-slider-sm"}>
				<ul className="sliderSm-items">
					{dataSet.map((item, index) =>
						<li className="item" data-index={index} key={index}>
							<img src={item.imageUrl} alt={'img' + index} />
							<div className="item-data">
								<small>{item.date}</small>
								<h4><a href={item.url}>{item.title}</a></h4>
								<p>{item.description.substring(0, limit)} {item.description.length > limit ? '...' : ''}</p>
							</div>
						</li>
					)}
				</ul>

				<div className="dots-box">
					<ul className="dots-position">
						{dataSet.map((item, index) => <li data-index={index} key={index}></li>)}
					</ul>
				</div>
				<div className="as-slider-navlink-sm">
					<small>{this.state.index + '/' + dataSet.length} </small>
					<button className="link prevSlideSm">&larr;</button>
					<button className="link nextSlideSm">&rarr;</button>
				</div>
			</div>
		)
	}
}