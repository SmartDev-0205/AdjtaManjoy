import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from 'axios';
class dashboard extends Component {
    constructor() {
        super();
        this.state={
            todaylogUser:"",
            monthlogUser:"",
            totallogUser:"",
            todayactiveUser:"",
            monthactiveUser:""
        }

    }
    componentDidMount() {
        axios.post("http://192.46.211.35:5000/getDashInfo",{},{}).then(
            res=>{
                this.state.todaylogUser=res.data.data.todayloguser.toString()
                this.state.monthlogUser=res.data.data.monthloguser.toString()
                this.state.totallogUser=res.data.data.totalloguser.toString()
                this.state.todayactiveUser=res.data.data.todayactiveuser.toString()
                this.state.monthactiveUser=res.data.data.monthactiveuser.toString()
                console.log("dashinfo===>",this.state.totallogUser)
                this.props.history.push("/dash")
            }
        )
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
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
                            {/*< Dashboard Analytics Start >*/}
                            <section id="dashboard-analytics">
                                <div className="row">

                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="card">
                                            <div className="card-header d-flex flex-column align-items-start pb-0">
                                                <div className="avatar bg-rgba-primary p-50 m-0">
                                                    <div className="avatar-content">
                                                        <i className="feather icon-users text-primary font-medium-5"></i>
                                                    </div>
                                                </div>
                                                <h3>New Users Today:</h3><h2 className="text-bold-700 mt-1 mb-25">{this.state.todaylogUser}</h2>
                                                <p className="mb-0">Subscribers Gained</p>
                                            </div>
                                            <div className="card-content">
                                                <div id="subscribe-gain-chart"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="card">
                                            <div className="card-header d-flex flex-column align-items-start pb-0">
                                                <div className="avatar bg-rgba-warning p-50 m-0">
                                                    <div className="avatar-content">
                                                        <i className="feather icon-package text-warning font-medium-5"></i>
                                                    </div>
                                                </div>
                                                <h3>New Users This Month:</h3><h2 className="text-bold-700 mt-1 mb-25">{this.state.monthlogUser}</h2>
                                                <p className="mb-0">Orders Received</p>
                                            </div>
                                            <div className="card-content">
                                                <div id="orders-received-chart"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="card">
                                            <div className="card-header d-flex flex-column align-items-start pb-0">
                                                <div className="avatar bg-rgba-primary p-50 m-0">
                                                    <div className="avatar-content">
                                                        <i className="feather icon-users text-primary font-medium-5"></i>
                                                    </div>
                                                </div>
                                                <h3>Total New Users:</h3><h2 className="text-bold-700 mt-1 mb-25">{this.state.totallogUser}</h2>
                                                <p className="mb-0">Subscribers Gained</p>
                                            </div>
                                            <div className="card-content">
                                                <div id="subscribe-gain-chart"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="card">
                                            <div className="card-header d-flex flex-column align-items-start pb-0">
                                                <div className="avatar bg-rgba-warning p-50 m-0">
                                                    <div className="avatar-content">
                                                        <i className="feather icon-package text-warning font-medium-5"></i>
                                                    </div>
                                                </div>
                                                <h3>Active Users Today:</h3><h2 className="text-bold-700 mt-1 mb-25">{this.state.todayactiveUser}</h2>
                                                <p className="mb-0">Orders Received</p>
                                            </div>
                                            <div className="card-content">
                                                <div id="orders-received-chart"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <div className="card">
                                            <div className="card-header d-flex flex-column align-items-start pb-0">
                                                <div className="avatar bg-rgba-warning p-50 m-0">
                                                    <div className="avatar-content">
                                                        <i className="feather icon-package text-warning font-medium-5"></i>
                                                    </div>
                                                </div>
                                                <h3>Active Users This Month:</h3><h2 className="text-bold-700 mt-1 mb-25">{this.state.monthactiveUser}</h2>
                                                <p className="mb-0">Orders Received</p>
                                            </div>
                                            <div className="card-content">
                                                <div id="orders-received-chart"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </section>
                            {/*< Dashboard Analytics end >*/}

                        </div>
                    </div>
                </div>

            </>

        );
    }
}
export default dashboard;