import React,{Component} from "react";
import {Link} from "react-router-dom";
//import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
//import { setCurrentUser, logoutUser } from "../../actions/authActions";
import {AddCollege} from "./College/AddCollege"
import PropTypes from "prop-types";
import axios from "axios";
import { logoutUser } from "../../actions/authActions";
import {connect} from "react-redux";
class Navbar extends Component{
   constructor() {
       super();
       this.state={
           currentUser:{}
       }
       this.state.currentUser=JSON.parse(localStorage.getItem("nowUser"))
       console.log("nowUser=>",this.state.currentUser)
   }
   componentDidMount(){


    }
    onLogout = e => {

        this.props.logoutUser();
    };
    getEditProfile=e=>{
        localStorage.removeItem('currentEditAdmin')
        const editingAdmin={}
        editingAdmin.name = this.state.currentUser.name
        editingAdmin.email = this.state.currentUser.email
        editingAdmin.username = this.state.currentUser.username
        editingAdmin.role = this.state.currentUser.role
        editingAdmin.avatar = this.state.currentUser.avatar
        editingAdmin.status = this.state.currentUser.status
        console.log("editingAdmin==>",editingAdmin)

        localStorage.setItem('currentEditAdmin', JSON.stringify(editingAdmin))
        window.location.href="./adminEditInfo"
    }
    getAdminpage= e =>{
        console.log("let's go admin directory")
        window.location.href="./adminDirectory"
    }
    render(){

            return(
                <>
                    <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow">
                        <div className="navbar-wrapper">
                            <div className="navbar-container content">
                                <div className="navbar-collapse float-right" id="navbar-mobile">
                                    <ul className="nav navbar-nav float-right">
                                        <li className="dropdown dropdown-notification nav-item"><a
                                            className="nav-link nav-link-label" href="#"
                                            data-toggle="dropdown"><i className="ficon feather icon-bell"></i><span
                                            className="badge badge-pill badge-primary badge-up">5</span></a>
                                            <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                                <li className="dropdown-menu-header">
                                                    <div className="dropdown-header m-0 p-2">
                                                        <h3 className="white">5 New</h3><span
                                                        className="notification-title">App Notifications</span>
                                                    </div>
                                                </li>
                                                <li className="scrollable-container media-list"><a
                                                    className="d-flex justify-content-between"
                                                    >
                                                    <div className="media d-flex align-items-start">
                                                        <div className="media-left"><i
                                                            className="feather icon-plus-square font-medium-5 primary"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="primary media-heading">You have new order!</h6>
                                                            <small className="notification-text"> Are
                                                                your going to meet me tonight?</small>
                                                        </div>
                                                        <small>
                                                            <time className="media-meta"
                                                                  dateTime="2015-06-11T18:29:20+08:00">9 hours ago
                                                            </time>
                                                        </small>
                                                    </div>
                                                </a><a className="d-flex justify-content-between" >
                                                    <div className="media d-flex align-items-start">
                                                        <div className="media-left"><i
                                                            className="feather icon-download-cloud font-medium-5 success"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="success media-heading red darken-1">99% Server
                                                                load</h6><small
                                                            className="notification-text">You got new order of
                                                            goods.</small>
                                                        </div>
                                                        <small>
                                                            <time className="media-meta"
                                                                  dateTime="2015-06-11T18:29:20+08:00">5 hour ago
                                                            </time>
                                                        </small>
                                                    </div>
                                                </a><a className="d-flex justify-content-between">
                                                    <div className="media d-flex align-items-start">
                                                        <div className="media-left"><i
                                                            className="feather icon-alert-triangle font-medium-5 danger"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="danger media-heading yellow darken-3">Warning
                                                                notifixation</h6><small
                                                            className="notification-text">Server have 99% CPU usage.</small>
                                                        </div>
                                                        <small>
                                                            <time className="media-meta"
                                                                  dateTime="2015-06-11T18:29:20+08:00">Today
                                                            </time>
                                                        </small>
                                                    </div>
                                                </a><a className="d-flex justify-content-between" >
                                                    <div className="media d-flex align-items-start">
                                                        <div className="media-left"><i
                                                            className="feather icon-check-circle font-medium-5 info"></i>
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="info media-heading">Complete the task</h6><small
                                                            className="notification-text">Cake
                                                            sesame snaps cupcake</small>
                                                        </div>
                                                        <small>
                                                            <time className="media-meta"
                                                                  dateTime="2015-06-11T18:29:20+08:00">Last week
                                                            </time>
                                                        </small>
                                                    </div>
                                                </a><a className="d-flex justify-content-between" >
                                                    <div className="media d-flex align-items-start">
                                                        <div className="media-left"><i
                                                            className="feather icon-file font-medium-5 warning"></i></div>
                                                        <div className="media-body">
                                                            <h6 className="warning media-heading">Generate monthly
                                                                report</h6><small
                                                            className="notification-text">Chocolate cake oat cake tiramisu
                                                            marzipan</small>
                                                        </div>
                                                        <small>
                                                            <time className="media-meta"
                                                                  dateTime="2015-06-11T18:29:20+08:00">Last month
                                                            </time>
                                                        </small>
                                                    </div>
                                                </a></li>
                                                <li className="dropdown-menu-footer"><a
                                                    className="dropdown-item p-1 text-center" >Read
                                                    all notifications</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown dropdown-user nav-item">

                                                    <Link to="/nav"
                                                        className="dropdown-toggle nav-link dropdown-user-link"
                                                        data-toggle="dropdown" >

                                                        <div className="user-nav d-sm-flex d-none"><span
                                                            className="user-name text-bold-600">{this.state.currentUser.name}</span><span
                                                            className="user-status">Available</span></div>
                                                        <span><img className="round"
                                                                   src={`http://192.46.211.35:5000/public/avatar/${this.state.currentUser.avatar}`} alt="avatar"
                                                                   height="40" width="40" /></span>
                                                    </Link>


                                                        <div className="dropdown-menu dropdown-menu-right">
                                                          <a
                                                                className="dropdown-item" onClick={this.getEditProfile}><i
                                                                className="feather icon-user"></i> Edit Profile</a>
                                                            <div className="dropdown-divider"></div>
                                                             <a className="dropdown-item" onClick={this.onLogout}><i
                                                                className="feather icon-power"></i> Logout</a>

                                                        </div>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
                        <div className="navbar-header">
                            <ul className="nav navbar-nav flex-row">
                                <li className="nav-item mr-auto"><a className="navbar-brand" href="index.html">
                                    <div className="brand-logo"></div>
                                    <h2 className="brand-text mb-0">Find My Campus</h2>
                                </a></li>
                            </ul>
                        </div>
                        <div className="shadow-bottom"></div>
                        <div className="main-menu-content">
                            <ul className="navigation navigation-main" id="main-menu-navigation"
                                data-menu="menu-navigation">
                                <li className="nav-item"><Link to="/dash" ><i className="feather icon-home"></i><span
                                    className="menu-title"
                                    data-i18n="Dashboard">Dashboard</span></Link>
                                </li>
                                <li className="nav-item"><a href="#"><i className="feather icon-book"></i><span
                                    className="menu-title"
                                    data-i18n="College">College</span></a>
                                    <ul className="menu-content">

                                        <li><Link to="/college_directory"><i className="feather icon-circle"></i><span
                                            className="menu-item"
                                            data-i18n="Directory">Directory</span></Link>
                                        </li>
                                        <li><Link to="/AddCollege"><i className="feather icon-circle"></i><span
                                            className="menu-item"
                                            data-i18n="Add College">Add College</span></Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item"><a href="#"><i className="feather icon-users"></i><span
                                    className="menu-title"
                                    data-i18n="User">Users</span></a>
                                    <ul className="menu-content">
                                        <li><a href="user-status.html"><i className="feather icon-circle"></i><span
                                            className="menu-item"
                                            data-i18n="User Status">User Status</span></a>
                                        </li>
                                        <li><Link to="/userDirectory"><i className="feather icon-circle"></i><span
                                            className="menu-item"
                                            data-i18n="Directory">Directory</span></Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item"><a href="#"><i className="feather icon-copy"></i><span
                                    className="menu-title"
                                    data-i18n="Degree Specialization">Degree Specialization</span></a>
                                    <ul className="menu-content">

                                        <li><Link to="/addDegree"><i className="feather icon-circle"></i><span
                                            className="menu-item"
                                            data-i18n="Add Specialization">Add Specialization</span></Link>
                                        </li>
                                    </ul>
                                </li>
                                { this.state.currentUser.role==="Moderator" ?
                                    <></>:
                                    <>
                                    <li className="nav-item active">
                                        <Link onClick={(e)=>this.getAdminpage(e)} to="/adminDirectory" >
                                        <i className="feather icon-lock"></i>
                                        <span  className="menu-title" data-i18n="Admin">Admin</span>
                                        </Link>
                                    </li>
                                    </>
                                    }
                            </ul>
                        </div>
                    </div>
                </>
            )
       

    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);
