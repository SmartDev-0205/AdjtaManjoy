import React, {Component} from "react";
import Navbar from "../Navbar";
import axios from 'axios';
import {collegeSender} from "../../../actions/CollegeAction"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import {Link, withRouter} from "react-router-dom";
import countryList from 'react-select-country-list'
import Select from 'react-select'
import csc from 'country-state-city'
import ReactDoM from "react-dom"


class AddCollege extends Component {
    constructor() {

        super();
        this.cityoptions = csc.getAllCities();
        this.stateoptions = csc.getAllStates();
        this.countryoptions = countryList().getData();
        console.log("country options====>", this.countryoptions);
        console.log("city,states", this.cityoptions, this.stateoptions);
        if (JSON.parse(localStorage.getItem('currentCollege'))) {
            this.college = JSON.parse(localStorage.getItem('currentCollege'));
            console.log("local=>", this.college);
            this.state = {
                selectedFile: {
                    name: this.college.logo
                },
                cityoptions: this.cityoptions,
                stateoptions: this.stateoptions,
                logo: this.college.logo,
                countryoptions: this.countryoptions,
                name: this.college.name,
                description: this.college.description,
                city: this.college.address.city,
                state: this.college.address.state,
                country: this.college.address.country,
                zipcode: this.college.address.zipcode,
                streetNo: this.college.address.streetNo,
                tuitionFee: this.college.tuitionFee,
                accomodationFee: this.college.accomodationFee,
                applicationFee: this.college.applicationFee,
                springDeadline: this.college.springDeadline,
                summerDeadline: this.college.summerDeadline,
                fallDeadline: this.college.fallDeadline,
                WES: this.college.WES,
                overallRating: this.college.overallRating,
                livingCostRating: this.college.livingCostRating,
                jobsRating: this.college.jobsRating,
                universityType: this.college.universityType,
                webSite: this.college.webSite,
                establishmentType: this.college.establishmentType,
                phoneNumber: this.college.phoneNumber,
                email: this.college.email,
                acceptanceRate: this.college.accomodationFee,
                graduationRate: this.college.graduationRate,
                GRE: this.college.GRE,
                IELTS: this.college.IELTS,
                Toefl: this.college.Toefl,
                degreesArray: [],
                specializationsArray: [],
                degrees: [],
                specializations: [],
                errors: {}
            }
        } else {

            this.state = {
                selectedOptions: [],
                selectedFile: {
                    name: ""
                },
                logo: "logo192.png",
                cityoptions: this.cityoptions,
                stateoptions: this.stateoptions,
                countryoptions: this.countryoptions,
                name: "",
                description: "",
                city: "",
                state: "",
                country: "",
                zipcode: "",
                streetNo: "",
                tuitionFee: 0,
                accomodationFee: 0,
                applicationFee: 0,
                springDeadline: "",
                summerDeadline: "",
                fallDeadline: "",
                WES: false,
                overallRating: 0,
                livingCostRating: 0,
                jobsRating: 0,
                universityType: "",
                webSite: "",
                establishmentType: 0,
                phoneNumber: 0,
                email: "",
                acceptanceRate: 0,
                graduationRate: 0,
                GRE: 0,
                IELTS: 0,
                Toefl: 0,
                degreesArray: [],
                specializationsArray: [],
                degrees: [],
                specializations: [],
                errors: {}
            };

        }

    };

    degreehandleChange = (selectedOptions) => {
        this.setState({degrees:selectedOptions});
        this.state.degrees=selectedOptions;
        console.log("degrees===>",this.state.degrees);
    };

    specialhandleChange = (selectedOptions) => {
        this.setState({specializations:selectedOptions});
        this.state.specializations=selectedOptions;
        console.log("specializations===>",this.state.specializations);
    };

