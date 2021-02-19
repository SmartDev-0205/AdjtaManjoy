import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from 'axios';
class UserDirectory extends Component {
    constructor() {
        super();
        this.state={
            Users:[]
        }

    }
    componentDidMount() {
        axios.post("http://192.46.211.35:5000/getUsers",  {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            this.setState({
                Users: res.data
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
    getUserAction= e =>dispatch=>{
        //this.props.getCollegeInfo("",this.props.history);
        this.props.history.push("/getUserAction");
        window.location.reload()
    }
    render() {

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
                                        <h2 className="content-header-title float-left mb-0">User Directory</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">Home</a>
                                                </li>
                                                <li className="breadcrumb-item">Users
                                                </li>
                                                <li className="breadcrumb-item active">Directory
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
                            </div>
                        </div>
                        <div className="content-body">
                            {/*< Data list view starts >*/}
                            <section id="data-list-view" className="data-list-view-header">
                                <div className="action-btns d-none">
                                    <div className="btn-dropdown mr-1 mb-1">
                                        <div className="btn-group dropdown actions-dropodown">
                                            <button type="button" className="btn btn-white px-1 py-1 dropdown-toggle waves-effect waves-light"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Print
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#"><i className="feather icon-file"></i>PDF</a>
                                                <a className="dropdown-item" href="#"><i className="feather icon-save"></i>Excel</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*< DataTable starts >*/}
                                <div className="table-responsive">
                                    <table className="table data-list-view">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>NAME</th>
                                                <th>Email Id</th>
                                                <th>STATUS</th>
                                                <th>Last Login</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.Users.map(( item) => (
                                            <tr>
                                                <td className="dt-checkboxes-cell" >
                                                    <input type="checkbox" id="select" className="dt-checkboxes"   />
                                                </td>
                                                <td className="product-name">{item.name}</td>
                                                <td className="product-category">{item.email}</td>
                                                <td>
                                                    <div className="chip chip-warning">
                                                        <div className="chip-body">
                                                            <div className="chip-text" style={{color:'white'}}>{item.status}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="product-price">12:00PM<br/>07/11/2020</td>
                                                <td className="product-action" onClick={this.getUserAction(item)}>
                                                    <a ><i className="feather icon-layers"></i>
                                                        <span>Details</span></a>
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
export default UserDirectory;