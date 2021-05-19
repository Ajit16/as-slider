import React from "react";

import { Slider, SliderSm, SingleProdSlider } from "as-slider";
//import 'as-slider/dist/index.css'

const data = [
  {
    title: "first",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    imageUrl: require("./media/s2.01e311b4.jpg"),
  },
  {
    title: "second",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    imageUrl: require("./media/s3.f50ce4a2.jpg"),
  },
  {
    title: "third",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    imageUrl: require("./media/s4.ee1efb7e.jpg"),
  },
  {
    title: "Fourth",
    description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    imageUrl: require("./media/s1.7a0e005d.jpg"),
    url: "google.com",
  },
];


const data1 = [
  {
    title: "first",
    realPrice:'$124',
    offerPrice:'$100',
    tag:'ASPIRE',
    offer:'SUPERSTAR',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    imageUrl: require("./media/homeStrawHat.png"),
    url: "google.com",
  },
  {
    title: "second",
    offerPrice:'$80',
    tag:'NIKE',
    offer:'NEW',
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    imageUrl: require("./media/Rawhide_cowboy_hat.png"),
    url: "google.com",
  },
  {
    title: "third",
    offerPrice:'$50',
    tag:'HAT',
    offer:'MEGA OFFER',
    description: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    imageUrl: require("./media/companion-cube-hat.png"),
    url: "google.com",
  },
  {
    title: "Fourth",
    offerPrice:'$2300',
    tag:'NIKE',
    offer:'NEW',
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    imageUrl: require("./media/mens_hat.png"),
    url: "google.com",
  },
];

const option = {
  responsive: {
    lg: 6,
    md: 5,
    sm: 3,
  },
  charLimit: 100,
};

const App = () => {
  return (
    <div>
      <div>
        <div className="installDetail">
          <h2 align="center">As-Slider</h2>
          <h4>Example 1</h4>

          <Slider
            dataSet={data}
            option={option}
            interval={4}
            wrapClassName={"customSlider"}
          />

          <br />
          <br />
          <div className="flex">
            <div>
              <h4>Example 2</h4>
              <SliderSm
                dataSet={data}
                option={option}
                interval={4}
                wrapClassName="wrapClassName"
              />
            </div>
            <div>
              <h4>Multi Slider Example</h4>
              <SingleProdSlider
                dataSet={data1}
                // option={option}
                interval={6}
                wrapClassName="multiClassName"
              />
            </div>
          </div>
          <br />
          <br />
          <h3>Install</h3>
          <hr />
          <pre>npm install --save as-slider</pre>
          <p> </p>
          <h3>Steps to integrate</h3>
          <hr />
          <h4 style={{ marginBottom: 5 }}>Import the required module </h4>
          <pre>import &#123; Slider, SliderSm, SingleProdSlider &#x7D; from 'as-slider';</pre>
          <h4 style={{ marginBottom: 5 }}> Render slider </h4>
          <pre>
            &lt;Slider dataSet= &#123;data&#x7D; option= &#123;option&#x7D;
            interval= &#123;4&#x7D; wrapClassName= &#123;"newClass"&#x7D; /&gt;;
          </pre>
          <pre>
            &lt;SliderSm dataSet= &#123;data&#x7D; interval= &#123;4&#x7D;
            charLimit= &#123;100&#x7D; wrapClassName= &#123;"customClass"&#x7D;
            /&gt;;
          </pre>
          <pre>
            &lt;SingleProdSlider dataSet= &#123;data&#x7D; interval= &#123;4&#x7D;
            charLimit= &#123;100&#x7D; wrapClassName= &#123;"ItemCustomClass"&#x7D;
            /&gt;;
          </pre>
          <h4 style={{ marginBottom: 5 }}>Data values</h4>
          <pre>
            const data=[
            <br /> title:'title', description:'description', imageUrl:'image
            path',url:'google.com' ,
            <br /> title:'title', description:'description', imageUrl:'image
            path'
            <br /> ...
            <br />]
          </pre>
          <h4 style={{ marginBottom: 5 }}>Option values</h4>
          <p>
            Options are set as responsive properties, they help you customize
            the no of slide show on screen.
          </p>
          <pre>
            const option = &#123;
            <br /> responsive: &#123;
            <br /> lg:6,
            <br /> md:5,
            <br /> sm:3
            <br /> &#x7D;,
            <br /> charLimit:100
            <br />
            &#x7D;
          </pre>
          <h4 style={{ marginBottom: 5 }}>Example </h4>
          <pre>
            import React, &#123;Component &#x7D; from 'react';
            <br />
            import &#123;Slider, SliderSm &#x7D; from 'as-slider';
            <br />
            class Example extends Component &#123;
            <br />
            render () &#123;
            <br />
            return (<br /> &#123;;Slider dataSet= &#123;data&#x7D; option=
            &#123;option&#x7D; interval= &#123;4&#x7D; /&gt;
            <br /> )<br /> &#x7D;
            <br />
            &#x7D;
          </pre>
          <p> </p>
          <h3>Default values/options</h3>
          <hr />
          <div className="responsive-table">
            <table className="table">
              <tbody>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
                <tr>
                  <td>lg</td>
                  <td rowSpan="3">
                    You can set number of slide show on screen, as per screen
                    size.
                  </td>
                  <td rowSpan="3">
                    <strong>object</strong>
                    <br />
                    exp = &#123; responsive: &#123; lg: 6, md: 5, sm: 3 &#x7D;
                    &#x7D;
                  </td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>md</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>sm</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>interval</td>
                  <td>Set slide interval time</td>
                  <td>number</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>wrapClassName</td>
                  <td>
                    use "wrapClassName" class, if you want to show multiple same
                    "Slider" on same page.
                  </td>
                  <td>string</td>
                  <td></td>
                </tr>
                <tr>
                  <td>charLimit</td>
                  <td>used for add description char limit to show</td>
                  <td>number</td>
                  <td>120</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p></p>
          <p> </p>
          <h3>Keywords</h3>
          <hr />
          <pre>as-slider</pre>
        </div>
      </div>

      <p />
    </div>
  );
};

export default App;
