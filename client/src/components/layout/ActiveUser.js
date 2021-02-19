import React,{Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { logoutUser } from "../../actions/authActions";
import {connect} from "react-redux";
import classnames from "classnames";
class ActiveUser extends Component {
    constructor() {
        super();
        this.state = {
            token: ""

        }

    }

    componentDidMount() {
        this.state.token = this.props.match.params.id;
        console.log("token parmas==>",this.state.token);
    }

    componentWillReceiveProps(nextProps) {

    }

    setActive = e => {
        e.preventDefault();
        const data={
            email:this.state.token
        }
        axios.post("http://192.46.211.35:5000/activeUserByEmail",data,{}).then(res=>{
            console.log("Update response",res.data);
            if(res.data){
                this.props.history.push("/login");
            }
        });


    }
    cancelActive = e => {
        this.props.history.push("/login");
    }

    render() {

        return (
            <div>
                <div className="modal" style={{display: "block"}} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Active Modal</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p style={{color: "black"}}>Check if you active your status</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.setActive}>Activate
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        onClick={this.cancelActive}>Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ActiveUser.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(ActiveUser);