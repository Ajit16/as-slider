# as-slider

> 

[![NPM](https://img.shields.io/npm/v/as-slider.svg)](https://www.npmjs.com/package/as-slider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install 

```bash
npm install --save as-slider
```

## Usage

```jsx
import React, { Component } from 'react'
import AsSlider from 'as-slider'
class Example extends Component {
  render () {    
    return (
      <AsSlider dataSet={data} option={option} interval={4} wrapClassName={"customSlider"} />
    )
  }
}
```
## Data values

```jsx
const data=[
  {title:'title', description:'description', imageUrl:'image url',},
  {title:'title', description:'description', imageUrl:'image url',}
  ...
]
```

## Option
Options are set as responsive properties, they help you customize the no of slide show on screen.

```jsx
const option = {responsive:{lg:5, md:4, sm:2}}
```
## Default values/options

|  Property   |Description|Type|Default|
| ------------ | ------------ | ------------ | ------------ |
| lg  | You can set number of slide show on screen, as per screen size.  | object  |  5 |
| md  | You can set number of slide show on screen, as per screen size.  | object  | 4  |
| sm  | You can set number of slide show on screen, as per screen size.  | object  |  2 |
| interval |  Set slide interval time | number  | 5  |
| wrapClassName  | use "wrapClassName" class, if you want to show multiple "as-slides" on same page.  | string  | ||



## Example
[Demo](https://ajit16.github.io/as-slider-exp/)
![alt text](https://i.ibb.co/3fJCJfY/as-slider.jpg)

## Keywords
 as-slider

## License

MIT © [Ajit16](https://github.com/Ajit16)
