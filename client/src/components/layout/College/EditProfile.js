import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Navbar from "../Navbar";
import axios from 'axios';
import classnames from "classnames";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {GET_ERRORS} from "../../../actions/types";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            phonenumber: "",
            selectedFile: null,
            avatarname: "",
            password: "",
            passconfirm: "",
            errors: {}
        }


    }

    componentDidMount() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        console.log("currentUser=>", this.currentUser)
        this.setState({
            id: this.currentUser._id,
            name: this.currentUser.name,
            email: this.currentUser.email,
            phonenumber: this.currentUser.phonenumber,
            avatarname: this.currentUser.avatar
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
        this.setState({[e.target.id]: e.target.value})
    }
    onChangeHandler = event => {
        try {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0,
            });
            this.state.avatarname = event.target.files[0].name
        } catch (e) {
            console.log("error ocurred", e)
        }

    }
    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        data.append('id', this.state.id)
        axios.post("http://192.46.211.35:5000/upload/avatar", data, {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status

            console.log("avatar name=>", this.state.avatarname)
            console.log(res.statusText)
        })

    }
    saveEditChange = (e) => {
        e.preventDefault();
        this.currentUser.name = this.state.name
        this.currentUser.email = this.state.email
        this.currentUser.phonenumber = this.state.phonenumber
        this.currentUser.avatar = this.state.avatarname
        localStorage.removeItem('currentUser')
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        let data = {
            id: this.state.id,
            nextname: this.state.name,
            nextemail: this.state.email,
            nextphonenumber: this.state.phonenumber
        }
        //console.log("save data===>",data)
        axios.post("http://192.46.211.35:5000/updateUser", data, {}).then(res => {
            console.log("result==>", res.data)
            if (res.data.error === true) {
                this.setState({errors: res.data.data})
            } else {
                this.props.history.push("/editProfile")
                window.location.reload()
            }


        })

    }
    cancelEdit = () => dispatch => {
        this.props.history.push("/getUserAction")
        window.location.reload()
    }
    resetPassword = (e) => {
        e.preventDefault()
        let data = {
            id: this.state.id,
            password: this.state.password,
            passconfirm: this.state.passconfirm
        }
        axios.post("http://192.46.211.35:5000/changePassword", data, {}).then(res => {
            console.log("result==>", res.data)
            if (res.data.error === true) {
                this.setState({errors: res.data.data})

                //document.getElementsByClassName("tab-content").tabs( {active:1});
            }

        })

    }
    stopAutoChange=(e)=>{
        e.preventDefault();
       // debugger
        console.log(e.target)


    }
    render() {
        const {name, email, phonenumber, avatarname, password, passconfirm, errors} = this.state
        return (
            <>
                <Navbar/>
                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="header-navbar-shadow"></div>
                    <div className="content-wrapper">
                        <div className="content-header row">
                            <div className="content-header-left col-md-9 col-12 mb-2">
                                <div className="row breadcrumbs-top">
                                    <div className="col-12">
                                        <h2 className="content-header-title float-left mb-0">Edit Profile</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">Home</a>
                                                </li>
                                                <li className="breadcrumb-item active"> Edit Profile
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
                                    {/*< left menu section>*/}
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <ul className="nav nav-pills flex-column mt-md-0 mt-1" id="myTab" >
                                            <li className="nav-item">
                                                <a   className="nav-link d-flex py-75 active" id="account-pill-general"
                                                   data-toggle="pill"
                                                   href="#account-vertical-general" aria-expanded="true">
                                                    <i className="feather icon-globe mr-50 font-medium-3"></i>
                                                    General
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a  className="nav-link d-flex py-75" id="account-pill-password"
                                                   data-toggle="pill"
                                                   href="#account-vertical-password" aria-expanded="false">
                                                    <i className="feather icon-lock mr-50 font-medium-3"></i>
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
                                                        <div role="tabpanel" className="tab-pane active"
                                                             id="account-vertical-general"
                                                             aria-labelledby="account-pill-general"
                                                             aria-expanded="true">
                                                            <div className="media">
                                                                <a>
                                                                    <img id="avatarImg"
                                                                         src="assets/images/portrait/small/avatar-s-12.jpg"
                                                                         src={`http://192.46.211.35:5000/public/avatar/${avatarname}`}
                                                                         className="rounded mr-75"
                                                                         alt="profile image" height="64" width="64"/>
                                                                </a>
                                                                <div className="media-body mt-75">
                                                                    <div
                                                                        className="col-12 px-0 d-flex flex-sm-row flex-column justify-content-start">
                                                                        <label
                                                                            className="btn btn-sm btn-primary ml-50 mb-50 mb-sm-0 cursor-pointer"
                                                                            htmlFor="account-upload">Upload new
                                                                            photo</label>
                                                                        <input type="file" id="account-upload"
                                                                               onChange={this.onChangeHandler} hidden/>
                                                                        <button onClick={this.onClickHandler}
                                                                                className="btn btn-sm btn-outline-warning ml-50">Reset
                                                                        </button>
                                                                    </div>
                                                                    <p className="text-muted ml-75 mt-50"><small>Allowed
                                                                        JPG, GIF or PNG. Max
                                                                        size of
                                                                        800kB</small></p>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label
                                                                                    htmlFor="name">Name</label>
                                                                                <input type="text"
                                                                                       error={errors}
                                                                                       className={classnames("form-control", {
                                                                                           invalid: errors.name
                                                                                       })}
                                                                                       id="name"
                                                                                       placeholder="Name"
                                                                                       value={name}
                                                                                       onChange={this.onChange}
                                                                                       contentEditable="true"
                                                                                       required
                                                                                       data-validation-required-message="This name field is required"/>
                                                                                <span
                                                                                    className="red-text">{errors.name}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label
                                                                                    htmlFor="email">E-mail</label>
                                                                                <input type="email"
                                                                                       error={errors}
                                                                                       className={classnames("form-control", {
                                                                                           invalid: errors.email
                                                                                       })}
                                                                                       id="email"
                                                                                       placeholder="Email"
                                                                                       value={email}
                                                                                       onChange={this.onChange}
                                                                                       required
                                                                                       data-validation-required-message="This email field is required"/>
                                                                                <span
                                                                                    className="red-text">{errors.email}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label htmlFor="phonenumber">Phone
                                                                                    Number</label>
                                                                                <input type="text"
                                                                                       id="phonenumber"
                                                                                       error={errors}
                                                                                       className={classnames("form-control", {
                                                                                           invalid: errors.phonenumber
                                                                                       })}
                                                                                       placeholder="Username"
                                                                                       onChange={this.onChange}
                                                                                       value={phonenumber} required
                                                                                       data-validation-required-message="This username field is required"/>
                                                                                <span
                                                                                    className="red-text">{errors.phonenumber}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 d-flex flex-sm-row flex-column justify-content-end">
                                                                        <button onClick={(e) => this.saveEditChange(e)}
                                                                                className="btn btn-primary mr-sm-1 mb-1 mb-sm-0">Save
                                                                            changes
                                                                        </button>
                                                                        <button onClick={this.cancelEdit()}
                                                                                className="btn btn-outline-warning">Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="tab-pane fade " id="account-vertical-password"
                                                             role="tabpanel"
                                                             aria-labelledby="account-pill-password"
                                                             aria-expanded="false">
                                                            <form >
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label htmlFor="password">New
                                                                                    Password</label>
                                                                                <input type="password" name="password"
                                                                                       id="password"
                                                                                       error={errors}
                                                                                       className={classnames("form-control", {
                                                                                           invalid: errors.password
                                                                                       })}
                                                                                       value={password}
                                                                                       onChange={this.onChange}
                                                                                       placeholder="New Password"
                                                                                       required
                                                                                       data-validation-required-message="The password field is required"
                                                                                       minLength="6"/>
                                                                                <span
                                                                                    className="red-text">{errors.password}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label
                                                                                    htmlFor="passconfirm">Retype
                                                                                    New
                                                                                    Password</label>
                                                                                <input type="password"
                                                                                       name="con-password"
                                                                                       className={classnames("form-control", {
                                                                                           invalid: errors.passconfirm
                                                                                       })}
                                                                                       id="passconfirm"
                                                                                       error={errors}
                                                                                       value={passconfirm}
                                                                                       onChange={this.onChange}
                                                                                       data-validation-match-match="password"
                                                                                       placeholder="New Password"
                                                                                       data-validation-required-message="The Confirm password field is required"
                                                                                       minLength="6"/>
                                                                                <span
                                                                                    className="red-text">{errors.passconfirm}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 d-flex flex-sm-row flex-column justify-content-end">
                                                                        <button onClick={(e)=>this.resetPassword(e)}
                                                                                className="btn btn-primary mr-sm-1 mb-1 mb-sm-0">Save
                                                                            changes
                                                                        </button>
                                                                        <button  onClick={this.cancelEdit}
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

        );
    }
}

EditProfile.propTypes = {
    // User: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    // User: state.User,
    errors: state.errors
});
export default connect(mapStateToProps)(withRouter(EditProfile));