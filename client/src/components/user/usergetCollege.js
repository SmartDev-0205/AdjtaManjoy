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

class usergetCollege extends Component {
    constructor() {
        super();
        this.college = JSON.parse(localStorage.getItem('currentCollege'))
        console.log("currentCollege=>", this.college)
        this.state = {
            college: this.college
        }


    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    onChange = e => {
        if (e.target.id == "WES")
            this.setState({[e.target.id]: e.target.checked})
        else
            this.setState({[e.target.id]: e.target.value})
    }
    onSubmit = e => {
        e.preventDefault();

    }
    getStatus = e => {
        if (e == true)
            return "YES"
        else
            return "NO"
    }
    LockCollege = e => dispatch => {
        //e.preventDefault();
        console.log("lock act", e)
        let data = {
            name: e
        }
        axios.post("http://192.46.211.35:5000/lockCollege", data, {}).then(res => {
            console.log("Lock result=>", res.data)
        })
    }
    UnlockCollege = e => dispatch => {
        //e.preventDefault();
        console.log("lock act", e)
        let data = {
            name: e
        }
        axios.post("http://192.46.211.35:5000/unlockCollege", data, {}).then(res => {
            console.log("unlock result=>", res.data)
        })
    }
    shortlist= e =>{
        e.preventDefault();
        const user=JSON.parse(localStorage.getItem('nowUser'));
        const data={
            college:this.college,
            user:user
        };
        axios.post("http://192.46.211.35:5000/userShortlist",data,{}).then(
            res=>{
                console.log("res data==>",res.data);
            }
        );
    }

    render() {
        const {college} = this.state
        const imgstyle = {
            width: "60%",
            height: "50%"
        }
        return (
            <>
                <UserNavBar/>
                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="header-navbar-shadow"></div>
                    <div className="content-wrapper">
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            {/*    < page users view start >*/}
                            <section className="page-users-view">
                                <div className="row">
                                    {/*< account start >*/}
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="card-title">Account</div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="users-view-image">
                                                        <img src="assets/images/portrait/small/avatar-s-12.jpg"
                                                             src={`http://192.46.211.35:5000/public/${college.logo}`}
                                                             style={imgstyle}
                                                             className="users-avatar-shadow w-100 rounded mb-2 pr-2 ml-1"
                                                             alt="avatar"/>
                                                    </div>
                                                    <div className="col-12 col-sm-9 col-md-6 col-lg-8">
                                                        <h2>{college.name}</h2>
                                                        <table>
                                                            <tr>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                            </tr>

                                                            <tr>
                                                                <td><a onClick={this.shortlist}
                                                                          className="btn btn-primary mr-1 w-100"><i
                                                                    className="feather icon-edit-1"></i> Shortlist</a>
                                                                </td>

                                                            </tr>


                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*< account end >*/}
                                    {/*< information start >*/}
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="card-title mb-2">Contact</div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-body">
                                                        <table>
                                                            <tr>
                                                                <td className="font-weight-bold">Email Id</td>
                                                                <td>{college.email}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Mobile</td>
                                                                <td>{college.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Address</td>
                                                                <td>{college.address.streetNo}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">State</td>
                                                                <td>{college.address.state}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Country</td>
                                                                <td>{college.address.country}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Zip Code</td>
                                                                <td>{college.address.zipcode}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-body">
                                                        <table>
                                                            <tr>
                                                                <td className="font-weight-bold">Bio</td>
                                                                <td>{college.description}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*< information start >*/}
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-header">
                                                        <div className="card-title mb-2">Fee</div>
                                                    </div>
                                                    <div className="card-body">
                                                        <table>
                                                            <tr>
                                                                <td className="font-weight-bold">Application Fee</td>
                                                                <td>{college.applicationFee}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Tution Fee</td>
                                                                <td>{college.tuitionFee}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Accommodation</td>
                                                                <td>{college.accomodationFee}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-header">
                                                        <div className="card-title mb-2">Deadlines</div>
                                                    </div>
                                                    <div className="card-body">
                                                        <table>
                                                            <tr>
                                                                <td className="font-weight-bold">Spring</td>
                                                                <td>{college.springDeadline}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Summer</td>
                                                                <td>{college.summerDeadline}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Fall</td>
                                                                <td>{college.fallDeadline}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-header">
                                                        <div className="card-title mb-2">Ratings</div>
                                                    </div>
                                                    <div className="card-body">
                                                        <table>
                                                            <tr>
                                                                <td className="font-weight-bold">Overall</td>
                                                                <td>{college.overallRating}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Living Costs</td>
                                                                <td>{college.livingCostRating}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Jobs</td>
                                                                <td>{college.tuitionFee}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*< information start >*/}
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-header">
                                                        <div className="card-title mb-2">Scores</div>
                                                    </div>
                                                    <div className="card-body">
                                                        <table>
                                                            <tr>
                                                                <td className="font-weight-bold">GRE</td>
                                                                <td>{college.GRE}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">GMAT</td>
                                                                <td>1000</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">IELTS</td>
                                                                <td>{college.IELTS}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">TOEFL</td>
                                                                <td>{college.Toefl}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card-header">
                                                        <div className="card-title mb-2">Misc.</div>
                                                    </div>
                                                    <div className="card-body">
                                                        <table>
                                                            <tr>
                                                                <td className="font-weight-bold">University Type</td>
                                                                <td>{college.universityType}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Establishment</td>
                                                                <td>{college.establishmentType}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Acceptance Rate</td>
                                                                <td>{college.acceptanceRate}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Graduation Rate</td>
                                                                <td>{college.graduationRate}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Wes</td>
                                                                <td>{this.getStatus(college.WES)}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*< page users view end >*/}

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

usergetCollege.propTypes = {};
export default usergetCollege;