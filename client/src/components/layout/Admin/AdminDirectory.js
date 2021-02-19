import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from 'axios';
class AdminDirectory extends Component {
    constructor() {
        super();
        this.state={
            Admins:[]
        }

    }
    componentDidMount() {
        axios.post("http://192.46.211.35:5000/getAdmins",  {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            this.setState({
                Admins: res.data
            });
            console.log(res.data)
        })
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    getAdminAction= e =>dispatch=>{
        console.log("edit Admin=>",e)
        const nowUser=JSON.parse(localStorage.getItem("nowUser"))
        if((nowUser.role==="Admin" &&  e.role==="Moderator") || (nowUser.id===e._id) ||((nowUser.role==="Super Admin" &&  e.role==="Moderator"))
            ||((nowUser.role==="Super Admin" &&  e.role==="Admin"))){
            const item=JSON.stringify(e)
            localStorage.removeItem("currentEditAdmin")
            localStorage.setItem("currentEditAdmin",item)
            console.log("get local storage=>",JSON.parse(localStorage.getItem("currentEditAdmin")))

            this.props.history.push("/adminEditAction");
            window.location.reload()
        }

    }
    render() {

        return (
            <>
                <Navbar />
                <div class="app-content content">
                    <div class="content-overlay"></div>
                    <div class="header-navbar-shadow"></div>
                    <div class="content-wrapper">
                        <div class="content-header row">
                            <div class="content-header-left col-md-9 col-12 mb-2">
                                <div class="row breadcrumbs-top">
                                    <div class="col-12">
                                        <h2 class="content-header-title float-left mb-0">Admin's</h2>
                                        <div class="breadcrumb-wrapper col-12">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="index.html">Home</a>
                                                </li>
                                                <li class="breadcrumb-item active">Admin's
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-body">
                            {/*< Data list view starts >*/}
                            <section id="data-list-view" class="data-list-view-header">
                                <div class="action-btns d-none">
                                    <div class="btn-dropdown mr-1 mb-1">
                                        <div class="btn-group dropdown actions-dropodown">
                                            <button type="button" class="btn btn-white px-1 py-1 dropdown-toggle waves-effect waves-light"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Print
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#"><i class="feather icon-file"></i>PDF</a>
                                                <a class="dropdown-item" href="#"><i class="feather icon-save"></i>Excel</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*< DataTable starts>*/}
                                <div class="table-responsive">
                                    <table class="table data-list-view">
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>NAME</th>
                                            <th>USERNAME</th>
                                            <th>ROLE</th>
                                            <th>STATUS</th>
                                            <th>Last Login</th>
                                            <th>ACTION</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.Admins.map((item)=>(
                                                <tr>
                                                    <td className="dt-checkboxes-cell" >
                                                        <input type="checkbox" id="select" className="dt-checkboxes"   />
                                                    </td>
                                                    <td className="product-name">{item.name}</td>
                                                    <td className="product-category">{item.username}</td>
                                                    <td className="product-category">{item.role}</td>
                                                    <td>
                                                        <div className="chip chip-danger">
                                                            <div className="chip-body">
                                                                <div className="chip-text">{item.status}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="product-price">12:00PM<br/>07/11/2020</td>
                                                    <td className="product-action" onClick={this.getAdminAction(item)}>
                                                        <a  ><i
                                                            className="feather icon-layers"></i>
                                                            <span> Details</span></a>
                                                    </td>
                                                </tr>
                                            ))
                                        }




                                        </tbody>
                                    </table>
                                </div>
                                {/*< DataTable ends >*/}
                            </section>
                            {/*< Data list view end >*/}

                        </div>
                    </div>
                </div>

            </>

        );
    }
}
export default AdminDirectory;