import React from 'react';
import {Link} from 'react-router';
export default class ServiceHome extends React.Component {

    render() {
        return (
            <div className="container">
                <ul className="caption-style-4">

                    <li>

                        <Link to="/servicedetail"><img src="img/resized/carpool_400x300.png" alt=""/>
                            <div className="caption">
                                <div className="blur"></div>
                                <div className="caption-text">
                                    <h1>Car Pool</h1>
                                    <p>Enter for Help
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>

                        <img src="img/resized/cat_400x300.jpeg" alt=""/>
                        <Link to="/servicedetail">
                            <div className="caption">
                                <div className="blur"></div>
                                <div className="caption-text">
                                    <h1>Pet Care
                                    </h1>
                                    <p>Enter for Help
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>

                        <img src="img/resized/home_1_400x300.jpeg" alt=""/>
                        <Link to="/servicedetail">
                            <div className="caption">
                                <div className="blur"></div>
                                <div className="caption-text">
                                    <h1>Home Improvement</h1>
                                    <p>Enter for Help
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li>

                        <img src="img/resized/travel_400x300.jpeg" alt=""/>
                        <Link to="/servicedetail">
                            <div className="caption">
                                <div className="blur"></div>
                                <div className="caption-text">
                                    <h1>Travel</h1>
                                    <p>Enter for Help
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>

                        <img src="img/resized/yard_400x300.jpg" alt=""/>
                        <Link to="/servicedetail">
                            <div className="caption">
                                <div className="blur"></div>
                                <div className="caption-text">
                                    <h1>Yard Work</h1>
                                    <p>Enter for Help
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>

                        <img src="img/resized/Mr-Plumber-Logo1_400x300.png" alt=""/>
                        <Link to="/servicedetail">
                            <div className="caption">
                                <div className="blur"></div>
                                <div className="caption-text">
                                    <h1>Plumbing</h1>
                                    <p>Enter for Help
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>

                </ul>

            </div>
        );
    }
}