    componentDidMount() {
        axios.post("http://192.46.211.35:5000/getDegrees", {}, {}).then(res => {

            for (let index = 0; index < res.data.degrees.length; index++) {
                let option = {
                    value: res.data.degrees[index].text,
                    label: res.data.degrees[index].text

                };
                this.state.degreesArray.push(option);
            }
            ;
            console.log("degrees==>", this.state.degreesArray);
            this.props.history.push("/AddCollege");

        })
        axios.post("http://192.46.211.35:5000/getSpecialiaztions", {}, {}).then(res => {

            for (let index = 0; index < res.data.specializations.length; index++) {
                let option = {
                    value: res.data.specializations[index].text,
                    label: res.data.specializations[index].text

                };
                this.state.specializationsArray.push(option);
            }
            ;
            console.log("specializations==>", this.state.specializationsArray);
            this.props.history.push("/AddCollege");

        })

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {

        if (e.target.id === "WES")
            this.setState({[e.target.id]: e.target.checked})
        else if (e.target.id === "country") {
            this.state.country = e.target.value
            console.log("country", this.state.country)
        } else if (e.target.id === "city") {
            this.state.city = e.target.value
            console.log("city", this.state.city)
        } else if (e.target.id === "state") {
            this.state.state = e.target.value
            console.log("state", this.state.state)
        } else if (e.target.id === "degrees") {
            this.state.degrees = e.target.value
            console.log("degrees", this.state.degrees)
        } else if (e.target.id === "specializations") {
            this.state.specializations = e.target.value
            console.log("specializations", this.state.specializations)
        } else {
            this.setState({[e.target.id]: e.target.value})

        }


    };

    onSubmit = e => {
        e.preventDefault();
        console.log("click");
        const newCollege = {
            name: this.state.name,
            logo: this.state.selectedFile.name ? this.state.selectedFile.name:'logo192.png',
            description: this.state.description,
            streetNo: this.state.streetNo,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zipcode: this.state.zipcode,
            tuitionFee: this.state.tuitionFee,
            accomodationFee: this.state.accomodationFee,
            applicationFee: this.state.applicationFee,
            springDeadline: this.state.springDeadline,
            summerDeadline: this.state.summerDeadline,
            fallDeadline: this.state.fallDeadline,
            WES: this.state.WES,
            overallRating: this.state.overallRating,
            livingCostRating: this.state.livingCostRating,
            jobsRating: this.state.jobsRating,
            universityType: this.state.universityType,
            webSite: this.state.webSite,
            establishmentType: this.state.establishmentType,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            acceptanceRate: this.state.acceptanceRate,
            graduationRate: this.state.graduationRate,
            GRE: this.state.GRE,
            IELTS: this.state.IELTS,
            Toefl: this.state.Toefl,
            degrees: this.state.degrees,
            specializations: this.state.specializations,
            errors: this.state.errors
        };

        this.props.collegeSender(newCollege, this.props.history);


    };
    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        });

        document.getElementById("logoImg").src = event.target.files[0].name;
        console.log("image name=>", event.target.files[0].name)

    };
    onClickHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', this.state.selectedFile);

        axios.post("http://192.46.211.35:5000/upload", data, {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            console.log(res.statusText)
        })

    };

    render() {
        const {
            name, description, streetNo, city, country, zipcode, state, tuitionFee, accomodationFee, applicationFee, springDeadline, summerDeadline, fallDeadline, WES, overallRating, livingCostRating, jobsRating,
            universityType, webSite, establishmentType, phoneNumber, email, acceptanceRate, graduationRate, GRE, IELTS, Toefl, selectedFile, degreesArray, specializationsArray, degrees, specializations, errors, selectedOptions
        } = this.state;
        return (
            <>
                <Navbar/>
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
                                                              onSubmit={this.onSubmit}>
                                                            <h6>Step 1</h6>
                                                            <fieldset>
                                                                <h4 className="card-title mt-2 mb-2">Basic
                                                                    Information</h4>
                                                                <div className="media">
                                                                    <a>
                                                                        <img id="logoImg"
                                                                             src={`http://192.46.211.35:5000/public/${this.state.logo}`}
                                                                             className="rounded mr-75"
                                                                             alt="profile image" height="64"
                                                                             width="64"/>
                                                                    </a>
                                                                    <div className="media-body mt-75">
                                                                        <div
                                                                            className="col-12 px-0 d-flex flex-sm-row flex-column justify-content-start">
                                                                            <label
                                                                                className="btn btn-sm btn-primary ml-50 mb-50 mb-sm-0 cursor-pointer"
                                                                                htmlFor="account-upload">Upload new
                                                                                photo</label>
                                                                            <input type="file" id="account-upload"
                                                                                   name="file"
                                                                                   onChange={this.onChangeHandler}
                                                                                   hidden/>
                                                                            <button
                                                                                className="btn btn-sm btn-outline-warning ml-50"
                                                                                onClick={this.onClickHandler}>Reset
                                                                            </button>
                                                                        </div>
                                                                        <p className="text-muted ml-75 mt-50"><small>Allowed
                                                                            JPG, GIF or PNG. Max
                                                                            size of
                                                                            800kB</small></p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-sm-6">
                                                                            <div className="form-group">
                                                                                <label htmlFor="name">College
                                                                                    Name </label>
                                                                                <input type="text" error={errors}
                                                                                       className={classnames("form-control", {
                                                                                           invalid: errors.name
                                                                                       })}
                                                                                       id="name" value={name}
                                                                                       onChange={this.onChange}/>
                                                                                <span
                                                                                    className="red-text">{errors.name}</span>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-sm-6">
                                                                            <div className="form-group">
                                                                                <label
                                                                                    htmlFor="webSite">Website</label>
                                                                                <input type="text"
                                                                                       error={errors}
                                                                                       className={classnames("form-control", {
                                                                                           invalid: errors.webSite
                                                                                       })}
                                                                                       id="webSite" value={webSite}
                                                                                       onChange={this.onChange}/>
                                                                                <span
                                                                                    className="red-text">{errors.webSite}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="form-group">
                                                                                <label
                                                                                    htmlFor="description">Description</label>
                                                                                <textarea
                                                                                    className={classnames("form-control", {
                                                                                        invalid: errors.description
                                                                                    })}
                                                                                    id="description" rows="3"
                                                                                    error={errors}
                                                                                    placeholder="Your Bio data here..."
                                                                                    value={description}
                                                                                    onChange={this.onChange}></textarea>
                                                                                <span
                                                                                    className="red-text">{errors.description}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <hr/>

                                                                <h4 className="card-title mt-2 mb-2">Contact
                                                                    Information</h4>

                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="email">Email</label>
                                                                            <input type="email"
                                                                                   error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.email
                                                                                   })}
                                                                                   id="email" value={email}
                                                                                   onChange={this.onChange}/>
                                                                            <span
                                                                                className="red-text">{errors.email}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="phoneNumber">Phone
                                                                                Number</label>
                                                                            <input type="Number"
                                                                                   value={phoneNumber}
                                                                                   onChange={this.onChange}
                                                                                   error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.phoneNumber
                                                                                   })}
                                                                                   id="phoneNumber"/>
                                                                            <span
                                                                                className="red-text">{errors.phoneNumber}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="streetNo">Street
                                                                                Address</label>
                                                                            <input type="text"
                                                                                   value={streetNo}
                                                                                   onChange={this.onChange}
                                                                                   error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.streetNo
                                                                                   })}
                                                                                   id="streetNo"/>
                                                                            <span
                                                                                className="red-text">{errors.streetNo}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="city">City</label>
                                                                            <select type="text" error={errors}
                                                                                    selected={city}
                                                                                    onChange={this.onChange}
                                                                                    className={classnames("form-control", {
                                                                                        invalid: errors.city
                                                                                    })}
                                                                                    id="city">
                                                                                {this.stateoptions.map((option, index) => (
                                                                                    <option key={index}
                                                                                            value={option.name}>{option.name}</option>
                                                                                ))}
                                                                            </select>
                                                                            <span
                                                                                className="red-text">{errors.city}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="country">Country</label>
                                                                            <select error={errors}
                                                                                    selected={country}
                                                                                    onChange={this.onChange}
                                                                                    className={classnames("form-control", {
                                                                                        invalid: errors.country
                                                                                    })}
                                                                                    id="country" name="location">
                                                                                {this.countryoptions.map((option) => (
                                                                                    <option key={option.value}
                                                                                            value={option.label}>{option.label}</option>
                                                                                ))}
                                                                            </select>
                                                                            <span
                                                                                className="red-text">{errors.country}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="state">State</label>
                                                                            <select error={errors}
                                                                                    selected={state}
                                                                                    onChange={this.onChange}
                                                                                    className={classnames("form-control", {
                                                                                        invalid: errors.state
                                                                                    })}
                                                                                    id="state" name="location">
                                                                                {this.stateoptions.map((option, index) => (
                                                                                    <option key={index}
                                                                                            value={option.name}>{option.name}</option>
                                                                                ))}
                                                                            </select>
                                                                            <span
                                                                                className="red-text">{errors.state}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="zipcode">Zip
                                                                                Code</label>
                                                                            <input type="number" error={errors}
                                                                                   value={zipcode}
                                                                                   onChange={this.onChange}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.zipcode
                                                                                   })}
                                                                                   id="zipcode"/>
                                                                            <span
                                                                                className="red-text">{errors.zipcode}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </fieldset>


                                                            <h6>Step 2</h6>
                                                            <fieldset>
                                                                <h4 className="card-title mt-2 mb-2">Fee</h4>

                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="applicationFee">Application
                                                                                Fee</label>
                                                                            <input type="number"
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.applicationFee
                                                                                   })} error={errors}
                                                                                   value={applicationFee}
                                                                                   onChange={this.onChange}
                                                                                   id="applicationFee"/>
                                                                            <span
                                                                                className="red-text">{errors.applicationFee}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="tuitionFee">Tution
                                                                                Fee</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.tuitionFee
                                                                                   })}
                                                                                   value={tuitionFee}
                                                                                   onChange={this.onChange}
                                                                                   id="tuitionFee"/>
                                                                            <span
                                                                                className="red-text">{errors.tuitionFee}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="accomodationFee">Accommodation
                                                                                Fee</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.accomodationFee
                                                                                   })}
                                                                                   value={accomodationFee}
                                                                                   onChange={this.onChange}
                                                                                   id="accomodationFee"/>
                                                                            <span
                                                                                className="red-text">{errors.accomodationFee}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <hr/>

                                                                <h4 className="card-title mt-2 mb-2">Deadlines</h4>

                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="fallDeadline">Fall</label>
                                                                            <input type="text"
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.fallDeadline
                                                                                   })} error={errors}
                                                                                   value={fallDeadline}
                                                                                   onChange={this.onChange}
                                                                                   placeholder="mm-dd"
                                                                                   id="fallDeadline"/>
                                                                            <span
                                                                                className="red-text">{errors.fallDeadline}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-4">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="springDeadline">Spring</label>
                                                                            <input type="text"
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.springDeadline
                                                                                   })} error={errors}
                                                                                   placeholder="mm-dd"
                                                                                   value={springDeadline}
                                                                                   onChange={this.onChange}
                                                                                   value={springDeadline}
                                                                                   onChange={this.onChange}
                                                                                   id="springDeadline"/>
                                                                            <span
                                                                                className="red-text">{errors.springDeadline}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-4">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="summerDeadline">Summer</label>
                                                                            <input type="text" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.summerDeadline
                                                                                   })}
                                                                                   value={summerDeadline}
                                                                                   onChange={this.onChange}
                                                                                   placeholder="mm-dd"
                                                                                   id="summerDeadline"/>
                                                                            <span
                                                                                className="red-text">{errors.summerDeadline}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <hr/>

                                                                <h4 className="card-title mt-2 mb-2">Scores</h4>

                                                                <div className="row">
                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="GRE">GRE</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.GRE
                                                                                   })}
                                                                                   value={GRE} onChange={this.onChange}
                                                                                   id="GRE"/>
                                                                            <span
                                                                                className="red-text">{errors.GRE}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="GMAT">GMAT</label>
                                                                            <input type="text" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.GMAT
                                                                                   })}
                                                                                   value={"GMAX"}
                                                                                   onChange={this.onChange}
                                                                                   id="GMAT"/>
                                                                            <span
                                                                                className="red-text">{errors.GMAT}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="IELTS">IELTS</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.IELTS
                                                                                   })}
                                                                                   value={IELTS}
                                                                                   onChange={this.onChange}
                                                                                   id="IELTS"/>
                                                                            <span
                                                                                className="red-text">{errors.IELTS}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="Toefl">TOEFL</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.Toefl
                                                                                   })}
                                                                                   value={Toefl}
                                                                                   onChange={this.onChange}
                                                                                   id="Toefl"/>
                                                                            <span
                                                                                className="red-text">{errors.Toefl}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <hr/>

                                                                <h4 className="card-title mt-2 mb-2">Rating</h4>

                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="overallRating">Overall</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.overallRating
                                                                                   })}
                                                                                   value={overallRating}
                                                                                   onChange={this.onChange}
                                                                                   id="overallRating"/>
                                                                            <span
                                                                                className="red-text">{errors.overallRating}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="livingCostRating">Living
                                                                                Costs</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.livingCostRating
                                                                                   })}
                                                                                   value={livingCostRating}
                                                                                   onChange={this.onChange}
                                                                                   id="livingCostRating"/>
                                                                            <span
                                                                                className="red-text">{errors.livingCostRating}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="jobsRating">Jobs</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.jobsRating
                                                                                   })}
                                                                                   value={jobsRating}
                                                                                   onChange={this.onChange}
                                                                                   id="jobsRating"/>
                                                                            <span
                                                                                className="red-text">{errors.jobsRating}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-2">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="WES">WES</label>
                                                                            <fieldset className="checkbox">
                                                                                <div
                                                                                    className="vs-checkbox-con vs-checkbox-primary">
                                                                                    <input type="checkbox" id="WES"
                                                                                           value={WES} error={errors}
                                                                                           onChange={this.onChange}/>
                                                                                    <span className="vs-checkbox">
                                                                                <span className="vs-checkbox--check">
                                                                                    <i className="vs-icon feather icon-check"></i>

                                                                                </span>
                                                                            </span>


                                                                                </div>
                                                                            </fieldset>
                                                                            <span
                                                                                className="red-text">{errors.WES}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <hr/>

                                                                <h4 className="card-title mt-2 mb-2">Misc.</h4>

                                                                <div className="row">
                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="universityType">University
                                                                                Type</label>
                                                                            <input type="text" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.universityType
                                                                                   })}
                                                                                   value={universityType}
                                                                                   onChange={this.onChange}
                                                                                   id="universityType"/>
                                                                            <span
                                                                                className="red-text">{errors.universityType}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="establishmentType">Establishment
                                                                                Year</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.establishmentType
                                                                                   })}
                                                                                   value={establishmentType}
                                                                                   onChange={this.onChange}
                                                                                   id="establishmentType"/>
                                                                            <span
                                                                                className="red-text">{errors.establishmentType}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="acceptanceRate">Acceptance
                                                                                Rate</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.acceptanceRate
                                                                                   })}
                                                                                   value={acceptanceRate}
                                                                                   onChange={this.onChange}
                                                                                   id="acceptanceRate"/>
                                                                            <span
                                                                                className="red-text">{errors.acceptanceRate}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="graduationRate">Graduation
                                                                                Rate</label>
                                                                            <input type="number" error={errors}
                                                                                   className={classnames("form-control", {
                                                                                       invalid: errors.graduationRate
                                                                                   })}
                                                                                   value={graduationRate}
                                                                                   onChange={this.onChange}
                                                                                   id="graduationRate"/>
                                                                            <span
                                                                                className="red-text">{errors.graduationRate}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr/>

                                                                <h4 className="card-title mt-2 mb-2">Degree</h4>
                                                                <div className="row">
                                                                    <div className="col-sm-12">
                                                                        <div className="form-group">
                                                                            <label htmlFor="degrees">Degree</label>
                                                                            <Select
                                                                                isMulti id="degrees"
                                                                                onChange={this.degreehandleChange}
                                                                                //value={degrees}
                                                                                options={degreesArray}
                                                                            />
                                                                            <span
                                                                                className="red-text">{errors.degrees}</span>
                                                                        </div>

                                                                    </div>
                                                                    <div className="col-sm-12">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="specializations">Specialization</label>
                                                                            <Select
                                                                                isMulti id="specializations"
                                                                                onChange={this.specialhandleChange}
                                                                                options={specializationsArray}
                                                                                //value={specializations}
                                                                            />
                                                                            <span
                                                                                className="red-text">{errors.specializations}</span>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                            <div className="form-group">
                                                                <button type="submit"
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

AddCollege.propTypes = {
    collegeSender: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {collegeSender})(withRouter(AddCollege));