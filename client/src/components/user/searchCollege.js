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

class searchCollege extends Component {
    constructor() {
        super();
        this.state = {
            suggestions: [],
            errors: {}
        }


    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    handleRequestOptions = () => {
        axios.post("/getPlaceholder", {}, {}).then(res => {
            console.log("result==>", res.data.data)
            this.setState({suggestions: res.data.data})
            console.log("result==>", this.state.suggestions)
        });
    }
    searchCollege = () => {
        const name = document.getElementById("namefiled").value
        console.log("input value===>", name)
        if (name.trim() == "") {
            this.setState({errors: {name: "input college name!"}})
            this.state.errors.name = "input college name!"
            console.log("empty input", this.state.errors.name)
        } else {
            this.setState({errors: {name: ""}})
            this.state.errors.name = ""
            console.log("empty input", this.state.errors.name)
            const data = {
                name: name
            }
            axios.post("/userSearchCollege", data, {}).then(res => {
                console.log("search result==>", res.data)
                if (!res.data.error) {
                    localStorage.removeItem("currentCollege")
                    localStorage.setItem("currentCollege", JSON.stringify(res.data.data))
                    this.props.history.push("./usergetCollege")
                    window.location.reload()

                } else {

                }

            })
        }


    }

    render() {

        return (
            <>
                <UserNavBar/>
                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="header-navbar-shadow"></div>
                    <div className="content-wrapper">
                        <div className="content-header row">
                            <div className="content-header-left col-md-9 col-12 mb-2">
                                <div className="row breadcrumbs-top">
                                    <div className="col-12">
                                        <h2 className="content-header-title float-left mb-0">Search College</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">User</a>
                                                </li>
                                                <li className="breadcrumb-item">Home
                                                </li>
                                                <li className="breadcrumb-item active">Search Degree
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-body">
                            {/*< Form wizard with number tabs section start>*/}
                            <section id="number-tabs">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form action="#" className="wizard-circle">

                                                        <fieldset>

                                                            <h4 className="card-title mt-2 mb-2">Search Degree</h4>

                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="degreetext">Enter
                                                                            Value</label>
                                                                        <div className="row">
                                                                            <div className="col-sm-4">
                                                                                {/*<input type="text"*/}
                                                                                {/*     value={this.state.name}*/}
                                                                                {/*     onChange={this.onChange}*/}
                                                                                {/*       className="form-control required"*/}
                                                                                {/*       options={nameOptions} id="name" />*/}
                                                                                <TextInput id="namefiled" trigger={""}
                                                                                           onRequestOptions={this.handleRequestOptions}
                                                                                           options={this.state.suggestions}/>
                                                                                <span
                                                                                    className="red-text">{this.state.errors.name}</span>
                                                                            </div>
                                                                            <div className="col-sm-4 ">
                                                                                <a className="searchbtn btn btn-primary mr-1 waves-effect waves-light float-left"
                                                                                   onClick={this.searchCollege}><i
                                                                                    className="feather icon-edit-1 "></i> search</a>
                                                                            </div>

                                                                        </div>


                                                                    </div>
                                                                </div>


                                                            </div>


                                                        </fieldset>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*< Form wizard with number tabs section end>*/}

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

searchCollege.propTypes = {};
export default searchCollege;