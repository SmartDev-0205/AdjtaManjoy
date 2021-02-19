import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component{
    constructor(){
        super()
        this.state = {
            username:"",
            password:"",
            isAdmin:false,
            errors:{}
        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dash");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dash");
        }

    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    onChange = e => {
        if (e.target.id==="isAdmin")
            this.setState({[e.target.id]:e.target.checked})
        else
            this.setState({[e.target.id]:e.target.value})
        //console.log("check====>", e.target)
    }

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            username:this.state.username,
            password:this.state.password,
            isAdmin:this.state.isAdmin
        }
        this.props.loginUser(userData,this.props.history);
    }
    render(){
        const {username, password,isAdmin,errors} = this.state;
        return(
        //     <div className="form-box">
        //     <form className="login-form" onSubmit={this.onSubmit}>
        //         <h2>Login</h2>
        //         <hr/>
        //         <div className="form-group">
        //             <input type="text"
        //                    id="username"
        //                    placeholder="Username"
        //                    value={username}
        //                    error={errors}
        //                    onChange={this.onChange}
        //                    className={classnames("form-control", {
        //                     invalid: errors.username || errors.usernotfound
        //                   })}/>
        //                   <span className="red-text">
        //                     {errors.username}
        //                     {errors.usernotfound}
        //                 </span>
        //         </div>
        //         <div className="form-group">
        //             <input type="password"
        //                    id="password"
        //                    placeholder="Password"
        //                    value={password}
        //                    error={errors}
        //                    onChange={this.onChange}
        //                    className={classnames("form-control", {
        //                     invalid: errors.password || errors.passwordincorrect })}
        //                     />
        //             <span className="red-text">
        //                 {errors.password}
        //                 {errors.passwordincorrect}
        //             </span>
        //         </div>
        //         <div className="form-group">
        //             <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>
        //         </div>
        //         <div className="text-center">Don't have an account? <Link to="/register">Register</Link></div>
        //
        //
        //     </form>
        // </div>
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                    </div>
                    <div className="content-body">
                        <section className="row flexbox-container">
                            <div className="col-xl-8 col-11 d-flex justify-content-center">
                                <div className="card bg-authentication rounded-0 mb-0">
                                    <div className="row m-0">
                                        <div
                                            className="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0">
                                            <img src="assets/images/pages/login.png" alt="branding logo" />
                                        </div>
                                        <div className="col-lg-6 col-12 p-0">
                                            <div className="card rounded-0 mb-0 px-2">
                                                <div className="card-header pb-1">
                                                    <div className="card-title">
                                                        <h4 className="mb-0">Login</h4>
                                                    </div>
                                                </div>
                                                <p className="px-2">Welcome back, please login to your account.</p>
                                                <div className="card-content login-footer">
                                                    <div className="card-body pt-1">
                                                        <form className="login-form" onSubmit={this.onSubmit}>
                                                            <div className="form-group">
                                                                <input type="text"
                                                                       id="username"
                                                                       placeholder="Username"
                                                                       value={username}
                                                                       error={errors}
                                                                       onChange={this.onChange}
                                                                       className={classnames("form-control", {
                                                                           invalid: errors.username || errors.usernotfound
                                                                       })}/>
                                                                <span className="red-text">
                                                                     {errors.username}
                                                                     {errors.usernotfound}
                                                                </span>
                                                            </div>

                                                            <div className="form-group">
                                                                <input type="password"
                                                                       id="password"
                                                                       placeholder="Password"
                                                                       value={password}
                                                                       error={errors}
                                                                       onChange={this.onChange}
                                                                       className={classnames("form-control", {
                                                                           invalid: errors.password || errors.passwordincorrect })}
                                                                />
                                                                <span className="red-text">
                                                                    {errors.password}
                                                                    {errors.passwordincorrect}
                                                                </span>
                                                            </div>
                                                            <div
                                                                className="form-group d-flex justify-content-between align-items-center">
                                                                <div className="text-left" style={{color:'#7367F0'}}>
                                                                    <fieldset className="checkbox">
                                                                        <div
                                                                            className="vs-checkbox-con vs-checkbox-primary">
                                                                            <input type="checkbox" />
                                                                            <span className="vs-checkbox">
                                                                                <span className="vs-checkbox--check">
                                                                                    <i className="vs-icon feather icon-check"></i>

                                                                                </span>
                                                                            </span>
                                                                            <span>Remember Me</span>

                                                                        </div>
                                                                    </fieldset>
                                                                </div>
                                                                <div className="text-right">
                                                                    <Link to="/reset-password" className="card-link">Forgot Password?</Link>
                                                                </div>
                                                             </div>
                                                            <div  className="form-group d-flex justify-content-between align-items-center">
                                                                <div className="text-left" style={{color:'black'}}>
                                                                    <fieldset className="checkbox">
                                                                        <div
                                                                            className="vs-checkbox-con vs-checkbox-primary">
                                                                            <input type="checkbox" id="isAdmin" value={isAdmin}  onChange={this.onChange} />
                                                                            <span className="vs-checkbox">
                                                                                <span className="vs-checkbox--check">
                                                                                    <i className="vs-icon feather icon-check"></i>

                                                                                </span>
                                                                            </span>
                                                                            <span>Admin</span>

                                                                        </div>
                                                                    </fieldset>
                                                                </div>
                                                            </div>
                                                            <div className="form-group d-flex justify-content-between align-items-center">

                                                                    <Link to="/register">Register</Link>

                                                                <button type="submit"
                                                                        className="btn btn-primary float-right btn-inline">Login
                                                                </button>
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);