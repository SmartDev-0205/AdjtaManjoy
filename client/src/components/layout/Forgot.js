import React,{Component} from "react";
import classnames from "classnames";
import { Link ,withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {mailSender} from "../../actions/authActions";


class Forgot extends Component{
    constructor() {
        super();
        this.state={
            email:"",
            errors:{}
        }

    }
    componentDidMount(){
        const error=JSON.parse(localStorage.getItem('mailerror'));
        this.setState({errors:{email:error}});
        console.log("error email===>",this.state.errors);
    }
    onChange = e => {
        this.setState({[e.target.id]:e.target.value})
        this.setState({errors:{email:""}});
    }

    onSubmit = e => {
        e.preventDefault();

        const newMail = {
            email:this.state.email
        }

        this.props.mailSender(newMail, this.props.history);
    }
    render(){
        const { email, errors} = this.state;
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
                                            <img src="assets/images/pages/forgot-password.png" alt="branding logo" />
                                        </div>
                                        <div className="col-lg-6 col-12 p-0">
                                            <div className="card rounded-0 mb-0 px-2 py-1">
                                                <div className="card-header pb-1">
                                                    <div className="card-title">
                                                        <h4 className="mb-0">Recover your password</h4>
                                                    </div>
                                                </div>
                                                <p className="px-2 mb-0">Please enter your email address and we'll send you
                                                    instructions on how to reset your password.</p>
                                                <div className="card-content">
                                                    <div className="card-body">
                                                        <form  onSubmit={this.onSubmit}
                                                            action="https://pixinvent.com/demo/vuexy-html-bootstrap-admin-template/html/ltr/vertical-menu-template-semi-dark/index.html">
                                                            <div className="form-group">
                                                                <input type="email"
                                                                       id="email"
                                                                       placeholder="Email Address"
                                                                       value={email}
                                                                       error={errors.email}
                                                                       onChange={this.onChange}
                                                                       className={classnames("form-control", {
                                                                           invalid: errors.email
                                                                       })}/>
                                                                <span className="red-text">{errors.email}</span>
                                                            </div>
                                                            <div className="float-md-left d-block mb-1">
                                                                <Link to="/login"
                                                                      className="btn btn-outline-primary btn-block px-75">Back to
                                                                    Login</Link>
                                                            </div>
                                                            <div className="float-md-right d-block mb-1">
                                                                <button type="submit" className="btn btn-primary btn-block px-75">Send mail</button>
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
Forgot.propTypes = {
    mailSender: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps,{mailSender})(withRouter(Forgot));