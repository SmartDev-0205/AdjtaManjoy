import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from 'axios';
class AdminEditAction extends Component {
    constructor() {
        super();
        this.state={
            editingAdmin:{},
            errors:{}
        }

       this.state.editingAdmin=JSON.parse(localStorage.getItem("currentEditAdmin"))
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
    setHold= e =>dispatch=>{
        console.log("Hold==>",e)
        const data={
            id:e
        }
        axios.post("http://192.46.211.35:5000/setHoldStatus",data,{

        })
    }
    setRemove=e =>dispatch=>{
        console.log("Remove==>",e)
        const data={
            id:e
        }
        axios.post("http://192.46.211.35:5000/setRemoveStatus",data,{

        })
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
                        </div>
                        <div className="content-body">
                            {/*< page users view start >*/}
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
                                                        <img src={`http://192.46.211.35:5000/public/avatar/${this.state.editingAdmin.avatar}`}
                                                             className="users-avatar-shadow w-100 rounded mb-2 pr-2 ml-1"
                                                             alt="avatar" />
                                                    </div>


                                                            {/*{*/}
                                                            {/*    this.state.editingAdmin.map((item,index)=>(*/}
                                                            {/*        <>*/}
                                                                        <div className="col-12 col-sm-9 col-md-6 col-lg-5">
                                                                            <table>
                                                                                <tr>
                                                                                    <td className="font-weight-bold">Username</td>
                                                                                    <td>{this.state.editingAdmin.username}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="font-weight-bold">Name</td>
                                                                                    <td>{this.state.editingAdmin.name}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="font-weight-bold">Email</td>
                                                                                    <td>{this.state.editingAdmin.email}</td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                        <div className="col-12 col-md-12 col-lg-5">
                                                                            <table className="ml-0 ml-sm-0 ml-lg-0">
                                                                                <tr>
                                                                                    <td className="font-weight-bold">Status</td>
                                                                                    <td>{this.state.editingAdmin.status}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="font-weight-bold">Role</td>
                                                                                    <td>{this.state.editingAdmin.role}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="font-weight-bold">ID</td>
                                                                                    <td>{this.state.editingAdmin._id}</td>
                                                                                </tr>
                                                                             </table>
                                                                            </div>
                                                                    <div className="col-12">
                                                                        <Link to="/adminEditInfo" className="btn btn-primary mr-1"><i
                                                                            className="feather icon-edit-1"></i> Edit</Link>
                                                                         <button className="btn btn-warning mr-1" onClick={this.setHold(this.state.editingAdmin._id)}><i
                                                                            className="feather icon-pause"></i> Hold
                                                                            </button>
                                                                        <button className="btn btn-danger" onClick={this.setRemove(this.state.editingAdmin._id)}><i
                                                                        className="feather icon-trash-2"></i> Remove
                                                                        </button>
                                                                    </div>
                                                            {/*        </>*/}
                                                            {/*    ))*/}
                                                            {/*}*/}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*< account end >*/}
                                    {/*< information start >*/}

                                </div>
                            </section>
                            {/*< page users view end >*/}

                        </div>
                    </div>
                </div>

            </>

        );
    }
}
export default AdminEditAction;