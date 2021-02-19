import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";

import {GET_ERRORS, SET_CURRENT_USER} from "./types";
axios.defaults.baseURL = 'http://192.46.211.35:5000';
//Send Mail
export const mailSender = (emailData, history) => dispatch => {
    axios.post("/api/users/sendMail", emailData)
        .then(res => {
            const error = res.data.errors;
            if (error) {
                console.log("email error==>", error);
                localStorage.removeItem('mailerror');
                localStorage.setItem('mailerror', JSON.stringify(error));
                history.push("/reset-password");
                window.location.reload();
            }
        }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}


//Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
        .then(res => history.push("/login"))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//Login
export const loginUser = (userData, history) => dispatch => {
    axios.post("/api/users/login", userData)
        .then(res => {
            const {token} = res.data;
            // Set token to localStorage
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            localStorage.removeItem("nowUser")

            localStorage.setItem("nowUser", JSON.stringify(token))

            if (userData.isAdmin === false) {
                history.push("/searchCollege");
                window.location.reload();
            } else {
                //console.log("isAdmin===>",userData.isAdmin);
                history.push("/dash");
                window.location.reload();
            }
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}


// Set logged in user
export const setCurrentUser = decoded_data => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded_data
    };
};

// Logout user
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    console.log("logout act");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("currentCollege");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    window.location.href = "./login";
};
  