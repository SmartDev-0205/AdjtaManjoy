import React,{Component} from "react";
import Navbar from "../Navbar";
import axios from 'axios';
class AddDegreeSpecialization extends Component{
    constructor() {
        super();
        this.state={
            type:"",
            degreetext:""
        }
    }
    onChange = e => {
        e.preventDefault()
        this.setState({[e.target.id]:e.target.value})
        if(e.target.id==="type"){
            this.state.type=e.target.value
            console.log("changed value:", this.state.type)
        }else{
            this.state.degreetext=e.target.value
            console.log("changing value=>",this.state.degreetext)
        }


    }

    addDegree = e => {
        const data={
            type:this.state.type,
            text:this.state.degreetext
        }
       axios.post("http://192.46.211.35:5000/addDegree",data,{}).then(res=>{
           console.log("return data=>",res.data);
       })

    }
    render(){
        // const { email, errors} = this.state;
        return(
            <div >
                <Navbar/>
                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="header-navbar-shadow"></div>
                    <div className="content-wrapper">
                        <div className="content-header row">
                            <div className="content-header-left col-md-9 col-12 mb-2">
                                <div className="row breadcrumbs-top">
                                    <div className="col-12">
                                        <h2 className="content-header-title float-left mb-0">Add Degree</h2>
                                        <div className="breadcrumb-wrapper col-12">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html">Home</a>
                                                </li>
                                                <li className="breadcrumb-item">Degree
                                                </li>
                                                <li className="breadcrumb-item active">Add
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-body">
                            {/*< Form wizard with number tabs section start>*/}
                            <section id="number-tabs">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <form action="#" className="wizard-circle">

                                                        <fieldset>

                                                            <h4 className="card-title mt-2 mb-2">Add
                                                                Degree/Specialization</h4>

                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="type">Type</label>
                                                                        <select className="custom-select form-control"
                                                                                selected={this.state.type}
                                                                                onChange={this.onChange}
                                                                                id="type" name="location">
                                                                            <option value="Degree">Degree</option>
                                                                            <option value="Specialization">Specialization
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="degreetext">Enter
                                                                            Value</label>
                                                                        <input type="text"
                                                                               value={this.state.degreetext}
                                                                               onChange={this.onChange}
                                                                               className="form-control required"
                                                                               id="degreetext" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-12 mt-2 mb-2">
                                                                <a onClick={this.addDegree}
                                                                   className="btn btn-primary mr-1 waves-effect waves-light float-right"><i
                                                                    className="feather icon-edit-1"></i> Save</a>
                                                            </div>
                                                        </fieldset>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*< Form wizard with number tabs section end>*/}

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default AddDegreeSpecialization;