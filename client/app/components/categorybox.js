import React from 'react';
import {Link} from 'react-router';
export default class CategoryBox extends React.Component {
  render() {
    return(
      <div className = "container">

        <ul className="caption-style-4">
          {/* <div className ="row"> */}
          <li>

            <Link to ="/acedemicdetail"><img src="img/resized/english_400x300.jpg" alt=""/>
              <div className="caption">
                <div className="blur"></div>
                <div className="caption-text">
                  <h1>English</h1>
                  <p>Enter for Help </p>
                </div>
              </div></Link>

          </li>
          <li>

            <img src="img/resized/cmpSci_400x300.jpeg" alt=""/>
            <Link to ="/acedemicdetail">  <div className="caption">
              <div className="blur"></div>
              <div className="caption-text">
                <h1>Computer Science </h1>
                <p>Enter for Help </p>
              </div>
            </div></Link>
          </li>
          <li>

            <img src="img/resized/history_400x300.jpg" alt=""/>
            <Link to ="/acedemicdetail"><div className="caption">
              <div className="blur"></div>
              <div className="caption-text">
                <h1>History</h1>
                <p>Enter for Help </p>
              </div>
            </div></Link>
          </li>
          {/* </div> */}
          {/* <div className ="row"> */}
          <li>
            <img src="img/resized/music_400x300.jpg" alt=""/>
            <Link to ="/acedemicdetail"><div className="caption">
              <div className="blur"></div>
              <div className="caption-text">
                <h1>Music</h1>
                <p>Enter for Help </p>
              </div>
            </div></Link>
          </li>
          <li>

            <img src="img/resized/physics_400x300.jpeg" alt=""/>
            <Link to ="/acedemicdetail"><div className="caption">
              <div className="blur"></div>
              <div className="caption-text">
                <h1>Physics</h1>
                <p>Enter for Help </p>
              </div>
            </div></Link>
          </li>
          <li>

            <img src="img/resized/math_1_400x300.jpg" alt=""/>
            <Link to ="/acedemicdetail"><div className="caption">
              <div className="blur"></div>
              <div className="caption-text">
                <h1>Mathematics</h1>
                <p>Enter for Help </p>
              </div>
            </div></Link>
          </li>
          {/* </div> */}
        </ul>

                  </div>
                  );
                  }
                  }
