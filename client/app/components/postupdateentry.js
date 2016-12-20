import React from 'react';

export default class PostUpdateEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            type: 0,
            imgUrl: "",
            title: "",
            category: "Category"
        };
    }

    handlePost(e) {
        e.preventDefault();
        var writeRequestText = this.state.value.trim();
        if (writeRequestText !== "" && this.state.type !== 0 && this.state.title !== "" && this.state.category !== "Category") {
            this.props.onPost(this.state);
            this.setState({value: ""});
            this.setState({title: ""});
            this.setState({activebtn: ""});
            this.setState({category: "Category"});
            this.setState({type: 0});
            this.setState({imgUrl: ""});
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    handleTitleChange(e) {
        e.preventDefault();
        this.setState({title: e.target.value});
    }
    handleAcademic(e) {
        e.preventDefault();
        this.setState({type: 1});
    }

    handleService(e) {
        e.preventDefault();
        this.setState({type: 2});
    }

    handleImg(e) {
        e.preventDefault();
        this.setState({imgUrl: "img/question_img.jpeg"})
    }

    checkActive(btn) {
        if (btn === this.state.type) {
            return " btn btn-default activeBtn";
        } else {
            return "btn btn-default";
        }
    }

    handleCategorySelection(e, cat) {
        e.preventDefault();
        this.setState({category: cat});
    }
    render() {
        var categories = [];
        if (this.state.type === 1) {
            categories = [
                "Computer Science",
                "Math",
                "Music",
                "History",
                "Physics",
                "English"
            ];
        }
        if (this.state.type === 2) {
            categories = [
                "Pet Related",
                "Home Improvement",
                "Travel",
                "Yard",
                "Plumer",
                "Car Pool"
            ];
        }
        return (
            <div className="row">
                <div className="widget-area no-padding blank" id="myModal">
                    <div className="status-upload">
                        <form>
                            <textarea placeholder="Enter the tiltle for this request" row="1" value={this.state.title} onChange= {(e) => this.handleTitleChange(e)}></textarea>
                            <textarea placeholder="What would you like help with?" row="2" value={this.state.value} onChange= {(e) => this.handleChange(e)}></textarea>
                            <div className="btn-group postCategoryBtn" role="group">
                                <button type="button" className={this.checkActive(1)} onClick= {(e) => this.handleAcademic(e)}>
                                    <span className="glyphicon glyphicon-book"></span>
                                    Academic
                                </button>
                                <button type="button" className={this.checkActive(2)} onClick= {(e) => this.handleService(e)}>
                                    <span className="glyphicon glyphicon-tags"></span>
                                    Service
                                </button>
                                <button type="button" className="btn btn-default dropdown-toggle " data-toggle="dropdown">
                                    {this.state.category}
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu">
                                    {categories.map((aclass, i) => (
                                        <li key={i}>
                                            <a href="#" onClick={(e) => {
                                                this.handleCategorySelection(e, aclass)
                                            }}>
                                                {aclass}
                                            </a>
                                        </li>
                                    ))
}
                                </ul>
                                <button type="button" className="btn btn-default" onClick= {(e) => this.handleImg(e)}>
                                    <span className="glyphicon glyphicon-camera"></span>
                                </button>
                            </div>
                            <button type="submit" className="btn btn-success green pull-right postCategoryBtn" onClick ={(e) => this.handlePost(e)}>
                                <i className="fa fa-share"></i>
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
