import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import {setCurrentUser, logoutUser} from "./actions/authActions";

import './App.css';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/Register";
import Login from "./components/layout/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";
import Forgot from "./components/layout/Forgot";
import AddCollege from "./components/layout/College/AddCollege";
import collegeDirectory from "./components/layout/College/collegeDirectory";
import editCollege from "./components/layout/College/editCollege";
import UserDirectory from "./components/layout/Users/UserDirectory";
import UserAction from "./components/layout/Users/UserAction";
import EditProfile from "./components/layout/College/EditProfile";
import AdminDirectory from "./components/layout/Admin/AdminDirectory";
import AdminEditAction from "./components/layout/Admin/AdminEditAction";
import AdminEditInfo from "./components/layout/Admin/AdminEditInfo";
import dashboard from "./components/layout/Home/dashboard";
import AddDegreeSpecialization from "./components/layout/Degree/AddDegreeSpecialization";
import UserNavBar from "./components/user/UserNavBar";
import searchCollege from "./components/user/searchCollege";
import usergetCollege from "./components/user/usergetCollege";
import EvaluateProfile from "./components/user/EvaluateProfile";
import collegeList from "./components/user/collegeList";
import searchDegree from "./components/user/searchDegree";
import UpdatePassword from "./components/layout/UpdatePassword";
import userChangePassword from "./components/user/userChangePassword";
import ActiveUser from "./components/layout/ActiveUser";
import axios from 'axios';
//http://192.46.211.35:5000
axios.defaults.baseURL = 'http://192.46.211.35:5000';
if (localStorage.jwtToken) {

    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    console.log("currentUser=>", decoded);
    localStorage.setItem("nowUser", JSON.stringify(decoded));
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    console.log("currentTIme===>", currentTime);
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>

                        <Route path="/" component={Login} exact/>
                        <Route path="/register" component={Register} exact/>
                        <Route path="/ActiveUser/:id" component={ActiveUser} exact/>
                        <Route path="/nav" component={Navbar} exact/>
                        <Route path="/login" component={Login} exact/>
                        <Route path="/reset-password" component={Forgot} exact/>
                        <Route path="/AddCollege" component={AddCollege} exact/>
                        <Route path="/college_directory" component={collegeDirectory} exact/>
                        <Route path="/editCollege" component={editCollege} exact/>
                        <Route path="/userDirectory" component={UserDirectory} exact/>
                        <Route path="/getUserAction" component={UserAction} exact/>
                        <Route path="/editProfile" component={EditProfile} exact/>
                        <Route path="/adminDirectory" component={AdminDirectory} exact/>
                        <Route path="/adminEditAction" component={AdminEditAction} exact/>
                        <Route path="/adminEditInfo" component={AdminEditInfo} exact/>
                        <Route path="/addDegree" component={AddDegreeSpecialization} exact/>
                        <Route path="/dash" component={dashboard} exact/>
                        <Route path="/userNavbar" component={UserNavBar} exact/>
                        <Route path="/searchCollege" component={searchCollege} exact/>
                        <Route path="/usergetCollege" component={usergetCollege} exact/>
                        <Route path="/evaluate" component={EvaluateProfile} exact/>
                        <Route path="/collegeList" component={collegeList} exact/>
                        <Route path="/searchDegree" component={searchDegree} exact/>
                        <Route path="/updatepassword/:id" component={UpdatePassword} exact={true}/>
                        <Route path="/userChangePassword" component={userChangePassword} exact={true}/>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    </Switch>
                </div>
            </Router>
        </Provider>

    );
}

export default App;
