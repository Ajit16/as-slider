import React, { Component } from 'react'

import AsSlider from 'as-slider'

export default class App extends Component {
  render () {
    const data=[
      {title:'Lorem Ipsum is simply dummy', description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl:require('./images/s1.jpg'),},
      {title:'Lorem Ipsum is simply dummy', description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout', imageUrl:require('./images/s2.jpg')},
      {title:'Lorem Ipsum is simply dummy', description:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,', imageUrl:require('./images/s3.jpg')},
      {title:'Lorem Ipsum is simply dummy', description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout', imageUrl:require('./images/s4.jpg')},
      {title:'Lorem Ipsum is simply dummy', description:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', imageUrl:require('./images/s5.jpg')},
      {title:'Lorem Ipsum is simply dummy', description:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', imageUrl:require('./images/s6.jpg')}
      ]
    const option = {responsive:{lg:5, md:4, sm:2}}
    return (
      <div>
        <AsSlider dataSet={data} option={option} interval={4}/>       
      </div>
    )
  }
}
