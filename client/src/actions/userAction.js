import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

axios.defaults.baseURL = 'http://192.46.211.35:5000';
export const getUserActions=(infodata,history) =>dispatch=> {
    axios.post("/api/colleges/getUserAction", infodata)
        .then(res=> {
            history.push("/getUserAction")
            window.location.reload();

        })
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}