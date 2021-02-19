import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from 'axios';
class UserAction extends Component {
    constructor() {
        super();
        this.state={
            Users:[],
            Colleges:[],
            loginfos:[]
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
        axios.post("http://192.46.211.35:5000/getColleges",  {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            this.setState({
                Colleges: res.data
            });
            console.log(res.data)
        })
        axios.post("http://192.46.211.35:5000/getloginfos",  {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            this.setState({
                loginfos: res.data
            });
            console.log(res.data)
        })
        console.log("nowUser=>",JSON.parse(localStorage.getItem("nowUser")))

    }
    componentWillReceiveProps(nextProps) {


        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    getEditProfile= e =>dispatch=>{
        //this.props.getCollegeInfo("",this.props.history);
        localStorage.removeItem('currentUser')
        localStorage.setItem('currentUser',JSON.stringify(e))
        this.props.history.push("/editProfile");
        window.location.reload()
    }
    setUnlock=e =>dispatch=>{
        const data={
           _id:e._id
        }

        const unlockbtn=document.getElementById(e._id+"unlockBtn")
        unlockbtn.disabled=true
        console.log("Unlock id==>",data,unlockbtn);
         axios.post("http://192.46.211.35:5000/setUnlock",data,{
        }).then(res=>{

         })
        const lockbtn=document.getElementById(e._id+"lockBtn")
        lockbtn.disabled=false

    }
    setlock=e=>dispatch=>{
        const data={
            _id:e._id
        }

        const lockbtn=document.getElementById(e._id+"lockBtn")

        lockbtn.disabled=true
         console.log("lock id==>",data,lockbtn);
        axios.post("http://192.46.211.35:5000/setlock",data,{
        }).then(res=> {

            })
        const unlockbtn=document.getElementById(e._id+"unlockBtn")
        unlockbtn.disabled=false
    }
    initializeUnlockBtn=(item)=>dispatch=>{
        console.log("act unlock")

        if(item.status==="Active"){
            console.log("unlock btn==>")
        }else{
            console.log("unlock btn==>")
        }

    }
    initializeLockBtn=(item)=>dispatch=>{
        console.log("act lock")
        if(item.status==="Active"){
            console.log("lock btn==>")
        }else{
            console.log("lock btn==>")
        }
    }
    deleteCollege=e=>dispatch=>{
        console.log("deleteID==>",e)
        const data={
            id:e
        }
        axios.post("http://192.46.211.35:5000/deleteCollege",data,{

        }).then(res=>{
                console.log("result==>",res)
                window.location.reload()

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
                        <div className="content-body" >
                            {
                                this.state.Users.map(( item,index) => (

                                <section className="page-users-view" >
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
                                                             src={`http://192.46.211.35:5000/public/avatar/${item.avatar}`}
                                                             className="users-avatar-shadow w-100 rounded mb-2 pr-2 ml-1"
                                                             alt="avatar" />
                                                    </div>
                                                    <div className="col-12 col-sm-9 col-md-6 col-lg-5">
                                                        <table>
                                                            <tr>
                                                                <td className="font-weight-bold">Name</td>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Email</td>
                                                                <td>{item.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Phone No.</td>
                                                                <td>{item.phonenumber}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div className="col-12 col-md-12 col-lg-5">
                                                        <table className="ml-0 ml-sm-0 ml-lg-0">
                                                            <tr>
                                                                <td className="font-weight-bold">Status</td>
                                                                <td>{item.status}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">ID</td>
                                                                <td>{index+1}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Last Login</td>
                                                                <td>11/07/2020 12:00PM</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="font-weight-bold">Saved Colleges</td>
                                                                <td>15</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div className="col-12">
                                                        <a onClick={this.getEditProfile(item)} className="btn btn-primary mr-1"><i
                                                            className="feather icon-edit-1"></i>
                                                            Edit</a>
                                                        <button className="btn btn-info mr-1"><i
                                                            className="feather icon-eye-off"></i> Reset Password
                                                        </button>
                                                        <button className="btn btn-warning mr-1"  onLoad={(e)=>this.initializeUnlockBtn(item)}   id={item._id+"unlockBtn"} type="button"  onClick={this.setUnlock(item)} ><i
                                                            className="feather icon-pause" ></i> Unlock
                                                        </button>
                                                        <button className="btn btn-danger" onLoad={(e)=>this.initializeLockBtn(item)} id={item._id+"lockBtn"} type="button"  onClick={this.setlock(item)} ><i
                                                            className="feather icon-trash-2"></i> Lock
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*< account end >*/}
                                </div>
                            </section>
                             ))
                            }
                            {/*< page users view end >*/}

                            {/*< Nav Justified Starts >*/}
                            <section id="nav-justified">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card overflow-hidden">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <ul className="nav nav-tabs nav-justified" id="myTab2"
                                                        role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" id="home-tab-justified"
                                                               data-toggle="tab" href="#home-just"
                                                               role="tab" aria-controls="home-just"
                                                               aria-selected="true">Saved Colleges</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" id="profile-tab-justified"
                                                               data-toggle="tab" href="#profile-just" role="tab"
                                                               aria-controls="profile-just" aria-selected="true">Login
                                                                Info</a>
                                                        </li>
                                                    </ul>

                                                    {/*< Tab panes >*/}
                                                    <div className="tab-content pt-1">
                                                        <div className="tab-pane active" id="home-just" role="tabpanel"
                                                             aria-labelledby="home-tab-justified">
                                                            {/*< BEGIN: Content>*/}
                                                            <div className="content-body">
                                                                {/*< Data list view starts >*/}
                                                                <section id="data-list-view"
                                                                         className="data-list-view-header">
                                                                    {/*< DataTable starts>*/}
                                                                    <div className="table-responsive">
                                                                        <table className="table data-list-view">
                                                                            <thead>
                                                                            <tr>
                                                                                <th></th>
                                                                                <th>COLLEGE NAME</th>
                                                                                <th>LOCATION</th>
                                                                                <th>DATE</th>
                                                                                <th>TIME</th>
                                                                                <th>ACTION</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            { this.state.Colleges.map(( item) => (
                                                                                <tr>
                                                                                    <td className="dt-checkboxes-cell" >
                                                                                        <input type="checkbox" id="select" className="dt-checkboxes"   />
                                                                                    </td>
                                                                                    <td className="product-name">{item.name}
                                                                                    </td>
                                                                                    <td className="product-category">{item.address.state+","+item.address.country}
                                                                                    </td>
                                                                                    <td className="product-category">10/12/2020</td>
                                                                                    <td className="product-category">12:00PM</td>
                                                                                    <td className="product-action" onClick={this.deleteCollege(item._id)}>
                                                                                    <span className="action-delete"><i
                                                                                        className="feather icon-trash"></i> Remove</span>
                                                                                    </td>
                                                                                </tr>
                                                                                ))
                                                                            }

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    {/*< DataTable ends >*/}
                                                                </section>
                                                                {/*< Data list view end>*/}

                                                            </div>
                                                            {/*< END: Content>*/}
                                                        </div>
                                                        <div className="tab-pane" id="profile-just" role="tabpanel"
                                                             aria-labelledby="profile-tab-justified">
                                                            {/*< BEGIN: Content>*/}
                                                            <div className="content-body">
                                                                {/*< Data list view starts >*/}
                                                                <section id="data-list-view"
                                                                         className="data-list-view-header">
                                                                    {/*< DataTable starts >*/}
                                                                    <div className="table-responsive">
                                                                        <table className="table data-list-view">
                                                                            <thead>
                                                                            <tr>
                                                                                <th></th>
                                                                                <th>IP ADDRESS</th>
                                                                                <th>DATE</th>
                                                                                <th>TIME</th>

                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {
                                                                                this.state.loginfos.map((item)=>(
                                                                                    <tr>
                                                                                        <td className="dt-checkboxes-cell" >
                                                                                            <input type="checkbox" id="select" className="dt-checkboxes"   />
                                                                                        </td>
                                                                                        <td className="product-name">{item.ipaddress}</td>
                                                                                        <td className="product-category">{new Date(item.date).toLocaleDateString()}</td>
                                                                                        <td className="product-category">{new Date(item.date).toLocaleTimeString()}</td>

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
                                                            {/*< END: Content>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*< Nav Justified Ends >*/}
                        </div>
                    </div>
                </div>


            </>

        );
    }
}
export default UserAction;