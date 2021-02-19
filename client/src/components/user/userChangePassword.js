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

class userChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            _id: "",
            password: "",
            newpassword: "",
            checknewpassword: "",
            editingAdmin: {},
            errors: {
                password: ""

            }

        }

        this.state.editingAdmin = JSON.parse(localStorage.getItem("nowUser"));
        console.log("currentUser:", this.state.editingAdmin);
        this.state._id = this.state.editingAdmin.id;

    };

    componentDidMount() {

    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    onChange = e => {
        this.setState({[e.target.id]: e.target.value})
    };

    cancelEdit = () => {
        console.log("clicked");
        this.props.history.push("/searchDegree");
        window.location.reload();
    };

    changepassword = (id, e) => {
        e.preventDefault();
        const data = {
            id: this.state._id,
            oldpass: this.state.password,
            newpass: this.state.newpassword,
            checkpass: this.state.checknewpassword
        };
        axios.post("http://192.46.211.35:5000/resetUserPassword", data, {}).then(res => {
            this.state.errors = res.data.errors;
            if (this.state.errors) {
                console.log("result==>", this.state.errors);
                this.props.history.push("/userChangePassword");
            } else {
                this.props.history.push("/searchDegree");
                window.location.reload();
            }

        });
    };

    render() {

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
                                        <h2 className="content-header-title float-left mb-0">Edit Password</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">User</a>
                                                </li>
                                                <li className="breadcrumb-item active"> Change Password
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-body">
                            {/*< account setting page start >*/}
                            <section id="page-account-settings">
                                <div className="row">
                                    {/*< left menu section >*/}
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <ul className="nav nav-pills flex-column mt-md-0 mt-1">
                                            <li className="nav-item">
                                                <a className="nav-link d-flex py-75" id="account-pill-password"
                                                   data-toggle="pill"
                                                   href="#account-vertical-password" aria-expanded="false">
                                                    <i className="feather icon-lock mr-50 font-medium-3"/>
                                                    Change Password
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/*< right content section >*/}
                                    <div className="col-md-9">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="account-vertical-password"
                                                             role="tabpanel"
                                                             aria-labelledby="account-pill-password"
                                                             aria-expanded="false">
                                                            <form noValidate>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label htmlFor="password">Old
                                                                                    Password</label>
                                                                                <input type="password"
                                                                                       error={this.state.errors}
                                                                                       className={classnames("form-control", {
                                                                                           invalid: this.state.errors.oldpassword
                                                                                       })}
                                                                                       className="form-control"
                                                                                       id="password"
                                                                                       value={this.state.password}
                                                                                       onChange={this.onChange}
                                                                                       required
                                                                                       placeholder="Old Password"
                                                                                       data-validation-required-message="This old password field is required"/>
                                                                                <span
                                                                                    className="red-text">{this.state.errors.oldpassword}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label htmlFor="newpassword">New
                                                                                    Password</label>
                                                                                <input type="password" name="password"
                                                                                       id="newpassword"
                                                                                       error={this.state.errors}

                                                                                       onChange={this.onChange}
                                                                                       value={this.state.newpassword}
                                                                                       className="form-control"
                                                                                       placeholder="New Password"
                                                                                       required
                                                                                       data-validation-required-message="The password field is required"
                                                                                       minLength="6"/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label
                                                                                    htmlFor="checknewpassword">Retype
                                                                                    New Password</label>
                                                                                <input type="password"
                                                                                       name="con-password"
                                                                                       className="form-control" required
                                                                                       id="checknewpassword"
                                                                                       error={this.state.errors}
                                                                                       className={classnames("form-control", {
                                                                                           invalid: this.state.errors.checkpassword
                                                                                       })}
                                                                                       onChange={this.onChange}
                                                                                       value={this.state.checknewpassword}
                                                                                       data-validation-match-match="password"
                                                                                       placeholder="New Password"
                                                                                       data-validation-required-message="The Confirm password field is required"
                                                                                       minLength="6"/>
                                                                                <span
                                                                                    className="red-text">{this.state.errors.checkpassword}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 d-flex flex-sm-row flex-column justify-content-end">
                                                                        <button
                                                                            onClick={(e) => this.changepassword(this.state._id, e)}
                                                                            className="btn btn-primary mr-sm-1 mb-1 mb-sm-0">Save
                                                                            changes
                                                                        </button>
                                                                        <button onClick={this.cancelEdit}
                                                                                className="btn btn-outline-warning">Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*< account setting page end >*/}

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

userChangePassword.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default userChangePassword;