import React,{Component} from "react";
import classnames from "classnames";
import { Link ,withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {mailSender} from "../../actions/authActions";
import axios from "axios";


class UpdatePassword extends Component{
    constructor() {
        super();
        this.state={
            token:"",
            password:"",
            confirmpassword:"",
            errors:{}
        }

    }
    componentDidMount(){
        this.state.token = this.props.match.params.id;
        console.log("token parmas==>",this.state.token);
    }
    onChange = e => {
        this.state.errors={};
        if(e.target.id==="password"){
            this.setState({password:e.target.value});
            this.state.password=e.target.value;
            console.log("password",this.state.password);
        }
        if(e.target.id==="confirmpassword"){
            this.setState({confirmpassword:e.target.value});
            this.state.confirmpassword=e.target.value;
            console.log("confirmpassword",this.state.confirmpassword);
        }

    }

    onSubmit = e => {
        e.preventDefault();
        console.log("recover btn");
        if(this.state.password!=this.state.confirmpassword){
            this.setState({errors:{password:"check password",confirmpassword: "check confirmpassword"}});
        }else{
            const data={
                email:this.state.token,
                password:this.state.password,
                confirmpassword:this.state.confirmpassword
            }
            axios.post("http://192.46.211.35:5000/updatePasswordByEmail",data,{}).then(res=>{
                console.log("Update response",res.data);
                if(res.data.timeerror){
                    this.state.errors.confirmpassword=res.data.timeerror;
                }
            });
        }
    }
    render(){
        const { password,confirmpassword, errors} = this.state;
        return(
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                    </div>
                    <div className="content-body">
                        <section className="row flexbox-container">
                            <div className="col-xl-7 col-md-9 col-10 d-flex justify-content-center px-0">
                                <div className="card bg-authentication rounded-0 mb-0">
                                    <div className="row m-0">
                                        <div className="col-lg-6 d-lg-block d-none text-center align-self-center">
                                            <img src="/assets/images/pages/forgot-password.png" alt="branding logo" />
                                        </div>
                                        <div className="col-lg-6 col-12 p-0">
                                            <div className="card rounded-0 mb-0 px-2 py-1">
                                                <div className="card-header pb-1">
                                                    <div className="card-title">
                                                        <h4 className="mb-0">Recover your password</h4>
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <div className="card-body">
                                                        <form  onSubmit={this.onSubmit}>
                                                            <div className="form-group">
                                                                <input type="text"
                                                                       id="password"
                                                                       placeholder="new password"
                                                                       value={password}
                                                                       error={errors.password}
                                                                       onChange={this.onChange}
                                                                       className={classnames("form-control", {
                                                                           invalid: errors.password
                                                                       })}/>
                                                                <span className="red-text">{errors.password}</span>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="password"
                                                                       id="confirmpassword"
                                                                       placeholder="confirm password"
                                                                       value={confirmpassword}
                                                                       error={errors.confirmpassword}
                                                                       onChange={this.onChange}
                                                                       className={classnames("form-control", {
                                                                           invalid: errors.confirmpassword
                                                                       })}/>
                                                                <span className="red-text">{errors.confirmpassword}</span>
                                                            </div>
                                                            <div className="float-md-left d-block mb-1">
                                                                <Link to="/login"
                                                                      className="btn btn-outline-primary btn-block px-75">Back to
                                                                    Login</Link>
                                                            </div>
                                                            <div className="float-md-right d-block mb-1">
                                                                <button type="submit" className="btn btn-primary btn-block px-75">Recover
                                                                    Password</button>
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

                    </div>
                </div>
            </div>
        )
    }
}
UpdatePassword.propTypes = {

};

export default UpdatePassword;