import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from 'axios';
import classnames from "classnames";
class AdminEditInfo extends Component {
    constructor() {
        super();
        this.state={
            name:"",
            username:"",
            role:"",
            status:"",
            email:"",
            _id:"",
            avatarname:"",
            selectedFile:null,
            editingAdmin:{},
            password:"",
            newpassword:"",
            checknewpassword:"",
            errors:{
                username:"",
                password:"",
                name:"",
                email:""

            }

        }

        this.state.editingAdmin=JSON.parse(localStorage.getItem("currentEditAdmin"))
        console.log("currentAdmin:",this.state.editingAdmin)
        this.state.name=this.state.editingAdmin.name
        this.state.username=this.state.editingAdmin.username
        this.state.role=this.state.editingAdmin.role
        this.state.status=this.state.editingAdmin.status
        this.state.email=this.state.editingAdmin.email
        this.state._id=this.state.editingAdmin._id
        this.state.avatarname=this.state.editingAdmin.avatar
        console.log("editingAdmin Info===>",this.state.editingAdmin)
        // debugger
    }
    componentDidMount() {

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
        data.append('id', this.state._id)
        axios.post("http://192.46.211.35:5000/upload/admin/avatar", data, {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status

            console.log("avatar name=>", this.state.avatarname)
            console.log(res.statusText)
        })

    }
    saveEditChange = (e) => {
        e.preventDefault();
        const editingAdmin={}
        editingAdmin.name = this.state.name
        editingAdmin.email = this.state.email
        editingAdmin.username = this.state.username
        editingAdmin._id = this.state._id
        editingAdmin.role = this.state.role
        editingAdmin.avatar = this.state.avatarname
        editingAdmin.status = this.state.status
        console.log("editingAdmin==>",editingAdmin)
        localStorage.removeItem('currentEditAdmin')
        localStorage.setItem('currentEditAdmin', JSON.stringify(editingAdmin))
        let data = {
            id: this.state._id,
            nextname: this.state.name,
            nextemail: this.state.email,
            nextusername: this.state.username,
            nextrole: this.state.role,



        }
        //console.log("save data===>",data)
        axios.post("http://192.46.211.35:5000/updateAdmin", data, {}).then(res => {
            console.log("result==>", res.data)
            if (res.data.error === true) {
                this.setState({errors: res.data.data})
            } else {
                this.props.history.push("/adminEditAction")
                window.location.reload()
            }


        })

    }
    cancelEdit = () => dispatch => {
        this.props.history.push("/adminEditAction")
        window.location.reload()
    }

    changepassword=(id,e)=>{
        e.preventDefault()
        const data={
            id:id,
            oldpass:this.state.password,
            newpass:this.state.newpassword,
            checkpass:this.state.checknewpassword
        }
        axios.post("http://192.46.211.35:5000/resetAdminPassword",data,{}).then(res=>{

            this.state.errors=res.data.errors
            console.log("result==>",this.state.errors)
            // this.state.errors.username=""
            // this.state.errors.name=""
            // this.state.errors.email=""
            this.props.history.push("/adminEditInfo")

        })

    }
    render() {
                const {errors}=this.state
        return (
            <>
                <Navbar />
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
                                    {/*< left menu section >*/}
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <ul className="nav nav-pills flex-column mt-md-0 mt-1">
                                            <li className="nav-item">
                                                <a className="nav-link d-flex py-75 active" id="account-pill-general"
                                                   data-toggle="pill"
                                                   href="#account-vertical-general" aria-expanded="true">
                                                    <i className="feather icon-globe mr-50 font-medium-3"></i>
                                                    General
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link d-flex py-75" id="account-pill-password"
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
                                                                <a >
                                                                    <img
                                                                        id="avatarImg"
                                                                        src={`http://192.46.211.35:5000/public/avatar/${this.state.avatarname}`}

                                                                        className="rounded mr-75"
                                                                        alt="profile image" height="64" width="64" />
                                                                </a>
                                                                <div className="media-body mt-75">
                                                                    <div
                                                                        className="col-12 px-0 d-flex flex-sm-row flex-column justify-content-start">
                                                                        <label
                                                                            className="btn btn-sm btn-primary ml-50 mb-50 mb-sm-0 cursor-pointer"
                                                                            htmlFor="account-upload">Upload new
                                                                            photo</label>
                                                                        <input type="file" id="account-upload" hidden  onChange={this.onChangeHandler} />
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
                                                            <hr />
                                                                <form noValidate>
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="form-group">
                                                                                <div className="controls">
                                                                                    <label
                                                                                        htmlFor="username">Username</label>
                                                                                    <input type="text"
                                                                                           error={errors}
                                                                                           className={classnames("form-control", {
                                                                                               invalid: errors.username
                                                                                           })}
                                                                                           className="form-control"
                                                                                           id="username"
                                                                                           placeholder="Username"
                                                                                           onChange={this.onChange}
                                                                                           value={this.state.username} required
                                                                                           data-validation-required-message="This username field is required" />
                                                                                    <span
                                                                                        className="red-text">{errors.username}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <div className="form-group">
                                                                                <div className="controls">
                                                                                    <label
                                                                                        htmlFor="name">Name</label>
                                                                                    <input type="text"
                                                                                           className="form-control"
                                                                                           error={errors}
                                                                                           className={classnames("form-control", {
                                                                                               invalid: errors.name
                                                                                           })}
                                                                                           id="name"
                                                                                           placeholder="Name"
                                                                                           onChange={this.onChange}
                                                                                           value={this.state.name}
                                                                                           required
                                                                                           data-validation-required-message="This name field is required" />
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
                                                                                           className="form-control"
                                                                                           id="email"
                                                                                           placeholder="Email"
                                                                                           onChange={this.onChange}
                                                                                           value={this.state.email}
                                                                                           required
                                                                                           data-validation-required-message="This email field is required" />
                                                                                    <span
                                                                                        className="red-text">{errors.email}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <div className="form-group">
                                                                                <label
                                                                                    htmlFor="role">Role</label>
                                                                                <fieldset className="form-group">
                                                                                    <select className="form-control"
                                                                                            error={errors}
                                                                                            className={classnames("form-control", {
                                                                                                invalid: errors.role
                                                                                            })}
                                                                                            value={this.state.role}
                                                                                            onChange={this.onChange}
                                                                                            id="role">
                                                                                        <option>Moderator</option>
                                                                                        <option>Admin</option>
                                                                                        <option>Super Admin</option>
                                                                                    </select>
                                                                                </fieldset>
                                                                                <span
                                                                                    className="red-text">{errors.role}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="col-12 d-flex flex-sm-row flex-column justify-content-end">
                                                                            <button onClick={(e) => this.saveEditChange(e)}
                                                                                    className="btn btn-primary mr-sm-1 mb-1 mb-sm-0">Save
                                                                                changes
                                                                            </button>
                                                                            <button onClick={this.cancelEdit()}
                                                                                className="btn btn-outline-warning">
                                                                               Cancel
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                        </div>
                                                        <div className="tab-pane fade " id="account-vertical-password"
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
                                                                                       data-validation-required-message="This old password field is required" />
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
                                                                                       minLength="6" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <div className="controls">
                                                                                <label
                                                                                    htmlFor="checknewpassword">Retype
                                                                                    New
                                                                                    Password</label>
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
                                                                                       minLength="6" />
                                                                                <span
                                                                                    className="red-text">{this.state.errors.checkpassword}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 d-flex flex-sm-row flex-column justify-content-end">
                                                                        <button onClick={(e)=>this.changepassword(this.state._id,e)}
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
export default AdminEditInfo;