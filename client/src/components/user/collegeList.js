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

class collegeList extends Component {
    constructor() {
        super();
        this.state = {
            colleges: [],
            college_id: ""
        }
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem('EvaluateColleges'))
        this.setState({
            colleges: data
        });

    };

    componentWillReceiveProps(nextProps) {
    };

    onChange = e => {

        this.setState({[e.target.id]: e.target.checked})


    };

    onSubmit = e => {
        e.preventDefault();

    };
    getStatus = e => {
        if (e === true)
            return "Active";
        else
            return "Hold"
    };
    getCollegeID = e => {
        //e.preventDefault();
        console.log("e==>", e.name);
        let newData = {
            name: e.name
        };
        this.props.getCollegeInfo(newData, this.props.history);
    };

    userGetCollege = (item) => {
        localStorage.removeItem("currentCollege")
        localStorage.setItem("currentCollege", JSON.stringify(item))
        this.props.history.push("./usergetCollege")
        window.location.reload()
    };

    render() {
        const {college_id} = this.state;
        const imgstyle = {
            width: "50%",
            height: "30%"
        };
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
                                        <h2 className="content-header-title float-left mb-0">Colleges</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">Home</a>
                                                </li>
                                                <li className="breadcrumb-item" style={{color: 'black'}}>Colleges
                                                </li>
                                                <li className="breadcrumb-item active">Colleges List
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="content-body">
                            {/*< Data list view starts >*/}
                            <section id="data-list-view" className="data-list-view-header">
                                <div className="action-btns d-none">
                                    <div className="btn-dropdown mr-1 mb-1">
                                        <div className="btn-group dropdown actions-dropodown">
                                            <button type="button"
                                                    className="btn btn-white px-1 py-1 dropdown-toggle waves-effect waves-light"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Print
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#"><i
                                                    className="feather icon-file"></i>PDF</a>
                                                <a className="dropdown-item" href="#"><i
                                                    className="feather icon-save"></i>Excel</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*< DataTable starts >*/}
                                <div className="table-responsive">
                                    <table className="table data-thumb-view ng-cloak">
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>LOGO</th>
                                            <th>COLLEGE NAME</th>
                                            <th>Location</th>
                                            <th>STATUS</th>
                                            <th>RATING</th>
                                            <th>ACTION</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            this.state.colleges.map((item) => (
                                                <tr role="row" className="odd " key={item._id}>
                                                    <td className="dt-checkboxes-cell">
                                                        <input type="checkbox" id="select" className="dt-checkboxes"
                                                               onChange={this.onChange}/>
                                                    </td>
                                                    <td className="product-img">
                                                        <img className=" "
                                                             src={`http://192.46.211.35:5000/public/${item.logo}`}
                                                             alt="Img placeholder" style={imgstyle}/>
                                                    </td>
                                                    <td className="product-name">{item.name}</td>
                                                    <td className="product-category">{item.address.city + "," + item.address.country}</td>
                                                    <td>
                                                        <div className="chip chip-warning">
                                                            <div className="chip-body">
                                                                <div className="chip-text"
                                                                     style={{color: 'black'}}>{this.getStatus(item.status)}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="product-price">{item.overallRating}<i
                                                        className="feather icon-star ml-25"></i></td>
                                                    <td className="product-action"
                                                        onClick={() => this.userGetCollege(item)}>
                                                        <a><i className="feather icon-layers"></i>
                                                            Details</a>
                                                    </td>
                                                </tr>
                                            ))

                                        }


                                        </tbody>
                                    </table>
                                </div>
                                {/*< DataTable ends>*/}
                            </section>
                            {/*< Data list view end >*/}

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

collegeList.propTypes = {
    getCollegeInfo: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {getCollegeInfo})(withRouter(collegeList));