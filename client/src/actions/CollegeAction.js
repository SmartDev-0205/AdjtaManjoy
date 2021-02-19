import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
axios.defaults.baseURL = 'http://192.46.211.35:5000';
//Send Mail
export const collegeSender=(collegedata,history) =>dispatch=> {
    axios.post("/api/colleges/Addcollege", collegedata)
        .then(res=> {
           history.push("/college_directory")
           window.location.reload();
        })
        // .catch(err=>dispatch({
        //     type:GET_ERRORS,
        //     payload:err.response.data
        // }))
}
export const getCollegeInfo=(infodata,history) =>dispatch=> {
    axios.post("/api/colleges/getCollegeInfo", infodata)
        .then(res=> {
            console.log("currentCollege==>",res.data);
            localStorage.removeItem('currentCollege')
            localStorage.setItem('currentCollege',JSON.stringify(res.data))
            history.push("/editCollege")
            window.location.reload();

        })
        // .catch(err=>dispatch({
        //     type:GET_ERRORS,
        //     payload:err.response.data
        // }))
}