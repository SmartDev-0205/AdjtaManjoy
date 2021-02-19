import React, {Component} from "react";
import UserNavBar from "./UserNavBar";
import axios from 'axios';

import {connect} from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import editCollege from "../layout/College/editCollege";
import {getCollegeInfo} from "../../actions/CollegeAction"
import TextInput from 'react-autocomplete-input';

class EvaluateProfile extends Component {
    constructor() {
        super();
        this.state = {
            country: "",
            state: "",
            countrys: [],
            states: [],
            GRE: "",
            toefl: "",
            errors: {
                country: "",
                state: "",
                GRE: "",
                toefl: ""
            }
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
                this.setState({country: this.state.countrys[0]});
                this.state.country = this.state.countrys[0];
                this.setState({state: this.state.states[0]});
                this.state.state = this.state.states[0]
            }
        })


    }

    componentDidMount() {

    }

    onChange = e => {

        if (e.target.id === "country") {
            this.state.country = e.target.value;
            console.log("country", this.state.country)
        } else if (e.target.id === "state") {
            this.state.state = e.target.value;
            console.log("state", this.state.state)
        } else {
            this.setState({[e.target.id]: e.target.value});
            console.log("changing values==>", e.target.value)
        }


    };
    onSubmit = e => {
        e.preventDefault();
        let data = {
            country: this.state.country,
            state: this.state.state,
            GRE: this.state.GRE,
            toefl: this.state.toefl
        }
        axios.post("http://192.46.211.35:5000/userEvaluateColleges", data, {}).then(res => {
            console.log("res data==>", res.data);
            if(res.data.error){
                this.setState({errors:res.data.data})
                this.state.errors=res.data.data;
            }else{
                localStorage.removeItem('EvaluateColleges')
                localStorage.setItem('EvaluateColleges',JSON.stringify(res.data.data))
                this.props.history.push("/collegeList")
            }

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
                                                              className="number-tab-steps wizard-circle wizard"
                                                              >
                                                            <fieldset>
                                                                <h4 className="card-title mt-2 mb-2">Contact
                                                                    Information</h4>
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="country">Country</label>
                                                                            <select select={this.state.country}
                                                                                    onChange={this.onChange}
                                                                                    error={errors}
                                                                                    className={classnames("form-control", {
                                                                                        invalid: errors.country
                                                                                    })}
                                                                                    id="country" name="location">
                                                                                {this.state.countrys.map((option, index) => (
                                                                                    <option key={index}
                                                                                            value={option}>{option}</option>
                                                                                ))}
                                                                            </select>
                                                                            <span
                                                                                className="red-text">{this.state.errors.country}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="state">State</label>
                                                                            <select select={this.state.state}
                                                                                    onChange={this.onChange}
                                                                                    error={errors}
                                                                                    className={classnames("form-control", {
                                                                                        invalid: errors.state
                                                                                    })}
                                                                                    id="state" name="location">
                                                                                {this.state.states.map((option, index) => (
                                                                                    <option key={index}
                                                                                            value={option}>{option}</option>
                                                                                ))}
                                                                            </select>
                                                                            <span
                                                                                className="red-text">{this.state.errors.state}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="GRE">
                                                                                GRE SCORE</label>
                                                                            <input type="number"
                                                                                   value={this.state.GRE}
                                                                                   onChange={this.onChange}
                                                                                   error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.GRE
                                                                                   })}
                                                                                   id="GRE"/>
                                                                            <span
                                                                                className="red-text">{this.state.errors.GRE}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="toefl">
                                                                                TOEFL/ETLTS</label>
                                                                            <input type="number"
                                                                                   value={this.state.toefl}
                                                                                   onChange={this.onChange}
                                                                                   error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.toefl
                                                                                   })}
                                                                                   id="toefl"/>
                                                                            <span
                                                                                className="red-text">{this.state.errors.toefl}</span>
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

EvaluateProfile.propTypes = {};
export default EvaluateProfile;