import React,{Component} from "react";
import Navbar from "./Navbar";



class mainAdmin extends Component{

    onChange = e => {
        this.setState({[e.target.id]:e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();


    }
    render(){
       // const { email, errors} = this.state;
        return(
            <div >
                <Navbar/>
            </div>
        )
    }
}

export default mainAdmin;