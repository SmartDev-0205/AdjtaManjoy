import React, {Component} from "react";
import UserNavBar from "./UserNavBar";
import axios from 'axios';
import TextInput from 'react-autocomplete-input';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import editCollege from "../layout/College/editCollege";
import {getCollegeInfo} from "../../actions/CollegeAction"

class searchDegree extends Component {
    constructor() {
        super();
        this.state = {
            suggestions: [],
            country: "",
            state: "",
            course: "",
            degree: "",
            degrees: [],
            countrys: [],
            states: []
        };

        axios.post("http://192.46.211.35:5000/userGetPlaceInfos", {}, {}).then(res => {
            console.log("res data===>", res.data);
            if (res.data.error) {
                this.state.countrys = ["No Country"];
                this.state.countrys = ["No State"]
            } else {
                var item = res.data.data;
                for (let index = 0; index < item.length; index++) {
                    this.state.countrys.push(item[index].address.country);
                    this.state.states.push(item[index].address.state)
                }
                this.state.countrys.push("");
                this.state.states.push("");
                this.setState({country: this.state.countrys[0]});
                this.state.country = this.state.countrys[0];
                this.setState({state: this.state.states[0]});
                this.state.state = this.state.states[0]
            }
        })
        axios.post("http://192.46.211.35:5000/getDegrees", {}, {}).then(res => {
            console.log("degrees data==>", res.data.degrees);
            for (let index = 0; index < res.data.degrees.length; index++) {
                let name = res.data.degrees[index].text;
                this.state.degrees.push(name);
            }
            this.state.degrees.push("");
            this.setState({degree: this.state.degrees[0]});
            this.state.degree = this.state.degrees[0];
            console.log("state degrees==>", this.state.degree);
        });

    };

    handleRequestOptions = () => {
        axios.post("/getDegreeSuggestons", {}, {}).then(res => {
            console.log("specializations==>", res.data);
            this.setState({suggestions: res.data});
            console.log("special==>", this.state.suggestions);
        });
    };

    componentDidMount() {

    };

    onChange = e => {
        e.preventDefault();
        if (e.target.id === "country") {
            this.state.country = e.target.value;
            console.log("country", this.state.country);
        } else if (e.target.id === "state") {
            this.state.state = e.target.value;
            console.log("state", this.state.state);
        } else if (e.target.id === "degree") {
            this.state.degree = e.target.value;
            console.log("degree", this.state.degree);
        }


    };
    onSubmit = e => {
        e.preventDefault();
        let data = {
            country: this.state.country,
            state: this.state.state,
            degree: this.state.degree,
            course: this.state.course
        }
        axios.post("http://192.46.211.35:5000/userDegreeColleges", data, {}).then(res => {
            console.log("res data==>", res.data);
            localStorage.removeItem('EvaluateColleges')
            localStorage.setItem('EvaluateColleges', JSON.stringify(res.data))
            this.props.history.push("/collegeList");
            document.location.reload();


        })
    };

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const errors = this.state.errors;
        return (
            <>
                <UserNavBar/>
                <div className="app-content content">
                    <div className="content-overlay"/>
                    <div className="header-navbar-shadow"/>
                    <div className="content-wrapper">
                        <div className="content-header row">
                            <div className="content-header-left col-md-9 col-12 mb-2">
                                <div className="row breadcrumbs-top">
                                    <div className="col-12">
                                        <h2 className="content-header-title float-left mb-0">Add College</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">Home</a>
                                                </li>
                                                <li className="breadcrumb-item" style={{color: 'black'}}>College
                                                </li>
                                                <li className="breadcrumb-item active">Add
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-body">
                            {/*< Form wizard with number tabs section start >*/}
                            <section id="number-tabs">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <div id="wizard">
                                                        <form action="#"
                                                              className="number-tab-steps wizard-circle wizard">
                                                            <fieldset>
                                                                <h4 className="card-title mt-2 mb-2">SearchDegree
                                                                    Information</h4>
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="degree">
                                                                                Degrees</label>
                                                                            <select type="text"
                                                                                    select={this.state.degree}
                                                                                    onChange={this.onChange}
                                                                                    className="form-control"
                                                                                    id="degree">
                                                                                {this.state.degrees.map((option, index) => (
                                                                                    <option key={index}
                                                                                            value={option}>{option}</option>
                                                                                ))}
                                                                            </select>
                                                                            <span
                                                                                className="red-text"></span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="course">
                                                                                Courses</label>
                                                                            <TextInput id="course" trigger={""}
                                                                                       className="form-control"
                                                                                       onRequestOptions={this.handleRequestOptions}
                                                                                       options={this.state.suggestions}/>
                                                                            <span
                                                                                className="red-text"></span>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="country">Country</label>
                                                                            <select select={this.state.country}
                                                                                    onChange={this.onChange}
                                                                                    className="form-control"
                                                                                    id="country" name="location">
                                                                                {this.state.countrys.map((option, index) => (
                                                                                    <option key={index}
                                                                                            value={option}>{option}</option>
                                                                                ))}
                                                                            </select>
                                                                            <span
                                                                                className="red-text"></span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="state">State</label>
                                                                            <select select={this.state.state}
                                                                                    onChange={this.onChange}
                                                                                    className="form-control"
                                                                                    id="state" name="location">
                                                                                {this.state.states.map((option, index) => (
                                                                                    <option key={index}
                                                                                            value={option}>{option}</option>
                                                                                ))}
                                                                            </select>
                                                                            <span
                                                                                className="red-text"></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                            <div className="form-group">
                                                                <button onClick={this.onSubmit}
                                                                        className="btn btn-primary float-right btn-inline">Submit
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*< Form wizard with number tabs section end >*/}

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

searchDegree.propTypes = {};
export default searchDegree;